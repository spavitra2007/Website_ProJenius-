import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  name: { type: String, default: "ProJenius Team", trim: true },
  avatar: { type: String, default: "", trim: true },
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  category: { type: String, required: true, trim: true, index: true },
  level: { type: String, default: "Beginner", trim: true, index: true },
  duration: { type: String, default: "", trim: true },
  mode: { type: String, default: "Online Live", trim: true },
  originalPrice: { type: Number, default: 0, min: 0 },
  offerPrice: { type: Number, default: 0, min: 0 },
  // Kept for compatibility with the existing public website. It mirrors offerPrice.
  price: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0, min: 0 },
  enrolled: { type: Number, default: 0, min: 0 },
  instructor: { type: instructorSchema, default: () => ({}) },
  badge: { type: String, default: "", trim: true },
  skills: { type: [String], default: [] },
  // Old tags are retained so existing public data is not destroyed.
  tags: { type: [String], default: [] },
  courseStatus: {
    type: String,
    enum: ["Draft", "Enrollment Open", "Enrollment Closed", "Ongoing", "Completed"],
    default: "Draft",
    index: true,
  },
  publicVisibility: { type: Boolean, default: true, index: true },
  // Kept for compatibility with older clients.
  published: { type: Boolean, default: true, index: true },
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
