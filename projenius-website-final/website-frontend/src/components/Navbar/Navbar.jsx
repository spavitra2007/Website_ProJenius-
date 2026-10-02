import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

//LOGO
import NavLogo from "../../assets/images/pj_logo.jpeg";

import "./Navbar.css";

/* =========================================================
   NAVIGATION
========================================================= */

const navLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
    dropdown: [
      {
        label: "Development",
        path: "/services/development",
      },
      {
        label: "Courses",
        path: "/courses",
      },
      {
        label: "Internship",
        path: "/services/internship",
      },
      {
        label: "Career Guidance",
        path: "/services/career-guidance",
      },
    ],
  },
  {
    label: "Workshop",
    path: "/workshop",
  },
  {
    label: "Startup Supporter",
    path: "/startup",
  },
  {
    label: "Join Our Team",
    path: "/join-our-team",
  },
  {
    label: "News & Insights",
    path: "/blog",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

/* =========================================================
   SETTINGS
========================================================= */

const NAVBAR_DISPLAY_TIME = 2000;
const TOP_POSITION = 40;
const SCROLL_THRESHOLD = 2;

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const location = useLocation();

  const hideTimer = useRef(null);
  const scrollFrame = useRef(null);
  const lastScrollY = useRef(0);
  const mobileOpenRef = useRef(false);
  const navbarHoverRef = useRef(false);

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =========================================================
     CLEAR TIMER
  ========================================================= */

  const clearNavbarTimer = useCallback(() => {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  /* =========================================================
     HIDE NAVBAR
  ========================================================= */

  const hideNavbar = useCallback(() => {
    clearNavbarTimer();

    if (
      window.scrollY > TOP_POSITION &&
      !mobileOpenRef.current &&
      !navbarHoverRef.current
    ) {
      setIsVisible(false);
    }
  }, [clearNavbarTimer]);

  /* =========================================================
     SHOW NAVBAR FOR 2 SECONDS
  ========================================================= */

  const showNavbarTemporarily = useCallback(() => {
    clearNavbarTimer();

    setIsVisible(true);

    if (
      window.scrollY <= TOP_POSITION ||
      mobileOpenRef.current ||
      navbarHoverRef.current
    ) {
      return;
    }

    hideTimer.current = window.setTimeout(() => {
      if (
        window.scrollY > TOP_POSITION &&
        !mobileOpenRef.current &&
        !navbarHoverRef.current
      ) {
        setIsVisible(false);
      }
    }, NAVBAR_DISPLAY_TIME);
  }, [clearNavbarTimer]);

  /* =========================================================
     NAVBAR HOVER
  ========================================================= */

  const handleNavbarMouseEnter = useCallback(() => {
    navbarHoverRef.current = true;

    clearNavbarTimer();
    setIsVisible(true);
  }, [clearNavbarTimer]);

  const handleNavbarMouseLeave = useCallback(() => {
    navbarHoverRef.current = false;

    /*
      If page is already scrolled,
      hide immediately after mouse leaves.
    */
    if (
      window.scrollY > TOP_POSITION &&
      !mobileOpenRef.current
    ) {
      hideNavbar();
    }
  }, [hideNavbar]);

  /* =========================================================
     SCROLL HANDLER
  ========================================================= */

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const processScroll = () => {
      scrollFrame.current = null;

      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollY.current;

      setIsScrolled(currentScrollY > 20);

      /* -----------------------------------------------
         AT TOP
      ------------------------------------------------ */

      if (currentScrollY <= TOP_POSITION) {
        clearNavbarTimer();
        setIsVisible(true);

        lastScrollY.current = currentScrollY;
        return;
      }

      /* -----------------------------------------------
         MOBILE MENU OPEN
      ------------------------------------------------ */

      if (mobileOpenRef.current) {
        clearNavbarTimer();
        setIsVisible(true);

        lastScrollY.current = currentScrollY;
        return;
      }

      /* -----------------------------------------------
         IGNORE TINY MOVEMENTS
      ------------------------------------------------ */

      const difference = currentScrollY - previousScrollY;

      if (Math.abs(difference) < SCROLL_THRESHOLD) {
        return;
      }

      /* -----------------------------------------------
         SCROLL DOWN
         → HIDE IMMEDIATELY
      ------------------------------------------------ */

      if (difference > 0) {
        clearNavbarTimer();

        if (!navbarHoverRef.current) {
          setIsVisible(false);
        }

        lastScrollY.current = currentScrollY;
        return;
      }

      /* -----------------------------------------------
         SCROLL UP
         → SHOW FOR 2 SECONDS
      ------------------------------------------------ */

      if (difference < 0) {
        showNavbarTemporarily();

        lastScrollY.current = currentScrollY;
        return;
      }

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (scrollFrame.current !== null) {
        return;
      }

      scrollFrame.current =
        window.requestAnimationFrame(processScroll);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    processScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      clearNavbarTimer();

      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
        scrollFrame.current = null;
      }
    };
  }, [clearNavbarTimer, showNavbarTemporarily]);

  /* =========================================================
     PAGE CHANGE
  ========================================================= */

  useEffect(() => {
    clearNavbarTimer();

    setServicesOpen(false);
    setMobileOpen(false);
    setIsVisible(true);

    mobileOpenRef.current = false;
    navbarHoverRef.current = false;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    return () => {
      clearNavbarTimer();
    };
  }, [location.pathname, clearNavbarTimer]);

  /* =========================================================
     BODY LOCK
  ========================================================= */

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;

    if (mobileOpen) {
      document.body.classList.add("nav-open");
      clearNavbarTimer();
      setIsVisible(true);
    } else {
      document.body.classList.remove("nav-open");
    }

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [mobileOpen, clearNavbarTimer]);

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isActive = useCallback(
    (link) => {
      if (link.dropdown) {
        return (
          location.pathname === link.path ||
          link.dropdown.some(
            (item) => location.pathname === item.path
          )
        );
      }

      return location.pathname === link.path;
    },
    [location.pathname]
  );

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const toggleMobileMenu = () => {
    clearNavbarTimer();

    const nextState = !mobileOpen;

    setMobileOpen(nextState);
    mobileOpenRef.current = nextState;
    setIsVisible(true);

    if (!nextState && window.scrollY > TOP_POSITION) {
      hideNavbar();
    }
  };

  /* =========================================================
     NORMAL NAVIGATION CLICK
  ========================================================= */

  const handleNavigationClick = () => {
    clearNavbarTimer();

    setServicesOpen(false);
    setMobileOpen(false);

    mobileOpenRef.current = false;

    setIsVisible(true);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <header
      className={`
        glass-header
        ${isScrolled ? "scrolled" : ""}
        ${isVisible ? "header-visible" : "header-hidden"}
      `}
      onMouseEnter={handleNavbarMouseEnter}
      onMouseLeave={handleNavbarMouseLeave}
    >
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <div className="glass-navbar-inner">

        {/* ===================================================
            LOGO
        =================================================== */}

        <a href="/" 
        className="glass-logo" 
        aria-label="ProJenius Home" 
        onClick={(event) => {
          event.preventDefault();
          // Always perform a full browser refresh, 
          // even when already on the Home page. 
          window.location.href = "/";
        }} >
          <span className="glass-logo-mark">
            <img src={NavLogo} alt="ProJenius" className="logo-icon-crop" />
          </span>
          <span className="logo-pro"> Pro </span>
          <span className="logo-jenius"> Jenius </span>
        </a>
        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav
          className="glass-nav-links"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {

            /* -----------------------------------------------
               DROPDOWN
            ------------------------------------------------ */

            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className={`
                    glass-nav-item
                    has-dropdown
                    ${isActive(link) ? "active" : ""}
                  `}
                  onMouseEnter={() =>
                    setServicesOpen(true)
                  }
                  onMouseLeave={() =>
                    setServicesOpen(false)
                  }
                >
                  <button
                    type="button"
                    className="glass-nav-link glass-nav-button"
                    onClick={() => {
                      setServicesOpen(
                        (previous) => !previous
                      );

                      setIsVisible(true);
                    }}
                    aria-expanded={servicesOpen}
                  >
                    <span>
                      {link.label}
                    </span>

                    <ChevronDown
                      size={15}
                      className={
                        servicesOpen ? "rotate" : ""
                      }
                    />
                  </button>

                  {servicesOpen && (
                    <div
                      className="glass-dropdown"
                      onMouseEnter={() =>
                        setServicesOpen(true)
                      }
                      onMouseLeave={() =>
                        setServicesOpen(false)
                      }
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`
                            glass-dropdown-item
                            ${location.pathname === item.path
                              ? "active"
                              : ""
                            }
                          `}
                          onClick={() => {
                            setServicesOpen(false);
                            handleNavigationClick();
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* -----------------------------------------------
               NORMAL LINK
            ------------------------------------------------ */

            return (
              <div
                key={link.path}
                className={`
                  glass-nav-item
                  ${isActive(link) ? "active" : ""}
                `}
              >
                <Link
                  to={link.path}
                  className="glass-nav-link"
                  onClick={handleNavigationClick}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* ===================================================
            MOBILE BUTTON
        =================================================== */}

        <button
          type="button"
          className="glass-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileOpen && (
        <div className="glass-mobile-drawer">
          <nav aria-label="Mobile Navigation">
            {navLinks.map((link) => {

              /* ---------------------------------------------
                 MOBILE SERVICES
              --------------------------------------------- */

              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="glass-mobile-group"
                  >
                    <button
                      type="button"
                      className={`
                        glass-mobile-link
                        glass-mobile-toggle
                        ${servicesOpen ? "open" : ""}
                      `}
                      onClick={() => {
                        clearNavbarTimer();
                        setIsVisible(true);

                        setServicesOpen(
                          (previous) => !previous
                        );
                      }}
                    >
                      <span>
                        {link.label}
                      </span>

                      <ChevronDown size={16} />
                    </button>

                    {servicesOpen && (
                      <div className="glass-mobile-sub">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`
                              glass-mobile-link
                              sub
                              ${location.pathname === item.path
                                ? "active"
                                : ""
                              }
                            `}
                            onClick={() => {
                              setServicesOpen(false);
                              setMobileOpen(false);

                              mobileOpenRef.current = false;

                              clearNavbarTimer();
                              setIsVisible(true);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              /* ---------------------------------------------
                 MOBILE NORMAL LINK
              --------------------------------------------- */

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    glass-mobile-link
                    ${isActive(link) ? "active" : ""}
                  `}
                  onClick={() => {
                    setMobileOpen(false);

                    mobileOpenRef.current = false;

                    setServicesOpen(false);

                    clearNavbarTimer();
                    setIsVisible(true);
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}