import {
  experience,
  profile,
  projects,
  tools,
  recruiterQuestions,
} from "./portfolio";
export const suggestions = recruiterQuestions;
function roleAnswer(id: string) {
  const entry = experience.find((item) => item.id === id);
  return entry
    ? `${entry.company} — ${entry.role} (${entry.date}). ${entry.summary}\n\n${entry.bullets.map((bullet) => "• " + bullet).join("\n")}`
    : "That experience detail is not available.";
}
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  if (/tesla|carrier|manufactur/.test(q)) return roleAnswer("tesla");
  if (
    /bank|bofa|financ|data platform|metric|impact|scale|million|800k|saving/.test(
      q,
    )
  )
    return roleAnswer("bank-of-america-senior");
  const project = projects.find(
    (p) => q.includes(p.slug.split("-")[0]) || q.includes(p.name.toLowerCase()),
  );
  if (project)
    return `${project.name}: ${project.description}\n\nArchitecture: ${project.architecture.join(" → ")}.\n\n${project.decisions.join("\n")}\n\n${project.note}\n\nSource: ${project.repo}`;
  const tool = [...tools]
    .sort((a, b) => b.name.length - a.name.length)
    .find((item) =>
      [item.name.toLowerCase(), item.id].some((name) => {
        const start = q.indexOf(name);
        return (
          start >= 0 &&
          !/[a-z0-9]/.test(q[start - 1] || "") &&
          !/[a-z0-9]/.test(q[start + name.length] || "")
        );
      }),
    );
  if (tool)
    return `${tool.name}: ${tool.summary}\n\n${tool.proof.map((item) => `${item.kind} — ${item.title}: ${item.detail}`).join("\n\n")}`;
  if (/education|university|degree|gmu|student/.test(q))
    return roleAnswer("george-mason");
  if (/contact|email|linkedin|github|resume|résumé/.test(q))
    return `Email: ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. Download the résumé using the Resume button.`;
  if (/agent|mcp|adk|ai project|rag/.test(q)) {
    const p = projects.find((p) => p.slug === "routemind-ai")!;
    return `${p.name}: ${p.description} ${p.note}`;
  }
  if (/who|overview|background|hire|role|experience|about/.test(q))
    return `${profile.name} — ${profile.title}. ${profile.tagline}\n\n${experience.map((entry) => `${entry.company}: ${entry.role} (${entry.date})`).join("\n")}`;
  return "I can answer about the experience and projects listed in this portfolio. Try a question about Tesla, Bank of America, RouteMind AI, a technology, education, or contact details.";
}
