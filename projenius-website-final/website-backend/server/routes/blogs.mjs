import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Blog } from "../models/Blog.mjs";
import { requireAdmin } from "../middleware/adminAuth.mjs";
import { publishDueScheduledBlogs, queueBlogNewsletter } from "../jobs/newsletterQueue.mjs";
import { slugify } from "../utils/slugify.mjs";

export const blogRouter = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(__dirname, "../../uploads/news-videos");
fs.mkdirSync(uploadDir, { recursive: true });
async function saveMultipartVideo(req) {
  const contentType = String(req.headers["content-type"] || "");
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!boundaryMatch) throw new Error("Multipart boundary is missing.");
  const boundary = Buffer.from(`--${boundaryMatch[1] || boundaryMatch[2]}`);
  const endBoundary = Buffer.concat([Buffer.from("\r\n"), boundary]);
  const headerEnd = Buffer.from("\r\n\r\n");
  let pending = Buffer.alloc(0);
  let started = false;
  let fileStream;
  let filename = "video.bin";
  let bytes = 0;
  let settled = false;

  const safeName = (value) => String(value || "video.bin").replace(/[^a-zA-Z0-9._-]/g, "-");
  const writeChunk = (chunk) => {
    if (!chunk?.length) return;
    fileStream.write(chunk);
    bytes += chunk.length;
  };

  return new Promise((resolve, reject) => {
    const fail = (error) => {
      if (settled) return;
      settled = true;
      try { fileStream?.destroy(); } catch {}
      reject(error);
    };

    req.on("data", (chunk) => {
      if (settled) return;
      try {
        pending = Buffer.concat([pending, Buffer.from(chunk)]);

        if (!started) {
          const headerStart = pending.indexOf(boundary);
          if (headerStart < 0) {
            pending = pending.subarray(Math.max(0, pending.length - boundary.length - 8));
            return;
          }
          const headersStart = headerStart + boundary.length + 2;
          const headerStop = pending.indexOf(headerEnd, headersStart);
          if (headerStop < 0) return;
          const headerText = pending.subarray(headersStart, headerStop).toString("utf8");
          const nameMatch = headerText.match(/filename="([^"]+)"/i);
          filename = safeName(nameMatch?.[1] || "video.bin");
          const extension = path.extname(filename) || ".bin";
          const storedName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${extension}`;
          const storedPath = path.join(uploadDir, storedName);
          fileStream = fs.createWriteStream(storedPath);
          fileStream.on("error", fail);
          started = true;
          pending = pending.subarray(headerStop + headerEnd.length);
        }

        const boundaryIndex = pending.indexOf(endBoundary);
        if (boundaryIndex >= 0) {
          writeChunk(pending.subarray(0, boundaryIndex));
          pending = Buffer.alloc(0);
          fileStream.end(() => {
            if (settled) return;
            settled = true;
            const storedPath = path.join(uploadDir, fs.readdirSync(uploadDir).filter((name) => name.endsWith(path.extname(filename))).sort().at(-1) || "");
            // The newest file with the current extension is safe because uploads are serialized per request in normal use.
            resolve({ filename: path.basename(fileStream.path), size: bytes, path: fileStream.path });
          });
          return;
        }

        const keep = Math.max(0, endBoundary.length + 4);
        if (pending.length > keep) {
          writeChunk(pending.subarray(0, pending.length - keep));
          pending = pending.subarray(pending.length - keep);
        }
      } catch (error) { fail(error); }
    });
    req.on("end", () => {
      if (settled) return;
      fail(new Error("Incomplete video upload."));
    });
    req.on("error", fail);
  });
}


function parseDataImage(imageValue) {
  const image = String(imageValue || "").trim();
  const match = image.match(/^data:(image\/(?:png|jpe?g|webp|gif));base64,([a-z0-9+/=\s]+)$/i);
  if (!match) return null;
  return { contentType: match[1].toLowerCase(), buffer: Buffer.from(match[2].replace(/\s/g, ""), "base64") };
}

function normalizeImages({ thumbnailUrl, galleryImages }) {
  const images = Array.isArray(galleryImages) ? galleryImages.map((image) => String(image || "").trim()).filter(Boolean) : [];
  const thumbnail = String(thumbnailUrl || images[0] || "").trim();
  if (thumbnail && !images.includes(thumbnail)) images.unshift(thumbnail);
  return { thumbnailUrl: thumbnail, galleryImages: images };
}

function normalizePublication({ status = "draft", scheduledAt }) {
  if (status === "draft") return { status: "draft", scheduledAt: null, publishedAt: null };
  if (status === "scheduled") {
    const date = new Date(scheduledAt);
    if (!scheduledAt || Number.isNaN(date.getTime()) || date <= new Date()) throw new Error("Schedule date and time must be in the future.");
    return { status: "scheduled", scheduledAt: date, publishedAt: null };
  }
  return { status: "published", scheduledAt: null, publishedAt: new Date() };
}

function normalizeCategory(category, customCategory) {
  const value = String(category || "").trim();
  if (value === "Other") return String(customCategory || "").trim();
  return value;
}

function uniqueSlug(base, currentId = "") {
  return (async () => {
    const clean = slugify(base) || `insight-${Date.now()}`;
    let slug = clean; let suffix = 1;
    while (await Blog.exists({ slug, ...(currentId ? { _id: { $ne: currentId } } : {}) })) { suffix += 1; slug = `${clean}-${suffix}`; }
    return slug;
  })();
}

async function buildPayload(body, currentId = "") {
  const category = normalizeCategory(body.category, body.customCategory);
  const images = normalizeImages({ thumbnailUrl: body.thumbnailUrl, galleryImages: body.galleryImages });
  const publication = normalizePublication({ status: body.status, scheduledAt: body.scheduledAt });
  if (!body.title || !body.description || !body.content || !images.thumbnailUrl || !category) throw new Error("title, description, content, category, and a thumbnail image are required.");
  const requestedSlug = String(body.slug || "").trim();
  const slug = requestedSlug ? await uniqueSlug(requestedSlug, currentId) : await uniqueSlug(body.title, currentId);
  return {
    title: String(body.title).trim(), slug, description: String(body.description).trim(), content: String(body.content),
    contentType: body.contentType || "Article", category, customCategory: body.category === "Other" ? String(body.customCategory || "").trim() : "",
    thumbnailUrl: images.thumbnailUrl, galleryImages: images.galleryImages, videoUrl: String(body.videoUrl || "").trim(), videoFileUrl: String(body.videoFileUrl || "").trim(),
    author: { name: body.author?.name || "ProJenius Team", role: body.author?.role || "Technology Insights" }, tags: Array.isArray(body.tags) ? body.tags : [],
    eventDate: body.eventDate ? new Date(body.eventDate) : null, venue: String(body.venue || "").trim(), eventType: String(body.eventType || "").trim(), eventStatus: body.eventStatus === "Completed" ? "Completed" : "Upcoming", registrationLink: String(body.registrationLink || "").trim(),
    ...publication, featured: Boolean(body.featured), publicVisibility: body.publicVisibility !== false,
    seoTitle: String(body.seoTitle || "").trim(), metaDescription: String(body.metaDescription || "").trim(), focusKeyword: String(body.focusKeyword || "").trim(),
  };
}

async function sendBlogThumbnail(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id).select("thumbnailUrl").lean();
    if (!blog?.thumbnailUrl) return res.status(404).json({ error: "Image not found." });
    if (/^https?:\/\//i.test(blog.thumbnailUrl) || blog.thumbnailUrl.startsWith("/uploads/")) return res.redirect(302, blog.thumbnailUrl);
    const dataImage = parseDataImage(blog.thumbnailUrl);
    if (!dataImage) return res.status(404).json({ error: "Image is unavailable." });
    res.setHeader("Content-Type", dataImage.contentType); res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); res.send(dataImage.buffer);
  } catch (error) { next(error); }
}

blogRouter.post("/video", requireAdmin, async (req, res) => {
  try {
    const uploaded = await saveMultipartVideo(req);
    res.status(201).json({ url: `/uploads/news-videos/${uploaded.filename}`, filename: uploaded.filename, size: uploaded.size });
  } catch (error) {
    res.status(400).json({ error: error.message || "Video upload failed." });
  }
});

blogRouter.get("/", async (req, res, next) => {
  try {
    await publishDueScheduledBlogs();
    const { category, contentType, featured, limit = 20, page = 1 } = req.query;
    const query = { status: "published", publicVisibility: { $ne: false } };
    if (category && category !== "All") query.category = String(category);
    if (contentType && contentType !== "All") query.contentType = String(contentType);
    if (featured === "true") query.featured = true;
    const pageNumber = Math.max(1, Number(page) || 1); const pageLimit = Math.min(50, Math.max(1, Number(limit) || 20));
    const [items, total] = await Promise.all([
      Blog.find(query).sort({ featured: -1, publishedAt: -1, createdAt: -1 }).skip((pageNumber - 1) * pageLimit).limit(pageLimit).lean(),
      Blog.countDocuments(query),
    ]);
    res.json({ items, page: pageNumber, total, totalPages: Math.max(1, Math.ceil(total / pageLimit)) });
  } catch (error) { next(error); }
});

blogRouter.get("/admin/all", requireAdmin, async (_req, res, next) => {
  try { await publishDueScheduledBlogs(); const items = await Blog.find().sort({ createdAt: -1 }).limit(300).lean(); res.json({ items }); }
  catch (error) { next(error); }
});

blogRouter.get("/:id/thumbnail", sendBlogThumbnail);
blogRouter.get("/:id/thumbnail.jpg", sendBlogThumbnail);
blogRouter.get("/:slug", async (req, res, next) => {
  try {
    const item = await Blog.findOne({ slug: req.params.slug, status: "published", publicVisibility: { $ne: false } }).lean();
    if (!item) return res.status(404).json({ error: "Content not found." });
    res.json(item);
  } catch (error) { next(error); }
});

blogRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const payload = await buildPayload(req.body);
    const item = await Blog.create(payload);
    if (item.status === "published") queueBlogNewsletter(item.toObject());
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ error: error.message || "Unable to create content." }); }
});

blogRouter.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const item = await Blog.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Content not found." });
    const payload = await buildPayload(req.body, req.params.id);
    const wasPublished = item.status === "published";
    Object.assign(item, payload);
    await item.save();
    if (!wasPublished && item.status === "published" && !item.newsletterSentAt) { item.newsletterSentAt = new Date(); await item.save(); queueBlogNewsletter(item.toObject()); }
    res.json(item);
  } catch (error) { res.status(400).json({ error: error.message || "Unable to update content." }); }
});

blogRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try { const deleted = await Blog.findByIdAndDelete(req.params.id); if (!deleted) return res.status(404).json({ error: "Content not found." }); res.json({ message: "Content deleted successfully." }); }
  catch (error) { next(error); }
});
