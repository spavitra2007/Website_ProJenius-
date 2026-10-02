import React from "react";
import "./Footer.css";

// =========================================================
// GOOGLE REVIEWS LINK
// =========================================================

const GOOGLE_REVIEWS_URL =
  "https://g.page/r/CZjzujTb9EXCEBM/review";


// =========================================================
// FOOTER
// =========================================================

const Footer = () => {

  // =======================================================
  // NEWSLETTER
  // =======================================================

  const handleNewsletter = (e) => {
    e.preventDefault();

    alert("Thank you for subscribing!");

    e.target.reset();
  };


  return (
    <footer className="pro-footer">

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="footer-top">

        <div className="footer-top-inner">

          {/* COMPANY */}

          <div className="footer-call-content">

            <div className="footer-logo">

              <img
                src="/images/pj-logo.jpeg"
                alt="ProJenius"
                className="footer-logo-image"
              />

              <div className="footer-logo-text">
                Pro<span>Jenius</span>
              </div>

            </div>

            <h3>
              Innovation Technology Private Limited
            </h3>

          </div>


          {/* NEWSLETTER */}

          <div className="footer-newsletter">

            <div className="newsletter-title">
              Join <strong>Newsletter</strong>
            </div>

            <form onSubmit={handleNewsletter}>

              <input
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
                autoComplete="email"
                required
              />

              <button type="submit">
                Subscribe
              </button>

            </form>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN FOOTER
      ================================================= */}

      <div className="footer-main">

        <div className="footer-grid">


          {/* =================================================
              COMPANY
          ================================================= */}

          <div className="footer-company">

            {/* GOOGLE REVIEWS */}

            <a
              href={GOOGLE_REVIEWS_URL}
              className="footer-google-review"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View ProJenius Google Reviews"
            >

              <span className="google-review-icon">
                G
              </span>


              <span className="google-review-content">

                <span className="google-review-title">
                  Google Reviews
                </span>


                <span className="google-review-meta">

                  <strong>
                    4.8
                  </strong>

                  <span className="google-stars">
                    ★★★★★
                  </span>

                  <span className="google-review-count">
                    100+ Reviews
                  </span>

                </span>

              </span>


              <span
                className="google-review-arrow"
                aria-hidden="true"
              >
                ↗
              </span>

            </a>


            {/* DESCRIPTION */}

            <p>
              Improve efficiency and provide a better
              customer experience with modern
              technology services tailored for your
              success.
            </p>


            {/* SOCIAL LINKS */}

            <div className="footer-socials">

              <a
                href="mailto:teamprojenius@gmail.com"
                aria-label="Email ProJenius"
              >
                <i className="bi bi-envelope-fill"></i>
              </a>


              <a
                href="https://wa.me/918925450473"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>


              <a
                href="https://www.instagram.com/projenius_?stkn=OXEwaXF4Z3g4d3Zw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>


              <a
                href="https://www.linkedin.com/company/projenius/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>


              <a
                href="https://www.facebook.com/share/1DMJDDqupb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Quick Links
            </h3>

            <div className="footer-heading-line"></div>


            <ul className="footer-links">

              <li>
                <a href="/">
                  <span>›</span>
                  Home
                </a>
              </li>

              <li>
                <a href="/about">
                  <span>›</span>
                  About
                </a>
              </li>

              <li>
                <a href="/courses">
                  <span>›</span>
                  Courses
                </a>
              </li>

              <li>
                <a href="/services/internship">
                  <span>›</span>
                  Internship
                </a>
              </li>

              <li>
                <a href="/workshop">
                  <span>›</span>
                  Workshop
                </a>
              </li>

              <li>
                <a href="/startup">
                  <span>›</span>
                  Startup Supporter
                </a>
              </li>

              <li>
                <a href="/contact">
                  <span>›</span>
                  Contact
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Contact
            </h3>

            <div className="footer-heading-line"></div>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>

              <p>
                Plot No 3, Erikarai Street,
                <br />
                Velmurugan Nagar,
                <br />
                Namachivaya Nagar,
                <br />
                Madurai - 16 ,
                <br />
                Tamil Nadu 625016.
              </p>

            </div>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>

              <a href="mailto:teamprojenius2025@gmail.com">
                teamprojenius@gmail.com
              </a>

            </div>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>

              <a href="tel:+918925450473">
                +91 89254 50473
              </a>

            </div>

          </div>


          {/* =================================================
              FIND US
          ================================================= */}

          <div className="footer-column footer-find">

            <h3 className="footer-heading">
              Find Us
            </h3>

            <div className="footer-heading-line"></div>


            <div className="footer-map">

              <iframe
                title="ProJenius Location"
                src="https://www.google.com/maps?q=Velmurugan+Nagar,+Madurai,+Tamil+Nadu+625003&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>


              <a
                className="map-label"
                href="https://www.google.com/maps/search/?api=1&query=Velmurugan+Nagar,+Madurai,+Tamil+Nadu+625003"
                target="_blank"
                rel="noopener noreferrer"
              >
                Maps ↗
              </a>

            </div>


            <p className="footer-location">
              Madurai, Tamilnadu , India.
            </p>


            <a
              className="direction-btn"
              href="https://www.google.com/maps/search/?api=1&query=Velmurugan+Nagar,+Madurai,+Tamil+Nadu+625003"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions

              <span>
                →
              </span>

            </a>

          </div>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="footer-bottom">

          <p>
            © Copyright 2026 ProJenius Innovation Technology
            Private Limited. All rights reserved.
          </p>


          <div className="footer-bottom-links">

            <a href="/privacy-policy">
              Privacy Policy
            </a>

            <a href="/terms">
              Terms &amp; Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};


export default Footer;