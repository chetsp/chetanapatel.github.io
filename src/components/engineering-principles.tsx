import { Layers3, ShieldCheck, Workflow } from "lucide-react";
import { engineeringPrinciples } from "@/data/portfolio";
const icons = {
  reliability: ShieldCheck,
  governance: Workflow,
  ownership: Layers3,
};
export default function EngineeringPrinciples() {
  return (
    <div className="engineering-principles">
      <span className="tiny-label principles-heading">
        ENGINEERING PRINCIPLES
      </span>
      {engineeringPrinciples.map((principle) => {
        const Icon = icons[principle.id as keyof typeof icons];
        return (
          <article className="principle-card panel" key={principle.id}>
            <Icon size={23} strokeWidth={1.6} />
            <h3>{principle.title}</h3>
            <p>{principle.detail}</p>
          </article>
        );
      })}
    </div>
  );
}
