import React, { useEffect, useRef, useState } from "react";
import "./PriceTableSection.css";

const packages = [
  {
    title: "Monthly Package",
    price: "₹2500",
    save: "save 15%",
  },
  {
    title: "Yearly Package",
    price: "₹30000",
    save: "save 15%",
  },
];

const features = [
  "Landing Page Design",
  "Web Development",
  "SEO Optimizations",
  "Mobile Applications Design",
  "Quality Assurance",
  "Customs Services",
];

export default function PriceTableSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`pricing-section ${
        visible ? "pricing-visible" : ""
      }`}
    >
      <div className="pricing-container">

        {/* =========================
            LEFT IMAGE CARD
        ========================== */}
        <div className="pricing-image-card">

          <img
            src="/images/pricing-image.webp"
            alt="Team collaboration"
            className="pricing-main-image"
          />

          <div className="pricing-image-overlay"></div>

          <div className="pricing-image-content">
            <span className="pricing-image-small">
              JOIN WITH US
            </span>

            <h2>
              Amazing
              <br />
              Pricing For
              <br />
              Growth
              <br />
              Business
            </h2>
          </div>

          {/* ROUND ARROW */}
          <button
            className="pricing-image-arrow"
            type="button"
            aria-label="Explore pricing"
          >
            ↗
          </button>

          {/* IMAGE DOTS */}
          <div className="pricing-image-dots">
            <span></span>
            <span className="active"></span>
            <span></span>
          </div>
        </div>

        {/* =========================
            PRICING CARDS
        ========================== */}
        <div className="pricing-cards">

          {packages.map((item, index) => (
            <article
              className={`pricing-card pricing-card-${index + 1}`}
              key={item.title}
            >

              {/* CARD HEADER */}
              <div className="pricing-card-header">

                <div className="pricing-icon">
                  <span>ϟ</span>
                </div>

                <h3>{item.title}</h3>

              </div>

              {/* DESCRIPTION */}
              <p className="pricing-description">
                We denounce with righteous indignation dislike
                <br />
                beguiled and demoralize
              </p>

              {/* FEATURES */}
              <div className="pricing-features">

                {features.map((feature) => (
                  <div
                    className="pricing-feature"
                    key={feature}
                  >
                    <span className="pricing-check">
                      ✓
                    </span>

                    <span>{feature}</span>
                  </div>
                ))}

              </div>

              {/* PRICE */}
              <div className="pricing-price-row">

                <strong className="pricing-price">
                  {item.price}
                </strong>

                <span className="pricing-save">
                  {item.save}
                </span>

              </div>

              {/* BUTTON */}
              <button
                type="button"
                className="pricing-button"
              >
                <span>Choose Package</span>
                <span className="pricing-button-arrow">
                  →
                </span>
              </button>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
}