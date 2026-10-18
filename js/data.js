/**
 * LUCKZDEV // NEXUS PROTOCOL - CENTRAL DATA STORE
 * Verified Profile, Academic Records, Projects, Skills, and Certificates
 * Developer: Lucky Arlie T. Evangelista (LuckzDev)
 */

export const PROFILE_DATA = {
  fullName: "Lucky Arlie T. Evangelista",
  handle: "LuckzDev",
  roleHero: "Computer Engineering Student | Frontend Developer | UI/UX Designer | Aspiring Network Engineer",
  rolesRotating: [
    "Computer Engineering Student",
    "Frontend Developer",
    "UI/UX Designer",
    "Aspiring Network Engineer",
    "Cybersecurity Learner",
    "Embedded Systems Explorer"
  ],
  location: "Antipolo City, Rizal, Philippines",
  institution: "ICCT Colleges Foundation, Inc.",
  program: "Bachelor of Science in Computer Engineering (BSCOE)",
  currentTitle: "Computer Engineering Student",
  status: "PORTFOLIO SYSTEM: ONLINE",
  taglinePrimary: "Turning Real-World Problems Into Intelligent Digital Solutions.",
  taglineSecondary: "Engineering Ideas. Designing Experiences. Building What Comes Next.",
  bio: "I’m Lucky Arlie T. Evangelista, known as LuckzDev, a Computer Engineering student at ICCT Colleges passionate about software development, UI/UX design, embedded systems, networking, and emerging AI technologies. I enjoy transforming practical problems into thoughtful digital experiences, collaborating with teams, and exploring how software and hardware can work together to create useful solutions. Through academic projects and continuous learning, I’m developing my skills in frontend engineering, interface design, embedded technology, and computer networking.",
  aboutHeading: "Curiosity Is the Beginning of Every System.",
  workflowSteps: [
    { step: "01", name: "IDEA", desc: "Identifying friction and human needs in everyday problems." },
    { step: "02", name: "DESIGN", desc: "Architecting interactive wireframes and intuitive user journeys." },
    { step: "03", name: "ENGINEERING", desc: "Writing clean frontend code and integrating hardware modules." },
    { step: "04", name: "TESTING", desc: "Rigorous simulation, sensor calibration, and debugging." },
    { step: "05", name: "IMPROVEMENT", desc: "Refining user feedback and preparing for scalable growth." }
  ],
  pillars: [
    {
      title: "Critical Thinking",
      icon: "cpu",
      desc: "Deconstructing complex engineering challenges into modular, testable components."
    },
    {
      title: "Practical Problem-Solving",
      icon: "wrench",
      desc: "Focusing on tangible, real-world utility rather than theoretical complexity."
    },
    {
      title: "Creative Interface Design",
      icon: "palette",
      desc: "Balancing futuristic cyberpunk aesthetics with accessible, intuitive UX hierarchy."
    },
    {
      title: "Hardware & Software Integration",
      icon: "layers",
      desc: "Bridging code with physical microcontrollers, sensors, and actuator circuits."
    },
    {
      title: "Network Fundamentals",
      icon: "network",
      desc: "Simulating packet routing, subnet topologies, and foundational switching systems."
    },
    {
      title: "Continuous Learning",
      icon: "terminal",
      desc: "Proactively mastering modern web standards, AI workflows, and networking principles."
    }
  ]
};

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/LuckzDev04",
    username: "@LuckzDev04",
    icon: "github",
    color: "#EAF2FF"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/lucky-arlie-evangelista-511b0b440/",
    username: "Lucky Arlie Evangelista",
    icon: "linkedin",
    color: "#00E5FF"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/lucky.evangelista.505",
    username: "lucky.evangelista.505",
    icon: "facebook",
    color: "#1877F2"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/m1ng_daewoon/",
    username: "@m1ng_daewoon",
    icon: "instagram",
    color: "#FF3CAC"
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@z.luck.m1ng?is_from_webapp=1&sender_device=pc",
    username: "@z.luck.m1ng",
    icon: "tiktok",
    color: "#00E5FF"
  },
  {
    name: "Email",
    url: "mailto:luckyevangelista04@gmail.com",
    username: "luckyevangelista04@gmail.com",
    icon: "mail",
    color: "#39FF88"
  }
];

