import { experience, profile, projects } from "./portfolio";
export const suggestions = [
  "What did Chetana build at Tesla?",
  "Tell me about her data platform experience.",
  "How does RouteMind AI work?",
];
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  if (/tesla|carrier|manufactur/.test(q))
    return `${experience[0].role} at Tesla’s Factory Software Team (Summer 2026, Fremont): Chetana built manufacturing infrastructure and designed a conversational AI assistant for Carrier Rate Creation. The assistant used structured validation and human review for proposed actions. See the Tesla timeline entry for responsibilities.`;
  if (/bank|financ|data platform|metric|impact|scale|million/.test(q))
    return "At Bank of America (2017–2025), Chetana worked on asset valuation and margin call processing. Her résumé reports 55M+ daily calculations automated, ~52% higher distributed task throughput, and $800K in annual infrastructure savings from a Kafka/REST modernization. She also redesigned a service handling 10M+ financial calculations per day. The systems combined distributed workers, Python orchestration, Linux clusters, Kafka, and REST services.";
  const project = projects.find(
    (p) => q.includes(p.slug.split("-")[0]) || q.includes(p.name.toLowerCase()),
  );
  if (project)
    return `${project.name}: ${project.description}\n\nArchitecture: ${project.architecture.join(" → ")}.\n\n${project.decisions[0]} ${project.note}\n\nSource: ${project.repo}`;
  if (/agent|mcp|adk|ai project|rag/.test(q))
    return "RouteMind AI is the clearest public example: LangGraph orchestration, PydanticAI typed extraction, hybrid Chroma/BM25 retrieval, and a deterministic route optimizer. The routing demo uses synthetic freight data. MCP and ADK are additional focus areas for tool integration and agent workflows. Gita Guru also demonstrates Claude-powered multilingual learning. Explore the case studies for source links.";
  if (/contact|email|linkedin|github|resume|résumé/.test(q))
    return `Contact Chetana at ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. Download the résumé from the Resume button. `;
  if (/education|university|degree|gmu|student/.test(q))
    return "Chetana is pursuing an M.S. in Computer Science with a Machine Learning concentration at George Mason University. She also mentors 40+ students as a Graduate Teaching Assistant. Her BTech in Computer Engineering is from Veermata Jijabai Technological Institute, Mumbai (2017).";
  if (/who|overview|background|hire|role|experience|about/.test(q))
    return "Chetana Kamraj Patel is a Software & Applied AI Engineer in Northern Virginia / the Washington, D.C. area. Her background spans Tesla factory software, eight years at Bank of America, and an M.S. in Computer Science at George Mason University. Her work connects conversational AI, distributed data platforms, and reliable backend infrastructure.";
  return "I can help with questions about Chetana’s engineering experience and projects. Try asking about Tesla, Bank of America, RouteMind AI, Gita Guru, education, or contact details. I don’t have verified information about that specific question.";
}
