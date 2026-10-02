/* =====================================================
   StartupSupportData.js
   All page content lives here. Edit text here, not in components.
   ===================================================== */

/* Hero pathway nodes. `stage` = index of the journey stage the node jumps to. */
export const HERO_NODES = [
  { label: 'IDEA',      sub: 'Problem & concept', x: 190, y: 70,  stage: 0 },
  { label: 'VALIDATE',  sub: 'Feasibility & fit', x: 370, y: 175, stage: 1 },
  { label: 'BUILD',     sub: 'Prototype & MVP',   x: 190, y: 290, stage: 2 },
  { label: 'PROTECT',   sub: 'IP & patents',      x: 370, y: 405, stage: 3 },
  { label: 'ESTABLISH', sub: 'Registration',      x: 190, y: 520, stage: 4 },
  { label: 'GROW',      sub: 'Ongoing support',   x: 370, y: 620, stage: 6 }
];

export const WHO = [
  { num: '01', title: 'Idea-Stage Innovators', quote: 'I have an idea but need clarity.', stage: 0,
    text: 'You have a spark: a problem you have noticed or a concept you keep coming back to. We help you make it concrete by understanding the problem, testing whether it holds up and outlining a practical technical direction.',
    areas: ['Problem understanding', 'Research & development', 'Idea evaluation', 'Feasibility assessment', 'Technical roadmap'] },
  { num: '02', title: 'Student & Emerging Innovators', quote: 'I want to turn a project or concept into something real.', stage: 2,
    text: 'A final-year project, a competition idea or a prototype that deserves to go further. We help you strengthen the concept, build a working demonstration and understand what a real product would need.',
    areas: ['Project-to-product guidance', 'Prototype development', 'Technical documentation', 'Patent & IP support', 'Demo preparation'] },
  { num: '03', title: 'Early-Stage Founders', quote: 'I have a validated concept and need to build.', stage: 3,
    text: 'You know the problem and have an early direction. Now the right technology has to be built properly. We scope, design and develop the prototype or MVP, and help you prepare for what comes next.',
    areas: ['MVP planning', 'Software / SaaS', 'AI / ML', 'IoT & hardware', 'Product roadmap', 'Startup registration guidance'] },
  { num: '04', title: 'Existing Startups', quote: 'I need technical, product or innovation support.', stage: 4,
    text: 'Already operating and in need of extra technical depth or a new capability? We can support product development, innovation work and technical mentoring alongside your team.',
    areas: ['Product development', 'Technology R&D', 'Technical mentoring', 'Product roadmap', 'Pitch deck & documentation', 'IP support'] }
];

export const STAGES = [
  { num: '01', key: 'DISCOVER',  title: 'Research & Problem Understanding', items: ['Problem identification', 'User/problem research', 'Technology research', 'Requirements understanding', 'Research & Development'] },
  { num: '02', key: 'VALIDATE',  title: 'Idea & Technical Validation',      items: ['Idea evaluation', 'Feasibility assessment', 'Solution definition', 'Technical validation', 'MVP planning'] },
  { num: '03', key: 'BUILD',     title: 'Prototype & MVP Development',      items: ['Software', 'SaaS', 'AI/ML', 'IoT', 'Embedded systems', 'PCB', '3D design & printing', 'Hardware integration', 'MVP development'] },
  { num: '04', key: 'PROTECT',   title: 'IP & Patent Support',              items: ['Patent support', 'IP documentation', 'Technical documentation', 'Prior-art research support', 'Filing coordination/support'] },
  { num: '05', key: 'ESTABLISH', title: 'Startup & Registration Support',   items: ['Company registration guidance', 'Startup registration guidance', 'Documentation support', 'Relevant government/startup scheme guidance'] },
  { num: '06', key: 'PREPARE',   title: 'Startup Readiness',                items: ['Business model support', 'Product positioning', 'Pitch deck support', 'Product roadmap', 'Demo preparation', 'Startup documentation'] },
  { num: '07', key: 'GROW',      title: 'Continued Innovation Support',     items: ['Product roadmap', 'Technical mentoring', 'Innovation support', 'Startup mentoring', 'Growth planning'] }
];

