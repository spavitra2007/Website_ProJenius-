import { useEffect, useRef, useState } from 'react';
import StartupSupportNav from './StartupSupportNav.jsx';
import StartupSupportHero from './StartupSupportHero.jsx';
import StartupSupportWho from './StartupSupportWho.jsx';
import StartupSupportJourney from './StartupSupportJourney.jsx';
import StartupSupportPaths from './StartupSupportPaths.jsx';
import StartupSupportFinder from './StartupSupportFinder.jsx';
import StartupSupportProcess from './StartupSupportProcess.jsx';
import StartupSupportCapabilities from './StartupSupportCapabilities.jsx';
import StartupSupportAreas from './StartupSupportAreas.jsx';
import StartupSupportProjects from './StartupSupportProjects.jsx';
import StartupSupportAfter from './StartupSupportAfter.jsx';
import StartupSupportWhy from './StartupSupportWhy.jsx';
import StartupSupportFaq from './StartupSupportFaq.jsx';
import StartupSupportCta from './StartupSupportCta.jsx';
import StartupSupportFooter from './StartupSupportFooter.jsx';
import StartupSupportContactDialog from './StartupSupportContactDialog.jsx';
import './StartupSupportPage.css';

/* StartupSupportPage — top-level page component.
   Owns: scroll progress bar, the "jump to journey stage" bridge between
   the Hero/Finder and the Journey section, and the contact dialog state. */
function StartupSupportPage() {
  const progressRef = useRef(null);
  const [journeyTarget, setJourneyTarget] = useState(null);
  const [contactState, setContactState] = useState({ open: false, stage: null, mode: 'idea' });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openContact = (stage, mode) => setContactState({ open: true, stage: stage ?? null, mode: mode || 'idea' });
  const closeContact = () => setContactState((s) => ({ ...s, open: false }));
  const jumpToStage = (stageIndex) => setJourneyTarget({ index: stageIndex, token: Date.now() });

  return (
    <div className="ssp-page">
      <div className="ssp-progress-bar" ref={progressRef} aria-hidden="true" />
      <a className="ssp-skip-link" href="#ssp-main">Skip to content</a>

      <StartupSupportNav onOpenContact={openContact} />

      <main id="ssp-main">
        <StartupSupportHero onOpenContact={openContact} onJumpToStage={jumpToStage} />
        <StartupSupportWho onOpenContact={openContact} />
        <StartupSupportJourney jumpTarget={journeyTarget} />
        <StartupSupportPaths />
        <StartupSupportFinder onOpenContact={openContact} />
        <StartupSupportProcess />
        <StartupSupportCapabilities />
        <StartupSupportAreas />
        <StartupSupportProjects />
        <StartupSupportAfter onOpenContact={openContact} />
        <StartupSupportWhy />
        <StartupSupportFaq onOpenContact={openContact} />
        <StartupSupportCta onOpenContact={openContact} />
      </main>

      <StartupSupportFooter />

      <StartupSupportContactDialog
        open={contactState.open}
        stage={contactState.stage}
        mode={contactState.mode}
        onClose={closeContact}
      />
    </div>
  );
}

export default StartupSupportPage;