export const PROJECTS_DATA = [
  {
    id: "tourmana-ph",
    title: "TourMana PH",
    subtitle: "Promoting Filipino Tourism & Cultural Heritage",
    category: "OOP / Web Application",
    categoryFilter: "web",
    statusBadge: "ACADEMIC OOP CONCEPT",
    statusType: "concept",
    repositoryUrl: null,
    accentColor: "#00E5FF",
    image: "assets/images/projects/tourmana-heritage-emblem.png",
    shortOverview: "A proposed web-based platform designed to showcase local tourist destinations and Filipino heritage sites, making regional attractions discoverable while encouraging community participation.",
    problemAddressed: "Useful information about local Philippine destinations and heritage sites can be fragmented, outdated, or difficult to discover online for both local and foreign travelers.",
    keyFeatures: [
      "Curated tourist destination listings across Philippine regions",
      "Rich cultural heritage descriptions, histories, and photo galleries",
      "Community-submitted destination suggestions and reviews",
      "Administrative review and approval workflow for submitted locations",
      "Dynamic search, category filtering, and regional tagging",
      "User account administration and content moderation portal",
      "Responsive browsing experience across desktop and mobile devices"
    ],
    techStack: ["Object-Oriented Programming", "HTML5", "CSS3", "JavaScript", "UI/UX Prototyping"],
    workflow: "DISCOVER DESTINATIONS → BROWSE HERITAGE → COMMUNITY SUBMISSION → ADMIN APPROVAL → REGIONAL PUBLISHING",
    contribution: "Academic OOP Team Project. Contributed to conceptual design, UI structure, object models, and interface wireframing.",
    statusDisclaimer: "Academic conceptual proposal and object-oriented programming project. Does not represent a commercial production deployment."
  },
  {
    id: "water-filter-monitor",
    title: "Portable Water Filter & Safety Monitoring System",
    subtitle: "Embedded Sensor-Based Quality Screening & Filtration",
    category: "Embedded Systems / Sensors",
    categoryFilter: "embedded",
    statusBadge: "HARDWARE PROTOTYPE ARCHITECTURE",
    statusType: "prototype",
    repositoryUrl: null,
    accentColor: "#39FF88",
    image: "assets/images/projects/water-filter-safety-emblem.png",
    shortOverview: "A proposed portable embedded system that monitors water-quality indicators and automates a multi-stage filtration workflow with sensory feedback.",
    problemAddressed: "Lack of accessible, portable testing devices in remote communities to quickly screen key physical water parameters before and after basic filtration.",
    keyFeatures: [
      "Real-time pH sensor module integration",
      "Turbidity sensing for suspended particle detection",
      "Total Dissolved Solids (TDS) meter integration",
      "Water temperature sensor monitoring",
      "OLED/LCD status display for instant local readouts",
      "Visual LED alert indicators and audio buzzer warnings",
      "Rechargeable battery power management system",
      "Relay-controlled automated pump mechanism",
      "Multi-stage physical filtration workflow",
      "Comparative post-filtration sensor validation cycle"
    ],
    techStack: ["Microcontroller Prototyping", "C / C++", "Analog Sensors", "Relay Drivers", "Power Management"],
    workflow: "MEASURE INITIAL SENSORS → EVALUATE THRESHOLDS → ALERT OPERATOR → ENGAGE FILTER PUMP → MEASURE & VALIDATE AGAIN",
    contribution: "Academic Embedded Systems Project. Formulated sensor integration schematics, measurement logic flow, and prototype circuit design.",
    statusDisclaimer: "Educational hardware prototype concept. Note: Designed for preliminary physical water screening; does not replace certified laboratory microbiological testing."
  },
  {
    id: "icctskolar",
    title: "ICCTskolar",
    subtitle: "Scholarship Discovery & Application Tracking System",
    category: "Software Design / Mobile Concept",
    categoryFilter: "mobile",
    statusBadge: "MOBILE APPLICATION PROPOSAL",
    statusType: "proposal",
    repositoryUrl: null,
    accentColor: "#8B5CF6",
    image: "assets/images/projects/icctskolar-orbital-emblem.png",
    shortOverview: "A proposed mobile-based scholarship discovery and application preparation system tailored for students of ICCT Colleges to eliminate missed deadlines and confusing requirements.",
    problemAddressed: "Students often miss financial assistance opportunities due to scattered announcements, confusing eligibility criteria, unorganized document checklists, and unmonitored deadlines.",
    keyFeatures: [
      "Centralized directory of institutional and external scholarships",
      "Rule-based preliminary eligibility matching algorithm",
      "Scholarship-specific digital document checklist with progress bars",
      "Automated application deadline alerts and calendar notifications",
      "Application-readiness monitoring dashboard",
      "Self-reported application status tracking (Draft, Submitted, Under Review, Awarded)",
      "Offline access to synchronized criteria and requirements",
      "Administrative verification metadata support",
      "Direct guidance based on stored scholarship rules",
      "Quick links to official institutional submission portals"
    ],
    techStack: ["Flutter / Dart Concepts", "UI/UX Flow Design", "Figma", "Rule-Based Matching Logic"],
    workflow: "DISCOVER SCHOLARSHIPS → CHECK ELIGIBILITY → ORGANIZE DOCUMENTS → TRACK DEADLINES → MONITOR APPLICATION",
    contribution: "Academic Software Design Concept. Formulated feature specifications, mobile wireframes, user journeys, and preliminary criteria matching rules.",
    statusDisclaimer: "Proposed mobile application concept. The matching engine provides preliminary guidance only and does not supersede official institution scholarship decisions."
  },
  {
    id: "printing-kiosk",
    title: "Self-Service Printing Kiosk with Hybrid Payment",
    subtitle: "Automated Document Printing & Cash/Digital Payment Integration",
    category: "Capstone Thesis / Project Design",
    categoryFilter: "capstone",
    statusBadge: "CAPSTONE THESIS PROJECT DESIGN",
    statusType: "capstone",
    repositoryUrl: null,
    accentColor: "#FF3CAC",
    image: "assets/images/projects/nextprint-emblem.png",
    shortOverview: "An academic capstone project designing a self-service printing kiosk to streamline campus document printing through an automated kiosk workflow supporting cash and digital payments.",
    problemAddressed: "Long queues at traditional campus printing shops, high reliance on manual counter attendants, and limited payment flexibility during peak submission hours.",
    keyFeatures: [
      "Self-service touch interface for document submission (USB / Cloud QR)",
      "Flexible print configuration (Page range, Color/Monochrome, Paper size, Copies)",
      "Hybrid payment workflow supporting both cash bill acceptor and digital payment QR",
      "Real-time transaction feedback and dynamic cost calculation",
      "Automated print job queuing and printer controller integration",
      "Audit logging and paper/toner level diagnostic reporting",
      "Reduced dependence on manual counter transactions for faster campus throughput"
    ],
    techStack: ["Systems Architecture", "Touch UI Design", "Hardware Controller Concepts", "Payment Flow Design", "Technical Documentation"],
    workflow: "UPLOAD DOCUMENT → CONFIGURE PRINT OPTIONS → CALCULATE FEE → SELECT PAYMENT (CASH / DIGITAL) → EXECUTE PRINT & RECEIPT",
    contribution: "Academic Capstone Group Project. Focused on system architecture diagrams, user interaction workflows, and hardware/software interface planning.",
    statusDisclaimer: "Academic capstone thesis and architectural proposal. Hardware diagrams represent conceptual integration; live third-party financial processing is not deployed."
  }
];

