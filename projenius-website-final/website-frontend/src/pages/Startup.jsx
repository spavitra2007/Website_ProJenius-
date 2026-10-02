import React from "react";

import CommonHero from "../components/CommonHero/CommonHero";
import StartupSupport from "../components/StartupSupport/StartupSupport";
import StageSupport from "../components/StageSupport/StageSupport";
import StartupJourney from "../components/StartupJourney/StartupJourney";
import TechnologyPathways from "../components/TechnologyPathways/TechnologyPathways";
import StartingPoint from "../components/StartingPoint/StartingPoint";
import WorkingProcess from "../components/WorkingProcess/WorkingProcess";
import CapabilityMap from "../components/CapabilityMap/CapabilityMap";
import SupportJourney from "../components/SupportJourney/SupportJourney";
import ProofOfWork from "../components/ProofOfWork/ProofOfWork";
import GettingStarted from "../components/GettingStarted/GettingStarted";
import WhyProJenius from "../components/WhyProJenius/WhyProJenius";
import FAQSection from "../components/FAQSection/FAQSection";
import IdeaCTA from "../components/IdeaCTA/IdeaCTA";

export default function Startup() {
    return (
        <>
            <CommonHero
                subheading="Startup Support"

                firstLine="Turning"

                highlight="Ideas"

                secondLine="Into Real-World Solutions"

                description="We support startups from idea to execution by combining technology, product engineering and practical business guidance to build solutions that are ready to grow."
            />
            <StartupSupport />
            
            <StageSupport />
            <StartupJourney />
            <TechnologyPathways />
            <StartingPoint/>
            <WorkingProcess />
            <CapabilityMap />
            <SupportJourney />
            <ProofOfWork />
            <GettingStarted />
            <WhyProJenius />
            <FAQSection />
            <IdeaCTA />
        </>
    );
}