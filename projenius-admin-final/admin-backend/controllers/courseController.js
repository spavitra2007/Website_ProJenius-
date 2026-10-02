const Course = require("../models/Course");

// GET all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: true }).sort({
      createdAt: -1
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message
    });
  }
};

// GET single course
const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      status: true
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch course",
      error: error.message
    });
  }
};

// CREATE course
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create course",
      error: error.message
    });
  }
};

// UPDATE course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update course",
      error: error.message
    });
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json({
      message: "Course deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message
    });
  }
};

module.exports = {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
};