import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  Clock3,
  GraduationCap,
  Monitor,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Layers3,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

import CommonHero from "../components/CommonHero/CommonHero";
import { getCourses, mediaUrl } from "../services/contentApi";

import "./Courses.css";

/* =========================================================
   HELPERS
========================================================= */

function getInstructorName(course) {
  if (typeof course?.instructor === "string") {
    return course.instructor;
  }

  return (
    course?.instructor?.name ||
    "ProJenius Team"
  );
}

function formatPrice(value) {
  const numericValue = Number(value || 0);

  return numericValue.toLocaleString("en-IN");
}

function getCourseId(course) {
  return course?.slug || course?._id;
}

function getStatus(course) {
  return (
    course?.courseStatus ||
    course?.status ||
    "Enrollment Open"
  );
}

function getStatusType(status) {
  const value = String(status || "").toLowerCase();

  if (
    value.includes("closed") ||
    value.includes("completed")
  ) {
    return "closed";
  }

  if (
    value.includes("ongoing")
  ) {
    return "ongoing";
  }

  if (
    value.includes("draft")
  ) {
    return "draft";
  }

  return "open";
}

/* =========================================================
   COURSE CARD
========================================================= */

function CourseCard({
  course,
  index,
}) {
  const originalPrice = Number(
    course?.originalPrice ??
      course?.original_price ??
      course?.price ??
      0
  );

  const offerPrice = Number(
    course?.offerPrice ??
      course?.offer_price ??
      course?.price ??
      0
  );

  const rating = Number(
    course?.rating || 0
  );

  const reviews = Number(
    course?.reviews || 0
  );

  const enrolled = Number(
    course?.enrolled || 0
  );

  const courseId =
    getCourseId(course);

  const instructor =
    getInstructorName(course);

  const skills = Array.isArray(
    course?.skills
  )
    ? course.skills.filter(Boolean)
    : [];

  const status =
    getStatus(course);

  const statusType =
    getStatusType(status);

  const hasOffer =
    originalPrice > offerPrice &&
    offerPrice > 0;

  return (
    <article
      className={`courses-card courses-card--${
        (index % 4) + 1
      }`}
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <Link
        to={`/courses/${courseId}`}
        className="courses-card__image"
        aria-label={`View ${
          course?.title || "course"
        }`}
      >
        {course?.image ? (
          <img
            src={mediaUrl(
              course.image
            )}
            alt={
              course?.title ||
              "Course"
            }
            loading={
              index < 3
                ? "eager"
                : "lazy"
            }
          />
        ) : (
          <div className="courses-card__image-placeholder">
            <BookOpen size={42} />
            <span>ProJenius</span>
          </div>
        )}

        <div className="courses-card__image-gradient" />

        {course?.badge && (
          <span className="courses-card__badge">
            <Sparkles size={12} />
            {course.badge}
          </span>
        )}

        <span
          className={`courses-card__live ${
            statusType
              ? `courses-card__live--${statusType}`
              : ""
          }`}
        >
          <span className="courses-card__live-dot" />
          {status}
        </span>

        <div className="courses-card__image-action">
          <span>Explore course</span>
          <ArrowRight size={16} />
        </div>

        <div className="courses-card__image-shine" />
      </Link>

      {/* =================================================
          BODY
      ================================================= */}

      <div className="courses-card__body">
        <div className="courses-card__topline">
          <div className="courses-card__meta">
            {course?.category && (
              <span className="courses-card__category">
                {course.category}
              </span>
            )}

            {course?.level && (
              <span className="courses-card__level">
                {course.level}
              </span>
            )}
          </div>

          {rating > 0 && (
            <span className="courses-card__rating">
              <Star
                size={14}
                fill="currentColor"
              />
              <strong>
                {rating.toFixed(1)}
              </strong>

              {reviews > 0 && (
                <small>
                  ({reviews})
                </small>
              )}
            </span>
          )}
        </div>

        <h2 className="courses-card__title">
          <Link
            to={`/courses/${courseId}`}
          >
            {course?.title ||
              "Untitled Course"}
          </Link>
        </h2>

        <p className="courses-card__description">
          {course?.description ||
            "Practical learning with ProJenius."}
        </p>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="courses-card__stats">
          {course?.duration && (
            <span>
              <Clock3 size={14} />
              {course.duration}
            </span>
          )}

          {course?.mode && (
            <span>
              <Monitor size={14} />
              {course.mode}
            </span>
          )}

          <span>
            <GraduationCap size={14} />
            {instructor}
          </span>

          {enrolled > 0 && (
            <span>
              <Users size={14} />
              {enrolled.toLocaleString(
                "en-IN"
              )}{" "}
              enrolled
            </span>
          )}
        </div>

        {/* =================================================
            SKILLS
        ================================================= */}

        {skills.length > 0 && (
          <div className="courses-card__skills">
            {skills
              .slice(0, 4)
              .map(
                (
                  skill,
                  skillIndex
                ) => (
                  <span
                    key={`${skill}-${skillIndex}`}
                  >
                    {skill}
                  </span>
                )
              )}

            {skills.length > 4 && (
              <span className="courses-card__skills-more">
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="courses-card__bottom">
          <div className="courses-card__price">
            <div className="courses-card__price-label">
              Course fee
            </div>

            <div className="courses-card__price-row">
              {offerPrice > 0 ? (
                <strong className="courses-card__offer-price">
                  ₹{formatPrice(
                    offerPrice
                  )}
                </strong>
              ) : (
                <strong className="courses-card__offer-price courses-card__offer-price--free">
                  Contact us
                </strong>
              )}

              {hasOffer && (
                <del className="courses-card__original-price">
                  ₹{formatPrice(
                    originalPrice
                  )}
                </del>
              )}
            </div>
          </div>

          <Link
            to={`/courses/${courseId}`}
            className="courses-card__view"
          >
            <span>View Course</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function CourseSkeleton({
  index,
}) {
  return (
    <div
      className="courses-skeleton"
      style={{
        "--skeleton-index": index,
      }}
    >
      <div className="courses-skeleton__image" />

      <div className="courses-skeleton__body">
        <div className="courses-skeleton__meta" />

        <div className="courses-skeleton__title" />

        <div className="courses-skeleton__line" />

        <div className="courses-skeleton__line courses-skeleton__line--short" />

        <div className="courses-skeleton__stats" />

        <div className="courses-skeleton__footer">
          <div className="courses-skeleton__price" />
          <div className="courses-skeleton__button" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Courses() {
  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [level, setLevel] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("featured");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     FETCH
  ======================================================= */

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getCourses(
          "?limit=100"
        );

      let courseList = [];

      if (Array.isArray(response)) {
        courseList = response;
      } else if (
        Array.isArray(
          response?.courses
        )
      ) {
        courseList =
          response.courses;
      } else if (
        Array.isArray(
          response?.data
        )
      ) {
        courseList =
          response.data;
      } else if (
        Array.isArray(
          response?.items
        )
      ) {
        courseList =
          response.items;
      }

      setCourses(courseList);
    } catch (err) {
      console.error(
        "Course fetch error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load courses."
      );

      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const categories = useMemo(() => {
    const values = courses
      .map(
        (course) =>
          course?.category
      )
      .filter(Boolean);

    return [
      "All",
      ...new Set(values),
    ];
  }, [courses]);

  const levels = useMemo(() => {
    const values = courses
      .map(
        (course) =>
          course?.level
      )
      .filter(Boolean);

    return [
      "All",
      ...new Set(values),
    ];
  }, [courses]);

  /* =======================================================
     FILTER + SEARCH
  ======================================================= */

  const filteredCourses =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        courses.filter(
          (course) => {
            const skills =
              Array.isArray(
                course?.skills
              )
                ? course.skills
                : [];

            const searchableText = [
              course?.title,
              course?.description,
              course?.category,
              course?.level,
              course?.mode,
              course?.duration,
              course?.badge,
              course?.courseStatus,
              course?.instructor?.name,
              course?.instructor,
              ...skills,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return (
              (!query ||
                searchableText.includes(
                  query
                )) &&
              (category ===
                "All" ||
                course?.category ===
                  category) &&
              (level ===
                "All" ||
                course?.level ===
                  level)
            );
          }
        );

      /* =================================================
         SORT
      ================================================= */

      return [...filtered].sort(
        (a, b) => {
          if (
            sortBy ===
            "rating"
          ) {
            return (
              Number(
                b?.rating || 0
              ) -
              Number(
                a?.rating || 0
              )
            );
          }

          if (
            sortBy ===
            "price-low"
          ) {
            return (
              Number(
                a?.offerPrice ??
                  a?.price ??
                  0
              ) -
              Number(
                b?.offerPrice ??
                  b?.price ??
                  0
              )
            );
          }

          if (
            sortBy ===
            "price-high"
          ) {
            return (
              Number(
                b?.offerPrice ??
                  b?.price ??
                  0
              ) -
              Number(
                a?.offerPrice ??
                  a?.price ??
                  0
              )
            );
          }

          if (
            sortBy ===
            "newest"
          ) {
            return (
              new Date(
                b?.createdAt ||
                  0
              ).getTime() -
              new Date(
                a?.createdAt ||
                  0
              ).getTime()
            );
          }

          /* Featured */
          return (
            Number(
              Boolean(
                b?.featured
              )
            ) -
              Number(
                Boolean(
                  a?.featured
                )
              ) ||
            Number(
              b?.rating || 0
            ) -
              Number(
                a?.rating || 0
              )
          );
        }
      );
    }, [
      courses,
      search,
      category,
      level,
      sortBy,
    ]);

  /* =======================================================
     LIVE SUMMARY
  ======================================================= */

  const liveStats = useMemo(
    () => ({
      total:
        courses.length,

      categories:
        Math.max(
          categories.length - 1,
          0
        ),

      levels:
        Math.max(
          levels.length - 1,
          0
        ),

      open:
        courses.filter(
          (course) =>
            getStatusType(
              getStatus(course)
            ) === "open"
        ).length,
    }),
    [
      courses,
      categories,
      levels,
    ]
  );

  /* =======================================================
     RESET
  ======================================================= */

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All");
    setSortBy("featured");
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="courses-page">
      {/* =================================================
          HERO
      ================================================= */}

      <CommonHero
        subheading="Courses & Learning"
        firstLine="Learn"
        highlight="Build"
        secondLine="with Real-World Skills"
        description="Practical courses designed by ProJenius to help students and professionals learn modern technologies, build real projects and become career ready."
      />

      {/* =================================================
          LIVE CATALOG STRIP
      ================================================= */}

      <section className="courses-live-strip">
        <div className="courses-container">
          <div className="courses-live-strip__inner">
            <div className="courses-live-strip__status">
              <span className="courses-live-dot" />

              <div>
                <strong>
                  ProJenius Learning
                  Hub
                </strong>
                <small>
                  Live course catalog
                </small>
              </div>
            </div>

            <div className="courses-live-stat">
              <BookOpen size={17} />
              <div>
                <strong>
                  {liveStats.total}
                </strong>
                <span>
                  Courses
                </span>
              </div>
            </div>

            <div className="courses-live-stat">
              <Layers3 size={17} />
              <div>
                <strong>
                  {liveStats.categories}
                </strong>
                <span>
                  Categories
                </span>
              </div>
            </div>

            <div className="courses-live-stat">
              <GraduationCap
                size={17}
              />
              <div>
                <strong>
                  {liveStats.levels}
                </strong>
                <span>
                  Learning levels
                </span>
              </div>
            </div>

            <div className="courses-live-stat courses-live-stat--accent">
              <TrendingUp
                size={17}
              />
              <div>
                <strong>
                  {liveStats.open}
                </strong>
                <span>
                  Enrollment open
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="courses-content">
        <div className="courses-container">
          {/* =================================================
              SECTION INTRO
          ================================================= */}

          <div className="courses-section-intro">
            <div>
              <span className="courses-section-eyebrow">
                Explore the catalog
              </span>

              <h2>
                Find your next
                <span> skill to build.</span>
              </h2>

              <p>
                Search, filter and compare
                practical learning paths
                designed around real-world
                technology skills.
              </p>
            </div>

            <div className="courses-section-intro__side">
              <span className="courses-section-intro__live">
                <span />
                Updated from
                ProJenius catalog
              </span>
            </div>
          </div>

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div className="courses-toolbar">
            <div className="courses-search">
              <Search size={20} />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search courses, skills, technologies..."
                aria-label="Search courses"
              />

              {search && (
                <button
                  type="button"
                  className="courses-search__clear"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="courses-filter-group">
              <div className="courses-filter-heading">
                <SlidersHorizontal
                  size={17}
                />
                <span>
                  Filters
                </span>
              </div>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                aria-label="Filter by category"
              >
                {categories.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <select
                value={level}
                onChange={(event) =>
                  setLevel(
                    event.target.value
                  )
                }
                aria-label="Filter by level"
              >
                {levels.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
                aria-label="Sort courses"
              >
                <option value="featured">
                  Featured
                </option>
                <option value="newest">
                  Newest
                </option>
                <option value="rating">
                  Top rated
                </option>
                <option value="price-low">
                  Price: low to high
                </option>
                <option value="price-high">
                  Price: high to low
                </option>
              </select>
            </div>

            <div className="courses-result-count">
              <strong>
                {
                  filteredCourses.length
                }
              </strong>
              <span>
                {filteredCourses.length ===
                1
                  ? "course"
                  : "courses"}
              </span>
            </div>
          </div>

          {/* =================================================
              ACTIVE FILTERS
          ================================================= */}

          {(search ||
            category !==
              "All" ||
            level !== "All" ||
            sortBy !==
              "featured") && (
            <div className="courses-active-filters">
              <span>
                Showing results for:
              </span>

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  “{search}” ×
                </button>
              )}

              {category !==
                "All" && (
                <button
                  type="button"
                  onClick={() =>
                    setCategory(
                      "All"
                    )
                  }
                >
                  {category} ×
                </button>
              )}

              {level !==
                "All" && (
                <button
                  type="button"
                  onClick={() =>
                    setLevel(
                      "All"
                    )
                  }
                >
                  {level} ×
                </button>
              )}

              <button
                type="button"
                className="courses-active-filters__reset"
                onClick={
                  resetFilters
                }
              >
                <RotateCcw
                  size={13}
                />
                Reset
              </button>
            </div>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="courses-grid">
              {Array.from({
                length: 6,
              }).map(
                (_, index) => (
                  <CourseSkeleton
                    key={index}
                    index={index}
                  />
                )
              )}
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading &&
            error && (
              <div className="courses-state courses-state--error">
                <div className="courses-state__icon">
                  !
                </div>

                <span className="courses-state__eyebrow">
                  Connection issue
                </span>

                <h2>
                  Unable to load courses
                </h2>

                <p>
                  {error}
                </p>

                <button
                  type="button"
                  onClick={
                    loadCourses
                  }
                >
                  Try Again
                  <ArrowRight
                    size={16}
                  />
                </button>
              </div>
            )}

          {/* =================================================
              COURSE GRID
          ================================================= */}

          {!loading &&
            !error &&
            filteredCourses.length >
              0 && (
              <div className="courses-grid">
                {filteredCourses.map(
                  (
                    course,
                    index
                  ) => (
                    <CourseCard
                      key={
                        course?._id ||
                        course?.slug ||
                        course?.title ||
                        index
                      }
                      course={
                        course
                      }
                      index={
                        index
                      }
                    />
                  )
                )}
              </div>
            )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            filteredCourses.length ===
              0 && (
              <div className="courses-empty">
                <div className="courses-empty__icon">
                  <Search
                    size={28}
                  />
                </div>

                <span className="courses-state__eyebrow">
                  No matches
                </span>

                <h2>
                  No courses found
                </h2>

                <p>
                  Try another keyword,
                  category or learning
                  level.
                </p>

                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                >
                  <RotateCcw
                    size={16}
                  />
                  Reset Filters
                </button>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}