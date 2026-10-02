import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import "./InnovationHero.css";

const InnovationHero = ({ onContact }) => {
  return (
    <section className="innovationHero">
      <div className="innovationHeroGlow innovationHeroGlowOne"></div>
      <div className="innovationHeroGlow innovationHeroGlowTwo"></div>

      <div className="innovationHeroInner">

        <div className="innovationHeroEyebrow">
          <span className="innovationHeroDot"></span>
          TECHNOLOGY × INNOVATION × EXECUTION
        </div>

        <h1>
          From <span>Idea</span>
          <br />
          to What Comes Next.
        </h1>

        <p>
          Whether you are starting with an idea, validating a problem,
          building your first prototype, or preparing for your next stage,
          ProJenius helps you find the right path forward.
        </p>

        <div className="innovationHeroActions">
          <button
            className="innovationPrimaryButton"
            onClick={onContact}
          >
            Start Your Journey
            <ArrowRight size={18} />
          </button>

          <button className="innovationSecondaryButton">
            Explore Our Capabilities
          </button>
        </div>

        <div className="innovationHeroPath">

          <div className="innovationPathNode active">
            <span>01</span>
            <strong>Idea</strong>
          </div>

          <div className="innovationPathLine"></div>

          <div className="innovationPathNode">
            <span>02</span>
            <strong>Validate</strong>
          </div>

          <div className="innovationPathLine"></div>

          <div className="innovationPathNode">
            <span>03</span>
            <strong>Build</strong>
          </div>

          <div className="innovationPathLine"></div>

          <div className="innovationPathNode">
            <span>04</span>
            <strong>Grow</strong>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InnovationHero;