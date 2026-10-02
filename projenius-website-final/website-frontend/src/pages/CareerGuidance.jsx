import BookCall from "../components/BookCall/BookCall";
import CommonHero from "../components/CommonHero/CommonHero";
import GuidanceProcess from "../components/GuidanceProcess/GuidanceProcess";
import TargetAudience from "../components/TargetAudience/TargetAudience";
export default function CareerGuidance() {
    return (
        <main className="development-page">

            {/* Hero */}
            <CommonHero
                subheading="Career Guidance"

                firstLine="Build"

                highlight="Your Career"

                secondLine="with the Right Direction"

                description="Get practical guidance, skill recommendations and career preparation to move confidently toward your technology career."
            />
            <BookCall />
            <GuidanceProcess />
            <TargetAudience />
        </main>
    );
}