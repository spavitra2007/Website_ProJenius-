import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  ArrowRight,
  CalendarDays,
  UserRound,
  Sparkles,
  Play,
  Newspaper,
  Clock3,
  Tag,
  RefreshCw,
} from "lucide-react";

import CommonHero from "../components/CommonHero/CommonHero";

import {
  getNews,
  mediaUrl,
} from "../services/contentApi";

import "./NewsInsights.css";

/* =========================================================
   HELPERS
========================================================= */

function getImage(item) {
  return (
    item?.thumbnailUrl ||
    item?.image ||
    item?.thumbnail ||
    item?.galleryImages?.[0] ||
    ""
  );
}

function getAuthor(item) {
  if (typeof item?.author === "string") {
    return item.author;
  }

  return (
    item?.author?.name ||
    "ProJenius Team"
  );
}

function getAuthorRole(item) {
  if (typeof item?.author === "object") {
    return (
      item?.author?.role ||
      "Technology Insights"
    );
  }

  return "Technology Insights";
}

function getCategory(item) {
  return (
    item?.category ||
    item?.customCategory ||
    "News & Insights"
  );
}

function getType(item) {
  return (
    item?.contentType ||
    "Article"
  );
}

function getDate(item) {
  return (
    item?.publishedAt ||
    item?.createdAt ||
    item?.date ||
    ""
  );
}

function formatDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function getReadTime(item) {
  return (
    item?.readTime ||
    item?.readingTime ||
    ""
  );
}

/* =========================================================
   CARD
========================================================= */

