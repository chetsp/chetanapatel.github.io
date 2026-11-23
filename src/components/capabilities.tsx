"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { capabilities, tools } from "@/data/portfolio";
import type { CapabilityId } from "@/data/portfolio";
import ToolIcon from "./tool-icon";
import CapabilityDiagram from "./capability-diagram";

export default function Capabilities() {
  const [pillar, setPillar] = useState<CapabilityId | null>(null);
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
            aria-pressed={pillar === capability.id}
            aria-controls="tool-grid"
            onClick={() => {
              setPillar(capability.id);
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
      <div
        className="tool-grid"
        id="tool-grid"
        role="list"
        aria-label="Tools and technologies"
      >
        {visible.map((tool) => (
          <div key={tool.id} className="tool-tile" role="listitem">
            <ToolIcon tool={tool} />
            <span className="tool-name">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
