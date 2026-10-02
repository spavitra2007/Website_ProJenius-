import React, { useEffect, useRef, useState } from "react";
import "./InternYoutube.css";

const InternYoutube = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`inter-youtube-section ${
                isVisible ? "inter-youtube-visible" : ""
            }`}
            aria-labelledby="inter-youtube-title"
        >
            <div className="inter-youtube-container">

                {/* ================= HEADER ================= */}

                <header className="inter-youtube-header">

                    <span className="inter-youtube-label">
                        REAL-WORLD EXPERIENCE
                    </span>

                    <h2 id="inter-youtube-title">
                        <span className="inter-youtube-title-white">
                            How ProJenius transforms your
                        </span>

                        <span className="inter-youtube-title-blue">
                            career with real-world projects
                        </span>
                    </h2>

                    <p>
                        Discover how ProJenius uses hands-on training to
                        prepare students for the tech industry.
                    </p>

                </header>


                {/* ================= VIDEO ================= */}

                <div className="inter-youtube-video-wrapper">

                    <div className="inter-youtube-video-frame">

                        <iframe
                            src="https://www.youtube.com/embed/1adzVmNh078?si=wwv9OYAYa3XXg67D&vq=hd1080&rel=0&modestbranding=1"
                            title="ProJenius - Real World Projects"
                            frameBorder="0"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />

                    </div>

                </div>

            </div>
        </section>
    );
};

export default InternYoutube;