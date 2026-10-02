import { useEffect, useRef, useState } from 'react';
import CommonHero from '../components/CommonHero/CommonHero.jsx';
import StartupSupportHero from '../components/StartupSupport/StartupSupportHero.jsx';
import StartupSupportWho from '../components/StartupSupport/StartupSupportWho.jsx';
import StartupSupportJourney from '../components/StartupSupport/StartupSupportJourney.jsx';
import StartupSupportPaths from '../components/StartupSupport/StartupSupportPaths.jsx';
import StartupSupportFinder from '../components/StartupSupport/StartupSupportFinder.jsx';
import StartupSupportProcess from '../components/StartupSupport/StartupSupportProcess.jsx';
import StartupSupportCapabilities from '../components/StartupSupport/StartupSupportCapabilities.jsx';
import StartupSupportAreas from '../components/StartupSupport/StartupSupportAreas.jsx';
import StartupSupportProjects from '../components/StartupSupport/StartupSupportProjects.jsx';
import StartupSupportAfter from '../components/StartupSupport/StartupSupportAfter.jsx';
import StartupSupportWhy from '../components/StartupSupport/StartupSupportWhy.jsx';
import StartupSupportFaq from '../components/StartupSupport/StartupSupportFaq.jsx';
import StartupSupportCta from '../components/StartupSupport/StartupSupportCta.jsx';
import StartupSupportContactDialog from '../components/StartupSupport/StartupSupportContactDialog.jsx';
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

      <main id="ssp-main">
        <CommonHero
                subheading="Startup Support"

                firstLine="Turning"

                highlight="Ideas"

                secondLine="Into Real-World Solutions"

                description="We support startups from idea to execution by combining technology, product engineering and practical business guidance to build solutions that are ready to grow."
            />
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

      {/* <StartupSupportFooter /> */}

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
