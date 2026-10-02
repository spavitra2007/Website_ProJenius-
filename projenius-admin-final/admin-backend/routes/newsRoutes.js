const express = require("express");

const {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews
} = require("../controllers/newsController");

const router = express.Router();

router.get("/", getNews);

router.get("/:slug", getNewsBySlug);

router.post("/", createNews);

router.put("/:id", updateNews);

router.delete("/:id", deleteNews);

module.exports = router;