"use client";
import { hiringLenses } from "@/data/portfolio";
import type { HiringLens } from "@/data/portfolio";
export default function HiringLenses({
  value,
  onChange,
}: {
  value: HiringLens;
  onChange: (lens: HiringLens) => void;
}) {
  return (
    <div className="hiring-lenses">
      <div role="group" aria-label="Hiring lens">
        {hiringLenses.map((lens) => (
          <button
            type="button"
            className={value === lens.id ? "selected" : ""}
            key={lens.id}
            aria-pressed={value === lens.id}
            aria-controls="experience work skills"
            onClick={() => onChange(lens.id)}
          >
            {lens.label}
          </button>
        ))}
      </div>
      <p role="status">
        {hiringLenses.find((lens) => lens.id === value)?.description}
      </p>
    </div>
  );
}
