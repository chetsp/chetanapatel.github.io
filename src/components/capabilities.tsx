"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check, Layers3 } from "lucide-react";
import { capabilities, tools } from "@/data/portfolio";
import type { CapabilityId } from "@/data/portfolio";
import ToolIcon from "./tool-icon";
import CapabilityDiagram from "./capability-diagram";

export default function Capabilities() {
  const [pillar, setPillar] = useState<CapabilityId | null>(null);
  const [selectedId, setSelectedId] = useState("python");
  const proof = useRef<HTMLElement>(null);
  const selected = tools.find((tool) => tool.id === selectedId) || tools[0];
  const visible = tools.filter((tool) => !pillar || tool.pillar === pillar);
  function select(id: string, scroll = false) {
    setSelectedId(id);
    if (scroll)
      requestAnimationFrame(() =>
        proof.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "nearest",
        }),
      );
  }
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
              select(capability.toolIds[0]);
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
        Select or hover over a tool to see the role, implementation, or current
        focus behind it.
      </p>
      <div
        className="tool-grid"
        id="tool-grid"
        aria-label="Tools and technologies"
      >
        {visible.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className={`tool-tile ${selectedId === tool.id ? "tool-selected" : ""}`}
            aria-label={tool.name}
            aria-pressed={selectedId === tool.id}
            aria-controls="skills-proof"
            onClick={() => select(tool.id, true)}
            onMouseEnter={() => select(tool.id)}
            onFocus={() => select(tool.id)}
          >
            <ToolIcon tool={tool} />
            <span className="tool-name">{tool.name}</span>
            <span className="tool-experience">{tool.badge}</span>
            <Check
              className="tool-selected-check"
              size={12}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
      <section
        className="tool-proof panel"
        id="skills-proof"
        ref={proof}
        aria-labelledby="proof-heading"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="proof-tool">
          <div className="tiny-label">
            <ArrowDownRight size={14} /> WHERE I’VE USED IT
          </div>
          <div className="proof-tool-name">
            <ToolIcon tool={selected} />
            <h3 id="proof-heading">{selected.name}</h3>
          </div>
          <span className="proof-experience">{selected.badge}</span>
          <p>{selected.summary}</p>
          <span className="proof-scope">
            <Layers3 size={12} />{" "}
            {capabilities.find((c) => c.id === selected.pillar)?.title}
          </span>
        </div>
        <div className="proof-entries">
          {selected.proof.map((item) => (
            <article className="proof-entry" key={item.title}>
              <span className="proof-kind">{item.kind}</span>
              <h4>{item.title}</h4>
              <p>{item.detail}</p>
              {item.href.startsWith("http") ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.linkLabel}
                  <ArrowUpRight size={13} />
                </a>
              ) : item.href.startsWith("#") ? (
                <a href={item.href}>
                  {item.linkLabel}
                  <ArrowUpRight size={13} />
                </a>
              ) : (
                <Link href={item.href}>
                  {item.linkLabel}
                  <ArrowUpRight size={13} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
