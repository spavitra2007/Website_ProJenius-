import React, { useEffect, useRef, useState } from "react";
import "./AboutTeamSection.css";

const teamMembers = [
  {
    image: "/images/team-member-1.webp",
    name: "Karthick Ganesh",
    position: "Founder & CEO",
    bio: "A passionate leader focused on empowering the next generation of innovators with a strong vision for academic and practical excellence.",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
  {
    image: "/images/team-member-2.webp",
    name: "Harshini",
    position: "CTO & Co-Founder",
    bio: "A visionary mentor promoting entrepreneurship and innovation, supporting students from exploration to impactful execution.",
    socials: ["facebook", "twitter-x", "linkedin", "instagram"],
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`team-section ${visible ? "team-visible" : ""}`}
    >
      <div className="team-container">

        {/* =========================
            SECTION HEADER
        ========================= */}

        <div className="team-section-header">

          <span className="team-section-badge">
            <span className="team-badge-dot"></span>
            OUR TEAM MEMBERS
          </span>

          <h2 className="team-section-title">
            Meet the{" "}
            <span className="team-title-highlight">
              Creative Minds
            </span>
          </h2>

          <div className="team-title-line"></div>

          <p className="team-section-desc">
            The leadership team behind Projenius combines product thinking,
            engineering depth, and practical execution. We are keeping this
            section focused on the core faces of the company for now.
          </p>

        </div>


        {/* =========================
            TEAM MEMBERS
        ========================= */}

        <div className="team-grid-top">

          {teamMembers.map((member, index) => (
            <article
              className={`team-card team-card-${index + 1}`}
              key={member.name}
            >

              {/* TEXT */}

              <div className="team-card-body">

                <div className="team-member-number">
                  0{index + 1}
                </div>

                <h3 className="team-member-name">
                  {member.name}
                </h3>

                <p className="team-member-role">
                  {member.position}
                </p>

                <p className="team-member-bio">
                  {member.bio}
                </p>

              </div>


              {/* IMAGE */}

              <div className="team-card-photo">

                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-image"
                />

                <div className="team-photo-overlay"></div>


                {/* SOCIAL ICONS */}

                <div className="team-card-socials">

                  {member.socials.map((platform) => (
                    <a
                      href="#"
                      key={platform}
                      aria-label={`${member.name} ${platform}`}
                      onClick={(e) => e.preventDefault()}
                    >
                      {platform === "facebook" && "f"}
                      {platform === "twitter-x" && "𝕏"}
                      {platform === "linkedin" && "in"}
                      {platform === "instagram" && "◎"}
                    </a>
                  ))}

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}