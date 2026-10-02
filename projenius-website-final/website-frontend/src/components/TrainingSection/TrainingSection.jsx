import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import "./TrainingSection.css";

import workshop1 from "../../assets/images/iot-workshop.png";
import gallery1 from "../../assets/images/gallery-1.webp";

const trainingTexts = [
  "Practical Learning",
  "Hands-On Training",
  "Industry Internships",
  "Technology Workshops",
  "Career Development",
];

/* shape: tall | wide | std  ->  controls the size/ratio of each box */
const cards = [
  {
    to: "/career-guidance",
    label: "Future Ready",
    title: "Career Guidance",
    shape: "tall",
    delay: 0,
    images: [workshop1, gallery1, "/images/gallery-2.webp"],
  },
  {
    to: "/services",
    label: "Skill Growth",
    title: "Mentoring Program",
    shape: "wide",
    delay: 1200,
    images: [
      "/images/software-developement-training.png",
      "/images/gallery-3.webp",
      "/images/gallery-4.webp",
    ],
  },
  {
    to: "/workshop",
    label: "Smart Innovation",
    title: "IoT Workshop",
    shape: "std",
    delay: 2400,
    images: [
      "/images/software-developement-training.png",
      "/images/iot-course.webp",
      "/images/gallery-5.webp",
    ],
  },
  {
    to: "/internships",
    label: "Real Experience",
    title: "Industry Internships",
    shape: "std",
    delay: 3600,
    images: ["/images/gallery-7.webp", "/images/gallery-8.webp", "/images/gallery-9.webp"],
  },
  {
    to: "/workshop",
    label: "Coding Skills",
    title: "Programming Workshop",
    shape: "wide",
    delay: 4800,
    images: [
      "/images/iot-workshop.png",
      "/images/project-image-1.webp",
      "/images/gallery-6.webp",
    ],
  },
  {
    to: "/placements",
    label: "Career Launch",
    title: "Placement Support",
    shape: "std",
    delay: 6000,
    images: ["/images/gallery-10.webp", "/images/gallery-11.webp", "/images/gallery-12.webp"],
  },
];

const ease = [0.22, 1, 0.36, 1];
/* once:false -> animation replays when scrolling down AND up */
const viewport = { once: false, amount: 0.2 };

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const cardVariants = {
  /* every card slides in from the same direction (left -> right) */
  hidden: { opacity: 0, x: -120, scale: 0.94, filter: "blur(8px)" },
  show: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 70, damping: 18, delay: (i % 3) * 0.12 },
  }),
};

const labelVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease } },
};

function CardSlides({ images, delay, alt, paused }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused) return undefined;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => setIndex((p) => (p + 1) % images.length), 6000);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [images.length, delay, paused]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={alt}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="training-dots" aria-hidden="true">
        {images.map((_, i) => (
          <span key={i} className={i === index ? "dot active" : "dot"} />
        ))}
      </div>
    </>
  );
}

export default function TrainingSection() {
  const [textIndex, setTextIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const t = setInterval(() => setTextIndex((p) => (p + 1) % trainingTexts.length), 4000);
    return () => clearInterval(t);
  }, [reduceMotion]);

  return (
    <section className="training-section" aria-labelledby="training-title">
      <div className="container">
        <motion.div
          className="training-heading"
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.span className="training-sub-heading" variants={itemVariants}>
            Our Training Program
          </motion.span>

          <motion.h2 id="training-title" className="train-section-title" variants={itemVariants}>
            <span className="training-title-static">Build Skills Through</span>

            <span className="training-animated-title-wrapper">
              {trainingTexts.map((t) => (
                <span key={t} className="training-title-ghost" aria-hidden="true">
                  {t}
                </span>
              ))}

              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  className="training-title-accent"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {trainingTexts[textIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p className="training-intro" variants={itemVariants}>
            Industry-focused programs that turn classroom knowledge into real,
            job-ready skills.
          </motion.p>
        </motion.div>

        <div className="training-grid">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`training-item item-${card.shape}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <Link to={card.to} className="training-link" aria-label={card.title}>
                <div className="training-card">
                  <CardSlides
                    images={card.images}
                    delay={card.delay}
                    alt={card.title}
                    paused={reduceMotion}
                  />

                  <div className="training-image-overlay" />

                  <span className="training-number">0{i + 1}</span>

                  <motion.div className="training-content" variants={labelVariants}>
                    <span>{card.label}</span>
                    <h4>{card.title}</h4>
                    <em className="training-cta">
                      Explore
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </em>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}