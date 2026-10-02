import { useEffect, useMemo, useRef, useState } from "react";

const COURSE_CATEGORIES = [
  "Development",
  "Data Science",
  "AI & Machine Learning",
  "Design",
  "Business",
  "Marketing",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Other",
];

const NEWS_CATEGORIES = [
  "Technology",
  "Education",
  "Startup & Innovation",
  "Events",
  "Company",
  "Career",
  "Other",
];

const COURSE_STATUSES = ["Draft", "Enrollment Open", "Enrollment Closed", "Ongoing", "Completed"];
const CONTENT_TYPES = ["Article", "Technology Video", "Event", "Company Update", "Announcement"];

const initialCourseForm = {
  title: "",
  description: "",
  image: "",
  category: "Development",
  customCategory: "",
  level: "Beginner",
  duration: "",
  mode: "Online Live",
  originalPrice: "",
  offerPrice: "",
  rating: "",
  reviews: "",
  enrolled: "",
  instructorName: "ProJenius Team",
  badge: "",
  skills: "",
  courseStatus: "Draft",
  publicVisibility: true,
};

const initialNewsForm = {
  title: "",
  description: "",
  content: "",
  contentType: "Article",
  category: "Technology",
  customCategory: "",
  thumbnailUrl: "",
  galleryImages: [],
  videoUrl: "",
  videoFileUrl: "",
  authorName: "ProJenius Team",
  authorRole: "Technology Insights",
  eventDate: "",
  venue: "",
  eventType: "",
  eventStatus: "Upcoming",
  registrationLink: "",
  status: "draft",
  scheduledAt: "",
  featured: false,
  publicVisibility: true,
  seoTitle: "",
  metaDescription: "",
  slug: "",
  focusKeyword: "",
};

