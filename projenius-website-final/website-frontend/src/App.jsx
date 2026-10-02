import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

/* =========================================================
   LAYOUT
========================================================= */

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

/* =========================================================
   PAGES
========================================================= */

import Home from "./pages/Home";
import About from "./pages/About";

import Courses from "./pages/Courses";
import NewsInsights from "./pages/NewsInsights";

import CourseDetailsPage from "./pages/CourseDetailsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";

import StandardPage from "./pages/StandardPages";

/* =========================================================
   SERVICE PAGES
========================================================= */

import DevelopmentPage from "./pages/DevelopmentPage";
import Internship from "./pages/Internship";
import CareerGuidance from "./pages/CareerGuidance";

/* =========================================================
   OTHER PAGES
========================================================= */

import Workshop from "./pages/Workshop";
import JoinOurTeam from "./pages/JoinOurTeam";
import ContactPage from "./pages/ContactPage";
import StartupSupportPage from "./pages/StartupSupportPage";

/* =========================================================
   APP
========================================================= */

export default function App() {
    return (
        <BrowserRouter>

            {/* =================================================
                NAVBAR
            ================================================= */}

            <Navbar />

            {/* =================================================
                ROUTES
            ================================================= */}

            <Routes>

                {/* =================================================
                    HOME
                ================================================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                {/* =================================================
                    ABOUT
                ================================================= */}

                <Route
                    path="/about"
                    element={<About />}
                />

                {/* =================================================
                    COURSES
                ================================================= */}

                <Route
                    path="/courses"
                    element={<Courses />}
                />

                {/* IMPORTANT:
                    CourseDetailsPage uses useParams().slug
                */}

                <Route
                    path="/courses/:slug"
                    element={<CourseDetailsPage />}
                />

                {/* =================================================
                    NEWS & INSIGHTS
                ================================================= */}

                <Route
                    path="/blog"
                    element={<NewsInsights />}
                />

                <Route
                    path="/news-insights"
                    element={<NewsInsights />}
                />

                <Route
                    path="/insights/:id"
                    element={<NewsDetailsPage />}
                />

                {/* =================================================
                    SERVICES
                ================================================= */}

                <Route
                    path="/services/development"
                    element={<DevelopmentPage />}
                />

                <Route
                    path="/services/internship"
                    element={<Internship />}
                />

                <Route
                    path="/services/career-guidance"
                    element={<CareerGuidance />}
                />

                <Route
                    path="/services"
                    element={
                        <StandardPage type="services" />
                    }
                />

                {/* =================================================
                    OTHER PAGES
                ================================================= */}

                <Route
                    path="/workshop"
                    element={<Workshop />}
                />

                <Route
                    path="/startup"
                    element={<StartupSupportPage />}
                />

                <Route
                    path="/join-our-team"
                    element={<JoinOurTeam />}
                />

                {/* =================================================
                    CONTACT
                ================================================= */}

                <Route
                    path="/contact"
                    element={<ContactPage />}
                />

                {/* =================================================
                    FALLBACK
                ================================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

            {/* =================================================
                FOOTER
            ================================================= */}

            <Footer />

        </BrowserRouter>
    );
}