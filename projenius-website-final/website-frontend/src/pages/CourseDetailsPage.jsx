import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  GraduationCap,
  Monitor,
  Users,
  Star,
  CheckCircle2,
  BookOpen,
  Sparkles,
  UserRound,
  Tag,
  Layers3,
  ShieldCheck,
  PlayCircle,
  CalendarDays,
} from "lucide-react";

import {
  getCourse,
  mediaUrl,
} from "../services/contentApi";

import {
  ErrorState,
  getSkills,
} from "../components/ContentUI";

import "./CourseDetails.css";

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(value) {
  return Number(
    value || 0
  ).toLocaleString("en-IN");
}

function getInstructor(course) {
  if (
    typeof course?.instructor ===
    "string"
  ) {
    return course.instructor;
  }

  return (
    course?.instructor?.name ||
    "ProJenius Team"
  );
}

function getList(value) {
  return Array.isArray(value)
    ? value.filter(Boolean)
    : [];
}

function getStatus(course) {
  return (
    course?.courseStatus ||
    course?.status ||
    "Enrollment Open"
  );
}

function getStatusClass(
  status
) {
  const value = String(
    status || ""
  ).toLowerCase();

  if (
    value.includes(
      "closed"
    ) ||
    value.includes(
      "completed"
    )
  ) {
    return "closed";
  }

  if (
    value.includes(
      "ongoing"
    )
  ) {
    return "ongoing";
  }

  return "open";
}

/* =========================================================
   PAGE
========================================================= */

