import { experience, profile, projects } from "./portfolio";
export const suggestions = [
  "What did Chetana build at Tesla?",
  "Tell me about her data platform experience.",
  "How does RouteMind AI work?",
];
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  if (/tesla|carrier|manufactur/.test(q))
    return `${experience[0].role} at Tesla’s Factory Software Team (Summer 2026, Fremont): Chetana built manufacturing infrastructure and designed a conversational AI assistant for Carrier Rate Creation. The supplied background does not include implementation details or measured outcomes for that assistant. RouteMind AI is a separate public logistics project, not Tesla code.`;
  if (/bank|financ|data platform|metric|impact|scale|million/.test(q))
    return "At Bank of America (2017–2025), Chetana worked on asset valuation and margin call processing. Her résumé reports 55M+ daily calculations automated, ~52% higher distributed task throughput, and $800K in annual infrastructure savings from a Kafka/REST modernization. She also redesigned a service handling 10M+ financial calculations per day. These are résumé-reported outcomes, not portfolio benchmarks.";
  const project = projects.find(
    (p) => q.includes(p.slug.split("-")[0]) || q.includes(p.name.toLowerCase()),
  );
  if (project)
    return `${project.name}: ${project.description}\n\nArchitecture: ${project.architecture.join(" → ")}.\n\n${project.decisions[0]} ${project.note}\n\nSource: ${project.repo}`;
  if (/agent|mcp|adk|ai project|rag/.test(q))
    return "RouteMind AI is the clearest public example: LangGraph orchestration, PydanticAI typed extraction, hybrid Chroma/BM25 retrieval, and a deterministic route optimizer. It uses synthetic freight data and does not claim production savings. MCP and ADK are listed as current focus areas; the inspected repositories do not establish a production MCP or ADK deployment. Gita Guru also demonstrates Claude-powered multilingual learning. Explore the case studies for source links.";
  if (/contact|email|linkedin|github|resume|résumé/.test(q))
    return `Contact Chetana at ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. Download the résumé from the Resume button. The supplied PDF predates the Tesla update in this portfolio.`;
  if (/education|university|degree|gmu|student/.test(q))
    return "Chetana is pursuing an M.S. in Computer Science with a Machine Learning concentration at George Mason University. She also mentors 40+ students as a Graduate Teaching Assistant. Her BTech in Computer Engineering is from Veermata Jijabai Technological Institute, Mumbai (2017).";
  if (/who|overview|background|hire|role|experience|about/.test(q))
    return "Chetana Kamraj Patel is a Software & Applied AI Engineer in Northern Virginia / the Washington, D.C. area. Her background spans Tesla factory software, eight years at Bank of America, and an M.S. in Computer Science at George Mason University. Her work connects conversational AI, distributed data platforms, and reliable backend infrastructure.";
  return "I can answer from Chetana’s supplied background and public project documentation. Try asking about Tesla, Bank of America, RouteMind AI, Gita Guru, education, or contact details. I don’t have verified information about that specific question.";
}