export const PATHS = [
  { key: 'SaaS / Software',    sub: 'Platforms, apps and web products', steps: ['Problem', 'Validation', 'UX', 'Software', 'MVP', 'Launch'],
    note: 'Software-first ideas usually begin by checking the workflow and the user before any code is written.' },
  { key: 'AI / Data',          sub: 'Models, data and intelligent features', steps: ['Problem', 'Research', 'Data', 'Model', 'Product', 'Validation'],
    note: 'AI ideas depend on data, so the route starts by understanding what data exists and what the model must decide.' },
  { key: 'IoT / Embedded',     sub: 'Connected devices and firmware', steps: ['Problem', 'Research', 'Electronics', 'PCB', 'Firmware', 'Prototype', 'MVP'],
    note: 'Connected products bring electronics, firmware and software together in one build.' },
  { key: 'Hardware / Product', sub: 'Physical products and devices', steps: ['Problem', 'Feasibility', 'Mechanical Design', 'PCB', 'Prototype', 'Testing', 'MVP'],
    note: 'Physical products need feasibility and mechanical design early, because changes get costlier later.' },
  { key: 'Automation',         sub: 'Workflows, control and integration', steps: ['Problem', 'Process Study', 'Workflow Design', 'Integration', 'Testing', 'Deployment'],
    note: 'Automation starts with mapping how the work is done today, then designing what should change.' }
];

export const FINDER = [
  { label: 'I only have an idea.', next: 'Start with a conversation about the problem. We will help you define the first practical step.',
    needs: ['Problem understanding', 'Research', 'Feasibility', 'Idea validation', 'Technical roadmap'] },
  { label: 'I understand the problem but need validation.', next: 'Before building, test whether the solution works technically and makes sense for its users.',
    needs: ['Requirement clarification', 'Technical feasibility', 'Solution definition', 'Technology validation', 'MVP planning'] },
  { label: 'I need to build a prototype.', next: 'A working prototype turns the concept into something you can test, show and improve.',
    needs: ['Product planning', '3D design', 'PCB', 'Electronics', 'Embedded systems', 'Prototype development'] },
  { label: 'I need an MVP.', next: 'An MVP is the smallest version that proves the idea with real users. We help scope it and build it.',
    needs: ['MVP scope definition', 'Software / SaaS development', 'AI / ML integration', 'IoT and hardware integration', 'Testing and refinement', 'Product roadmap'] },
  { label: 'I already have a startup.', next: 'Bring in technical depth, product support or innovation help where your team needs it.',
    needs: ['Technical & product support', 'Product roadmap', 'Innovation support', 'Pitch deck & documentation', 'Startup mentoring', 'IP support'] }
];

export const PROCESS = [
  { num: '01', verb: 'DISCUSS',    title: 'Tell us about your idea.',    text: 'Share your idea, problem, project or current stage with us.',
    chips: ['Idea intake', 'Project review', 'Stage check'] },
  { num: '02', verb: 'UNDERSTAND', title: 'Understand the problem.',     text: 'We explore the requirement, users, technology and constraints.',
    chips: ['Requirement analysis', 'User & problem research', 'Technology research', 'Constraints'] },
  { num: '03', verb: 'PLAN',       title: 'Define the right path.',      text: 'We identify the appropriate scope, technology and next milestone.',
    chips: ['Scope definition', 'Technology selection', 'Milestone planning'] },
  { num: '04', verb: 'BUILD',      title: 'Develop the solution.',       text: 'Prototype, MVP, software, hardware or other required technology is developed.',
    chips: ['Software / SaaS', 'AI / ML', 'IoT', 'Embedded', 'PCB', '3D design & printing'] },
  { num: '05', verb: 'VALIDATE',   title: 'Test and refine.',            text: 'We test the solution, identify gaps and improve the outcome.',
    chips: ['Testing', 'Gap analysis', 'Iteration'] },
  { num: '06', verb: 'SUPPORT',    title: 'Prepare for the next stage.', text: 'Depending on the venture, we can support IP, registration, documentation, startup readiness and further development.',
    chips: ['Patent & IP support', 'Registration guidance', 'Documentation', 'Startup readiness', 'Further development'] }
];

