export type Category =
  | "All work"
  | "Agents & MCP"
  | "Data platforms"
  | "Machine learning"
  | "Full-stack";
export type Project = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  category: Category;
  tags: string[];
  repo: string;
  metric: string;
  metricLabel: string;
  color: string;
  problem: string;
  architecture: string[];
  decisions: string[];
  outcomes: string[];
  note: string;
};
export const profile = {
  name: "Chetana Kamraj Patel",
  shortName: "Chetana Patel",
  title: "Software & Applied AI Engineer",
  tagline:
    "Building production AI agents, scalable data platforms, and reliable software infrastructure.",
  location: "Northern Virginia / Washington, D.C.",
  email: "patelkchetana@gmail.com",
  github: "https://github.com/chetsp",
  linkedin: "https://www.linkedin.com/in/cschetanapatel/",
  resume:
    "https://drive.google.com/file/d/1QKwLcst_WOcJED3Td2-cdrqP0Czb_tDL/view?usp=sharing",
};
export const categories: Category[] = [
  "All work",
  "Agents & MCP",
  "Data platforms",
  "Machine learning",
  "Full-stack",
];
export const projects: Project[] = [
  {
    slug: "routemind-ai",
    name: "RouteMind AI",
    kicker: "CONVERSATIONAL LOGISTICS",
    description:
      "Natural language in. Verified shipment plans out. An AI planning system that knows when to ask, reason, and say no.",
    category: "Agents & MCP",
    tags: ["LangGraph", "PydanticAI", "FastAPI", "Chroma", "PostgreSQL"],
    repo: "https://github.com/chetsp/RouteMind-AI",
    metric: "3 legs",
    metricLabel: "constraint-verified routing",
    color: "lime",
    problem:
      "Shipment planners need to compare cost, timing, capacity, and carrier requirements without losing context between follow-up questions. RouteMind explores this workflow with synthetic freight data.",
    architecture: [
      "Shipment request",
      "Typed extraction",
      "LangGraph orchestration",
      "Hybrid evidence retrieval",
      "Deterministic optimizer",
      "Verified plan + citations",
    ],
    decisions: [
      "Keep numerical explanations deterministic and grounded in verified plans rather than model-generated calculations.",
      "Use SQL capability flags as the authority for route eligibility; retrieved documents provide context, not eligibility.",
      "Persist clarification state with a LangGraph SQLite checkpointer. Revisions create linked child requests without overwriting prior plans.",
      "Combine MiniLM semantic retrieval with BM25, with an explicit offline baseline.",
    ],
    outcomes: [
      "Demonstrates routes of up to three scheduled legs with capacity, timing, and handling constraints.",
      "The fixed demo compares a $2,100 route via Phoenix with a $3,400 direct service; a $500 ceiling returns no feasible route.",
      "Includes cited carrier-policy answers, a read-only data explorer, and independently verified what-if options.",
    ],
    note: "Local demonstration with synthetic data, not live freight quotes. No measured production savings or live-model quality claims.",
  },
  {
    slug: "student-survey",
    name: "Campus, connected.",
    kicker: "CLOUD-NATIVE FULL STACK",
    description:
      "A complete campus survey platform, from a responsive React experience to persistent APIs and a Kubernetes deployment.",
    category: "Full-stack",
    tags: ["React", "FastAPI", "MySQL", "Docker", "Kubernetes", "Helm"],
    repo: "https://github.com/chetsp/Full-Stack-Student-Survey-Application",
    metric: "End to end",
    metricLabel: "interface → API → infrastructure",
    color: "blue",
    problem:
      "Prospective students need a straightforward way to share campus feedback, while administrators need reliable tools to manage submissions.",
    architecture: [
      "React + Vite",
      "REST API",
      "FastAPI + SQLModel",
      "MySQL 8",
      "Docker images",
      "Kubernetes + Helm on AWS",
    ],
    decisions: [
      "Separate frontend and API containers so each layer can be deployed independently.",
      "Use SQLModel and SQLAlchemy for typed persistence with MySQL.",
      "Describe deployments and services in Helm templates for repeatable Kubernetes releases.",
    ],
    outcomes: [
      "Implements create, read, update, and delete workflows for campus surveys.",
      "Includes structured form fields, persistent storage, and Swagger API documentation.",
      "Repository documents Docker image builds, AWS EC2 deployment, and k3s orchestration.",
    ],
    note: "Capabilities are documented in the public repository. The portfolio does not claim a currently available live deployment or performance benchmark.",
  },
  {
    slug: "gita-guru",
    name: "Gita Guru",
    kicker: "APPLIED AI · ACCESSIBLE LEARNING",
    description:
      "Ancient wisdom, a more accessible interface. Multilingual explanations, illustrated stories, and browser-native narration.",
    category: "Machine learning",
    tags: ["JavaScript", "Claude", "Web Speech API", "HTML / CSS"],
    repo: "https://github.com/chetsp/Gita-Guru",
    metric: "26+",
    metricLabel: "documented learning languages",
    color: "violet",
    problem:
      "Make a complex text approachable for learners of different ages and languages through conversational explanations and interactive storytelling.",
    architecture: [
      "Chapter + verse selection",
      "Claude explanations",
      "Translated story panels",
      "Web Speech narration",
      "Session progress",
    ],
    decisions: [
      "Use browser-native speech synthesis for language-aware audio playback.",
      "Keep the interface lightweight with vanilla HTML, CSS, and JavaScript.",
      "Use sessionStorage for in-session progress, streaks, XP, and badges.",
    ],
    outcomes: [
      "README describes learning across 18 chapters with 26+ languages.",
      "Includes four-panel stories, narration controls, and an animated SVG character.",
      "Demonstrates an applied generative AI learning interface.",
    ],
    note: "Repository-described feature scope, not independently benchmarked learning outcomes. A public deployment should proxy provider requests to protect credentials.",
  },
  {
    slug: "ai-modernization",
    name: "From design to delivery.",
    kicker: "INTERFACE MODERNIZATION",
    description:
      "A design-first rebuild of a university survey experience, turning a Figma export into a working React and FastAPI product.",
    category: "Data platforms",
    tags: ["React", "TypeScript", "Tailwind", "FastAPI", "SQLite"],
    repo: "https://github.com/chetsp/AI-Modernization",
    metric: "Full CRUD",
    metricLabel: "from static design to live data",
    color: "amber",
    problem:
      "A generated interface is only the beginning. Form state, validation, routing, and persistence are needed to turn a design artifact into a usable application.",
    architecture: [
      "Figma Make design",
      "React + Tailwind",
      "Form validation",
      "FastAPI endpoints",
      "SQLModel + SQLite",
    ],
    decisions: [
      "Refine generated React components with controlled form state and native input behavior.",
      "Wire the interface to real CRUD endpoints rather than leaving static mock data.",
      "Keep brand tokens centralized and use client routing for distinct user journeys.",
    ],
    outcomes: [
      "Connects student survey submission, listing, and deletion to a persistent backend.",
      "Includes a portfolio homepage and a computer science department information page.",
      "Documents how the generated frontend was refined into functional software.",
    ],
    note: "An academic modernization project. No operational performance claims are made.",
  },
];
export const experience = [
  {
    company: "Tesla",
    role: "Software Engineering Intern",
    team: "Factory Software Team",
    date: "Summer 2026",
    location: "Fremont, California",
    summary: "Manufacturing infrastructure meets conversational AI.",
    bullets: [
      "Built manufacturing infrastructure for factory software workflows.",
      "Designed a conversational AI assistant for Carrier Rate Creation.",
    ],
    link: "routemind-ai",
    related: "Explore related logistics work",
    icon: "T",
  },
  {
    company: "Bank of America",
    role: "Senior Software Engineer",
    team: "Asset Valuation & Data Platforms",
    date: "2022 — 2025",
    location: "Financial systems at scale",
    summary: "High-throughput platforms. Measurable business impact.",
    bullets: [
      "Automated 55M+ daily calculations, reducing latency by two-thirds.",
      "Built distributed scheduling with Go workers and Python orchestration; improved throughput by approximately 52%.",
      "Delivered a Kafka and REST service with 85% faster performance and $800K in annual infrastructure savings.",
      "Redesigned processing for 10M+ financial contract calculations daily, delivering margin calls 6 hours sooner.",
    ],
    link: "student-survey",
    related: "Explore related platform engineering",
    icon: "B",
  },
  {
    company: "Bank of America",
    role: "Software Engineer",
    team: "Reliable software foundations",
    date: "2017 — 2022",
    location: "Backend engineering",
    summary: "Turning repetitive work into dependable systems.",
    bullets: [
      "Built a concurrent Python interpreter processing 1M+ call logs in under 10 seconds.",
      "Developed API load-testing infrastructure that saved approximately 450 engineering hours.",
      "Improved production monitoring using Java and Grafana.",
    ],
    link: "ai-modernization",
    related: "Explore related full-stack work",
    icon: "B",
  },
  {
    company: "George Mason University",
    role: "M.S. in Computer Science",
    team: "Machine Learning concentration",
    date: "2026",
    location: "Virginia",
    summary: "Connecting distributed systems with applied machine learning.",
    bullets: [
      "Focus areas include machine learning, agentic AI workflows, MCP, and distributed systems.",
      "As a Graduate Teaching Assistant, mentored 40+ students in algorithms and mathematical problem-solving.",
    ],
    link: "gita-guru",
    related: "Explore applied AI work",
    icon: "G",
  },
];
export const skillGroups = [
  {
    name: "Languages",
    items: ["Python", "Go", "Java", "TypeScript", "SQL", "C/C++"],
    detail: "From concurrent workers to typed interfaces.",
  },
  {
    name: "AI & agents",
    items: ["Gemini", "LangGraph", "MCP", "ADK", "RAG", "Evals"],
    detail: "Current focus: grounded, observable agentic workflows.",
  },
  {
    name: "Backend & data",
    items: [
      "FastAPI",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "Kafka",
      "MySQL",
    ],
    detail: "APIs, streams, and durable data foundations.",
  },
  {
    name: "Cloud & delivery",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "OpenTelemetry"],
    detail: "Shipping reliably, with visibility built in.",
  },
];
export const knowledgeBase = {
  profile,
  experience,
  projects,
  skillGroups,
  sourceNote:
    "Tesla and current focus supplied by Chetana in the portfolio brief. Bank of America metrics and teaching experience from supplied resume. Project scope from public repository READMEs inspected November 22, 2026. Skills listed as current focus are not claims of production ownership. The PDF predates the supplied Tesla update.",
};
