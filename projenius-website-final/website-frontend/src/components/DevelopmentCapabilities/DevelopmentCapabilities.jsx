import { useEffect, useRef, useState } from "react";
import "./DevelopmentCapabilities.css";

import DevelopmentSectionHead from "../DevelopmentSectionHead/DevelopmentSectionHead";
import DevelopmentIcon from "../DevelopmentIcon/DevelopmentIcon";

const CONTACT_HREF = "/contact";

/* =========================================================
   IN VIEW
========================================================= */

function usePjdevInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* =========================================================
   SMOOTH INTERNAL LINK
========================================================= */

function pjdevScrollTo(event, href) {
  if (
    !href ||
    href.charAt(0) !== "#" ||
    href.length < 2
  ) {
    return;
  }

  const target = document.getElementById(
    href.slice(1)
  );

  if (!target) return;

  event.preventDefault();

  const reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  target.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}

/* =========================================================
   ILLUSTRATIONS
========================================================= */

function VisWeb() {
  return (
    <svg
      viewBox="0 0 300 150"
      className="pjdev-cap__illustration"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pjdev-cap-web-grad"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#1D5CFF"
          />
          <stop
            offset="100%"
            stopColor="#12C9E0"
          />
        </linearGradient>
      </defs>

      <g className="pjdev-cap__up">
        <rect
          className="pjdev-cap__vf"
          x="1"
          y="1"
          width="298"
          height="190"
          rx="14"
        />

        <path
          className="pjdev-cap__vl"
          d="M1 28h298"
        />

        <circle
          className="pjdev-cap__vd"
          cx="15"
          cy="14.5"
          r="3.5"
        />
        <circle
          className="pjdev-cap__vd"
          cx="27"
          cy="14.5"
          r="3.5"
        />
        <circle
          className="pjdev-cap__vd"
          cx="39"
          cy="14.5"
          r="3.5"
        />

        <rect
          className="pjdev-cap__vb"
          x="64"
          y="9"
          width="130"
          height="11"
          rx="5.5"
        />

        <rect
          className="pjdev-cap__vb"
          x="20"
          y="46"
          width="130"
          height="12"
          rx="4"
        />

        <rect
          className="pjdev-cap__vb"
          x="20"
          y="66"
          width="98"
          height="12"
          rx="4"
        />

        <rect
          className="pjdev-cap__va"
          x="20"
          y="92"
          width="64"
          height="20"
          rx="10"
        />

        <rect
          x="180"
          y="42"
          width="102"
          height="72"
          rx="10"
          fill="url(#pjdev-cap-web-grad)"
        />

        <rect
          className="pjdev-cap__vf"
          x="20"
          y="128"
          width="78"
          height="40"
          rx="8"
        />

        <rect
          className="pjdev-cap__vf"
          x="108"
          y="128"
          width="78"
          height="40"
          rx="8"
        />

        <rect
          className="pjdev-cap__vf"
          x="196"
          y="128"
          width="86"
          height="40"
          rx="8"
        />
      </g>
    </svg>
  );
}

