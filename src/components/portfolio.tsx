"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Copy,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Menu,
  MessageSquare,
  Network,
  Sparkles,
  X,
} from "lucide-react";
import {
  categories,
  Category,
  profile,
  projects,
  skillGroups,
} from "@/data/portfolio";
import Assistant from "./assistant";
import ThemeToggle from "./theme-toggle";
import ExperienceTimeline from "./experience-timeline";
const nav = ["About", "Experience", "Work", "Skills", "Assistant", "Contact"];
function SectionTitle({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{number}</span> {label}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<Category>("All work");
  const [skill, setSkill] = useState("");
  const [copied, setCopied] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [active, setActive] = useState("");
  const close = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!drawer) return;
    const previous = document.body.style.overflow;
    const restoreFocus = trigger.current;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawer(false);
      if (e.key === "Tab" && dialog.current) {
        const items = Array.from(
          dialog.current.querySelectorAll<HTMLElement>(
            "button:not(:disabled),input:not(:disabled),a[href]",
          ),
        );
        const first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      restoreFocus?.focus();
    };
  }, [drawer]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError("Copy unavailable. Email: " + profile.email);
    }
  }
  function chooseCategory(category: Category) {
    setFilter(category);
    document.getElementById("work")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <MotionConfig reducedMotion="user">
      <div className="site">
        <header className="nav-shell">
          <nav className="navbar" aria-label="Main navigation">
            <a href="#" className="brand">
              <span className="monogram">
                c<span>p</span>
                <i />
              </span>
              <span>
                Chetana Patel<span className="brand-dot">.</span>
              </span>
            </a>
            <div className="nav-links">
              {nav.map((n) => (
                <a
                  key={n}
                  href={`#${n.toLowerCase()}`}
                  className={active === n.toLowerCase() ? "active" : ""}
                >
                  {n}
                </a>
              ))}
            </div>
            <a href={profile.resume} className="resume-button" download>
              Résumé <ArrowDownToLine size={14} />
            </a>
            <ThemeToggle />
            <button
              className="menu-toggle"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </nav>
          {menu && (
            <div className="mobile-menu">
              {nav.map((n) => (
                <a
                  href={`#${n.toLowerCase()}`}
                  key={n}
                  onClick={() => setMenu(false)}
                >
                  {n}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          )}
        </header>
        <main id="main">
          <section className="hero wrap" id="home">
            <div className="hero-grid-bg" aria-hidden="true" />
            <div className="hero-content">
              <div className="availability">
                <span className="status-dot" />
                Open to full-time Software & Applied AI roles
                <ArrowUpRight size={12} />
              </div>
              <p className="hero-intro">HELLO, I’M CHETANA KAMRAJ PATEL</p>
              <h1>{profile.title}</h1>
              <p className="hero-description">{profile.tagline}</p>
              <div className="hero-buttons">
                <a href="#work" className="button primary">
                  Explore my work <ArrowUpRight size={16} />
                </a>
                <a href={profile.resume} className="button secondary" download>
                  <ArrowDownToLine size={15} /> Download résumé
                </a>
              </div>
              <div className="pillar-links">
                {(
                  [
                    "Agents & MCP",
                    "Product Engineering",
                    "Applied AI",
                    "Full-Stack",
                  ] as Category[]
                ).map((p, i) => (
                  <button onClick={() => chooseCategory(p)} key={p}>
                    {i === 0 ? (
                      <Sparkles size={12} />
                    ) : i === 1 ? (
                      <Database size={12} />
                    ) : i === 2 ? (
                      <Network size={12} />
                    ) : (
                      <Code2 size={12} />
                    )}{" "}
                    {p}
                  </button>
                ))}
              </div>
              <div className="hero-location">
                <MapPin size={12} />
                {profile.location}
                <span />
                Open to software and applied AI roles
              </div>
            </div>
            <div
              className="system-visual"
              aria-label="Engineering focus: context, reasoning, reliable systems"
            >
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="visual-line horizontal" />
              <div className="visual-line vertical" />
              <div className="system-core">
                <Braces size={42} strokeWidth={1.3} />
              </div>
              <div className="system-node node-one">
                <span className="node-symbol">
                  <Sparkles size={17} />
                </span>
                <div>
                  <strong>Agent workflows</strong>
                  <small>Typed inputs and validation</small>
                </div>
                <i />
              </div>
              <div className="system-node node-two">
                <span className="node-symbol">
                  <Database size={17} />
                </span>
                <div>
                  <strong>Financial data platforms</strong>
                  <small>55M+ daily calculations</small>
                </div>
                <i />
              </div>
              <div className="system-node node-three">
                <span className="node-symbol">
                  <Code2 size={17} />
                </span>
                <div>
                  <strong>Backend services</strong>
                  <small>Processing, APIs, and event streams</small>
                </div>
                <i />
              </div>
            </div>
            <div className="metrics">
              {[
                {
                  value: "55M+",
                  label: "Daily calculations automated",
                  note: "BANK OF AMERICA",
                  target: "bank-of-america-senior",
                },
                {
                  value: "52%",
                  label: "Higher task throughput",
                  note: "DISTRIBUTED SYSTEMS",
                  target: "bank-of-america-senior",
                },
                {
                  value: "$800K",
                  label: "Annual infrastructure savings",
                  note: "PLATFORM MODERNIZATION",
                  target: "bank-of-america-senior",
                },
                {
                  value: "4",
                  label: "Open-source case studies",
                  note: "EXPLORE THE CODE",
                  target: "work",
                },
              ].map((m) => (
                <a href={`#${m.target}`} className="metric" key={m.value}>
                  <div>
                    <strong>{m.value}</strong>
                    <ArrowUpRight size={16} />
                  </div>
                  <p>{m.label}</p>
                  <span>{m.note}</span>
                </a>
              ))}
            </div>
          </section>
          <div className="trust-strip wrap">
            <span>EXPERIENCE ACROSS</span>
            <strong className="tesla-word">TESLA</strong>
            <strong className="bank-word">
              Bank of America <span>▰</span>
            </strong>
            <strong className="gmu-word">
              GEORGE MASON <span>UNIVERSITY</span>
            </strong>
            <span className="trust-caption">
              Software engineering and graduate study
            </span>
          </div>
          <section id="about" className="section wrap">
            <Reveal>
              <SectionTitle
                number="01"
                label="BACKGROUND"
                title="Engineering Background & Focus"
                description="My background includes financial data processing, manufacturing software, and applied AI applications."
              />
            </Reveal>
            <Reveal className="bento">
              <article className="bento-main panel">
                <span className="tiny-label">
                  <Code2 size={14} /> ENGINEERING APPROACH
                </span>
                <h3>Backend systems and applied AI</h3>
                <p>
                  I build distributed processing systems, backend services, and
                  AI-assisted workflows. At Bank of America, my work covered
                  task scheduling, financial calculations, event streams, and
                  margin processing.
                </p>
                <p>
                  My engineering priorities are explicit data contracts,
                  predictable failure handling, and enough operational
                  visibility to diagnose problems after deployment.
                </p>
                <a href={profile.resume} download className="inline-link">
                  Download my résumé <ArrowUpRight size={14} />
                </a>
              </article>
              <article className="panel focus-panel">
                <span className="tiny-label">
                  <Sparkles size={14} /> CURRENT FOCUS
                </span>
                <h3>Agent workflows and tool integration</h3>
                <p>
                  I’m focused on typed extraction, retrieval, MCP tool
                  integration, and evaluations. I use validation and human
                  review where an agent’s output can change an operational
                  workflow.
                </p>
                <div className="mini-pipeline">
                  <span>Context</span>
                  <ArrowRight size={12} />
                  <span>Reason</span>
                  <ArrowRight size={12} />
                  <span>Act</span>
                </div>
              </article>
              <article className="panel education-panel">
                <GraduationCap size={25} />
                <div>
                  <span className="tiny-label">ALWAYS LEARNING</span>
                  <h3>M.S. Computer Science</h3>
                  <p>George Mason University</p>
                  <small>Machine Learning concentration</small>
                </div>
                <span className="education-year">2026</span>
              </article>
              <article className="panel principles-panel">
                <span className="tiny-label">WORKING PRACTICES</span>
                <div>
                  <span>
                    <Check size={14} /> Follow through from design to operations
                  </span>
                  <span>
                    <Check size={14} /> Validate inputs and failure cases
                  </span>
                  <span>
                    <Check size={14} /> Document interfaces and decisions
                  </span>
                </div>
              </article>
            </Reveal>
          </section>
          <section id="experience" className="section wrap">
            <Reveal>
              <SectionTitle
                number="02"
                label="PROFESSIONAL EXPERIENCE"
                title="Experience & Education"
                description="Roles, responsibilities, and the systems I worked on."
              />
            </Reveal>
            <ExperienceTimeline />
          </section>
          <section id="work" className="section wrap">
            <Reveal>
              <div className="section-title-row">
                <SectionTitle
                  number="03"
                  label="SELECTED WORK"
                  title="Selected Work & Open-Source Projects"
                  description="Implementation details, architecture decisions, and source code for four projects."
                />
                <a
                  className="inline-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  All repositories <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="filters" aria-label="Filter projects">
                {categories.map((c) => (
                  <button
                    aria-pressed={filter === c}
                    onClick={() => setFilter(c)}
                    className={filter === c ? "selected" : ""}
                    key={c}
                  >
                    {c}
                    {c === "All work" && <span>04</span>}
                  </button>
                ))}
              </div>
            </Reveal>
            <motion.div layout className="project-grid">
              <AnimatePresence mode="popLayout">
                {projects
                  .filter((p) => filter === "All work" || p.category === filter)
                  .map((p) => (
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                      className={`project-card panel ${p.color}`}
                      key={p.slug}
                    >
                      <Link
                        href={`/work/${p.slug}`}
                        className="project-art"
                        aria-label={`Read ${p.name} case study`}
                      >
                        <div className="art-top">
                          <span>
                            0{projects.indexOf(p) + 1} / {p.kicker}
                          </span>
                          <ArrowUpRight size={17} />
                        </div>
                        {p.slug === "routemind-ai" ? (
                          <div className="route-diagram">
                            <div className="route-path" />
                            <div className="route-point start">
                              <i />
                              <span>FREMONT</span>
                            </div>
                            <div className="route-point via">
                              <i />
                              <span>PHOENIX</span>
                            </div>
                            <div className="route-point end">
                              <i />
                              <span>AUSTIN</span>
                            </div>
                            <div className="route-result">
                              <Sparkles size={12} /> Constraints met{" "}
                              <Check size={12} />
                            </div>
                          </div>
                        ) : p.slug === "student-survey" ? (
                          <div className="stack-visual">
                            <span>
                              <Code2 size={14} /> REACT INTERFACE <i />
                            </span>
                            <span>
                              <Braces size={14} /> FASTAPI SERVICES <i />
                            </span>
                            <span>
                              <Database size={14} /> PERSISTENT MYSQL <i />
                            </span>
                            <small>DOCKER + KUBERNETES + HELM</small>
                          </div>
                        ) : p.slug === "gita-guru" ? (
                          <div className="language-art">
                            <span>ज्ञान</span>
                            <span>Knowledge</span>
                            <span>அறிவு</span>
                            <div>
                              <Sparkles size={16} /> Multilingual learning
                            </div>
                          </div>
                        ) : (
                          <div className="modern-art">
                            <div className="wireframe">
                              <i />
                              <i />
                              <i />
                              <i />
                            </div>
                            <ArrowRight size={23} />
                            <div className="polished">
                              <span />
                              <i />
                              <i />
                              <strong>Submit survey ↗</strong>
                            </div>
                          </div>
                        )}
                        <div className="art-bottom">
                          <span>{p.metric}</span>
                          <small>{p.metricLabel}</small>
                        </div>
                      </Link>
                      <div className="project-info">
                        <span className="tiny-label">{p.category}</span>
                        <h3>
                          <Link href={`/work/${p.slug}`}>{p.name}</Link>
                        </h3>
                        <p>{p.description}</p>
                        <div className="tags">
                          {p.tags.slice(0, 4).map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                        <div className="project-links">
                          <Link href={`/work/${p.slug}`}>
                            Explore case study <ArrowUpRight size={14} />
                          </Link>
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${p.name} on GitHub`}
                          >
                            <Github size={16} />
                            <span>Source</span>
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
              </AnimatePresence>
            </motion.div>
          </section>
          <section id="skills" className="section wrap">
            <Reveal>
              <SectionTitle
                number="04"
                label="THE TOOLKIT"
                title="Technical Stack"
                description="Languages, frameworks, and infrastructure used across my work and current technical focus."
              />
            </Reveal>
            <div className="skills-grid">
              {skillGroups.map((g, i) => (
                <article className="panel skill-card" key={g.name}>
                  <span className="skill-icon">
                    {i === 0 ? (
                      <Code2 size={20} />
                    ) : i === 1 ? (
                      <Sparkles size={20} />
                    ) : i === 2 ? (
                      <Database size={20} />
                    ) : (
                      <Network size={20} />
                    )}
                  </span>
                  <h3>{g.name}</h3>
                  <div className="skill-buttons">
                    {g.items.map((s) => (
                      <button
                        className={skill === s ? "chosen" : ""}
                        aria-pressed={skill === s}
                        key={s}
                        onClick={() => setSkill(skill === s ? "" : s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p>{g.detail}</p>
                </article>
              ))}
            </div>
            <div className="skill-detail" aria-live="polite">
              {skill ? (
                <>
                  <span className="status-dot" />
                  <strong>{skill}</strong> —{" "}
                  {["MCP", "ADK", "OpenTelemetry"].includes(skill) ? (
                    "Current focus: tool integration, agent workflows, and observability."
                  ) : projects.filter((p) =>
                      p.tags.some((t) =>
                        t.toLowerCase().includes(skill.toLowerCase()),
                      ),
                    ).length ? (
                    <>
                      Explore{" "}
                      {projects
                        .filter((p) =>
                          p.tags.some((t) =>
                            t.toLowerCase().includes(skill.toLowerCase()),
                          ),
                        )
                        .map((p, i) => (
                          <span key={p.slug}>
                            {i > 0 ? " · " : ""}
                            <Link href={`/work/${p.slug}`}>{p.name} ↗</Link>
                          </span>
                        ))}
                    </>
                  ) : (
                    "Used across backend engineering and infrastructure work. See the experience section for context."
                  )}
                </>
              ) : (
                <>
                  <ArrowRight size={12} /> Select a technology to see related
                  projects and experience.
                </>
              )}
            </div>
          </section>
          <section id="assistant" className="section wrap assistant-section">
            <Reveal className="assistant-copy">
              <div className="eyebrow">
                <span>05</span> PORTFOLIO ASSISTANT
              </div>
              <h2>Ask About My Work</h2>
              <p>
                Ask about a role, a project’s architecture, or the technical
                decisions behind it.
              </p>
              <div className="assistant-benefits">
                <span>
                  <Check size={14} /> Experience and responsibilities
                </span>
                <span>
                  <Check size={14} /> Architecture and implementation
                </span>
                <span>
                  <Check size={14} /> Links to project source code
                </span>
              </div>
              <span className="guide-note">
                <Sparkles size={13} /> Try a question about RouteMind or
                financial data processing.
              </span>
            </Reveal>
            <Reveal>
              <Assistant />
            </Reveal>
          </section>
          <section id="contact" className="section wrap contact-section">
            <Reveal>
              <div className="eyebrow">
                <span>06</span> CONTACT
              </div>
              <h2>Get in Touch</h2>
              <p>
                Contact me about software engineering and applied AI roles, or
                questions about my projects.
              </p>
              <div className="email-row">
                <a href={`mailto:${profile.email}`}>
                  {profile.email}
                  <ArrowUpRight size={22} />
                </a>
                <button onClick={copy} aria-label="Copy email address">
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </button>
              </div>
              <span className="copy-status" role="status">
                {copied ? "Email copied to clipboard." : copyError}
              </span>
              <div className="social-links">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={16} />
                  GitHub
                  <ArrowUpRight size={13} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} />
                  LinkedIn
                  <ArrowUpRight size={13} />
                </a>
                <a href={profile.resume} download>
                  <ArrowDownToLine size={16} />
                  Résumé
                </a>
              </div>
            </Reveal>
          </section>
        </main>
        <footer className="footer wrap">
          <a href="#" className="brand">
            <span className="monogram">
              c<span>p</span>
              <i />
            </span>
            <span>
              Chetana Patel<span className="brand-dot">.</span>
            </span>
          </a>
          <span>Chetana Patel · Northern Virginia</span>
          <span>
            © {new Date().getFullYear()} Chetana Patel{" "}
            <a href="#home" aria-label="Back to top">
              ↑
            </a>
          </span>
        </footer>
        <button
          className="floating-guide"
          ref={trigger}
          onClick={() => setDrawer(true)}
          aria-haspopup="dialog"
        >
          <Sparkles size={16} />
          <span>Ask my portfolio</span>
          <MessageSquare size={14} />
        </button>
        <AnimatePresence>
          {drawer && (
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            >
              <motion.div
                ref={dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
                className="assistant-drawer"
                initial={{ x: 60 }}
                animate={{ x: 0 }}
                exit={{ x: 60 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="drawer-title">
                  <h2 id="drawer-title">
                    <Sparkles size={18} /> Portfolio guide
                  </h2>
                  <button
                    ref={close}
                    onClick={() => setDrawer(false)}
                    aria-label="Close portfolio guide"
                  >
                    <X size={20} />
                  </button>
                </div>
                <Assistant compact />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