export const SKILLS_DATA = [
  {
    category: "Frontend Development",
    icon: "code",
    skills: [
      { name: "HTML5", level: "Working Knowledge", desc: "Semantic markup, accessibility standards, SEO structure" },
      { name: "CSS3 / Modern CSS", level: "Working Knowledge", desc: "Flexbox, Grid, CSS Variables, Keyframes, Glassmorphism" },
      { name: "JavaScript / ES6+", level: "Working Knowledge", desc: "Async/await, DOM manipulation, modular architectures, Web APIs" },
      { name: "Responsive UI Development", level: "Working Knowledge", desc: "Mobile-first layouts, media queries, cross-browser compatibility" }
    ]
  },
  {
    category: "Mobile & Scripting",
    icon: "smartphone",
    skills: [
      { name: "Flutter", level: "Currently Learning", desc: "Cross-platform mobile widget trees and reactive state concepts" },
      { name: "Dart", level: "Currently Learning", desc: "Object-oriented mobile application programming fundamentals" },
      { name: "Python", level: "Academic Experience", desc: "Data processing, script automation, computational engineering tasks" }
    ]
  },
  {
    category: "UI/UX & Creative Design",
    icon: "figma",
    skills: [
      { name: "Figma", level: "Working Knowledge", desc: "Interface wireframing, component design, visual design systems" },
      { name: "Wireframing & Prototyping", level: "Working Knowledge", desc: "Low-to-high fidelity user journeys and interactive mockups" },
      { name: "Cyberpunk / Futuristic UI", level: "Creative Specialty", desc: "HUD elements, neon aesthetics, terminal motifs, tactical layouts" },
      { name: "User Experience Enhancement", level: "Working Knowledge", desc: "Information hierarchy, accessibility contrast, smooth feedback" }
    ]
  },
  {
    category: "AI-Assisted Development",
    icon: "sparkles",
    skills: [
      { name: "ChatGPT & Claude", level: "Daily Workflow", desc: "Architecture ideation, rapid prototyping, code refactoring" },
      { name: "Google Gemini", level: "Daily Workflow", desc: "Technical research, documentation analysis, multimodal testing" },
      { name: "GitHub Copilot", level: "Daily Workflow", desc: "Contextual code completions, boilerplate acceleration, unit tests" }
    ]
  },
  {
    category: "Embedded Systems",
    icon: "cpu",
    skills: [
      { name: "Microcontroller Prototyping", level: "Academic Experience", desc: "Arduino / ESP32 board interfacing and GPIO pin configuration" },
      { name: "Analog & Digital Sensors", level: "Academic Experience", desc: "pH probes, turbidity sensors, TDS meters, temperature thermistors" },
      { name: "Actuators & Relays", level: "Academic Experience", desc: "Relay modules, DC motor pump control, OLED/LCD status modules" },
      { name: "Power Management Concepts", level: "Academic Experience", desc: "Rechargeable battery circuits, voltage regulation, safety cutoffs" }
    ]
  },
  {
    category: "Cisco Networking",
    icon: "network",
    skills: [
      { name: "Cisco Packet Tracer", level: "Academic Coursework", desc: "Topology design, device configuration, packet inspection" },
      { name: "IPv4 Addressing & Subnetting", level: "Academic Coursework", desc: "VLSM, CIDR notation, subnet calculations, address planning" },
      { name: "Routing & Switching", level: "Academic Coursework", desc: "Static routing, basic RIP/OSPF concepts, switchport modes" },
      { name: "VLAN Segmentation", level: "Academic Coursework", desc: "VLAN creation, trunking (802.1Q), inter-VLAN routing concepts" },
      { name: "Network Troubleshooting", level: "Academic Coursework", desc: "Ping, traceroute, ARP tables, CLI verification commands" }
    ]
  },
  {
    category: "Collaboration & Leadership",
    icon: "users",
    skills: [
      { name: "Project Team Leadership", level: "Applied Experience", desc: "Coordinating student engineering teams and task milestones" },
      { name: "Technical Documentation", level: "Working Knowledge", desc: "Writing system specifications, schematics, and flow diagrams" },
      { name: "Git & Version Control", level: "Working Knowledge", desc: "Branching, committing, repository organization on GitHub" }
    ]
  }
];