function VisMobile() {
  return (
    <svg
      viewBox="0 0 300 150"
      className="pjdev-cap__illustration"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pjdev-cap-mobile-grad"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#1D5CFF"
          />
          <stop
            offset="100%"
            stopColor="#12C9E0"
          />
        </linearGradient>
      </defs>

      <g className="pjdev-cap__up">
        <rect
          className="pjdev-cap__vf"
          x="46"
          y="14"
          width="100"
          height="200"
          rx="20"
        />

        <rect
          className="pjdev-cap__vd"
          x="83"
          y="22"
          width="26"
          height="5"
          rx="2.5"
        />

        <rect
          x="59"
          y="40"
          width="74"
          height="44"
          rx="10"
          fill="url(#pjdev-cap-mobile-grad)"
        />

        <rect
          className="pjdev-cap__vb"
          x="59"
          y="94"
          width="50"
          height="8"
          rx="4"
        />

        <rect
          className="pjdev-cap__vb"
          x="59"
          y="108"
          width="74"
          height="8"
          rx="4"
        />

        <rect
          className="pjdev-cap__vf"
          x="59"
          y="126"
          width="34"
          height="34"
          rx="9"
        />

        <rect
          className="pjdev-cap__vf"
          x="99"
          y="126"
          width="34"
          height="34"
          rx="9"
        />
      </g>

      <g className="pjdev-cap__shift">
        <rect
          className="pjdev-cap__vf"
          x="164"
          y="34"
          width="100"
          height="200"
          rx="20"
        />

        <rect
          className="pjdev-cap__vd"
          x="201"
          y="42"
          width="26"
          height="5"
          rx="2.5"
        />

        <rect
          className="pjdev-cap__vb"
          x="177"
          y="62"
          width="74"
          height="10"
          rx="5"
        />

        <rect
          x="177"
          y="82"
          width="74"
          height="30"
          rx="10"
          fill="url(#pjdev-cap-mobile-grad)"
        />

        <rect
          className="pjdev-cap__vb"
          x="177"
          y="124"
          width="50"
          height="8"
          rx="4"
        />
      </g>
    </svg>
  );
}

function VisUiux() {
  return (
    <svg
      viewBox="0 0 300 120"
      className="pjdev-cap__illustration"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pjdev-cap-uiux-grad"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#1D5CFF"
          />
          <stop
            offset="100%"
            stopColor="#12C9E0"
          />
        </linearGradient>
      </defs>

      <g className="pjdev-cap__shift">
        <rect
          className="pjdev-cap__vdash"
          x="10"
          y="8"
          width="112"
          height="104"
          rx="10"
        />

        <rect
          className="pjdev-cap__vdash"
          x="22"
          y="22"
          width="88"
          height="14"
          rx="4"
        />

        <rect
          className="pjdev-cap__vdash"
          x="22"
          y="46"
          width="40"
          height="40"
          rx="6"
        />

        <rect
          className="pjdev-cap__vdash"
          x="70"
          y="46"
          width="40"
          height="18"
          rx="4"
        />

        <rect
          className="pjdev-cap__vdash"
          x="70"
          y="68"
          width="40"
          height="18"
          rx="4"
        />
      </g>

      <path
        className="pjdev-cap__vt"
        d="M138 60h26M156 52l8 8-8 8"
      />

      <rect
        className="pjdev-cap__vf"
        x="178"
        y="8"
        width="112"
        height="104"
        rx="10"
      />

      <rect
        className="pjdev-cap__va"
        x="190"
        y="22"
        width="88"
        height="14"
        rx="4"
      />

      <rect
        x="190"
        y="46"
        width="40"
        height="40"
        rx="6"
        fill="url(#pjdev-cap-uiux-grad)"
      />

      <rect
        className="pjdev-cap__vb"
        x="238"
        y="46"
        width="40"
        height="18"
        rx="4"
      />

      <rect
        className="pjdev-cap__vb"
        x="238"
        y="68"
        width="40"
        height="18"
        rx="4"
      />

      <circle
        className="pjdev-cap__vnf"
        cx="190"
        cy="22"
        r="3.5"
      />
      <circle
        className="pjdev-cap__vnf"
        cx="278"
        cy="22"
        r="3.5"
      />
      <circle
        className="pjdev-cap__vnf"
        cx="278"
        cy="86"
        r="3.5"
      />
    </svg>
  );
}

