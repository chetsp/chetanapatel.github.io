import { experience, profile, tools, education } from "./portfolio";
export const siteUrl = profile.website + "/";
export const profileStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": siteUrl + "#profile",
      url: siteUrl,
      name: `${profile.shortName} — ${profile.title}`,
      description: profile.tagline,
      mainEntity: { "@id": siteUrl + "#person" },
    },
    {
      "@type": "Person",
      "@id": siteUrl + "#person",
      name: profile.name,
      alternateName: profile.shortName,
      url: siteUrl,
      jobTitle: profile.title,
      description: profile.tagline,
      email: "mailto:" + profile.email,
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: tools.map((tool) => tool.name),
      hasOccupation: experience
        .filter((entry) => entry.company !== "George Mason University")
        .map((entry) => ({
          "@type": "Occupation",
          name: entry.role,
          description: `${entry.company} · ${entry.team} · ${entry.date}. ${entry.summary}`,
        })),
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: education[0].institution,
        url: education[0].url,
        description:
          "M.S. in Computer Science, Machine Learning concentration (2026); graduate teaching and study in algorithms, machine learning, distributed systems, and agentic workflows.",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: education[1].institution,
        url: education[1].url,
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: education[1].degree,
        credentialCategory: "Bachelor degree",
        description: "Veermata Jijabai Technological Institute, Mumbai, 2017.",
      },
      subjectOf: {
        "@type": "CreativeWork",
        name: `${profile.shortName} résumé`,
        url: siteUrl + "Chetana_Patel_Resume.pdf",
        encodingFormat: "application/pdf",
      },
    },
  ],
};
export const structuredDataJson = JSON.stringify(profileStructuredData).replace(
  /</g,
  "\\u003c",
);
