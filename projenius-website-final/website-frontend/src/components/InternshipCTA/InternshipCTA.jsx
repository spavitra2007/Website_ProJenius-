import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./InternshipCTA.css";

const InternshipCTA = () => {
    return (
        <section
            className="internship-cta-section"
            aria-labelledby="internship-cta-title"
        >
            <div className="internship-cta-container">

                <div className="internship-cta-content">
                    <h2 id="internship-cta-title">
                        Ready to Start Your Tech Journey?
                    </h2>

                    <div className="internship-cta-actions">

                        <Link
                            to="/job-application"
                            className="internship-cta-apply"
                        >
                            <span>Apply Now</span>
                            <ArrowUpRight size={20} strokeWidth={2.5} />
                        </Link>

                        <Link
                            to="/contact"
                            className="internship-cta-contact"
                        >
                            Contact Us
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default InternshipCTA;