export type Category =
  "All work" | "Agents & MCP" | "Product Engineering" | "Applied AI";
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
    "I build high-throughput financial data platforms and reliable agentic workflows—from processing 55M+ daily calculations at Bank of America to shipping conversational logistics agents.",
  location: "Northern Virginia / Washington, D.C.",
  email: "patelkchetana@gmail.com",
  github: "https://github.com/chetsp",
  linkedin: "https://www.linkedin.com/in/cschetanapatel/",
  resume: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Chetana_Patel_Resume.pdf`,
};
export const categories: Category[] = [
  "All work",
  "Agents & MCP",
  "Product Engineering",
  "Applied AI",
];
export const projects: Project[] = [
  {
    slug: "routemind-ai",
    name: "RouteMind AI",
    kicker: "CONVERSATIONAL LOGISTICS",
    description:
      "Shipment planning with LangGraph, PydanticAI, FastAPI, and Chroma. Validates multi-leg routing constraints and asks for missing parameters before generating a plan.",
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
    note: "Uses synthetic carriers, schedules, and prices. Supports planning and comparison; does not book shipments or return live freight quotes.",
  },
  {
    slug: "gita-guru",
    name: "Gita Guru",
    kicker: "APPLIED AI · ACCESSIBLE LEARNING",
    description:
      "A multilingual learning web app using Claude and JavaScript for explanations across 26+ languages, with browser-native audio narration through the Web Speech API.",
    category: "Applied AI",
    tags: ["JavaScript", "Claude", "Web Speech API", "HTML / CSS"],
    repo: "https://github.com/chetsp/Gita-Guru",
    metric: "26+",
    metricLabel: "learning languages",
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
      "Supports 18 chapters and explanations in 26+ languages.",
      "Includes four-panel stories, narration controls, and an animated SVG character.",
      "Uses Claude to generate verse explanations, story analogies, and learning activities.",
    ],
    note: "The browser uses speech synthesis for narration and sessionStorage for progress. Public hosting requires a server-side proxy for provider credentials.",
  },
  {
    slug: "ai-modernization",
    name: "Survey Application Modernization",
    kicker: "INTERFACE MODERNIZATION",
    description:
      "Converted a static Figma design system into a full-CRUD application using React, TypeScript, Tailwind, and FastAPI, including form validation and persistent storage.",
    category: "Product Engineering",
    tags: ["React", "TypeScript", "Tailwind", "FastAPI", "SQLite"],
    repo: "https://github.com/chetsp/AI-Modernization",
    metric: "Full CRUD",
    metricLabel: "from static design to live data",
    color: "amber",
    problem:
      "The static Figma export needed form state, validation, routing, and persistent CRUD endpoints before students could submit and manage surveys.",
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
      "Includes client-side routes for the homepage, department information, and student survey.",
      "Replaces static form elements with controlled inputs, validation, and API-backed submission management.",
    ],
    note: "University project covering design-system implementation, client-side validation, routing, and CRUD integration.",
  },
];
export const experience = [
  {
    id: "tesla",
    company: "Tesla",
    role: "Software Engineering Intern",
    team: "Factory Software Team",
    date: "Summer 2026",
    location: "Fremont, CA",
    summary:
      "Manufacturing infrastructure and Carrier Rate Creation workflows.",
    bullets: [
      "Built manufacturing infrastructure workflows, connecting factory software requirements with operational processes.",
      "Designed a conversational AI assistant for Carrier Rate Creation, with structured validation of required inputs before changes could proceed.",
      "Included human-in-the-loop safeguards so users could review proposed actions and resolve incomplete requests.",
    ],
    icon: "T",
  },
  {
    id: "george-mason",
    company: "George Mason University",
    role: "M.S. in Computer Science",
    team: "Machine Learning Concentration",
    date: "2026",
    location: "Virginia",
    summary:
      "Graduate coursework and research focus in machine learning, distributed systems, and agentic AI workflows.",
    bullets: [
      "Study machine learning methods and distributed systems, with a focus on applying them to reliable agentic workflows.",
      "Explore Model Context Protocol, retrieval, and tool integration in applied AI systems.",
      "As a Graduate Teaching Assistant, mentor 40+ students in graph algorithms, probability, complexity analysis, and structured problem-solving.",
    ],
    icon: "G",
  },
  {
    id: "bank-of-america-senior",
    company: "Bank of America",
    role: "Senior Software Engineer",
    team: "Asset Valuation & Data Platforms",
    date: "2022 — 2025",
    location: "Margin Call Processing & Asset Valuation Platform",
    summary:
      "Built backend processing and event-driven services for financial calculations and margin workflows.",
    bullets: [
      "Automated 55M+ daily calculations through a distributed processing framework on Linux clusters. Caching and concurrency reduced latency by two-thirds.",
      "Built a distributed task scheduler with Go workers and Python orchestration and monitoring, delivering 52% higher task throughput and fault-tolerant execution across services.",
      "Replaced legacy messaging with Kafka event streams and REST APIs, improving performance by 85% and generating $800K annual infrastructure savings.",
      "Redesigned Margin Call Processing with event-driven microservices handling 10M+ financial contract calculations per day, delivering margin calls 6 hours sooner and removing 10 hours of daily manual review.",
      "Integrated Docker-based CI/CD with AWS and GCP deployments, accelerating releases by 40% and reducing manual intervention by 50%.",
    ],
    icon: "B",
  },
  {
    id: "bank-of-america-engineer",
    company: "Bank of America",
    role: "Software Engineer",
    team: "Backend Services & Developer Infrastructure",
    date: "2017 — 2022",
    location: "Backend engineering",
    summary:
      "Developed concurrent processing, API testing, and production monitoring tools.",
    bullets: [
      "Built a concurrent Python interpreter processing 1M+ call logs in under 10 seconds, reducing manual effort by 72%.",
      "Developed a multiprocessing API load-testing framework for 3,000+ calls, saving approximately 450 engineering hours.",
      "Built Java and Grafana monitoring dashboards to track transactions and system health, reducing downtime by 70%.",
    ],
    icon: "B",
  },
];
export const skillGroups = [
  {
    name: "Languages",
    items: ["Python", "Go", "Java", "TypeScript", "SQL", "C/C++"],
    detail:
      "Python and Go for distributed processing; Java, TypeScript, and SQL for services and applications.",
  },
  {
    name: "AI & Agents",
    items: ["Gemini", "LangGraph", "MCP", "ADK", "RAG", "Evals"],
    detail:
      "Typed extraction, retrieval, tool integration, and evaluations for agent workflows.",
  },
  {
    name: "Backend & Data",
    items: [
      "FastAPI",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "Kafka",
      "MySQL",
    ],
    detail:
      "REST services, event streams, relational storage, and data processing.",
  },
  {
    name: "Cloud & Delivery",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "OpenTelemetry"],
    detail:
      "Container deployment, delivery pipelines, and application telemetry.",
  },
];
export const knowledgeBase = {
  profile,
  experience,
  projects,
  skillGroups,
  sourceNote:
    "Professional background and metrics provided by Chetana. Project architecture and scope are maintained with the linked repositories.",
};