export const CERTIFICATES_DATA = [
  {
    id: "safer-internet-day-2026",
    title: "Safer Internet Day: Cybersecurity for Everyone",
    issuer: "Department of Information and Communications Technology (DICT)",
    subIssuer: "CALABARZON Regional Office (Region IV-A)",
    date: "February 10, 2026",
    certificateId: "DICTR4A-2026-0210-147",
    officer: "Carlo Paolo P. Murcia (Officer-in-Charge)",
    category: "Cybersecurity & Digital Defense",
    image: "assets/images/certificates/safer-internet-day-2026.png",
    preview: "assets/images/certificate-previews/safer-internet-day-2026.webp",
    aspectRatio: "landscape",
    summary: "Certificate of Participation issued to Lucky Arlie T. Evangelista for participating in the Safer Internet Day: Cybersecurity for Everyone summit, strengthening knowledge in cyber defense awareness, internet hygiene, and public security initiatives.",
    verifiedBadge: "VERIFIED DICT RECORD",
    tags: ["Cybersecurity", "DICT CALABARZON", "Digital Safety", "Participation"]
  },
  {
    id: "secure-networking-seminar-2026",
    title: "Advancing Secure Networking for Smart Environment: Design, Threat Modeling & Mitigation",
    issuer: "ICCT Colleges Foundation Inc.",
    subIssuer: "College of Engineering & Digital Technology / DMNS (13th Engineering Day)",
    date: "March 3, 2026",
    certificateId: "ENGDAY13-NETSEC-2026",
    officer: "Engr. Mark Anthony Melendrez (Facilitator) | Engr. Ivanlee A. Mendoza (COEDT) | Mr. Meiko G. Rios (DMNS)",
    category: "Network Security & Threat Modeling",
    image: "assets/images/certificates/secure-networking-seminar-2026.png",
    preview: "assets/images/certificate-previews/secure-networking-seminar-2026.webp",
    aspectRatio: "landscape",
    summary: "Certificate of Participation awarded for actively participating in 'Advancing Secure Networking for Smart Environment: Design, Threat Modeling, and Mitigation Strategies' at ICCT Colleges Amphitheater, covering defense architectures and threat modeling.",
    verifiedBadge: "13TH ENGINEERING DAY",
    tags: ["Secure Networking", "Threat Modeling", "Smart Environments", "COEDT"]
  },
  {
    id: "iot-smart-environments-seminar-2025",
    title: "Advancing R&D in IoT for Smart Environments: Innovations and Future Directions",
    issuer: "ICCT Colleges Foundation Inc.",
    subIssuer: "College of Engineering & Digital Technology / DMNS (12th Engineering Day)",
    date: "March 6, 2025",
    certificateId: "ENGDAY12-IOT-2025",
    officer: "Engr. Mark Anthony V. Melendrez (Facilitator) | Engr. Ivanlee A. Mendoza (COEDT) | Ms. Daniela D. Madriaga (IES President)",
    category: "Embedded IoT & Smart Systems",
    image: "assets/images/certificates/iot-smart-environments-seminar-2025.png",
    preview: "assets/images/certificate-previews/iot-smart-environments-seminar-2025.webp",
    aspectRatio: "landscape",
    summary: "Certificate of Participation for completing the specialized seminar on IoT sensor architectures, telemetry pipelines, smart environment deployment, and modern embedded research directions at ICCT Colleges Cainta Campus.",
    verifiedBadge: "12TH ENGINEERING DAY",
    tags: ["Internet of Things", "Smart Environments", "R&D", "Sensor Nodes"]
  },
  {
    id: "iecep-student-chapter",
    title: "Institute of Electronics Engineers of the Philippines (IECEP) Membership",
    issuer: "IECEP - ICCT Student Chapter",
    subIssuer: "College of Engineering and Digital Technology",
    date: "Signed April 15, 2025 (Valid 3rd Trimester A.Y. 2024-2025)",
    certificateId: "Membership ID: 2025-T3-0242",
    officer: "Jude Anson E. Ancaja (President) | Engr. Ivanlee A. Mendoza (Coordinator)",
    category: "Professional Student Chapter",
    image: "assets/images/certificates/iecep-student-chapter-membership.png",
    preview: "assets/images/certificate-previews/iecep-student-chapter-membership.webp",
    aspectRatio: "portrait",
    summary: "Certificate of Membership certifying that Lucky Arlie Evangelista (Membership ID: 2025-T3-0242), a 2nd Year BSCOE student, is duly registered as a bona fide member of IECEP - ICCT Student Chapter.",
    verifiedBadge: "IECEP STUDENT CHAPTER",
    tags: ["IECEP-ICCT", "Electronics & Computing", "Membership ID: 2025-T3-0242"]
  },
  {
    id: "icct-engineering-society-2025",
    title: "ICCT Engineering Society (IES) Membership — 2nd Year",
    issuer: "ICCT Colleges Foundation Inc.",
    subIssuer: "ICCT Engineering Society (IES)",
    date: "Third Trimester of A.Y. 2024–2025 (Valid until June 30, 2025)",
    certificateId: "IES-OSO-2025",
    officer: "Daniela D. Madriaga (IES President) | Ms. Farhana V. Mindalano (Adviser) | Ms. Joanne T. Graniel (Adviser)",
    category: "Academic Society Membership",
    image: "assets/images/certificates/icct-engineering-society-membership-2025.png",
    preview: "assets/images/certificate-previews/icct-engineering-society-membership-2025.webp",
    aspectRatio: "portrait",
    summary: "Certificate of Membership issued in celebration of OSO Membership Day 2025, certifying Lucky Trinidad Evangelista as a 2nd Year BS Computer Engineering bona fide member of IES valid until June 30, 2025.",
    verifiedBadge: "IES 2ND YEAR RECORD",
    tags: ["ICCT Colleges", "IES", "BS Computer Engineering", "2nd Year"]
  },
  {
    id: "icct-engineering-society-2024",
    title: "ICCT Engineering Society (IES) Membership — 1st Year",
    issuer: "ICCT Colleges Foundation Inc.",
    subIssuer: "College of Engineering and Digital Technology - DMNS",
    date: "A.Y. 2023–2024, Third Trimester",
    certificateId: "IES-BSCOE-2024",
    officer: "Mr. Rommel T. Dasalla, LPT (OIC) | Daniela D. Madriaga (President)",
    category: "Academic Society Membership",
    image: "assets/images/certificates/icct-engineering-society-membership.png",
    preview: "assets/images/certificate-previews/icct-engineering-society-membership.webp",
    aspectRatio: "portrait",
    summary: "Foundational Certificate of Membership confirming Lucky Arche T. Evangelista as a 1st Year BSCOE student and bona fide member of IES for Academic Year 2023-2024 Third Trimester.",
    verifiedBadge: "IES 1ST YEAR RECORD",
    tags: ["ICCT Colleges", "IES", "BS Computer Engineering", "1st Year"]
  },
  {
    id: "icpep-membership-2025",
    title: "Institute of Computer Engineers of the Philippines (ICPEP) Membership — 2025",
    issuer: "ICPEP — ICCT Chapter",
    subIssuer: "College of Engineering and Digital Technology",
    date: "Valid until March 05, 2025",
    certificateId: "ICPEP-ICCT-2025",
    officer: "Bonie Jay T. Lansangan (President) | Engr. Ivanlee A. Mendoza (Coordinator)",
    category: "Professional Student Chapter",
    image: "assets/images/certificates/icpep-membership.png",
    preview: "assets/images/certificate-previews/icpep-membership.webp",
    aspectRatio: "portrait",
    summary: "Official Certificate of Membership affirming that Lucky Arlie T. Evangelista, a 2nd year student of ICCT Colleges Foundation, Inc., is legitimately affiliated with ICPEP — ICCT Chapter (valid until March 05, 2025).",
    verifiedBadge: "ICPEP CHAPTER AFFILIATION",
    tags: ["ICPEP", "Computer Engineering", "Professional Body", "2nd Year"]
  },
  {
    id: "icpep-membership-2024",
    title: "Institute of Computer Engineers of the Philippines (ICPEP) Membership — 2024",
    issuer: "ICPEP — ICCT Chapter",
    subIssuer: "College of Engineering and Digital Technology",
    date: "Valid until November 30, 2024",
    certificateId: "ICPEP-ICCT-2024",
    officer: "Bonie Jay T. Lansangan (President) | Engr. Ivanlee A. Mendoza (Coordinator) | Mr. Rommel T. Dasalla, LPT",
    category: "Professional Student Chapter",
    image: "assets/images/certificates/icpep-membership-2024.png",
    preview: "assets/images/certificate-previews/icpep-membership-2024.webp",
    aspectRatio: "portrait",
    summary: "Historical Certificate of Membership affirming that Lucky Arlie T. Evangelista, a 2nd year student, is legitimately affiliated with ICPEP — ICCT Chapter (valid until November 30, 2024).",
    verifiedBadge: "ICPEP HISTORICAL RECORD",
    tags: ["ICPEP", "Computer Engineering", "Historical Record", "2024"]
  }
];

