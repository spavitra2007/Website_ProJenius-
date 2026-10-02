import { useEffect } from 'react';
import './Workshop.css';

import WorkshopHero from './WorkshopHero';
import WorkshopJourney from './WorkshopJourney';
import WorkshopCategoryGrid from './WorkshopCategoryGrid';
import WorkshopFormat from './WorkshopFormat';
import WorkshopProcess from './WorkshopProcess';
import WorkshopInstitutionShowcase from './WorkshopInstitutionShowcase';
import WorkshopGallery from './WorkshopGallery';
import WorkshopTestimonial from './WorkshopTestimonial';
import WorkshopOutcomes from './WorkshopOutcomes';
import WorkshopNextStep from './WorkshopNextStep';
import InstitutionCTA from './InstitutionCTA';
import WorkshopFAQ from './WorkshopFAQ';
import WorkshopCTA from './WorkshopCTA';

/* /workshop page.
   Usage:  <Route path="/workshop" element={<Workshop />} />
   Your existing navbar and footer are not part of this page. */
const PAGE_TITLE = 'Technology Workshops | ProJenius';
const PAGE_DESCRIPTION =
  'Explore hands-on technology and innovation workshops by ProJenius for students, departments, and institutions.';

export default function Workshop() {
  /* page title + meta description (restored when leaving the page) */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    let meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    const previousContent = meta ? meta.getAttribute('content') : '';
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', PAGE_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (created) meta.remove();
      else meta.setAttribute('content', previousContent);
    };
  }, []);

  return (
    <div className="pjw-page">
      <WorkshopHero />
      <WorkshopJourney />
      <WorkshopCategoryGrid />
      <WorkshopFormat />
      <WorkshopProcess />
      <WorkshopInstitutionShowcase />
      <WorkshopGallery />
      <WorkshopTestimonial />
      <WorkshopOutcomes />
      <WorkshopNextStep />
      <InstitutionCTA />
      <WorkshopFAQ />
      <WorkshopCTA />
    </div>
  );
}