function VisAi() {
  return (
    <svg
      viewBox="0 0 400 120"
      className="pjdev-cap__illustration"
      aria-hidden="true"
    >
      <g className="pjdev-cap__vl">
        <path d="M60 20L170 15M60 20L170 45M60 45L170 45M60 45L170 75M60 70L170 75M60 70L170 105M60 95L170 105M60 95L170 45" />
        <path d="M170 15L300 40M170 45L300 40M170 45L300 80M170 75L300 40M170 75L300 80M170 105L300 80" />
      </g>

      <path
        className="pjdev-cap__vt"
        d="M60 45L170 75L300 40"
      />

      <g className="pjdev-cap__vn">
        <circle cx="60" cy="20" r="6" />
        <circle
          className="pjdev-cap__vnf"
          cx="60"
          cy="45"
          r="6"
        />
        <circle cx="60" cy="70" r="6" />
        <circle cx="60" cy="95" r="6" />

        <circle cx="170" cy="15" r="6" />
        <circle cx="170" cy="45" r="6" />
        <circle
          className="pjdev-cap__vnf"
          cx="170"
          cy="75"
          r="6"
        />
        <circle cx="170" cy="105" r="6" />

        <circle
          className="pjdev-cap__vnf"
          cx="300"
          cy="40"
          r="7"
        />

        <circle
          cx="300"
          cy="80"
          r="7"
        />
      </g>

      <text
        className="pjdev-cap__vtx"
        x="325"
        y="44"
      >
        Insight
      </text>
    </svg>
  );
}

function VisAuto() {
  return (
    <svg
      viewBox="0 0 300 100"
      className="pjdev-cap__illustration"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pjdev-cap-auto-grad"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#1D5CFF"
          />
          <stop
            offset="100%"
            stopColor="#12C9E0"
          />
        </linearGradient>
      </defs>

      <g className="pjdev-cap__shift">
        <rect
          className="pjdev-cap__vf"
          x="4"
          y="30"
          width="72"
          height="40"
          rx="10"
        />

        <rect
          className="pjdev-cap__va"
          x="16"
          y="46"
          width="30"
          height="8"
          rx="4"
        />

        <path
          className="pjdev-cap__vt"
          d="M80 50h32M104 44l8 6-8 6"
        />

        <rect
          className="pjdev-cap__vf"
          x="114"
          y="30"
          width="72"
          height="40"
          rx="10"
        />

        <rect
          className="pjdev-cap__vb"
          x="126"
          y="46"
          width="42"
          height="8"
          rx="4"
        />

        <path
          className="pjdev-cap__vt"
          d="M190 50h32M214 44l8 6-8 6"
        />

        <rect
          x="224"
          y="30"
          width="72"
          height="40"
          rx="10"
          fill="url(#pjdev-cap-auto-grad)"
        />

        <rect
          x="236"
          y="46"
          width="30"
          height="8"
          rx="4"
          fill="#ffffff"
          opacity="0.86"
        />
      </g>
    </svg>
  );
}

