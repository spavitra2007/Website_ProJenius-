const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    shortDescription: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      required: true
    },

    badge: {
      type: String,
      enum: ["", "Popular", "Bestseller", "New"],
      default: ""
    },

    originalPrice: {
      type: Number,
      default: 0
    },

    offerPrice: {
      type: Number,
      default: 0
    },

    duration: {
      type: String,
      default: ""
    },

    level: {
      type: String,
      default: ""
    },

    mode: {
      type: String,
      default: ""
    },

    instructor: {
      type: String,
      default: ""
    },

    syllabus: [
      {
        type: String
      }
    ],

    features: [
      {
        type: String
      }
    ],

    requirements: [
      {
        type: String
      }
    ],

    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);