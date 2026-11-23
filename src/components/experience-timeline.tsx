import { ArrowUpRight, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";

function ImpactText({ text }: { text: string }) {
  return text
    .split(
      /(55M\+ daily calculations|52% higher task throughput|\$800K annual infrastructure savings)/g,
    )
    .map((part, index) =>
      /^(55M\+|52%|\$800K)/.test(part) ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      ),
    );
}

export default function ExperienceTimeline() {
  return (
    <div className="experience-timeline">
      {experience.map((entry) => (
        <article
          className={`experience-card panel ${entry.id === "bank-of-america-senior" ? "featured-experience" : ""}`}
          id={entry.id}
          key={entry.id}
          aria-labelledby={`${entry.id}-title`}
        >
          <div className="timeline-marker" aria-hidden="true">
            {entry.icon}
          </div>
          <div className="role-top">
            <span className="experience-company">{entry.company}</span>
            <span className="role-date">{entry.date}</span>
          </div>
          <h3 id={`${entry.id}-title`}>{entry.role}</h3>
          <p className="experience-team">{entry.team}</p>
          <div className="role-location">
            <MapPin size={12} />
            {entry.location}
          </div>
          <p className="role-summary">{entry.summary}</p>
          <ul>
            {entry.bullets.map((bullet) => (
              <li key={bullet}>
                <ArrowUpRight size={12} />
                <span>
                  <ImpactText text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