function VisSaas() {
  return (
    <svg
      viewBox="0 0 460 230"
      className="pjdev-cap__illustration"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pjdev-cap-saas-grad"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#1D5CFF"
          />
          <stop
            offset="100%"
            stopColor="#12C9E0"
          />
        </linearGradient>
      </defs>

      <g className="pjdev-cap__up">
        <rect
          className="pjdev-cap__vf"
          x="1"
          y="1"
          width="458"
          height="260"
          rx="16"
        />

        <path
          className="pjdev-cap__vl"
          d="M96 1v260"
        />

        <rect
          x="16"
          y="16"
          width="22"
          height="22"
          rx="7"
          fill="url(#pjdev-cap-saas-grad)"
        />

        <rect
          className="pjdev-cap__va"
          x="12"
          y="52"
          width="72"
          height="22"
          rx="7"
          opacity="0.28"
        />

        <rect
          className="pjdev-cap__vb"
          x="22"
          y="59"
          width="50"
          height="8"
          rx="4"
        />

        <rect
          className="pjdev-cap__vb"
          x="22"
          y="88"
          width="42"
          height="8"
          rx="4"
        />

        <rect
          className="pjdev-cap__vb"
          x="22"
          y="110"
          width="56"
          height="8"
          rx="4"
        />

        <rect
          className="pjdev-cap__vb"
          x="22"
          y="132"
          width="38"
          height="8"
          rx="4"
        />

        <rect
          className="pjdev-cap__vb"
          x="112"
          y="18"
          width="120"
          height="12"
          rx="6"
        />

        <circle
          className="pjdev-cap__vd"
          cx="432"
          cy="24"
          r="10"
        />

        <rect
          className="pjdev-cap__vf"
          x="112"
          y="46"
          width="108"
          height="54"
          rx="10"
        />

        <rect
          className="pjdev-cap__vf"
          x="230"
          y="46"
          width="108"
          height="54"
          rx="10"
        />

        <rect
          className="pjdev-cap__vf"
          x="348"
          y="46"
          width="98"
          height="54"
          rx="10"
        />

        <rect
          className="pjdev-cap__vb"
          x="124"
          y="58"
          width="42"
          height="7"
          rx="3.5"
        />

        <rect
          x="124"
          y="74"
          width="64"
          height="12"
          rx="6"
          fill="url(#pjdev-cap-saas-grad)"
        />

        <rect
          className="pjdev-cap__vb"
          x="242"
          y="58"
          width="42"
          height="7"
          rx="3.5"
        />

        <rect
          x="242"
          y="74"
          width="52"
          height="12"
          rx="6"
          fill="url(#pjdev-cap-saas-grad)"
        />

        <rect
          className="pjdev-cap__vb"
          x="360"
          y="58"
          width="42"
          height="7"
          rx="3.5"
        />

        <rect
          x="360"
          y="74"
          width="58"
          height="12"
          rx="6"
          fill="url(#pjdev-cap-saas-grad)"
        />

        <rect
          className="pjdev-cap__vf"
          x="112"
          y="112"
          width="226"
          height="130"
          rx="10"
        />

        <path
          d="M124 214L160 194L196 200L232 168L268 176L304 144L326 128V232H124Z"
          fill="rgba(61,217,238,.12)"
        />

        <path
          className="pjdev-cap__vt"
          d="M124 214L160 194L196 200L232 168L268 176L304 144L326 128"
        />

        <circle
          cx="326"
          cy="128"
          r="4"
          fill="#3DD9EE"
        />

        <rect
          className="pjdev-cap__vf"
          x="348"
          y="112"
          width="98"
          height="130"
          rx="10"
        />

        <rect
          className="pjdev-cap__va"
          x="360"
          y="196"
          width="14"
          height="32"
          rx="3"
        />

        <rect
          x="380"
          y="170"
          width="14"
          height="58"
          rx="3"
          fill="url(#pjdev-cap-saas-grad)"
        />

        <rect
          className="pjdev-cap__va"
          x="400"
          y="184"
          width="14"
          height="44"
          rx="3"
        />

        <rect
          x="420"
          y="148"
          width="14"
          height="80"
          rx="3"
          fill="url(#pjdev-cap-saas-grad)"
        />
      </g>
    </svg>
  );
}

/* =========================================================
   CAPABILITIES
========================================================= */

