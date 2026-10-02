const News = require("../models/News");

// GET all news
const getNews = async (req, res) => {
  try {
    const news = await News.find({ status: true }).sort({
      publishedDate: -1
    });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.message
    });
  }
};

// GET single news
const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({
      slug: req.params.slug,
      status: true
    });

    if (!news) {
      return res.status(404).json({
        message: "News article not found"
      });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch news article",
      error: error.message
    });
  }
};

// CREATE news
const createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);

    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create news",
      error: error.message
    });
  }
};

// UPDATE news
const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!news) {
      return res.status(404).json({
        message: "News article not found"
      });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update news",
      error: error.message
    });
  }
};

// DELETE news
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News article not found"
      });
    }

    res.status(200).json({
      message: "News article deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete news",
      error: error.message
    });
  }
};

module.exports = {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews
};