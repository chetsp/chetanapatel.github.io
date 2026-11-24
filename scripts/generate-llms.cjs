const fs = require("node:fs");
const path = require("node:path");
const {
  profile,
  education,
  experience,
  projects,
  tools,
  heroMetrics,
  hiringLenses,
} = require("../src/data/portfolio.ts");
const home = profile.website + "/";
function absolute(href) {
  if (href.startsWith("http")) return href;
  if (href.startsWith("#")) return home + href;
  return home + href.replace(/^\/+/, "");
}
const lines = [
  `# ${profile.name}`,
  `> ${profile.title}. ${profile.tagline}`,
  "",
  `Website: ${home}`,
  `GitHub: ${profile.github}`,
  `LinkedIn: ${profile.linkedin}`,
  "",
  "## Hiring relevance",
  ...hiringLenses
    .filter((l) => l.id !== "all")
    .map((l) => `- **${l.label}:** ${l.description.replace(/^Focus: /, "")}`),
  "",
  "## Career and education",
];
for (const entry of experience)
  lines.push(
    "",
    `### ${entry.role} — ${entry.company} (${entry.date})`,
    entry.team,
    entry.summary,
    ...entry.bullets.map((b) => "- " + b),
    `Details: ${home}#${entry.id}`,
  );
lines.push(
  "",
  "## Education",
  ...education.map(
    (item) =>
      `- ${item.degree}${item.concentration ? ` (${item.concentration})` : ""} — ${item.institution}, ${item.year}. ${item.status}.`,
  ),
);
lines.push(
  "",
  "## Key outcomes",
  ...heroMetrics.map(
    (metric) =>
      `- ${metric.value} ${metric.label.toLowerCase()}. ${home}#${metric.target}`,
  ),
  "",
  "## Selected open-source projects",
);
for (const project of projects)
  lines.push(
    "",
    `### ${project.name}`,
    project.description,
    `Stack: ${project.tags.join(", ")}.`,
    `Architecture: ${project.architecture.join(" → ")}.`,
    `Scope: ${project.note}`,
    `Case study: ${home}work/${project.slug}/`,
    `Repository: ${project.repo}`,
  );
lines.push("", "## Tools, skills, and implementation context");
for (const tool of tools)
  lines.push(
    `- **${tool.name}** (${tool.badge}): ${tool.summary}${tool.proof[0] ? ` ${tool.proof[0].kind}: ${tool.proof[0].title}. ${absolute(tool.proof[0].href)}` : ""}`,
  );
lines.push(
  "",
  "## Contact and résumé",
  `- Email: mailto:${profile.email}`,
  `- Résumé PDF: ${home}Chetana_Patel_Resume.pdf`,
  `- GitHub: ${profile.github}`,
  `- LinkedIn: ${profile.linkedin}`,
  "",
  "## Scope notes",
  "- Professional roles and metrics are maintained in the portfolio data. RouteMind uses synthetic freight data and does not book shipments or provide live quotes.",
  "- Exploration badges describe current learning; they do not imply production deployment.",
  "- The contact section provides direct email and social links. There is no contact form.",
  "",
);
fs.writeFileSync(path.join(__dirname, "../public/llms.txt"), lines.join("\n"));
console.log("Generated public/llms.txt from portfolio data");