function NewsCard({ item, index }) {
  const image = getImage(item);

  const identifier =
    item?.slug ||
    item?._id;

  const category = getCategory(item);
  const type = getType(item);

  return (
    <article
      className={`newsinsights-card newsinsights-card--${
        (index % 4) + 1
      }`}
    >
      {/* IMAGE */}
      <Link
        to={`/insights/${identifier}`}
        className="newsinsights-card-image"
      >
        {image ? (
          <img
            src={mediaUrl(image)}
            alt={item?.title || "News"}
            loading="lazy"
          />
        ) : (
          <div className="newsinsights-card-placeholder">
            <Newspaper size={40} />
            <span>ProJenius</span>
          </div>
        )}

        <div className="newsinsights-card-image-overlay">
          <span>Read More</span>
          <ArrowRight size={16} />
        </div>

        <div className="newsinsights-card-shine" />

        {item?.featured && (
          <span className="newsinsights-featured">
            <Sparkles size={12} />
            Featured
          </span>
        )}
      </Link>

      {/* BODY */}
      <div className="newsinsights-card-body">

        <div className="newsinsights-card-meta">

          <span className="newsinsights-category">
            <Tag size={12} />
            {category}
          </span>

          <span className="newsinsights-type">
            {type}
          </span>

        </div>

        <h2 className="newsinsights-card-title">
          <Link
            to={`/insights/${identifier}`}
          >
            {item?.title ||
              "Untitled Insight"}
          </Link>
        </h2>

        <p className="newsinsights-card-description">
          {item?.description ||
            "Explore the latest insights, technology updates and stories from ProJenius."}
        </p>

        <div className="newsinsights-card-info">

          <span>
            <CalendarDays size={14} />
            {formatDate(getDate(item))}
          </span>

          <span>
            <UserRound size={14} />
            {getAuthor(item)}
          </span>

          {getReadTime(item) && (
            <span>
              <Clock3 size={14} />
              {getReadTime(item)}
            </span>
          )}

        </div>

        <div className="newsinsights-card-footer">

          <div className="newsinsights-author">
            <strong>
              {getAuthor(item)}
            </strong>

            <small>
              {getAuthorRole(item)}
            </small>
          </div>

          <Link
            to={`/insights/${identifier}`}
            className="newsinsights-read"
          >
            Read More
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>
    </article>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function NewsSkeleton() {
  return (
    <div className="newsinsights-skeleton">

      <div className="newsinsights-skeleton-image" />

      <div className="newsinsights-skeleton-body">

        <div className="skeleton-line skeleton-category" />

        <div className="skeleton-line skeleton-title" />

        <div className="skeleton-line" />

        <div className="skeleton-line skeleton-short" />

        <div className="skeleton-footer">
          <div />
          <div />
        </div>

      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function NewsInsights() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     FETCH
  ======================================================= */

  const loadNews = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNews(
        "?limit=50"
      );

      setItems(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        "News & Insights fetch error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load News & Insights."
      );

      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const values = items
      .map((item) =>
        getCategory(item)
      )
      .filter(Boolean);

    return [
      "All",
      ...new Set(values),
    ];
  }, [items]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredItems = useMemo(() => {
    const query =
      search
        .trim()
        .toLowerCase();

    return items.filter((item) => {
      const searchableText = [
        item?.title,
        item?.description,
        item?.contentType,
        item?.category,
        item?.customCategory,
        item?.author?.name,
        item?.author?.role,
        item?.author,
        ...(Array.isArray(item?.tags)
          ? item.tags
          : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch =
        !query ||
        searchableText.includes(
          query
        );

      const categoryMatch =
        category === "All" ||
        getCategory(item) ===
          category;

      return (
        searchMatch &&
        categoryMatch
      );
    });
  }, [
    items,
    search,
    category,
  ]);

  /* =======================================================
     FEATURED
  ======================================================= */

  const featuredItem =
    useMemo(() => {
      return (
        filteredItems.find(
          (item) =>
            item?.featured === true ||
            item?.featuredContent === true
        ) ||
        filteredItems[0] ||
        null
      );
    }, [filteredItems]);

  const regularItems =
    useMemo(() => {
      if (!featuredItem) {
        return [];
      }

      return filteredItems.filter(
        (item) =>
          item?._id !==
            featuredItem?._id
      );
    }, [
      filteredItems,
      featuredItem,
    ]);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="newsinsights-page">

      {/* =================================================
          COMMON HERO
      ================================================= */}

      <CommonHero
        subheading="News & Insights"
        firstLine="Ideas"
        highlight="Technology"
        secondLine="that move forward"
        description="Explore ProJenius articles, technology insights, events, company updates and announcements."
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="newsinsights-content">

        <div className="newsinsights-container">

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div className="newsinsights-toolbar">

            <div className="newsinsights-search">
              <Search size={19} />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search insights..."
                aria-label="Search insights"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="newsinsights-category-list">

              {categories.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      category === item
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCategory(item)
                    }
                  >
                    {item}
                  </button>
                )
              )}

            </div>

            <div className="newsinsights-count">
              <strong>
                {filteredItems.length}
              </strong>

              <span>
                {filteredItems.length === 1
                  ? "Insight"
                  : "Insights"}
              </span>
            </div>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="newsinsights-grid">
              {[
                1, 2, 3, 4, 5, 6,
              ].map((item) => (
                <NewsSkeleton
                  key={item}
                />
              ))}
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="newsinsights-state newsinsights-state-error">

              <div className="newsinsights-state-icon">
                !
              </div>

              <h2>
                Unable to load News & Insights
              </h2>

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={loadNews}
              >
                <RefreshCw size={16} />
                Try Again
              </button>

            </div>
          )}

          {/* =================================================
              FEATURED
          ================================================= */}

          {!loading &&
            !error &&
            featuredItem && (
              <Link
                to={`/insights/${
                  featuredItem.slug ||
                  featuredItem._id
                }`}
                className="newsinsights-featured-card"
              >

                <div className="newsinsights-featured-image">

                  {getImage(
                    featuredItem
                  ) ? (
                    <img
                      src={mediaUrl(
                        getImage(
                          featuredItem
                        )
                      )}
                      alt={
                        featuredItem.title
                      }
                      loading="eager"
                    />
                  ) : (
                    <div className="newsinsights-card-placeholder">
                      <Newspaper
                        size={48}
                      />
                    </div>
                  )}

                  <div className="newsinsights-featured-overlay" />

                  <span className="newsinsights-featured-label">
                    <Sparkles size={13} />
                    Featured Insight
                  </span>

                </div>

                <div className="newsinsights-featured-body">

                  <div className="newsinsights-card-meta">

                    <span className="newsinsights-category">
                      <Tag size={12} />
                      {getCategory(
                        featuredItem
                      )}
                    </span>

                    <span className="newsinsights-type">
                      {getType(
                        featuredItem
                      )}
                    </span>

                  </div>

                  <h2>
                    {featuredItem.title}
                  </h2>

                  <p>
                    {featuredItem.description}
                  </p>

                  <div className="newsinsights-featured-meta">

                    <span>
                      <CalendarDays
                        size={14}
                      />
                      {formatDate(
                        getDate(
                          featuredItem
                        )
                      )}
                    </span>

                    <span>
                      <UserRound
                        size={14}
                      />
                      {getAuthor(
                        featuredItem
                      )}
                    </span>

                  </div>

                  <span className="newsinsights-featured-button">
                    Read Insight
                    <ArrowRight
                      size={17}
                    />
                  </span>

                </div>

              </Link>
            )}

          {/* =================================================
              GRID
          ================================================= */}

          {!loading &&
            !error &&
            regularItems.length > 0 && (
              <div className="newsinsights-grid">

                {regularItems.map(
                  (item, index) => (
                    <NewsCard
                      key={
                        item?._id ||
                        item?.slug ||
                        item?.title ||
                        index
                      }
                      item={item}
                      index={index}
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
            filteredItems.length === 0 && (
              <div className="newsinsights-state">

                <div className="newsinsights-state-icon">
                  <Newspaper
                    size={28}
                  />
                </div>

                <h2>
                  No published News & Insights yet
                </h2>

                <p>
                  Published content created
                  from the Admin Panel will
                  appear here automatically.
                </p>

              </div>
            )}

        </div>
      </section>

    </main>
  );
}