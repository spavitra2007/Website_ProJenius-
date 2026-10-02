import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  UserRound,
  Tag,
  Sparkles,
  Play,
  Newspaper,
} from "lucide-react";

import {
  getNewsItem,
  mediaUrl,
} from "../services/contentApi";

import { ErrorState } from "../components/ContentUI";

import "./NewsDetails.css";

/* =========================================================
   HELPERS
========================================================= */

function formatDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getAuthor(item) {
  if (typeof item?.author === "string") {
    return item.author;
  }

  return (
    item?.author?.name ||
    item?.createdBy?.name ||
    "ProJenius Team"
  );
}

function getTags(item) {
  if (!Array.isArray(item?.tags)) {
    return [];
  }

  return item.tags.filter(Boolean);
}

function getContent(item) {
  return (
    item?.content ||
    item?.body ||
    item?.description ||
    item?.excerpt ||
    ""
  );
}

function getType(item) {
  return (
    item?.type ||
    item?.contentType ||
    "Article"
  );
}

function getCategory(item) {
  return (
    item?.category ||
    item?.categoryName ||
    "News & Insights"
  );
}

/* =========================================================
   YOUTUBE HELPER
========================================================= */

function getYouTubeEmbed(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtu.be")
    ) {
      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(
          1
        )}`;
      }

      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsed.pathname.includes("/embed/")) {
        return url;
      }
    }
  } catch {
    return "";
  }

  return "";
}

/* =========================================================
   PAGE
========================================================= */

export default function NewsDetailsPage() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error(
            "News article identifier is missing."
          );
        }

        const data = await getNewsItem(id);

        if (!cancelled) {
          setItem(data);

          if (data?.title) {
            document.title = `${data.title} | ProJenius`;
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load this article."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* =======================================================
     DATA
  ======================================================= */

  const tags = useMemo(
    () => getTags(item),
    [item]
  );

  const articleContent = getContent(item);

  const author = getAuthor(item);
  const type = getType(item);
  const category = getCategory(item);

  const videoUrl =
    item?.videoUrl ||
    item?.youtubeUrl ||
    item?.video ||
    "";

  const youtubeEmbed = getYouTubeEmbed(videoUrl);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="news-details-page">
        <div className="news-details-container">
          <div className="news-details-loading">

            <div className="news-loading-card">
              <div className="news-loading-image" />
              <div className="news-loading-line" />
              <div className="news-loading-line news-loading-short" />
              <div className="news-loading-line news-loading-small" />
            </div>

            <div className="news-loading-content">
              <div className="news-loading-line news-loading-category" />
              <div className="news-loading-line news-loading-title" />
              <div className="news-loading-line" />
              <div className="news-loading-line news-loading-medium" />
            </div>

          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !item) {
    return (
      <main className="news-details-page">
        <div className="news-details-container">

          <div className="news-details-error">
            <ErrorState
              message={
                error ||
                "News article not found."
              }
            />

            <Link
              to="/news-insights"
              className="news-details-back"
            >
              <ArrowLeft size={18} />
              Back to News & Insights
            </Link>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="news-details-page">
      <div className="news-details-container">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/news-insights"
          className="news-details-back"
        >
          <ArrowLeft size={18} />
          Back to News & Insights
        </Link>

        <div className="news-details-layout">

          {/* =================================================
              LEFT STICKY CARD
          ================================================= */}

          <aside className="news-details-sidebar">
            <div className="news-details-card">

              {/* IMAGE */}
              <div className="news-details-card-image">

                {item.image ? (
                  <img
                    src={mediaUrl(item.image)}
                    alt={item.title}
                  />
                ) : (
                  <div className="news-details-placeholder">
                    <Newspaper size={38} />
                    <span>ProJenius</span>
                  </div>
                )}

                <span className="news-details-card-badge">
                  <Sparkles size={12} />
                  {type}
                </span>

              </div>

              {/* INFORMATION */}
              <div className="news-details-card-body">

                <div className="news-details-card-category">
                  <Tag size={14} />
                  {category}
                </div>

                {/* DATE */}
                <div className="news-card-info">

                  <div className="news-card-info-item">
                    <span>
                      <CalendarDays size={16} />
                    </span>

                    <div>
                      <small>Published</small>
                      <strong>
                        {formatDate(
                          item.publishedAt ||
                            item.createdAt ||
                            item.date
                        )}
                      </strong>
                    </div>
                  </div>

                  {/* READ TIME */}
                  {(item.readTime ||
                    item.readingTime) && (
                    <div className="news-card-info-item">
                      <span>
                        <Clock3 size={16} />
                      </span>

                      <div>
                        <small>Read Time</small>
                        <strong>
                          {item.readTime ||
                            item.readingTime}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* AUTHOR */}
                  <div className="news-card-info-item">
                    <span>
                      <UserRound size={16} />
                    </span>

                    <div>
                      <small>Author</small>
                      <strong>{author}</strong>
                    </div>
                  </div>

                </div>

                {/* SHARE / ACTION */}
                <a
                  href="#news-content"
                  className="news-details-card-button"
                >
                  <span>
                    Read Article
                  </span>

                  <ArrowRight size={17} />
                </a>

              </div>

            </div>
          </aside>

          {/* =================================================
              RIGHT ARTICLE
          ================================================= */}

          <article
            className="news-details-main"
            id="news-content"
          >

            {/* HEADER */}
            <header className="news-details-header">

              <div className="news-details-pills">

                <span className="news-pill news-pill-blue">
                  <Tag size={13} />
                  {category}
                </span>

                <span className="news-pill news-pill-purple">
                  <Sparkles size={13} />
                  {type}
                </span>

              </div>

              <h1>{item.title}</h1>

              {(item.excerpt ||
                item.description) && (
                <p className="news-details-lead">
                  {item.excerpt ||
                    item.description}
                </p>
              )}

              <div className="news-details-meta">

                <div>
                  <CalendarDays size={16} />
                  {formatDate(
                    item.publishedAt ||
                      item.createdAt ||
                      item.date
                  )}
                </div>

                <div>
                  <UserRound size={16} />
                  {author}
                </div>

                {(item.readTime ||
                  item.readingTime) && (
                  <div>
                    <Clock3 size={16} />
                    {item.readTime ||
                      item.readingTime}
                  </div>
                )}

              </div>

            </header>

            {/* =================================================
                FEATURE IMAGE
            ================================================= */}

            {item.image && (
              <div className="news-details-main-image">
                <img
                  src={mediaUrl(item.image)}
                  alt={item.title}
                />
              </div>
            )}

            {/* =================================================
                VIDEO
            ================================================= */}

            {youtubeEmbed && (
              <section className="news-video-section">
                <div className="news-section-label">
                  <Play size={14} />
                  Watch
                </div>

                <div className="news-video-wrapper">
                  <iframe
                    src={youtubeEmbed}
                    title={item.title}
                    loading="lazy"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                      web-share
                    "
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="news-article-content">

              <div className="news-section-label">
                <Newspaper size={14} />
                News & Insights
              </div>

              <div
                className="news-rich-content"
                dangerouslySetInnerHTML={{
                  __html: articleContent,
                }}
              />

            </section>

            {/* =================================================
                TAGS
            ================================================= */}

            {tags.length > 0 && (
              <section className="news-tags-section">

                <span className="news-section-label">
                  <Tag size={14} />
                  Topics
                </span>

                <div className="news-tags">
                  {tags.map(
                    (tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

              </section>
            )}

            {/* =================================================
                BOTTOM CTA
            ================================================= */}

            <div className="news-details-bottom">

              <div>
                <span>
                  Keep exploring
                </span>

                <h2>
                  Discover more from ProJenius
                </h2>
              </div>

              <Link
                to="/news-insights"
                className="news-details-bottom-button"
              >
                More Insights
                <ArrowRight size={17} />
              </Link>

            </div>

          </article>

        </div>
      </div>
    </main>
  );
}