export const TIMELINE_DATA = [
  {
    period: "2023",
    title: "Programming Foundations & Computational Logic",
    tag: "ACADEMIC MILESTONE",
    desc: "Commenced Bachelor of Science in Computer Engineering at ICCT Colleges. Mastered programming fundamentals, structured problem decomposition, and algorithmic problem-solving."
  },
  {
    period: "2023 — 2024",
    title: "Interface Prototyping & ICCT Engineering Society (IES)",
    tag: "SOCIETY AFFILIATION",
    desc: "Joined the ICCT Engineering Society (IES) during the 3rd Trimester (1st Year). Initiated design exploration in Figma, UI wireframing, and user-centric frontend experiences."
  },
  {
    period: "2024",
    title: "Object-Oriented Development & TourMana PH Proposal",
    tag: "SOFTWARE PROJECT",
    desc: "Collaborated on TourMana PH, designing an OOP-based conceptual platform for promoting regional Philippine tourism and heritage site discovery."
  },
  {
    period: "2024 — 2025",
    title: "Embedded Systems, IoT Seminar & ICPEP Chapter Affiliations",
    tag: "HARDWARE & AFFILIATION",
    desc: "Affiliated with ICPEP ICCT Chapter (2024 & 2025 memberships). Participated in 12th Engineering Day R&D seminar: 'Advancing Research and Development in IoT for Smart Environments' (March 6, 2025). Formulated sensor prototypes for water filtration."
  },
  {
    period: "2025",
    title: "IECEP & IES OSO Day Memberships, ICCTskolar & Capstone Kiosk",
    tag: "CAPSTONE & CHAPTERS",
    desc: "Registered with IECEP-ICCT Chapter (ID: 2025-T3-0242) and renewed IES membership during OSO Membership Day 2025. Developed UI flows for ICCTskolar scholarship tracking and architected the Capstone Self-Service Printing Kiosk concept."
  },
  {
    period: "2025 — 2026",
    title: "Cisco Networking Suite, DICT Cybersecurity & Smart Network Security",
    tag: "NETWORKING & SECURITY",
    desc: "Completed Cisco Fundamentals of Networking 1-3. Participated in DICT's Safer Internet Day: Cybersecurity for Everyone (Certificate DICTR4A-2026-0210-147) and 13th Engineering Day seminar: 'Advancing Secure Networking for Smart Environment' (March 3, 2026)."
  },
  {
    period: "Future Direction",
    title: "Target: Network Engineer & CCNA Certification",
    tag: "LONG-TERM GOAL",
    desc: "Steadily progressing toward full Cisco Certified Network Associate (CCNA) certification while expanding modern full-stack web and network engineering integrations."
  }
];