const MAX_IMAGE_SIZE_MB = 6;
const MAX_NEWS_IMAGES = 8;

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error(`Unable to read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to process selected image."));
    image.src = dataUrl;
  });
}

async function compressImageFile(file) {
  if (!file?.type?.startsWith("image/")) throw new Error("Please select an image file.");
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  const maxDimension = 1500;
  const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
  canvas.height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/webp", 0.78);
}

function toDatetimeLocalValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

async function readApiResponse(response) {
  const type = response.headers.get("content-type") || "";
  if (type.includes("application/json")) return response.json();
  const text = await response.text();
  throw new Error(text || "Unexpected response from API.");
}

function Field({ label, children, hint, className = "" }) {
  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function ImageUploader({ label, image, onUpload, onRemove, multiple = false, children }) {
  return (
    <section className="upload-panel">
      <div className="upload-copy">
        <span>Media</span>
        <h3>{label}</h3>
        <p>{children}</p>
      </div>
      <label className="upload-dropzone">
        <input accept="image/*" multiple={multiple} type="file" onChange={onUpload} />
        <strong>{image?.length ? "Add / Replace Image" : "Choose Image"}</strong>
        <small>PNG, JPG, WebP · max {MAX_IMAGE_SIZE_MB}MB each</small>
      </label>
      {image && !Array.isArray(image) && (
        <div className="single-preview">
          <img src={image} alt="Preview" />
          <button type="button" className="remove-btn" onClick={onRemove}>Remove image</button>
        </div>
      )}
    </section>
  );
}

function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const [sourceMode, setSourceMode] = useState(false);

  useEffect(() => {
    if (!editorRef.current || sourceMode) return;
    if (editorRef.current.innerHTML !== value) editorRef.current.innerHTML = value || "";
  }, [value, sourceMode]);

  const exec = (command, commandValue = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML || "");
  };

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) exec("createLink", url);
  };

  const insertTable = () => exec("insertHTML", `<table><tbody><tr><th>Heading</th><th>Heading</th></tr><tr><td>Value</td><td>Value</td></tr></tbody></table><p></p>`);
  const insertVideo = () => {
    const url = window.prompt("YouTube URL");
    if (!url) return;
    const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/)?.[1];
    if (id) exec("insertHTML", `<p><iframe class="content-video" src="https://www.youtube.com/embed/${id}" title="YouTube video" allowfullscreen></iframe></p>`);
  };

  return (
    <div className="rich-editor">
      <div className="editor-toolbar">
        {[["bold", "B"], ["italic", "I"], ["underline", "U"]].map(([cmd, text]) => <button key={cmd} type="button" onClick={() => exec(cmd)}>{text}</button>)}
        <button type="button" onClick={() => exec("formatBlock", "h2")}>H2</button>
        <button type="button" onClick={() => exec("formatBlock", "h3")}>H3</button>
        <button type="button" onClick={() => exec("insertUnorderedList")}>• List</button>
        <button type="button" onClick={() => exec("insertOrderedList")}>1. List</button>
        <button type="button" onClick={addLink}>Link</button>
        <button type="button" onClick={insertTable}>Table</button>
        <button type="button" onClick={insertVideo}>Video</button>
        <button type="button" onClick={() => exec("formatBlock", "pre")}>Code</button>
        <button type="button" onClick={() => setSourceMode((v) => !v)}>{sourceMode ? "Visual" : "HTML"}</button>
      </div>
      {sourceMode ? (
        <textarea className="html-source" value={value} onChange={(e) => onChange(e.target.value)} rows="18" />
      ) : (
        <div ref={editorRef} className="editor-canvas" contentEditable suppressContentEditableWarning onInput={(e) => onChange(e.currentTarget.innerHTML)} />
      )}
      <small className="editor-help">Supports formatted text, links, tables, code blocks, YouTube embeds, and image/diagram HTML. Use HTML mode for advanced layouts.</small>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("news");
  const [courses, setCourses] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [courseForm, setCourseForm] = useState(initialCourseForm);
  const [newsForm, setNewsForm] = useState(initialNewsForm);
  const [editingCourseId, setEditingCourseId] = useState("");
  const [editingNewsId, setEditingNewsId] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [newsSearch, setNewsSearch] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateCourse = (key, value) => setCourseForm((s) => ({ ...s, [key]: value }));
  const updateNews = (key, value) => setNewsForm((s) => ({ ...s, [key]: value }));

  const loadCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/courses");
      const data = await readApiResponse(response);
      if (!response.ok) throw new Error(data.error || "Unable to load courses.");
      setCourses(Array.isArray(data.items) ? data.items : []);
    } catch (e) { setMessage(e.message); } finally { setLoading(false); }
  };

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/blogs");
      const data = await readApiResponse(response);
      if (!response.ok) throw new Error(data.error || "Unable to load News & Insights.");
      setNewsItems(Array.isArray(data.items) ? data.items : []);
    } catch (e) { setMessage(e.message); } finally { setLoading(false); }
  };

  useEffect(() => { loadCourses(); loadNews(); }, []);

  const handleCourseImage = async (e) => {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) return setMessage(`Course image must be under ${MAX_IMAGE_SIZE_MB}MB.`);
    try { updateCourse("image", await compressImageFile(file)); setMessage("Course image ready. You can remove it and replace it anytime."); }
    catch (err) { setMessage(err.message); }
  };

  const handleNewsImages = async (e) => {
    const files = Array.from(e.target.files || []); e.target.value = "";
    if (!files.length) return;
    const slots = MAX_NEWS_IMAGES - newsForm.galleryImages.length;
    if (slots <= 0) return setMessage(`Maximum ${MAX_NEWS_IMAGES} images allowed.`);
    try {
      const images = await Promise.all(files.slice(0, slots).map((file) => {
        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) throw new Error(`${file.name} is over ${MAX_IMAGE_SIZE_MB}MB.`);
        return compressImageFile(file);
      }));
      updateNews("galleryImages", [...newsForm.galleryImages, ...images]);
      if (!newsForm.thumbnailUrl) updateNews("thumbnailUrl", images[0] || "");
      setMessage("Images added.");
    } catch (err) { setMessage(err.message); }
  };

  const resetCourse = (clearMessage = true) => { setEditingCourseId(""); setCourseForm(initialCourseForm); if (clearMessage) setMessage(""); };
  const resetNews = (clearMessage = true) => { setEditingNewsId(""); setNewsForm(initialNewsForm); if (clearMessage) setMessage(""); };

  const editCourse = (course) => {
    setActiveSection("courses"); setEditingCourseId(course._id);
    setCourseForm({
      ...initialCourseForm,
      ...course,
      category: COURSE_CATEGORIES.includes(course.category) ? course.category : "Other",
      customCategory: COURSE_CATEGORIES.includes(course.category) ? "" : course.category || "",
      originalPrice: course.originalPrice ?? course.price ?? "",
      offerPrice: course.offerPrice ?? course.price ?? "",
      instructorName: course.instructor?.name || "ProJenius Team",
      skills: Array.isArray(course.skills) ? course.skills.join(", ") : "",
      courseStatus: course.courseStatus || (course.published ? "Enrollment Open" : "Draft"),
      publicVisibility: course.publicVisibility !== false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editNews = (item) => {
    setActiveSection("news"); setEditingNewsId(item._id);
    const cat = NEWS_CATEGORIES.includes(item.category) ? item.category : "Other";
    setNewsForm({
      ...initialNewsForm,
      ...item,
      contentType: item.contentType || "Article",
      category: cat,
      customCategory: cat === "Other" ? item.customCategory || item.category || "" : "",
      galleryImages: Array.isArray(item.galleryImages) ? item.galleryImages : item.thumbnailUrl ? [item.thumbnailUrl] : [],
      authorName: item.author?.name || "ProJenius Team",
      authorRole: item.author?.role || "Technology Insights",
      scheduledAt: toDatetimeLocalValue(item.scheduledAt),
      eventDate: toDatetimeLocalValue(item.eventDate),
      publicVisibility: item.publicVisibility !== false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveCourse = async (e) => {
    e.preventDefault();
    const category = courseForm.category === "Other" ? courseForm.customCategory.trim() : courseForm.category;
    if (!courseForm.image) return setMessage("Add a course image.");
    if (!category) return setMessage("Enter the custom category.");
    const original = Number(courseForm.originalPrice);
    const offer = Number(courseForm.offerPrice);
    if (!Number.isFinite(original) || original < 0) return setMessage("Enter a valid original price.");
    if (!Number.isFinite(offer) || offer < 0) return setMessage("Enter a valid offer price.");
    if (offer > original && original > 0) return setMessage("Offer price cannot be higher than original price.");
    setBusy(true); setMessage("Saving course...");
    try {
      const payload = {
        title: courseForm.title.trim(), description: courseForm.description.trim(), image: courseForm.image, category,
        level: courseForm.level, duration: courseForm.duration.trim(), mode: courseForm.mode,
        originalPrice: original, offerPrice: offer, price: offer,
        rating: Number(courseForm.rating) || 0, reviews: Number(courseForm.reviews) || 0, enrolled: Number(courseForm.enrolled) || 0,
        instructor: { name: courseForm.instructorName.trim() || "ProJenius Team" }, badge: courseForm.badge,
        skills: courseForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
        courseStatus: courseForm.courseStatus, publicVisibility: Boolean(courseForm.publicVisibility), published: Boolean(courseForm.publicVisibility),
      };
      const response = await fetch(editingCourseId ? `/api/admin/courses?id=${editingCourseId}` : "/api/admin/courses", {
        method: editingCourseId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await readApiResponse(response); if (!response.ok) throw new Error(data.error || "Unable to save course.");
      setMessage(editingCourseId ? "Course updated successfully." : "Course created successfully."); resetCourse(false); await loadCourses();
    } catch (err) { setMessage(err.message); } finally { setBusy(false); }
  };

  const saveNews = async (e) => {
    e.preventDefault();
    const category = newsForm.category === "Other" ? newsForm.customCategory.trim() : newsForm.category;
    if (!newsForm.thumbnailUrl) return setMessage("Add a featured/thumbnail image.");
    if (!category) return setMessage("Enter the custom category.");
    if (newsForm.status === "scheduled") {
      const date = new Date(newsForm.scheduledAt);
      if (!newsForm.scheduledAt || Number.isNaN(date.getTime()) || date <= new Date()) return setMessage("Choose a future schedule date and time.");
    }
    if (newsForm.contentType === "Event" && !newsForm.eventDate) return setMessage("Event date is required for events.");
    setBusy(true); setMessage("Saving content...");
    try {
      const payload = {
        title: newsForm.title.trim(), description: newsForm.description.trim(), content: newsForm.content,
        contentType: newsForm.contentType, category, customCategory: newsForm.category === "Other" ? newsForm.customCategory.trim() : "",
        thumbnailUrl: newsForm.thumbnailUrl, galleryImages: newsForm.galleryImages, videoUrl: newsForm.videoUrl.trim(), videoFileUrl: newsForm.videoFileUrl,
        author: { name: newsForm.authorName.trim() || "ProJenius Team", role: newsForm.authorRole.trim() },
        eventDate: newsForm.eventDate ? new Date(newsForm.eventDate).toISOString() : null, venue: newsForm.venue, eventType: newsForm.eventType,
        eventStatus: newsForm.eventStatus, registrationLink: newsForm.registrationLink, status: newsForm.status,
        scheduledAt: newsForm.status === "scheduled" ? new Date(newsForm.scheduledAt).toISOString() : null,
        featured: Boolean(newsForm.featured), publicVisibility: Boolean(newsForm.publicVisibility),
        seoTitle: newsForm.seoTitle.trim(), metaDescription: newsForm.metaDescription.trim(), slug: newsForm.slug.trim(), focusKeyword: newsForm.focusKeyword.trim(),
      };
      const response = await fetch(editingNewsId ? `/api/admin/blogs?id=${editingNewsId}` : "/api/admin/blogs", {
        method: editingNewsId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await readApiResponse(response); if (!response.ok) throw new Error(data.error || "Unable to save content.");
      setMessage(editingNewsId ? "Content updated successfully." : "Content created successfully."); resetNews(false); await loadNews();
    } catch (err) { setMessage(err.message); } finally { setBusy(false); }
  };

  const uploadNewsVideo = async (e) => {
    const file = e.target.files?.[0]; e.target.value = ""; if (!file) return;
    if (!file.type.startsWith("video/")) return setMessage("Select a valid video file.");
    setBusy(true); setMessage("Uploading video...");
    try {
      const body = new FormData(); body.append("video", file);
      const response = await fetch("/api/admin/blogs/video", { method: "POST", body });
      const data = await readApiResponse(response); if (!response.ok) throw new Error(data.error || "Video upload failed.");
      updateNews("videoFileUrl", data.url); setMessage("Video uploaded successfully.");
    } catch (err) { setMessage(err.message); } finally { setBusy(false); }
  };

  const removeCourse = async (course) => {
    if (!window.confirm(`Delete "${course.title}"?`)) return;
    const response = await fetch(`/api/admin/courses?id=${course._id}`, { method: "DELETE" });
    const data = await readApiResponse(response); if (!response.ok) return setMessage(data.error || "Delete failed.");
    await loadCourses(); setMessage("Course deleted.");
  };

  const removeNews = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    const response = await fetch(`/api/admin/blogs?id=${item._id}`, { method: "DELETE" });
    const data = await readApiResponse(response); if (!response.ok) return setMessage(data.error || "Delete failed.");
    await loadNews(); setMessage("Content deleted.");
  };

  const filteredCourses = useMemo(() => {
    const q = courseSearch.trim().toLowerCase();
    return courses.filter((c) => !q || [c.title, c.category, c.description, c.level, c.mode, c.courseStatus].join(" ").toLowerCase().includes(q));
  }, [courses, courseSearch]);

  const filteredNews = useMemo(() => {
    const q = newsSearch.trim().toLowerCase();
    return newsItems.filter((n) => !q || [n.title, n.category, n.contentType, n.description, n.status].join(" ").toLowerCase().includes(q));
  }, [newsItems, newsSearch]);

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand"><img src="/pj_logo.webp" alt="ProJenius" /><span>ProJenius Admin</span></div>
          <h1>Content Manager</h1>
          <p>Manage courses and the complete News & Insights publishing workflow from one focused dashboard.</p>
          <nav className="admin-nav">
            <button className={activeSection === "news" ? "active" : ""} onClick={() => setActiveSection("news")} type="button"><strong>01</strong><span>News & Insights</span></button>
            <button className={activeSection === "courses" ? "active" : ""} onClick={() => setActiveSection("courses")} type="button"><strong>02</strong><span>Courses</span></button>
          </nav>
          <div className="sidebar-note"><strong>Performance</strong><span>Lean media processing and smaller client payloads keep the admin UI responsive.</span></div>
        </aside>

        {activeSection === "courses" ? (
          <div className="content-column">
            <form className="admin-form" onSubmit={saveCourse}>
              <div className="form-header"><div><span>{editingCourseId ? "Edit mode" : "Create mode"}</span><h2>{editingCourseId ? "Edit Course" : "Create New Course"}</h2></div>{editingCourseId && <button className="ghost-btn" type="button" onClick={resetCourse}>Cancel Edit</button>}</div>
              <div className="section-title"><span>COURSE DETAILS</span><h3>Course information</h3></div>
              <div className="form-grid">
                <Field label="Course Title"><input required value={courseForm.title} onChange={(e) => updateCourse("title", e.target.value)} placeholder="React Development" /></Field>
                <Field label="Category"><select value={courseForm.category} onChange={(e) => updateCourse("category", e.target.value)}>{COURSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
              </div>
              {courseForm.category === "Other" && <Field label="Custom Category"><input required value={courseForm.customCategory} onChange={(e) => updateCourse("customCategory", e.target.value)} placeholder="Enter category" /></Field>}
              <Field label="Description"><textarea required rows="4" value={courseForm.description} onChange={(e) => updateCourse("description", e.target.value)} placeholder="Describe what students will learn..." /></Field>
              <ImageUploader label="Course Image" image={courseForm.image} onUpload={handleCourseImage} onRemove={() => updateCourse("image", "")}>Upload the correct thumbnail. The current image can be removed before selecting a replacement.</ImageUploader>
              <div className="form-grid">
                <Field label="Level"><select value={courseForm.level} onChange={(e) => updateCourse("level", e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All Levels</option></select></Field>
                <Field label="Mode"><select value={courseForm.mode} onChange={(e) => updateCourse("mode", e.target.value)}><option>Online Live</option><option>Self-Paced</option><option>Hybrid</option><option>Online</option></select></Field>
              </div>
              <div className="form-grid"><Field label="Duration"><input value={courseForm.duration} onChange={(e) => updateCourse("duration", e.target.value)} placeholder="8 Weeks" /></Field><Field label="Instructor Name"><input value={courseForm.instructorName} onChange={(e) => updateCourse("instructorName", e.target.value)} /></Field></div>
              <div className="form-grid"><Field label="Badge"><select value={courseForm.badge} onChange={(e) => updateCourse("badge", e.target.value)}><option value="">No Badge</option><option>New</option><option>Popular</option><option>Trending</option><option>Bestseller</option></select></Field><Field label="Skills" hint="Separate skills with commas."><input value={courseForm.skills} onChange={(e) => updateCourse("skills", e.target.value)} placeholder="React, JavaScript, Node.js" /></Field></div>

              <div className="section-title"><span>PRICING</span><h3>Original and offer price</h3></div>
              <div className="pricing-grid">
                <Field label="Original Price"><input min="0" type="number" value={courseForm.originalPrice} onChange={(e) => updateCourse("originalPrice", e.target.value)} placeholder="9999" /></Field>
                <Field label="Offer Price"><input min="0" type="number" value={courseForm.offerPrice} onChange={(e) => updateCourse("offerPrice", e.target.value)} placeholder="4999" /></Field>
                <div className="price-preview"><span>Public display</span><strong>₹{Number(courseForm.offerPrice || 0).toLocaleString("en-IN")}</strong>{Number(courseForm.originalPrice) > Number(courseForm.offerPrice) && <del>₹{Number(courseForm.originalPrice || 0).toLocaleString("en-IN")}</del>}</div>
              </div>

              <div className="section-title"><span>PUBLISHING</span><h3>Course publishing</h3></div>
              <div className="form-grid">
                <Field label="Course Status"><select value={courseForm.courseStatus} onChange={(e) => updateCourse("courseStatus", e.target.value)}>{COURSE_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
                <Field label="Public Visibility"><div className="switch-row"><input checked={courseForm.publicVisibility} onChange={(e) => updateCourse("publicVisibility", e.target.checked)} type="checkbox" /><span>{courseForm.publicVisibility ? "Public" : "Hidden"}</span></div></Field>
              </div>
              <div className="metrics-panel"><div><span>Rating</span><input min="0" max="5" step="0.1" type="number" value={courseForm.rating} onChange={(e) => updateCourse("rating", e.target.value)} placeholder="0" /></div><div><span>Reviews</span><input min="0" type="number" value={courseForm.reviews} onChange={(e) => updateCourse("reviews", e.target.value)} placeholder="0" /></div><div><span>Enrollment</span><input min="0" type="number" value={courseForm.enrolled} onChange={(e) => updateCourse("enrolled", e.target.value)} placeholder="0" /></div></div>
              <p className="info-note"><strong>Important:</strong> Rating, reviews and enrollment are currently manual display fields. They will not automatically become real counts until the public review/enrollment flows write to these fields. The backend is ready to store them.</p>
              <div className="form-actions"><button disabled={busy} type="submit">{busy ? "Saving..." : editingCourseId ? "Update Course" : "Create Course"}</button>{message && <p>{message}</p>}</div>
            </form>

            <section className="manager"><div className="manager-header"><div><span>COURSE LIBRARY</span><h2>Manage Courses</h2></div><button type="button" onClick={loadCourses}>Refresh</button></div><div className="search-row"><input type="search" value={courseSearch} onChange={(e) => setCourseSearch(e.target.value)} placeholder="Search courses..." />{courseSearch && <button type="button" onClick={() => setCourseSearch("")}>Clear</button>}</div>
              {loading ? <p className="empty">Loading courses...</p> : filteredCourses.length ? <div className="course-list">{filteredCourses.map((course) => <article className="manager-card" key={course._id}><img src={course.image} alt="" loading="lazy" /><div><div className="card-meta"><span>{course.category}</span><span>{course.courseStatus || "Draft"}</span></div><h3>{course.title}</h3><p>{course.description}</p><small>₹{Number(course.offerPrice ?? course.price ?? 0).toLocaleString("en-IN")} {Number(course.originalPrice) > Number(course.offerPrice) && <del>₹{Number(course.originalPrice).toLocaleString("en-IN")}</del>}</small></div><div className="manager-actions"><button type="button" onClick={() => editCourse(course)}>Edit</button><button className="danger" type="button" onClick={() => removeCourse(course)}>Delete</button></div></article>)}</div> : <p className="empty">No courses found.</p>}
            </section>
          </div>
        ) : (
          <div className="content-column">
            <form className="admin-form" onSubmit={saveNews}>
              <div className="form-header"><div><span>{editingNewsId ? "Edit mode" : "Create mode"}</span><h2>{editingNewsId ? "Edit Content" : "Create New Content"}</h2></div>{editingNewsId && <button className="ghost-btn" type="button" onClick={resetNews}>Cancel Edit</button>}</div>
              <div className="section-title"><span>NEWS & INSIGHTS</span><h3>Content basics</h3></div>
              <Field label="Title"><input required value={newsForm.title} onChange={(e) => updateNews("title", e.target.value)} placeholder="ESP32 vs Arduino for IoT" /></Field>
              <div className="form-grid"><Field label="Content Type"><select value={newsForm.contentType} onChange={(e) => updateNews("contentType", e.target.value)}>{CONTENT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field><Field label="Category"><select value={newsForm.category} onChange={(e) => updateNews("category", e.target.value)}>{NEWS_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field></div>
              {newsForm.category === "Other" && <Field label="Custom Category"><input required value={newsForm.customCategory} onChange={(e) => updateNews("customCategory", e.target.value)} placeholder="Enter category" /></Field>}
              <Field label="Short Description"><textarea required rows="3" value={newsForm.description} onChange={(e) => updateNews("description", e.target.value)} placeholder="Summary used for cards and SEO previews." /></Field>
              <section className="upload-panel"><div className="upload-copy"><span>Featured Media</span><h3>Featured / Thumbnail Image</h3><p>Remove or replace the selected image at any time.</p></div><label className="upload-dropzone"><input accept="image/*" type="file" onChange={async (e) => { const f = e.target.files?.[0]; e.target.value = ""; if (!f) return; try { updateNews("thumbnailUrl", await compressImageFile(f)); setMessage("Thumbnail ready."); } catch (err) { setMessage(err.message); } }} /><strong>Choose Thumbnail</strong><small>PNG, JPG, WebP · max {MAX_IMAGE_SIZE_MB}MB</small></label>{newsForm.thumbnailUrl && <div className="single-preview"><img src={newsForm.thumbnailUrl} alt="Thumbnail preview" /><button type="button" className="remove-btn" onClick={() => updateNews("thumbnailUrl", "")}>Remove image</button></div>}</section>
              <section className="upload-panel"><div className="upload-copy"><span>Additional Images</span><h3>Gallery / diagrams</h3><p>Add images for the article body, event recap, diagrams or supporting visuals.</p></div><label className="upload-dropzone"><input accept="image/*" multiple type="file" onChange={handleNewsImages} /><strong>Add Images</strong><small>Up to {MAX_NEWS_IMAGES} images</small></label>{newsForm.galleryImages.length > 0 && <div className="gallery-grid">{newsForm.galleryImages.map((image, i) => <figure key={`${image}-${i}`}><img src={image} alt="" /><button type="button" onClick={() => updateNews("galleryImages", newsForm.galleryImages.filter((_, idx) => idx !== i))}>Remove</button></figure>)}</div>}</section>

              <div className="section-title"><span>MEDIA</span><h3>Video</h3></div>
              <div className="form-grid"><Field label="YouTube Video URL" hint="Use this for normal YouTube-hosted videos."><input value={newsForm.videoUrl} onChange={(e) => updateNews("videoUrl", e.target.value)} placeholder="https://www.youtube.com/watch?v=..." /></Field><Field label="Direct Video Upload" hint="Uploads the file to the backend /uploads storage."><label className="file-button"><input type="file" accept="video/*" onChange={uploadNewsVideo} />{newsForm.videoFileUrl ? "Replace video" : "Upload large video"}</label></Field></div>{newsForm.videoFileUrl && <div className="video-uploaded"><span>Uploaded video</span><code>{newsForm.videoFileUrl}</code><button type="button" onClick={() => updateNews("videoFileUrl", "")}>Remove</button></div>}

              <div className="section-title"><span>CONTENT</span><h3>SEO-friendly editor</h3></div>
              <RichEditor value={newsForm.content} onChange={(v) => updateNews("content", v)} />

              {newsForm.contentType === "Event" && <><div className="section-title"><span>EVENT-SPECIFIC DETAILS</span><h3>Event information</h3></div><div className="form-grid"><Field label="Event Date"><input required type="datetime-local" value={newsForm.eventDate} onChange={(e) => updateNews("eventDate", e.target.value)} /></Field><Field label="Venue / Location"><input value={newsForm.venue} onChange={(e) => updateNews("venue", e.target.value)} /></Field><Field label="Event Type"><input value={newsForm.eventType} onChange={(e) => updateNews("eventType", e.target.value)} placeholder="Workshop / Webinar / Conference" /></Field><Field label="Event Status"><select value={newsForm.eventStatus} onChange={(e) => updateNews("eventStatus", e.target.value)}><option>Upcoming</option><option>Completed</option></select></Field></div><Field label="Registration Link"><input type="url" value={newsForm.registrationLink} onChange={(e) => updateNews("registrationLink", e.target.value)} placeholder="https://..." /></Field></>}

              <div className="section-title"><span>PUBLISHING</span><h3>Visibility and release</h3></div>
              <div className="form-grid"><Field label="Publishing Status"><select value={newsForm.status} onChange={(e) => updateNews("status", e.target.value)}><option value="draft">Draft</option><option value="scheduled">Scheduled</option><option value="published">Published</option></select></Field><Field label="Public Visibility"><div className="switch-row"><input checked={newsForm.publicVisibility} onChange={(e) => updateNews("publicVisibility", e.target.checked)} type="checkbox" /><span>{newsForm.publicVisibility ? "Public" : "Hidden"}</span></div></Field></div>
              {newsForm.status === "scheduled" && <Field label="Schedule Date and Time"><input required type="datetime-local" value={newsForm.scheduledAt} onChange={(e) => updateNews("scheduledAt", e.target.value)} /></Field>}
              <Field label="Featured Content"><div className="switch-row"><input checked={newsForm.featured} onChange={(e) => updateNews("featured", e.target.checked)} type="checkbox" /><span>{newsForm.featured ? "Featured" : "Standard"}</span></div></Field>

              <div className="section-title"><span>SEO</span><h3>Search metadata</h3></div>
              <div className="form-grid"><Field label="SEO Title"><input value={newsForm.seoTitle} onChange={(e) => updateNews("seoTitle", e.target.value)} placeholder="ESP32 vs Arduino for IoT" /></Field><Field label="Focus Keyword"><input value={newsForm.focusKeyword} onChange={(e) => updateNews("focusKeyword", e.target.value)} placeholder="ESP32 vs Arduino" /></Field></div>
              <Field label="Meta Description"><textarea rows="3" value={newsForm.metaDescription} onChange={(e) => updateNews("metaDescription", e.target.value)} placeholder="Concise search description..." /></Field>
              <Field label="URL Slug" hint="Example: projenius.in/insights/esp32-vs-arduino-iot"><input value={newsForm.slug} onChange={(e) => updateNews("slug", e.target.value)} placeholder="esp32-vs-arduino-iot" /></Field>
              <div className="form-grid"><Field label="Author Name"><input value={newsForm.authorName} onChange={(e) => updateNews("authorName", e.target.value)} /></Field><Field label="Author Role"><input value={newsForm.authorRole} onChange={(e) => updateNews("authorRole", e.target.value)} /></Field></div>
              <div className="form-actions"><button disabled={busy} type="submit">{busy ? "Saving..." : editingNewsId ? "Update Content" : newsForm.status === "published" ? "Publish Content" : newsForm.status === "scheduled" ? "Schedule Content" : "Save Draft"}</button>{message && <p>{message}</p>}</div>
            </form>

            <section className="manager"><div className="manager-header"><div><span>NEWS LIBRARY</span><h2>News & Insights</h2></div><button type="button" onClick={loadNews}>Refresh</button></div><div className="search-row"><input type="search" value={newsSearch} onChange={(e) => setNewsSearch(e.target.value)} placeholder="Search content..." />{newsSearch && <button type="button" onClick={() => setNewsSearch("")}>Clear</button>}</div>
              {loading ? <p className="empty">Loading content...</p> : filteredNews.length ? <div className="news-list">{filteredNews.map((item) => <article className="manager-card" key={item._id}><img src={item.thumbnailUrl} alt="" loading="lazy" /><div><div className="card-meta"><span>{item.contentType || "Article"}</span><span>{item.category}</span><span>{item.status}</span></div><h3>{item.title}</h3><p>{item.description}</p><small>{item.featured ? "Featured · " : ""}{item.publicVisibility === false ? "Hidden" : "Public"}</small></div><div className="manager-actions"><button type="button" onClick={() => editNews(item)}>Edit</button><button className="danger" type="button" onClick={() => removeNews(item)}>Delete</button></div></article>)}</div> : <p className="empty">No content found.</p>}
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
