import React, { useEffect } from "react";
import "./Workshop.css";

/* =========================================================
   COMMON HERO
========================================================= */

import CommonHero from "../components/CommonHero/CommonHero";

/* =========================================================
   WORKSHOP COMPONENTS
========================================================= */

import WorkshopHero from "../components/Workshop/WorkshopHero";
import WorkshopJourney from "../components/Workshop/WorkshopJourney";
import WorkshopCategoryGrid from "../components/Workshop/WorkshopCategoryGrid";
import WorkshopFormat from "../components/Workshop/WorkshopFormat";
import WorkshopProcess from "../components/Workshop/WorkshopProcess";
import WorkshopInstitutionShowcase from "../components/Workshop/WorkshopInstitutionShowcase";
import WorkshopGallery from "../components/Workshop/WorkshopGallery";
import WorkshopTestimonial from "../components/Workshop/WorkshopTestimonial";
import WorkshopOutcomes from "../components/Workshop/WorkshopOutcomes";
import WorkshopNextStep from "../components/Workshop/WorkshopNextStep";
import InstitutionCTA from "../components/Workshop/InstitutionCTA";
import WorkshopFAQ from "../components/Workshop/WorkshopFAQ";
import WorkshopCTA from "../components/Workshop/WorkshopCTA";

/* =========================================================
   PAGE META
========================================================= */

const PAGE_TITLE =
  "Technology Workshops | ProJenius";

const PAGE_DESCRIPTION =
  "Explore hands-on technology and innovation workshops by ProJenius for students, departments, and institutions.";

/* =========================================================
   WORKSHOP PAGE
========================================================= */

export default function Workshop() {
  /* =======================================================
     PAGE TITLE + DESCRIPTION
  ======================================================= */

  useEffect(() => {
    const previousTitle = document.title;

    document.title = PAGE_TITLE;

    let meta = document.querySelector(
      'meta[name="description"]'
    );

    const created = !meta;

    const previousContent = meta
      ? meta.getAttribute("content")
      : "";

    if (!meta) {
      meta = document.createElement("meta");

      meta.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(meta);
    }

    meta.setAttribute(
      "content",
      PAGE_DESCRIPTION
    );

    return () => {
      document.title = previousTitle;

      if (created) {
        meta.remove();
      } else {
        meta.setAttribute(
          "content",
          previousContent
        );
      }
    };
  }, []);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="pjw-page">

      {/* =================================================
          COMMON PROJENIUS HERO
      ================================================= */}

      <CommonHero
        subheading="Workshops & Training"
        firstLine="Learn"
        highlight="Build"
        secondLine="with Practical Technology"
        description="Hands-on workshops designed to help students and professionals develop practical technical skills through real-world learning."
      />

      {/* =================================================
          WORKSHOP HERO / TECHNOLOGY DIAGRAM
          
          Remove this component if CommonHero is intended
          to be the only hero.
      ================================================= */}

      <WorkshopHero />

      {/* =================================================
          WORKSHOP JOURNEY
      ================================================= */}

      <WorkshopJourney />

      {/* =================================================
          WORKSHOP CATEGORIES
      ================================================= */}

      <WorkshopCategoryGrid />

      {/* =================================================
          WORKSHOP FORMAT
      ================================================= */}

      <WorkshopFormat />

      {/* =================================================
          WORKSHOP PROCESS
      ================================================= */}

      <WorkshopProcess />

      {/* =================================================
          INSTITUTION SHOWCASE
      ================================================= */}

      <WorkshopInstitutionShowcase />

      {/* =================================================
          GALLERY
      ================================================= */}

      <WorkshopGallery />

      {/* =================================================
          TESTIMONIAL
      ================================================= */}

      <WorkshopTestimonial />

      {/* =================================================
          OUTCOMES
      ================================================= */}

      <WorkshopOutcomes />

      {/* =================================================
          NEXT STEP
      ================================================= */}

      <WorkshopNextStep />

      {/* =================================================
          INSTITUTION CTA
      ================================================= */}

      <InstitutionCTA />

      {/* =================================================
          FAQ
      ================================================= */}

      <WorkshopFAQ />

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <WorkshopCTA />

    </main>
  );
}