/* `related` must use the exact `name` of other capabilities. */
export const CAPS = [
  { name: 'Software & SaaS',      text: 'Applications, platforms and backend systems built around the workflow the product needs to support.', related: ['Mobile / Web', 'AI / ML', 'Product Development'] },
  { name: 'Mobile / Web',         text: 'Web and mobile interfaces that put the product in the hands of its users.', related: ['Software & SaaS', 'Product Development'] },
  { name: 'Product Development',  text: 'Turning a validated concept into a usable, testable product, from planning to MVP.', related: ['Software & SaaS', 'Automation', '3D Design & Printing', 'Electronics'] },
  { name: 'Automation',           text: 'Workflow and process automation, from software-driven routines to control of physical systems.', related: ['IoT', 'Embedded Systems', 'Product Development'] },
  { name: 'IoT',                  text: 'Connected devices and sensors that turn physical signals into data people can use.', related: ['Embedded Systems', 'Electronics', 'Software & SaaS'] },
  { name: 'Embedded Systems',     text: 'Firmware and control logic that make hardware behave reliably.', related: ['Electronics', 'PCB', 'IoT'] },
  { name: 'Electronics',          text: 'Circuit design, component selection and integration for sensing, control and power.', related: ['PCB', 'Embedded Systems', 'IoT'] },
  { name: 'PCB',                  text: 'Design and development support for prototype and MVP electronics.', related: ['Electronics', 'Embedded Systems', '3D Design & Printing'] },
  { name: '3D Design & Printing', text: 'CAD modelling and 3D-printed parts or enclosures that make a concept tangible quickly.', related: ['PCB', 'Product Development'] },
  { name: 'AI / ML',              text: 'Data-driven models and intelligent features for products that need to predict, classify or learn.', related: ['Software & SaaS', 'IoT', 'Automation'] }
];

/* Each item is [title, description]. */
export const AREAS = [
  { title: 'Research & Validation', items: [
    ['Research & Development', 'Structured research into the problem space, existing solutions and the technologies that could solve it.'],
    ['Idea & Problem Validation', 'Testing whether the problem is real and the idea addresses it, before significant effort goes into building.'],
    ['Technical Feasibility', 'Assessing whether the concept can be built with available technology, time and resources.'] ] },
  { title: 'Software & Intelligence', items: [
    ['Software / SaaS Development', 'Web platforms, applications and backend systems designed around the workflow you need.'],
    ['AI & Machine Learning', 'Models and intelligent features, from understanding the data to integrating them into a product.'],
    ['IoT Development', 'Connected devices, sensor data pipelines and dashboards that bring hardware and software together.'] ] },
  { title: 'Hardware & Electronics', items: [
    ['Electronics & Embedded Systems', 'Circuit design and firmware that let a device sense, decide and act.'],
    ['PCB Design & Fabrication', 'Design and development support for prototype and MVP electronics.'],
    ['3D Design & Printing', 'CAD design and 3D-printed parts, enclosures and mechanical prototypes.'] ] },
  { title: 'Prototype & MVP', items: [
    ['Prototype Development', 'A working proof of the concept, so the idea can be tested, demonstrated and improved.'],
    ['MVP Development', 'A focused first version with the essentials needed to put the product in front of users.'],
    ['Product Roadmapping', 'Deciding what to build next, and in what order, as the product matures.'] ] },
  { title: 'IP, Registration & Readiness', items: [
    ['Patent & IP Support', 'Support with IP documentation, technical documentation, prior-art research and filing coordination.'],
    ['Startup Registration Support', 'Guidance on company and startup registration, documentation and relevant government or startup schemes.'],
    ['Pitch Deck & Startup Documentation', 'Business model, positioning and pitch material that explain the venture clearly.'],
    ['Startup Mentoring', 'Practical guidance on product, technology and growth planning as the venture develops.'] ] }
];

