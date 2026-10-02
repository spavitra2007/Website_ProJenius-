import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TestimonialSection.css";

/* =========================================================
   FALLBACK REVIEWS
   Used only when Google Reviews API is unavailable
========================================================= */

const FALLBACK_REVIEWS = [
    {
        id: 1,
        name: "Kanniappan C",
        role: "Client",
        review:
            "Projenius provided a very good learning experience. The course content was well-structured and easy to understand, even for beginners. The explanations and practical examples helped me gain a clear understanding of the concepts.",
    },
    {
        id: 2,
        name: "MATHAN KUMAR",
        role: "Client",
        review:
            "Just came across this amazing page that provides solutions for final year projects, and honestly, I’m impressed! The quality of work is top-notch, well-structured, and clearly shows deep understanding of the concepts.",
    },
    {
        id: 3,
        name: "Sowbharnika Srinivasan",
        role: "Client",
        review:
            "I had a good and positive experience. The support and guidance provided during my project were really helpful and made things much clearer and easier to improve on.",
    },
    {
        id: 4,
        name: "Harshini 33",
        role: "Client",
        review:
            "Projenius is not just a service provider; they’re a problem-solving partner. If you’re a student looking to bring a project to life, or a startup aiming to build scalable tech solutions, Projenius is a reliable choice.",
    },
    {
        id: 5,
        name: "Dhivena Dharshana",
        role: "Client",
        review:
            "I asked Projenius Freelancing to create a website for me, and they did an excellent job. The design is neat, user-friendly, and exactly what I wanted.",
    },
    {
        id: 6,
        name: "Suba Dhayalan",
        role: "Client",
        review:
            "A trust worthy place where you can build your skills and future in a friendly and coexisting environment.",
    },
    {
        id: 7,
        name: "Keerthana Seenivasagan",
        role: "Intern",
        review:
            "I had a great experience during my internship. The environment was supportive, and I had the opportunity to learn practical skills.",
    },
];

/* =========================================================
   API
========================================================= */

const API_BASE = (
    import.meta.env.VITE_API_BASE_URL || ""
).replace(/\/$/, "");

/* =========================================================
   COMPONENT
========================================================= */

export default function TestimonialSection() {
    const swiperRef = useRef(null);

    const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
    const [loading, setLoading] = useState(true);

    /* =====================================================
       FETCH GOOGLE REVIEWS
    ===================================================== */

    useEffect(() => {
        let mounted = true;

        const loadReviews = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/reviews`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch reviews");
                }

                const data = await response.json();

                if (
                    mounted &&
                    Array.isArray(data?.reviews) &&
                    data.reviews.length > 0
                ) {
                    setReviews(data.reviews);
                }
            } catch (error) {
                console.warn(
                    "Google Reviews unavailable. Showing fallback reviews."
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadReviews();

        return () => {
            mounted = false;
        };
    }, []);

    /* =====================================================
       SAFE INITIAL
    ===================================================== */

    const getInitial = (name = "") => {
        return name.trim().charAt(0).toUpperCase() || "P";
    };

    return (
        <section className="testi-section">

            {/* Background */}
            <div className="testi-bg testi-bg-one"></div>
            <div className="testi-bg testi-bg-two"></div>

            <div className="testi-container">

                {/* =================================================
                   HEADER
                ================================================= */}

                <header className="testi-header">

                    <span className="testi-badge">
                        TESTIMONIALS
                    </span>

                    <h2 className="testi-title">
                        What Our{" "}
                        <span className="testi-title-accent">
                            Clients Say
                        </span>
                    </h2>

                    {/* STATIC LINE */}
                    <div className="testi-title-line"></div>

                    <p className="testi-subtitle">
                        Real stories from students, startups, and businesses
                        we've partnered with.
                    </p>

                </header>

                {/* =================================================
                   CAROUSEL
                ================================================= */}

                <div className="testi-carousel">

                    <Swiper
                        modules={[
                            Navigation,
                            Autoplay,
                            Pagination,
                        ]}
                        slidesPerView={1}
                        spaceBetween={24}
                        loop={reviews.length > 1}
                        speed={700}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            el: ".testi-pagination",
                            bulletClass: "testi-dot",
                            bulletActiveClass: "testi-dot-active",
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        className="testi-swiper"
                    >

                        {reviews.map((review, index) => (

                            <SwiperSlide
                                key={review.id || index}
                            >

                                <article className="testi-card">

                                    {/* =================================================
                                       LEFT CONTENT
                                    ================================================= */}

                                    <div className="testi-content">

                                        {/* Google */}
                                        <div className="testi-google">

                                            <span className="testi-google-name">
                                                Google
                                            </span>

                                            <span className="testi-stars">
                                                ★★★★★
                                            </span>

                                        </div>

                                        {/* Review */}
                                        <p className="testi-review">
                                            “
                                            {String(
                                                review.review || ""
                                            ).replace(
                                                /^["“]|["”]$/g,
                                                ""
                                            )}
                                            ”
                                        </p>

                                        {/* Divider */}
                                        <div className="testi-divider"></div>

                                        {/* User */}
                                        <div className="testi-user">

                                            <div className="testi-avatar">
                                                {getInitial(review.name)}
                                            </div>

                                            <div className="testi-user-info">

                                                <h3>
                                                    {review.name}
                                                </h3>

                                                <span>
                                                    {review.role ||
                                                        "Google Reviewer"}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* =================================================
                                       RIGHT IMAGE
                                    ================================================= */}

                                    <div className="testi-visual">

                                        {/* Background Circle */}
                                        <div className="testi-circle testi-circle-one"></div>
                                        <div className="testi-circle testi-circle-two"></div>

                                        {/* Person Image */}
                                        <img
                                            src="https://pngimg.com/uploads/businessman/businessman_PNG6564.png"
                                            alt="Client testimonial"
                                            className="testi-person"
                                            loading="lazy"
                                        />

                                        {/* Quote */}
                                        <div className="testi-quote">
                                            <span>”</span>
                                        </div>

                                    </div>

                                </article>

                            </SwiperSlide>

                        ))}

                    </Swiper>

                    {/* =================================================
                       ARROWS
                    ================================================= */}

                    <button
                        type="button"
                        className="testi-arrow testi-arrow-prev"
                        aria-label="Previous testimonial"
                        onClick={() =>
                            swiperRef.current?.slidePrev()
                        }
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <button
                        type="button"
                        className="testi-arrow testi-arrow-next"
                        aria-label="Next testimonial"
                        onClick={() =>
                            swiperRef.current?.slideNext()
                        }
                    >
                        <ChevronRight size={22} />
                    </button>

                </div>

                {/* =================================================
                   PAGINATION
                ================================================= */}

                <div className="testi-pagination"></div>

                {loading && (
                    <div className="testi-loading">
                        Loading reviews...
                    </div>
                )}

            </div>

        </section>
    );
}