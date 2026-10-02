import InternshipAbout from "../components/InternshipAbout/InternshipAbout";
import InternshipTech from "../components/InternshipTech/InternshipTech";
import CommonHero from "../components/CommonHero/CommonHero";
import InternYoutube from "../components/InternYoutube/InternYoutube";
import InternshipDomain from "../components/InternshipDomain/InternshipDomain";
import SuccessStories from "../components/SuccessStories/SuccessStories";
import InternshipCTA from "../components/InternshipCTA/InternshipCTA";
import InternshipBenefits from "../components/InternshipBenefits/InternshipBenefits";
export default function Internship() {
    return (
        <main className="internship-page">
            <CommonHero
                subheading="Internship Program"

                firstLine="Learn"

                highlight="Build"

                secondLine="Get Industry Ready"

                description="Gain practical experience by working on real projects while developing the technical and professional skills required by industry."
            />
            <InternshipAbout />
            <InternYoutube />
            <InternshipDomain />
            <InternshipTech />
            <InternshipBenefits />
            <SuccessStories />
            <InternshipCTA />
        </main>
    );
}