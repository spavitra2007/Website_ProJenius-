/* ==========================================================================
   ProJenius Contact — configuration
   One source of truth: enquiry types, fields, options, validation rules,
   submission metadata and backend / official contact settings.
   (Data only - no UI. It is a .jsx file because several components share it.)
   ========================================================================== */

/* ----- Backend + official details (edit these) ------------------------- */
export const CONTACT_CONFIG = {
  // Your API / email-service URL. While null, submitting shows the error
  // state (no fake success). Receives multipart/form-data:
  //   payload    -> JSON string (built by buildPayload in ContactSmartForm.jsx)
  //   attachment -> optional file
  endpoint: `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/contact`,
  timeoutMs: 25000,
  maxFileMB: 5,

  // Targets for the success-screen buttons
  routes: { home: "/", explore: "/#ecosystem" },

  // Official details. Leave "" until you have them - nothing is invented.
   contact: {
    phone: "+91 89254 50473",

    email: "teamprojenius@gmail.com",

    whatsapp: "+91 89254 50473",

    address:
      "Madurai, Tamil Nadu",

    mapUrl:
      "https://maps.app.goo.gl/HvpbcZaJhUyh6Bhm9",
  },
};
/* ==========================================================================
   EmailJS
   ========================================================================== */

export const EMAILJS_CONFIG = {
  serviceId: "service_z16d4s2",

  adminTemplateId: "template_8pa3m69",

  userTemplateId: "template_tyrxtpq",

  publicKey: "GlKARJgJpVd5y7KUO",

  adminEmail: "teamprojenius@gmail.com",
};
/* ----- Shared option lists -------------------------------------------- */
const AREAS = [
  "AI / ML",
  "IoT",
  "Robotics",
  "Embedded Systems",
  "Software Development",
  "UI/UX",
  "PCB / Electronics",
  "Other",
];
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Not Sure"];
const DOCS = { accept: ".pdf,.doc,.docx", ext: ["pdf", "doc", "docx"], fmt: "PDF, DOC or DOCX" };
const ATTACH = {
  accept: ".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg",
  ext: ["pdf", "doc", "docx", "ppt", "pptx", "png", "jpg", "jpeg"],
  fmt: "PDF, DOC, PPT, PNG or JPG",
};

/* ----- Field builders -------------------------------------------------- */
const f = (id, label, type = "text", o = {}) => ({ id, label, type, ...o });
const NAME = f("name", "Full name", "text", { required: true, autoComplete: "name", span: "half", minLength: 2 });
const EMAIL = f("email", "Email address", "email", { required: true, autoComplete: "email", inputMode: "email", span: "half" });
const PHONE = f("phone", "Phone / WhatsApp number", "tel", { required: true, autoComplete: "tel", inputMode: "tel", placeholder: "e.g. 98765 43210", span: "half" });
const ORG = (label, required = false) => f("organisation", label, "text", { required, autoComplete: "organization", span: "half" });
const CITY = f("city", "City / location", "text", { autoComplete: "address-level2", span: "half" });
const MSG = (label, hint) => f("message", label, "textarea", { required: true, span: "full", rows: 5, minLength: 10, hint });
const SEL = (id, label, options, o = {}) => f(id, label, "select", { options, span: "half", ...o });
const RAD = (id, label, options, o = {}) => f(id, label, "radio", { options, span: "full", ...o });
const MULTI = (id, label, options, o = {}) => f(id, label, "multi", { options, span: "full", ...o });
const FILE = (id, label, kind, o = {}) => f(id, label, "file", { span: "full", ...kind, ...o });