const CAPS = [
  {
    key: "web",
    mod: "web",
    icon: "web",
    title: "Websites & Web Applications",
    desc:
      "Digital experiences designed around your users, business goals and growth requirements.",
    items: [
      "Business Websites",
      "Corporate Websites",
      "Landing Pages",
      "Portals",
      "E-commerce",
      "Web Applications",
      "Custom Web Solutions",
      "Website Revamps",
    ],
    Vis: VisWeb,
  },
  {
    key: "mobile",
    mod: "mobile",
    icon: "mobile",
    title: "Mobile Applications",
    desc:
      "Mobile experiences designed to solve real user and business needs.",
    items: [
      "Customer Applications",
      "Business Applications",
      "Service Applications",
      "Connected Applications",
      "Dashboard Applications",
      "App Enhancements",
    ],
    Vis: VisMobile,
  },
  {
    key: "uiux",
    mod: "uiux",
    icon: "design",
    title: "UI/UX & Product Design",
    desc:
      "Design the experience before building the product.",
    items: [
      "User Research",
      "User Flows",
      "Wireframes",
      "Interactive Prototypes",
      "Interface Design",
      "Design Systems",
      "Experience Improvement",
    ],
    Vis: VisUiux,
  },
  {
    key: "ai",
    mod: "ai",
    icon: "ai",
    title: "AI / ML & Intelligent Solutions",
    desc:
      "Use intelligent technology where it creates meaningful value.",
    items: [
      "AI-powered Applications",
      "Machine Learning Solutions",
      "Computer Vision",
      "Intelligent Features",
      "Predictive Solutions",
      "AI Integration",
    ],
    Vis: VisAi,
  },
  {
    key: "auto",
    mod: "auto",
    icon: "auto",
    title: "Automation & Business Solutions",
    desc:
      "Turn repetitive processes into connected digital workflows.",
    items: [
      "Workflow Automation",
      "Business Process Automation",
      "Data Automation",
      "Custom Dashboards",
      "Reporting Systems",
      "Digital Process Optimization",
    ],
    Vis: VisAuto,
  },
  {
    key: "saas",
    mod: "saas",
    icon: "saas",
    title: "SaaS & Digital Platforms",
    desc:
      "Build scalable digital products that can evolve with your business.",
    items: [
      "Custom SaaS Platforms",
      "Subscription-based Products",
      "Business Platforms",
      "Internal Tools",
      "Admin Systems",
      "Customer Portals",
      "Multi-user Platforms",
    ],
    Vis: VisSaas,
  },
];

/* =========================================================
   CARD
========================================================= */

function CapabilityCard({
  cap,
  delay,
}) {
  const [open, setOpen] =
    useState(false);

  const [ref, inView] =
    usePjdevInView(0.12);

  const panelId =
    `pjdev-cap-panel-${cap.key}`;

  const classes = [
    "pjdev-cap__card",
    `pjdev-cap__card--${cap.mod}`,
    delay
      ? `pjdev-cap__card--d${delay}`
      : "",
    inView
      ? "pjdev-cap__card--in"
      : "",
    open
      ? "pjdev-cap__card--open"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      ref={ref}
      className={classes}
    >
      <div className="pjdev-cap__body">

        {/* ICON */}

        <span className="pjdev-cap__icon">
          <DevelopmentIcon
            name={cap.icon}
          />
        </span>

        {/* TITLE */}

        <h3 className="pjdev-cap__title">
          {cap.title}
        </h3>

        {/* DESCRIPTION */}

        <p className="pjdev-cap__desc">
          {cap.desc}
        </p>

        {/* MORE */}

        <div
          className="pjdev-cap__more"
          id={panelId}
        >
          <div className="pjdev-cap__more-inner">
            <ul className="pjdev-cap__tags">
              {cap.items.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                )
              )}
            </ul>

            <a
              className="pjdev-cap__link"
              href={CONTACT_HREF}
              onClick={(event) =>
                pjdevScrollTo(
                  event,
                  CONTACT_HREF
                )
              }
            >
              Discuss this requirement
            </a>
          </div>
        </div>

        {/* EXPLORE */}

        <button
          type="button"
          className="pjdev-cap__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() =>
            setOpen((value) => !value)
          }
        >
          <span>Explore</span>

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* ILLUSTRATION */}

      <div
        className="pjdev-cap__vis"
        aria-hidden="true"
      >
        <cap.Vis />
      </div>
    </article>
  );
}

/* =========================================================
   PAGE SECTION
========================================================= */

export default function DevelopmentCapabilities() {
  return (
    <section
      id="pjdev-capabilities"
      className="pjdev-cap"
      aria-labelledby="pjdev-cap-title"
    >
      <div className="pjdev-cap__wrap">

        <DevelopmentSectionHead
          id="pjdev-cap-title"
          title="What Can We Build?"
          text="From digital presence to intelligent applications and scalable platforms, our development capabilities adapt to your requirement."
        />

        <div className="pjdev-cap__bento">
          {CAPS.map(
            (cap, index) => (
              <CapabilityCard
                key={cap.key}
                cap={cap}
                delay={
                  index % 2 === 1
                    ? 1
                    : 0
                }
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}