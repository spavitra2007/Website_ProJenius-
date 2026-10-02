import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Achievements.css";

/* =========================================================
   ACHIEVEMENT IMAGES
   col = which side the card slides in from on desktop
   (l = left, c = center/vertical only, r = right)
========================================================= */

const achievementImages = [
  { id: 1, col: "l", src: "/images/gallery-1.webp", alt: "Achievement recognition event" },
  { id: 2, col: "l", src: "/images/gallery-2.webp", alt: "Achievement award presentation" },
  { id: 3, col: "l", src: "/images/gallery-3.webp", alt: "Achievement ceremony" },
  { id: 4, col: "c", src: "/images/gallery-4.webp", alt: "Team achievement event" },
  { id: 5, col: "c", src: "/images/gallery-5.webp", alt: "Team recognition event" },
  { id: 6, col: "r", src: "/images/gallery-6.webp", alt: "Award recognition event" },
  // NOTE: this reuses gallery-5. Swap in /images/gallery-7.webp when you have it.
  { id: 7, col: "r", src: "/images/gallery-5.webp", alt: "Team celebration" },
];

const VISIBLE_RATIO = 0.12;

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const Achievements = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  /* -------------------------------------------------------
     SCROLL REVEAL (direction aware) + IMAGE PARALLAX
     - scrolling down  -> cards rise up from below
     - scrolling up    -> cards drop in from above
     - leaving the viewport resets them, so the animation
       replays every time a card comes back into view
  ------------------------------------------------------- */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector(".achievements-header");
    const cards = cardRefs.current.filter(Boolean);
    const targets = [header, ...cards].filter(Boolean);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    let lastY = window.scrollY;
    let direction = "down";
    let ticking = false;

    const updateParallax = () => {
      const vh = window.innerHeight;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;

        // -1 (card near top of screen) ... +1 (near bottom)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const shift = Math.max(-1, Math.min(1, progress)) * -22;

        card.style.setProperty("--py", `${shift.toFixed(1)}px`);
      });

      ticking = false;
    };

    const onScroll = () => {
      const y = window.scrollY;

      if (Math.abs(y - lastY) > 2) {
        direction = y > lastY ? "down" : "up";
        lastY = y;
      }

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.intersectionRatio >= VISIBLE_RATIO) {
            if (el.classList.contains("is-in")) return;
            el.style.setProperty(
              "--fy",
              direction === "down" ? "70px" : "-70px"
            );
            el.classList.add("is-in");
          } else if (!entry.isIntersecting) {
            el.classList.remove("is-in");
          }
        });
      },
      { threshold: [0, VISIBLE_RATIO] }
    );

    targets.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateParallax);
    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  /* -------------------------------------------------------
     3D TILT + GLARE (mouse only, skipped on touch)
  ------------------------------------------------------- */

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
    card.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  /* -------------------------------------------------------
     LIGHTBOX
  ------------------------------------------------------- */

  const total = achievementImages.length;
  const closeViewer = useCallback(() => setActiveIndex(null), []);
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % total)),
    [total]
  );
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closeViewer, showNext, showPrev]);

  const touchStartX = useRef(null);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 50) (delta < 0 ? showNext : showPrev)();
  };

  const activeImage =
    activeIndex !== null ? achievementImages[activeIndex] : null;

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className="achievements-section"
      aria-labelledby="achievements-title"
    >
      <div className="achievements-container">
        {/* ================= HEADER ================= */}

        <header className="achievements-header">
          <span className="achievements-label">
            <span className="achievements-dot" aria-hidden="true" />
            ACHIEVEMENTS
          </span>

          <h2 id="achievements-title">
            Awards & <span>Recognition</span>
          </h2>

          <div className="achievements-heading-line" aria-hidden="true" />

          <p>
            Celebrating achievements, innovation, creativity, and milestones
            that showcase our passion for technology, design, and impactful
            digital solutions.
          </p>
        </header>

        {/* ================= GALLERY ================= */}

        <div className="achievements-grid">
          {achievementImages.map((image, index) => (
            <figure
              key={image.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`achievement-card achievement-card-${index + 1}`}
              data-col={image.col}
              style={{ "--achievement-delay": `${(index % 3) * 0.09}s` }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <button
                type="button"
                className="achievement-inner"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open image: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="achievement-image"
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  draggable="false"
                />
                <span className="achievement-caption">
                  <span className="achievement-caption-text">{image.alt}</span>
                  <span className="achievement-caption-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>
                </span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}

      {activeImage &&
        createPortal(
          <div
            className="achv-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={closeViewer}
          >
            <button
              type="button"
              className="achv-lightbox-btn achv-lightbox-close"
              onClick={closeViewer}
              aria-label="Close viewer"
              autoFocus
            >
              ✕
            </button>

            <button
              type="button"
              className="achv-lightbox-btn achv-lightbox-prev"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label="Previous image"
            >
              ‹
            </button>

            <div
              className="achv-lightbox-stage"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img
                key={activeImage.id + "-" + activeIndex}
                src={activeImage.src}
                alt={activeImage.alt}
                className="achv-lightbox-img"
                draggable="false"
              />
              <p className="achv-lightbox-caption">
                {activeImage.alt}
                <span>{activeIndex + 1} / {total}</span>
              </p>
            </div>

            <button
              type="button"
              className="achv-lightbox-btn achv-lightbox-next"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label="Next image"
            >
              ›
            </button>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Achievements;