/* ----- Enquiry types --------------------------------------------------- */
export const CONTACT_TYPES = {
  startup: {
    key: "startup",
    label: "Startup & Innovation",
    icon: "startup",
    desc: "Have an idea, product, prototype, R&D or IP requirement?",
    heading: "Let’s Talk About Your Idea.",
    support: "Tell us where you are in your idea or startup journey.",
    panelText: "Whether it’s a rough idea or a working prototype, we’ll help you work out what to build, test or protect next.",
    tips: [
      "Where you are today — idea, prototype or a running product",
      "The problem you’re solving and who it’s for",
      "The kind of support you’re hoping for",
      "Only what you’re comfortable sharing at this stage",
    ],
    note: "Please share only the information you are comfortable discussing at this stage.",
    privacyExtra: "Please avoid sharing confidential or patent-sensitive information in the initial enquiry.",
    meta: { source: "startup-support", sourceLabel: "Startup Support" },
    nextStep: "Idea / R&D discussion",
    sections: [
      { title: "Your details", fields: [NAME, EMAIL, PHONE, ORG("Organisation / college"), CITY] },
      {
        title: "About your idea",
        fields: [
          SEL("stage", "Current stage", ["Just an Idea", "Problem Identified", "Research / Validation", "Prototype", "MVP", "Existing Product", "Startup / Business Already Operating", "Not Sure"], { span: "full" }),
          MULTI("support", "What kind of support are you looking for?", ["Idea Validation", "Research & Development", "Prototype Development", "MVP Development", "3D Printing / Prototyping", "PCB / Hardware", "Software / AI", "Patent / IP Support", "Registration Support", "Other"]),
          MSG("Tell us about your idea or requirement."),
          FILE("attachment", "Attachment / document (optional)", ATTACH),
        ],
      },
    ],
  },

  development: {
    key: "development",
    label: "Development",
    icon: "development",
    desc: "Need a digital product, software, AI, SaaS or automation solution?",
    heading: "Let’s Discuss Your Requirement.",
    support: "Tell us what you’re looking to build, improve or automate.",
    panelText: "From a first version to improving something that already exists — describe the outcome you want and we’ll take it from there.",
    tips: [
      "What the product or system should do",
      "Who will use it",
      "Whether it’s new or an existing product",
      "Any timeline or constraints you already know",
    ],
    meta: { source: "development", sourceLabel: "Development" },
    nextStep: "Requirement discussion",
    sections: [
      { title: "Your details", fields: [NAME, EMAIL, PHONE, ORG("Organisation / company")] },
      {
        title: "Your requirement",
        fields: [
          MULTI("build", "What are you looking to build?", ["Website / Web Application", "Mobile Application", "SaaS / Digital Platform", "AI / Machine Learning", "Automation", "UI / UX", "Software / Custom Solution", "Existing Product Improvement", "Other"]),
          RAD("product", "Is this a new product or an existing product?", ["New Product", "Existing Product", "Not Sure"]),
          MSG("Tell us about your requirement."),
          SEL("timeline", "Expected timeline (optional)", ["Within a month", "1–3 months", "3–6 months", "6+ months", "Flexible / Not sure"]),
          SEL("budget", "Budget range (optional)", ["Under ₹50,000", "₹50,000 – ₹2 lakh", "₹2 – ₹5 lakh", "₹5 lakh and above", "Prefer to discuss"]),
          FILE("attachment", "Requirement document (optional)", ATTACH),
        ],
      },
    ],
  },

  workshop: {
    key: "workshop",
    label: "Workshop",
    icon: "workshop",
    desc: "Want to conduct a practical technology workshop for your institution?",
    heading: "Let’s Plan Your Workshop.",
    support: "Tell us what your students or institution would like to explore.",
    panelText: "Hands-on sessions shaped around your students, your department and the time you have.",
    tips: [
      "The topic or technology students want to explore",
      "Who the audience is and roughly how many",
      "Preferred format, dates and duration",
      "Any facilities or constraints on your side",
    ],
    meta: { source: "workshop", sourceLabel: "Workshop" },
    nextStep: "Institution requirement discussion",
    sections: [
      { title: "Your details", fields: [NAME, ORG("Institution / college", true), EMAIL, PHONE, f("department", "Department", "text", { span: "half" }), CITY] },
      {
        title: "Workshop plan",
        fields: [
          MULTI("topic", "Workshop topic / technology", ["AI / ML", "IoT", "Robotics", "Embedded Systems", "PCB / Electronics", "Software Development", "3D Printing / Prototyping", "Innovation / Startup", "Other"]),
          RAD("format", "Preferred workshop format", ["One-Day Workshop", "Hands-On Bootcamp", "Department Workshop", "Institution / Club Workshop", "Not Sure"]),
          f("date", "Preferred date", "date", { span: "half" }),
          SEL("duration", "Duration", ["Half day", "1 day", "2 days", "3–5 days", "Not sure"]),
          f("participants", "Expected participants (optional)", "number", { span: "half", inputMode: "numeric", min: 1, placeholder: "e.g. 60" }),
          MSG("Tell us about your workshop requirement."),
        ],
      },
    ],
  },

  course: {
    key: "course",
    label: "Courses & Learning",
    icon: "course",
    desc: "Looking to learn a technology or build practical skills?",
    heading: "Let’s Find the Right Learning Path.",
    support: "Tell us what you want to learn and where you are starting from.",
    panelText: "No prior experience needed — tell us where you are and we’ll point you to a sensible starting point.",
    tips: [
      "The technology or skill you want to learn",
      "Your current level, even if it’s “just starting”",
      "Online or offline — whichever suits you",
      "What you want to be able to build or do",
    ],
    meta: { source: "courses", sourceLabel: "Courses" },
    nextStep: "Learning path discussion",
    sections: [
      { title: "Your details", fields: [NAME, EMAIL, PHONE, ORG("College / organisation"), f("education", "Current education / role", "text", { span: "half" })] },
      {
        title: "What you want to learn",
        fields: [
          SEL("area", "Interested area", AREAS, { span: "full" }),
          RAD("level", "Current skill level", LEVELS),
          RAD("mode", "Preferred learning mode", ["Online", "Offline", "Not Sure"]),
          MSG("What are you looking to learn?"),
        ],
      },
    ],
  },

  internship: {
    key: "internship",
    label: "Internship",
    icon: "internship",
    desc: "Interested in gaining practical industry or project experience?",
    heading: "Let’s Talk About Your Internship.",
    support: "Tell us about your academic background and area of interest.",
    panelText: "Practical project experience for students — share your background and what you’d like to work on.",
    tips: [
      "Your college, department and current year",
      "The area you’d like to work in",
      "Skills or projects you already have",
      "Your resume, if you have one handy",
    ],
    meta: { source: "internship", sourceLabel: "Internship" },
    nextStep: "Candidate discussion",
    sections: [
      {
        title: "Your details",
        fields: [
          NAME, EMAIL, PHONE,
          ORG("College / institution", true),
          f("department", "Department", "text", { required: true, span: "half" }),
          SEL("year", "Current year", ["1st year", "2nd year", "3rd year", "4th year", "Final-year / Graduated", "Other"], { required: true }),
        ],
      },
      {
        title: "About your interest",
        fields: [
          SEL("area", "Area of interest", AREAS),
          f("skills", "Current skills", "text", { span: "half", placeholder: "e.g. Python, Arduino, React" }),
          RAD("preference", "Internship preference", ["Project-based", "Technical Internship", "Research / R&D", "Not Sure"]),
          SEL("duration", "Preferred duration", ["1 month", "2 months", "3 months", "6 months", "Flexible"]),
          MSG("Tell us about your interest and what you’d like to work on."),
          FILE("attachment", "Resume (optional)", DOCS),
        ],
      },
    ],
  },

  career: {
    key: "career",
    label: "Career Guidance",
    icon: "career",
    desc: "Looking for guidance on your technology or career path?",
    heading: "Let’s Talk About Your Next Step.",
    support: "Tell us where you are now and what you want to achieve.",
    panelText: "Unsure which technology to pick or what to do next? Describe where you are and we’ll help you think it through.",
    tips: [
      "What you’re studying or doing right now",
      "What you’re curious about or aiming for",
      "Where you feel stuck or unsure",
      "Any deadlines — placements, admissions, exams",
    ],
    meta: { source: "career-guidance", sourceLabel: "Career Guidance" },
    nextStep: "Guidance discussion",
    sections: [
      { title: "Your details", fields: [NAME, EMAIL, PHONE, ORG("College / organisation"), f("education", "Current education / role", "text", { span: "half" })] },
      {
        title: "Your situation",
        fields: [
          SEL("area", "Area of interest", AREAS),
          SEL("level", "Current skill level", LEVELS),
          f("goal", "Career goal", "text", { span: "full", placeholder: "e.g. Become an embedded systems engineer" }),
          MULTI("guidance", "Guidance needed", ["Choosing a Technology", "Career Direction", "Skill Roadmap", "Project Guidance", "Higher Studies", "Internship Preparation", "Placement Preparation", "Other"]),
          MSG("Tell us a little about your current situation and what you want guidance on."),
        ],
      },
    ],
  },

  general: {
    key: "general",
    label: "Partnership / General",
    icon: "general",
    desc: "Interested in collaboration, institutional partnerships or something else?",
    heading: "Let’s Start a Conversation.",
    support: "Tell us what you would like to discuss with ProJenius.",
    panelText: "Partnerships, collaborations or a question that doesn’t fit elsewhere — start here and we’ll route it to the right team.",
    tips: [
      "Who you are and the organisation you represent",
      "What you’d like to explore together",
      "Anything that helps us route this to the right team",
    ],
    meta: { source: "general", sourceLabel: "General" },
    nextStep: "Conversation about working together",
    sections: [
      { title: "Your details", fields: [NAME, EMAIL, PHONE, ORG("Organisation"), f("role", "Role / designation", "text", { span: "half" }), CITY] },
      {
        title: "Your enquiry",
        fields: [
          SEL("enquiry", "Enquiry type", ["Institutional Collaboration", "Industry Partnership", "Academic Collaboration", "Startup Collaboration", "General Enquiry", "Other"], { span: "full" }),
          MSG("Tell us what you would like to discuss."),
          FILE("attachment", "Attachment (optional)", ATTACH),
        ],
      },
    ],
  },
};