/* ---- PLACEHOLDERS: replace with verified ProJenius projects. ----
   `image` currently points to a generic stock photo (picsum.photos) purely so the
   layout previews correctly — swap each one for a real project photo when available.
   Fill name/objective/technology/worked/outcome with real information only;
   nothing here is a real client, statistic or outcome. */
export const PROJECT_CATEGORIES = ['AI / ML', 'IoT', 'Robotics', 'Hardware', 'SaaS', 'Automation', 'Prototype', 'Academic innovation'];
export const PROJECTS = [
  { categories: ['AI / ML', 'Prototype'],       image: 'https://picsum.photos/seed/projenius-ai/800/500',       name: '', objective: '', technology: '', worked: '', outcome: '' },
  { categories: ['IoT', 'Automation'],          image: 'https://picsum.photos/seed/projenius-iot/800/500',      name: '', objective: '', technology: '', worked: '', outcome: '' },
  { categories: ['Robotics', 'Hardware'],       image: 'https://picsum.photos/seed/projenius-robotics/800/500', name: '', objective: '', technology: '', worked: '', outcome: '' },
  { categories: ['Hardware', 'Prototype'],      image: 'https://picsum.photos/seed/projenius-hardware/800/500', name: '', objective: '', technology: '', worked: '', outcome: '' },
  { categories: ['SaaS', 'Automation'],         image: 'https://picsum.photos/seed/projenius-saas/800/500',     name: '', objective: '', technology: '', worked: '', outcome: '' },
  { categories: ['Academic innovation', 'IoT'], image: 'https://picsum.photos/seed/projenius-academic/800/500', name: '', objective: '', technology: '', worked: '', outcome: '' }
];

export const AFTER_STEPS = [
  ['Initial Conversation', 'Tell us where you are and what you want to build.'],
  ['Requirement Understanding', 'We clarify the problem, the users and the constraints.'],
  ['Scope & Direction', 'We agree on the right first milestone and the technology behind it.'],
  ['Execution Plan', 'The approach, timeline and deliverables are laid out.'],
  ['Development / Support', 'We build, test and support the next step with you.']
];

export const WHY_POINTS = [
  ['Practical Execution', 'We focus on building and validating real solutions.'],
  ['Cross-Technology Capability', 'Software, AI, IoT, electronics, embedded systems and product development can come together when required.'],
  ['End-to-End Support', 'From early research and validation to prototype, MVP and startup readiness.'],
  ['Founder-Friendly Approach', 'Start with the problem. We help define the next practical step.']
];

export const FAQ_ITEMS = [
  ['Can I approach ProJenius with only an idea?', 'Yes. Startup Support is designed for different stages, including the idea stage. We begin by understanding the problem and help you define the next practical step.'],
  ['Do I need a complete technical specification?', 'No. A rough description of the idea, problem or project is enough to start. Requirements are clarified together in the early conversations.'],
  ['Can ProJenius help with prototype development?', 'Yes. Prototype development is part of our support. Depending on the idea, it can involve software, electronics, embedded systems, 3D-printed parts or a combination.'],
  ['Can you help with both software and hardware?', 'Yes. Software, SaaS, AI/ML, IoT, electronics, embedded systems, PCB and 3D design can be combined, depending on what the idea needs.'],
  ['Do you support AI/ML and SaaS ideas?', 'Yes. AI/ML and SaaS are among the areas we work in, from early validation through to building the product.'],
  ['Can you help with PCB and 3D prototype development?', 'Yes. We support PCB design and fabrication as well as 3D design and printing for prototypes and MVPs.'],
  ['Do you provide patent support?', 'Yes. Patent and IP support includes IP documentation, technical documentation, prior-art research support and filing coordination. Whether a patent is granted is decided by the relevant patent office.'],
  ['Do you provide startup registration support?', 'Yes. We provide guidance on company and startup registration, documentation support and relevant government or startup schemes.'],
  ['Can students approach ProJenius?', 'Yes. Students and emerging innovators can approach us to turn a project or concept into a working prototype or a product.'],
  ['How do we start?', 'Use "Discuss Your Idea" to share where you are. We will have an initial conversation, understand the requirement and suggest the next practical step.']
];
