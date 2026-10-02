const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
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

    excerpt: {
      type: String,
      default: ""
    },

    content: {
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

    author: {
      type: String,
      default: ""
    },

    publishedDate: {
      type: Date,
      default: Date.now
    },

    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("News", newsSchema);