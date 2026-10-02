// import ContactSection from "../components/ContactSection/ContactSection";
// import DevelopmentServices from "../components/DevelopmentServices/DevelopmentServices";
// import EnterpriseDevelopment from "../components/EnterpriseDevelopment/EnterpriseDevelopment";
// import PriceTableSection from "../components/PriceTableSection/PriceTableSection";
// import CommonHero from "../components/CommonHero/CommonHero";
import DevelopmentApproach from "../components/DevelopmentApproach/DevelopmentApproach";
import DevelopmentAudit from "../components/DevelopmentAudit/DevelopmentAudit";
import DevelopmentCapabilities from "../components/DevelopmentCapabilities/DevelopmentCapabilities";
import DevelopmentCta from "../components/DevelopmentCta/DevelopmentCta";
import DevelopmentEcosystem from "../components/DevelopmentEcosystem/DevelopmentEcosystem";
// import DevelopmentHero from "../components/DevelopmentHero/DevelopmentHero";
import DevelopmentImprove from "../components/DevelopmentImprove/DevelopmentImprove";
import DevelopmentLifecycle from "../components/DevelopmentLifecycle/DevelopmentLifecycle";
import DevelopmentOtherAreas from "../components/DevelopmentOtherAreas/DevelopmentOtherAreas";
import DevelopmentPathways from "../components/DevelopmentPathways/DevelopmentPathways";
import DevelopmentProcess from "../components/DevelopmentProcess/DevelopmentProcess";
import DevelopmentSupport from "../components/DevelopmentSupport/DevelopmentSupport";
import DevelopmentWhy from "../components/DevelopmentWhy/DevelopmentWhy";
import DevHero from "../components/DevHero/DevHero";
export default function DevelopmentPage() {
    return (
        <main className="development-page">
            <DevHero />
            {/* Hero */}
            {/* <CommonHero
                subheading="Our Technology Services"

                firstLine="Powering"

                highlight="Digital Growth"

                secondLine="with Innovation"

                description="We provide technology solutions across software development, AI, IoT, product engineering and modern digital services."
            />  */}
            {/* <DevelopmentHero /> */}
            <DevelopmentApproach />
            <DevelopmentPathways />
            <DevelopmentCapabilities />
            <DevelopmentProcess />
            <DevelopmentEcosystem />
            <DevelopmentAudit />
            <DevelopmentImprove />
            <DevelopmentLifecycle />
            <DevelopmentSupport />
            <DevelopmentWhy />
            <DevelopmentCta />
            <DevelopmentOtherAreas />
            {/* Enterprise Development Services */}
            {/* <EnterpriseDevelopment />

            <DevelopmentServices />

            <PriceTableSection />

            <ContactSection /> */}
        </main>

    );
}