export default function CourseDetailsPage() {
  const { slug } =
    useParams();

  const [course, setCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     FETCH
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadCourse() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getCourse(
            slug
          );

        if (!cancelled) {
          setCourse(data);

          if (data?.title) {
            document.title =
              `${data.title} | ProJenius`;
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load course."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCourse();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* =======================================================
     DATA
  ======================================================= */

  const originalPrice =
    Number(
      course?.originalPrice ??
        course?.original_price ??
        course?.price ??
        0
    );

  const offerPrice =
    Number(
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

  const instructor =
    getInstructor(course);

  const status =
    getStatus(course);

  const statusClass =
    getStatusClass(status);

  const skills = useMemo(
    () =>
      getSkills(
        course || {}
      ),
    [course]
  );

  const syllabus = useMemo(
    () =>
      getList(
        course?.syllabus
      ),
    [course]
  );

  const features = useMemo(
    () =>
      getList(
        course?.features
      ),
    [course]
  );

  const requirements =
    useMemo(
      () =>
        getList(
          course?.requirements
        ),
      [course]
    );

  const tags = useMemo(
    () => {
      if (
        Array.isArray(
          course?.tags
        )
      ) {
        return course.tags.filter(
          Boolean
        );
      }

      return [];
    },
    [course]
  );

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="course-details-page">
        <div className="course-details-container">
          <div className="course-details-loading">
            <div className="course-details-loading-sidebar">
              <div className="course-details-loading-image" />
              <div className="course-details-loading-block" />
              <div className="course-details-loading-block course-details-loading-block--small" />
            </div>

            <div className="course-details-loading-content">
              <div className="loading-line loading-small" />
              <div className="loading-line loading-title" />
              <div className="loading-line" />
              <div className="loading-line loading-medium" />
              <div className="loading-line loading-medium" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error ||
    !course
  ) {
    return (
      <main className="course-details-page">
        <div className="course-details-container">
          <div className="course-details-error">
            <ErrorState
              message={
                error ||
                "Course not found."
              }
            />

            <Link
              to="/courses"
              className="course-details-back"
            >
              <ArrowLeft
                size={18}
              />
              Back to Courses
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="course-details-page">
      <div className="course-details-container">
        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/courses"
          className="course-details-back"
        >
          <ArrowLeft
            size={18}
          />
          Back to Courses
        </Link>

        {/* =================================================
            LAYOUT
        ================================================= */}

        <div className="course-details-layout">
          {/* =================================================
              LEFT STICKY CARD
          ================================================= */}

          <aside className="course-details-sidebar">
            <div className="course-details-card">
              {/* TOP LINE */}

              <div className="course-details-card-topline">
                <span className="course-details-card-label">
                  <Sparkles
                    size={12}
                  />
                  ProJenius Learning
                </span>

                <span
                  className={`course-details-card-status course-details-card-status--${statusClass}`}
                >
                  <span />
                  {status}
                </span>
              </div>

              {/* IMAGE */}

              <div className="course-details-image">
                {course.image ? (
                  <img
                    src={mediaUrl(
                      course.image
                    )}
                    alt={
                      course.title
                    }
                  />
                ) : (
                  <div className="course-details-placeholder">
                    <BookOpen
                      size={42}
                    />
                    <span>
                      ProJenius
                    </span>
                  </div>
                )}

                <div className="course-details-image-overlay" />

                {course.badge && (
                  <span className="course-details-badge">
                    <Sparkles
                      size={12}
                    />
                    {course.badge}
                  </span>
                )}
              </div>

              {/* PRICE */}

              <div className="course-details-price">
                <span className="course-details-price-eyebrow">
                  Course investment
                </span>

                <div className="course-details-price-row">
                  <strong>
                    {offerPrice >
                    0
                      ? `₹${formatPrice(
                          offerPrice
                        )}`
                      : "Contact us"}
                  </strong>

                  {originalPrice >
                    offerPrice &&
                    offerPrice >
                      0 && (
                      <del>
                        ₹
                        {formatPrice(
                          originalPrice
                        )}
                      </del>
                    )}
                </div>

                {originalPrice >
                  offerPrice &&
                  offerPrice >
                    0 && (
                    <span className="course-details-price-offer">
                      Limited-time course offer
                    </span>
                  )}
              </div>

              {/* INFO */}

              <div className="course-details-info">
                <div className="course-info-item">
                  <span>
                    <Clock3
                      size={17}
                    />
                  </span>

                  <div>
                    <small>
                      Duration
                    </small>

                    <strong>
                      {course.duration ||
                        "Flexible"}
                    </strong>
                  </div>
                </div>

                <div className="course-info-item">
                  <span>
                    <GraduationCap
                      size={17}
                    />
                  </span>

                  <div>
                    <small>
                      Level
                    </small>

                    <strong>
                      {course.level ||
                        "All Levels"}
                    </strong>
                  </div>
                </div>

                <div className="course-info-item">
                  <span>
                    <Monitor
                      size={17}
                    />
                  </span>

                  <div>
                    <small>
                      Learning mode
                    </small>

                    <strong>
                      {course.mode ||
                        "Online Live"}
                    </strong>
                  </div>
                </div>

                <div className="course-info-item">
                  <span>
                    <Users
                      size={17}
                    />
                  </span>

                  <div>
                    <small>
                      Learners
                    </small>

                    <strong>
                      {enrolled >
                      0
                        ? enrolled.toLocaleString(
                            "en-IN"
                          )
                        : "Join now"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* RATING */}

              {rating > 0 && (
                <div className="course-details-rating">
                  <Star
                    size={17}
                    fill="currentColor"
                  />

                  <strong>
                    {rating.toFixed(
                      1
                    )}
                  </strong>

                  {reviews >
                    0 && (
                    <span>
                      {reviews.toLocaleString(
                        "en-IN"
                      )}{" "}
                      reviews
                    </span>
                  )}
                </div>
              )}

              {/* CTA */}

              <Link
                to="/contact"
                className="course-details-cta"
              >
                <span>
                  Get Started
                </span>

                <ArrowRight
                  size={18}
                />
              </Link>

              <p className="course-details-note">
                Talk to the ProJenius
                team and take the
                next step in your
                learning journey.
              </p>
            </div>
          </aside>

          {/* =================================================
              RIGHT MAIN
          ================================================= */}

          <section className="course-details-main">
            {/* HEADER */}

            <header className="course-details-header">
              <div className="course-details-header-top">
                <div className="course-details-pills">
                  {course.category && (
                    <span className="course-pill course-pill-blue">
                      <Tag
                        size={13}
                      />
                      {course.category}
                    </span>
                  )}

                  {course.courseStatus && (
                    <span className="course-pill course-pill-green">
                      <CheckCircle2
                        size={13}
                      />
                      {course.courseStatus}
                    </span>
                  )}
                </div>

                <span className="course-details-live-label">
                  <span />
                  Live course catalog
                </span>
              </div>

              <h1>
                {course.title}
              </h1>

              <p className="course-details-description">
                {course.description}
              </p>

              <div className="course-details-header-meta">
                <div className="course-instructor">
                  <span>
                    <UserRound
                      size={18}
                    />
                  </span>

                  <div>
                    <small>
                      Instructor
                    </small>

                    <strong>
                      {instructor}
                    </strong>
                  </div>
                </div>

                {course.category && (
                  <div className="course-header-meta-item">
                    <Layers3
                      size={15}
                    />
                    <span>
                      {course.category}
                    </span>
                  </div>
                )}

                {course.mode && (
                  <div className="course-header-meta-item">
                    <PlayCircle
                      size={15}
                    />
                    <span>
                      {course.mode}
                    </span>
                  </div>
                )}
              </div>
            </header>

            {/* =================================================
                QUICK OVERVIEW
            ================================================= */}

            <section className="course-details-overview">
              <div>
                <span>
                  <Clock3
                    size={17}
                  />
                </span>

                <small>
                  Duration
                </small>

                <strong>
                  {course.duration ||
                    "Flexible"}
                </strong>
              </div>

              <div>
                <span>
                  <GraduationCap
                    size={17}
                  />
                </span>

                <small>
                  Level
                </small>

                <strong>
                  {course.level ||
                    "All Levels"}
                </strong>
              </div>

              <div>
                <span>
                  <Monitor
                    size={17}
                  />
                </span>

                <small>
                  Mode
                </small>

                <strong>
                  {course.mode ||
                    "Online Live"}
                </strong>
              </div>

              <div>
                <span>
                  <Users
                    size={17}
                  />
                </span>

                <small>
                  Learners
                </small>

                <strong>
                  {enrolled >
                  0
                    ? enrolled.toLocaleString(
                        "en-IN"
                      )
                    : "Open"}
                </strong>
              </div>
            </section>

            {/* =================================================
                SKILLS
            ================================================= */}

            {skills.length > 0 && (
              <section className="course-details-section">
                <div className="course-section-heading">
                  <span>
                    Skills you'll build
                  </span>

                  <h2>
                    What you will learn
                  </h2>

                  <p>
                    Practical skills you
                    can use across
                    projects, internships
                    and real-world work.
                  </p>
                </div>

                <div className="course-skills">
                  {skills.map(
                    (
                      skill,
                      index
                    ) => (
                      <span
                        key={`${skill}-${index}`}
                      >
                        <CheckCircle2
                          size={15}
                        />
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                SYLLABUS
            ================================================= */}

            {syllabus.length >
              0 && (
              <section className="course-details-section">
                <div className="course-section-heading">
                  <span>
                    Learning path
                  </span>

                  <h2>
                    Course syllabus
                  </h2>

                  <p>
                    A structured path
                    designed to move
                    from fundamentals
                    to practical
                    application.
                  </p>
                </div>

                <div className="course-syllabus">
                  {syllabus.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        className="course-syllabus-item"
                        key={`${item}-${index}`}
                      >
                        <span className="syllabus-number">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <div className="course-syllabus-item-content">
                          <small>
                            Module{" "}
                            {index +
                              1}
                          </small>

                          <p>
                            {item}
                          </p>
                        </div>

                        <ArrowRight
                          size={16}
                        />
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                FEATURES
            ================================================= */}

            {features.length >
              0 && (
              <section className="course-details-section">
                <div className="course-section-heading">
                  <span>
                    Course experience
                  </span>

                  <h2>
                    Why this course
                  </h2>

                  <p>
                    Built to make
                    learning practical,
                    focused and
                    career-relevant.
                  </p>
                </div>

                <div className="course-feature-grid">
                  {features.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        className="course-feature-item"
                        key={`${item}-${index}`}
                      >
                        <span>
                          <CheckCircle2
                            size={17}
                          />
                        </span>

                        <p>
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                REQUIREMENTS
            ================================================= */}

            {requirements.length >
              0 && (
              <section className="course-details-section">
                <div className="course-section-heading">
                  <span>
                    Before you start
                  </span>

                  <h2>
                    Requirements
                  </h2>
                </div>

                <div className="course-requirements">
                  {requirements.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={`${item}-${index}`}
                      >
                        <CheckCircle2
                          size={17}
                        />
                        <p>
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                TAGS
            ================================================= */}

            {tags.length > 0 && (
              <section className="course-details-section course-tags-section">
                <div className="course-section-heading">
                  <span>
                    Topics
                  </span>

                  <h2>
                    Skills & topics
                  </h2>
                </div>

                <div className="course-detail-tags">
                  {tags.map(
                    (
                      tag,
                      index
                    ) => (
                      <span
                        key={`${tag}-${index}`}
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =================================================
                ABOUT
            ================================================= */}

            <section className="course-details-section course-about">
              <div className="course-section-heading">
                <span>
                  Overview
                </span>

                <h2>
                  About this course
                </h2>
              </div>

              <div className="course-about-box">
                <div className="course-about-icon">
                  <ShieldCheck
                    size={22}
                  />
                </div>

                <div>
                  <p>
                    {course.description}
                  </p>

                  <div className="course-about-trust">
                    <span>
                      <CheckCircle2
                        size={14}
                      />
                      Practical
                      learning
                    </span>

                    <span>
                      <CheckCircle2
                        size={14}
                      />
                      Career-focused
                    </span>

                    <span>
                      <CheckCircle2
                        size={14}
                      />
                      ProJenius
                      learning
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                FINAL CTA
            ================================================= */}

            <section className="course-details-final-cta">
              <div>
                <span>
                  Ready to start?
                </span>

                <h2>
                  Build your next
                  skill with
                  ProJenius.
                </h2>

                <p>
                  Connect with our
                  team and take the
                  next step.
                </p>
              </div>

              <Link
                to="/contact"
                className="course-final-cta-button"
              >
                Start Learning
                <ArrowRight
                  size={17}
                />
              </Link>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}