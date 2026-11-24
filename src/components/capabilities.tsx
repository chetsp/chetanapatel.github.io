"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react";
import { capabilities, tools, profile } from "@/data/portfolio";
import type { CapabilityId, Tool } from "@/data/portfolio";
import ToolIcon from "./tool-icon";
import CapabilityDiagram from "./capability-diagram";
function relevance(pillar: CapabilityId) {
  return pillar === "agents"
    ? "ai"
    : pillar === "systems" || pillar === "cloud"
      ? "backend"
      : "ai backend";
}
function Proof({ tool }: { tool: Tool }) {
  const entries = tool.proof.length
    ? tool.proof
    : [
        {
          kind: "Developer tooling",
          title: tool.name,
          detail: tool.summary,
          href: profile.github,
          linkLabel: "Browse GitHub projects",
        },
      ];
  const exploring =
    !tool.proof.length ||
    tool.proof.every((item) => item.kind === "Exploration");
  return (
    <section
      className="tool-proof panel"
      id="skills-proof"
      aria-labelledby="proof-heading"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="proof-tool">
        <span className="tiny-label">
          <ArrowDownRight size={14} />
          {exploring
            ? "CURRENT FOCUS & RELATED WORK"
            : "WHERE I’VE SHIPPED THIS"}
        </span>
        <div className="proof-tool-name">
          <ToolIcon tool={tool} />
          <h3 id="proof-heading">{tool.name}</h3>
        </div>
        <span className="tool-usage-badge">{tool.badge}</span>
        <p>{tool.summary}</p>
      </div>
      <div className="proof-entries">
        {entries.map((entry) => (
          <article className="proof-entry" key={entry.title}>
            <span className="tiny-label">{entry.kind}</span>
            <h4>{entry.title}</h4>
            <p>{entry.detail}</p>
            {entry.href.startsWith("http") ? (
              <a href={entry.href} target="_blank" rel="noopener noreferrer">
                {entry.linkLabel}
                <ArrowUpRight size={13} />
              </a>
            ) : entry.href.startsWith("#") ? (
              <a href={entry.href}>
                {entry.linkLabel}
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <Link href={entry.href}>
                {entry.linkLabel}
                <ArrowUpRight size={13} />
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
export default function Capabilities() {
  const [pillar, setPillar] = useState<CapabilityId | null>(null);
  const [selectedId, setSelectedId] = useState("python");
  const selected = tools.find((tool) => tool.id === selectedId) || tools[0];
  const visible = tools.filter((tool) => !pillar || tool.pillar === pillar);
  return (
    <div className="capabilities-showcase">
      <div
        className="capability-pillars"
        aria-label="Engineering capability pillars"
      >
        {capabilities.map((capability) => (
          <button
            type="button"
            className={`capability-card panel ${pillar === capability.id ? "capability-active" : ""}`}
            key={capability.id}
            data-relevance={relevance(capability.id)}
            aria-pressed={pillar === capability.id}
            aria-controls="tool-grid"
            onClick={() => {
              setPillar(capability.id);
              setSelectedId(capability.toolIds[0]);
            }}
          >
            <div className="capability-card-top">
              <span>{capability.label}</span>
              <ArrowUpRight size={17} />
            </div>
            <CapabilityDiagram kind={capability.diagram} />
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
            <div className="capability-icons">
              {capability.toolIds.map((id) => {
                const tool = tools.find((t) => t.id === id)!;
                return (
                  <span key={id} title={tool.name}>
                    <ToolIcon tool={tool} compact />
                  </span>
                );
              })}
              <span className="capability-count">
                {capability.toolIds.length} tools & practices
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="tools-heading">
        <div>
          <span className="tiny-label">EXPLORE THE TOOLKIT</span>
          <h3>Tools & technologies</h3>
        </div>
        <button
          className={`all-tools ${!pillar ? "selected" : ""}`}
          type="button"
          onClick={() => setPillar(null)}
          aria-pressed={!pillar}
        >
          All tools <span>{tools.length}</span>
        </button>
      </div>
      <p className="tools-instruction">
        Select a tool to see its role, implementation, or current learning
        focus.
      </p>
      <ul
        className="tool-grid"
        id="tool-grid"
        aria-label="Tools and technologies"
      >
        {visible.map((tool) => (
          <li key={tool.id}>
            <button
              type="button"
              className={`tool-tile ${selectedId === tool.id ? "tool-selected" : ""}`}
              aria-label={tool.name}
              aria-pressed={selectedId === tool.id}
              aria-controls="skills-proof"
              data-relevance={relevance(tool.pillar)}
              onClick={() => setSelectedId(tool.id)}
              onPointerMove={(event) => {
                if (event.pointerType === "mouse") setSelectedId(tool.id);
              }}
              onFocus={() => setSelectedId(tool.id)}
            >
              <ToolIcon tool={tool} />
              <span className="tool-name">{tool.name}</span>
              <span className="tool-experience">{tool.badge}</span>
              {selectedId === tool.id && (
                <Check
                  className="tool-selected-check"
                  size={12}
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      <Proof tool={selected} />
    </div>
  );
}
