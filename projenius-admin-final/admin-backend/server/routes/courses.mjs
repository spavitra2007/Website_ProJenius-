import express from "express";
import mongoose from "mongoose";
import { Course } from "../models/Course.mjs";
import { requireAdmin } from "../middleware/adminAuth.mjs";

export const courseRouter = express.Router();

function slugify(value) {
  return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function publicQuery() {
  return { published: true, publicVisibility: { $ne: false } };
}

courseRouter.get("/", async (req, res, next) => {
  try {
    const { category, level, badge, tag, search, limit = 50, page = 1 } = req.query;
    const query = publicQuery();
    if (category && category !== "All") query.category = String(category);
    if (level && level !== "All") query.level = String(level);
    if (badge && badge !== "All") query.badge = String(badge);
    if (tag && tag !== "All") query.tags = String(tag);
    if (search) query.$or = [
      { title: { $regex: String(search), $options: "i" } },
      { description: { $regex: String(search), $options: "i" } },
    ];
    const pageNumber = Math.max(1, Number(page) || 1);
    const pageLimit = Math.min(100, Math.max(1, Number(limit) || 50));
    const [items, total] = await Promise.all([
      Course.find(query).sort({ createdAt: -1 }).skip((pageNumber - 1) * pageLimit).limit(pageLimit).lean(),
      Course.countDocuments(query),
    ]);
    res.json({ items, page: pageNumber, total, totalPages: Math.max(1, Math.ceil(total / pageLimit)) });
  } catch (error) { next(error); }
});

courseRouter.get("/admin/all", requireAdmin, async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json({ items: courses });
  } catch (error) { next(error); }
});

courseRouter.get("/:id", async (req, res, next) => {
  try {
    const identifier = String(req.params.id || "").trim();
    const filter = mongoose.isValidObjectId(identifier)
      ? { _id: identifier }
      : { slug: identifier };

    const course = await Course.findOne({
      ...filter,
      ...publicQuery(),
    }).lean();

    if (!course) return res.status(404).json({ error: "Course not found." });
    res.json(course);
  } catch (error) { next(error); }
});

function buildCoursePayload(body) {
  const category = String(body.category || "").trim();
  const originalPrice = Number(body.originalPrice ?? body.price) || 0;
  const offerPrice = Number(body.offerPrice ?? body.price) || 0;
  return {
    title: String(body.title || "").trim(),
    description: String(body.description || "").trim(),
    image: String(body.image || "").trim(),
    category,
    level: body.level || "Beginner",
    duration: String(body.duration || "").trim(),
    mode: body.mode || "Online Live",
    originalPrice,
    offerPrice,
    price: offerPrice,
    rating: Number(body.rating) || 0,
    reviews: Number(body.reviews) || 0,
    enrolled: Number(body.enrolled) || 0,
    instructor: { name: body.instructor?.name || "ProJenius Team", avatar: body.instructor?.avatar || "" },
    badge: String(body.badge || "").trim(),
    skills: Array.isArray(body.skills) ? body.skills : [],
    tags: Array.isArray(body.tags) ? body.tags : [],
    courseStatus: ["Draft", "Enrollment Open", "Enrollment Closed", "Ongoing", "Completed"].includes(body.courseStatus) ? body.courseStatus : "Draft",
    publicVisibility: body.publicVisibility !== false,
    published: body.publicVisibility !== false,
  };
}

courseRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const payload = buildCoursePayload(req.body);
    if (!payload.title || !payload.description || !payload.image || !payload.category) return res.status(400).json({ error: "title, description, image, and category are required." });
    if (payload.offerPrice > payload.originalPrice && payload.originalPrice > 0) return res.status(400).json({ error: "Offer price cannot be higher than original price." });
    const baseSlug = slugify(payload.title) || `course-${Date.now()}`;
    let slug = baseSlug; let suffix = 1;
    while (await Course.exists({ slug })) { suffix += 1; slug = `${baseSlug}-${suffix}`; }
    const course = await Course.create({ ...payload, slug });
    res.status(201).json(course);
  } catch (error) { next(error); }
});

courseRouter.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found." });
    const payload = buildCoursePayload(req.body);
    if (!payload.title || !payload.description || !payload.image || !payload.category) return res.status(400).json({ error: "title, description, image, and category are required." });
    if (payload.offerPrice > payload.originalPrice && payload.originalPrice > 0) return res.status(400).json({ error: "Offer price cannot be higher than original price." });
    Object.assign(course, payload);
    await course.save();
    res.json(course);
  } catch (error) { next(error); }
});

courseRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Course not found." });
    res.json({ message: "Course deleted successfully." });
  } catch (error) { next(error); }
});
