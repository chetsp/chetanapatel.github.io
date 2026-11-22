"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
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
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import {
  categories,
  Category,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/data/portfolio";
import Assistant from "./assistant";
type Tour =
  "Explore freely" | "Recruiter" | "Engineering Manager" | "Technical Peer";
const tours: Record<Tour, { text: string; target: string }> = {
  "Explore freely": {
    text: "Take your time. Follow your curiosity.",
    target: "about",
  },
  Recruiter: {
    text: "Start with impact, experience, and the résumé.",
    target: "experience",
  },
  "Engineering Manager": {
    text: "Explore system ownership and engineering decisions.",
    target: "work",
  },
  "Technical Peer": {
    text: "Go deeper into architecture, trade-offs, and code.",
    target: "work",
  },
};
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
  const [tour, setTour] = useState<Tour>("Explore freely");
  const [filter, setFilter] = useState<Category>("All work");
  const [role, setRole] = useState(0);
  const [skill, setSkill] = useState("");
  const [copied, setCopied] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [formStatus, setFormStatus] = useState("");
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
      trigger.current?.focus();
    };
  }, [drawer]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFormStatus("Copy unavailable. Email: " + profile.email);
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
      <div className="site" data-tour={tour}>
        <header className="nav-shell">
          <nav className="navbar" aria-label="Main navigation">
            <a href="#" className="brand">
              <span className="monogram">
                c<span>p</span>
                <i />
              </span>
              <span>
                chetana<span className="brand-dot">.</span>
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
              <h1>
                Intelligence, engineered.
                <br />
                <span>Impact, delivered.</span>
              </h1>
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
                    "Data platforms",
                    "Machine learning",
                    "Full-stack",
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
                Available for meaningful problems
              </div>
            </div>
            <div
              className="system-visual"
              aria-label="Engineering focus: context, reasoning, reliable systems"
            >
              <div className="visual-top">
                <span className="status-dot" />
                SYSTEM / CHETANA.OS<span>v.2026</span>
              </div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="visual-line horizontal" />
              <div className="visual-line vertical" />
              <div className="system-core">
                <Braces size={42} strokeWidth={1.3} />
                <small>BUILD WITH INTENT</small>
              </div>
              <div className="system-node node-one">
                <span className="node-symbol">
                  <Sparkles size={17} />
                </span>
                <div>
                  <strong>Applied intelligence</strong>
                  <small>Grounded. Useful. Human.</small>
                </div>
                <i />
              </div>
              <div className="system-node node-two">
                <span className="node-symbol">
                  <Database size={17} />
                </span>
                <div>
                  <strong>Data at scale</strong>
                  <small>55M+ daily calculations</small>
                </div>
                <i />
              </div>
              <div className="system-node node-three">
                <span className="node-symbol">
                  <Terminal size={17} />
                </span>
                <div>
                  <strong>Reliable by design</strong>
                  <small>From prototype to production</small>
                </div>
                <i />
              </div>
              <div className="visual-footer">
                <span>CONTEXT → REASON → BUILD</span>
                <span className="signal-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
            <div className="tour-bar">
              <div className="tour-icon">
                <Network size={19} />
              </div>
              <div className="tour-label">
                <strong>Your time. Your perspective.</strong>
                <span>{tours[tour].text}</span>
              </div>
              <label className="tour-select">
                <span>Which tour?</span>
                <select
                  aria-label="Choose a guided tour"
                  value={tour}
                  onChange={(e) => setTour(e.target.value as Tour)}
                >
                  {Object.keys(tours).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={14} />
              </label>
              <a
                href={`#${tours[tour].target}`}
                className="tour-go"
                aria-label="Start selected tour"
              >
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="metrics">
              {[
                {
                  value: "55M+",
                  label: "Daily calculations automated",
                  note: "BANK OF AMERICA",
                  target: "experience",
                },
                {
                  value: "52%",
                  label: "Higher task throughput",
                  note: "DISTRIBUTED SYSTEMS",
                  target: "experience",
                },
                {
                  value: "$800K",
                  label: "Annual infrastructure savings",
                  note: "PLATFORM MODERNIZATION",
                  target: "experience",
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
              Industry scale. Research curiosity.
            </span>
          </div>
          <section id="about" className="section wrap">
            <Reveal>
              <SectionTitle
                number="01"
                label="THE PERSON BEHIND THE SYSTEMS"
                title="Curious by nature. Engineer by practice."
                description="I work at the intersection of intelligent software and the infrastructure that makes it dependable."
              />
            </Reveal>
            <Reveal className="bento">
              <article className="bento-main panel">
                <span className="tiny-label">
                  <Code2 size={14} /> ENGINEERING PHILOSOPHY
                </span>
                <h3>
                  Make the complex
                  <br />
                  <em>feel simple.</em>
                </h3>
                <p>
                  I’m a software engineer who cares as much about what happens
                  after deployment as what happens in a demo. My work spans
                  financial data platforms, manufacturing software, and applied
                  AI.
                </p>
                <p>
                  I like clear interfaces, grounded reasoning, and systems you
                  can trust when the stakes are real.
                </p>
                <a href={profile.resume} download className="inline-link">
                  The longer story, in my résumé <ArrowUpRight size={14} />
                </a>
              </article>
              <article className="panel focus-panel">
                <span className="tiny-label">
                  <Sparkles size={14} /> CURRENT FOCUS
                </span>
                <h3>
                  AI that does more
                  <br />
                  than answer.
                </h3>
                <p>
                  Agentic workflows. Model Context Protocol. Reliable tools,
                  useful context, and evaluations that keep us honest.
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
                <span className="tiny-label">MY DEFAULT SETTINGS</span>
                <div>
                  <span>
                    <Check size={14} /> Own the outcome
                  </span>
                  <span>
                    <Check size={14} /> Question the assumptions
                  </span>
                  <span>
                    <Check size={14} /> Build for the next engineer
                  </span>
                </div>
              </article>
            </Reveal>
          </section>
          <section id="experience" className="section wrap">
            <Reveal>
              <SectionTitle
                number="02"
                label="EXPERIENCE, NOT JUST A TECH STACK"
                title="Where I’ve put it into practice."
                description="From financial infrastructure to factory software. A consistent focus on systems that make a difference."
              />
            </Reveal>
            <Reveal className="experience-layout">
              <div
                className="timeline-tabs"
                role="tablist"
                aria-label="Experience"
              >
                {experience.map((e, i) => (
                  <button
                    id={`role-tab-${i}`}
                    aria-selected={role === i}
                    aria-controls={`role-panel-${i}`}
                    role="tab"
                    tabIndex={role === i ? 0 : -1}
                    onKeyDown={(ev) => {
                      if (
                        ["ArrowDown", "ArrowUp", "Home", "End"].includes(ev.key)
                      ) {
                        ev.preventDefault();
                        const next =
                          ev.key === "Home"
                            ? 0
                            : ev.key === "End"
                              ? experience.length - 1
                              : (i +
                                  (ev.key === "ArrowDown" ? 1 : -1) +
                                  experience.length) %
                                experience.length;
                        setRole(next);
                        document.getElementById(`role-tab-${next}`)?.focus();
                      }
                    }}
                    onClick={() => setRole(i)}
                    key={e.company + e.date}
                  >
                    <span className={`company-icon company-${i}`}>
                      {e.icon}
                    </span>
                    <span>
                      <strong>{e.company}</strong>
                      <small>{e.date}</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.article
                  key={role}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="experience-card panel"
                  role="tabpanel"
                  id={`role-panel-${role}`}
                  aria-labelledby={`role-tab-${role}`}
                >
                  <div className="role-top">
                    <span className="tiny-label">{experience[role].team}</span>
                    <span className="role-date">{experience[role].date}</span>
                  </div>
                  <h3>{experience[role].role}</h3>
                  <div className="role-location">
                    <MapPin size={12} />
                    {experience[role].location}
                  </div>
                  <p className="role-summary">{experience[role].summary}</p>
                  <ul>
                    {experience[role].bullets.map((b) => (
                      <li key={b}>
                        <ArrowUpRight size={12} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/work/${experience[role].link}`}
                    className="inline-link"
                  >
                    {experience[role].related}
                    <ArrowUpRight size={14} />
                  </Link>
                  <small className="role-footnote">
                    Related personal projects are independent of employer work.
                  </small>
                </motion.article>
              </AnimatePresence>
            </Reveal>
          </section>
          <section id="work" className="section wrap">
            <Reveal>
              <div className="section-title-row">
                <SectionTitle
                  number="03"
                  label="SELECTED WORK"
                  title="Less talk. More shipped."
                  description="Real repositories. Intentional architecture. A look under the hood."
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
              {tour !== "Explore freely" && (
                <p className="tour-hint">
                  <Sparkles size={12} />{" "}
                  {tour === "Recruiter"
                    ? "Recruiter lens: impact, scope, and a clear connection to real code."
                    : tour === "Engineering Manager"
                      ? "Engineering manager lens: open a case study for ownership, decisions, and boundaries."
                      : "Technical peer lens: follow the pipeline, inspect the trade-offs, and explore the source."}
                </p>
              )}
            </Reveal>
            <motion.div layout className="project-grid">
              <AnimatePresence mode="popLayout">
                {projects
                  .filter((p) => filter === "All work" || p.category === filter)
                  .map((p, i) => (
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
                            <small>
                              CONTAINERIZED. ORCHESTRATED. CONNECTED.
                            </small>
                          </div>
                        ) : p.slug === "gita-guru" ? (
                          <div className="language-art">
                            <span>ज्ञान</span>
                            <span>Knowledge</span>
                            <span>அறிவு</span>
                            <div>
                              <Sparkles size={16} /> One story. Many languages.
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
            <p className="project-source-note">
              Project scope from public READMEs. Professional impact metrics
              above are from my résumé.
            </p>
          </section>
          <section id="skills" className="section wrap">
            <Reveal>
              <SectionTitle
                number="04"
                label="THE TOOLKIT"
                title="The right tool. For the real problem."
                description="Production foundations, hands-on project tools, and the technologies I’m exploring next."
              />
            </Reveal>
            <Reveal className="skills-grid">
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
            </Reveal>
            <div className="skill-detail" aria-live="polite">
              {skill ? (
                <>
                  <span className="status-dot" />
                  <strong>{skill}</strong> —{" "}
                  {["MCP", "ADK", "OpenTelemetry"].includes(skill) ? (
                    "A current learning and exploration focus. See public case studies for verified implementation details."
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
                    "Part of the broader engineering toolkit. See experience and the résumé for context."
                  )}
                </>
              ) : (
                <>
                  <ArrowRight size={12} /> Pick a technology to find its place
                  in the work.
                </>
              )}
            </div>
          </section>
          <section id="assistant" className="section wrap assistant-section">
            <Reveal className="assistant-copy">
              <div className="eyebrow">
                <span>05</span> A MORE INTERACTIVE INTRODUCTION
              </div>
              <h2>
                A portfolio.
                <br />
                With a conversation.
              </h2>
              <p>
                Skip the scrolling. Ask about my experience, explore a project’s
                architecture, or find the work most relevant to your team.
              </p>
              <div className="assistant-benefits">
                <span>
                  <Check size={14} /> Grounded in my actual work
                </span>
                <span>
                  <Check size={14} /> Clear about what it doesn’t know
                </span>
                <span>
                  <Check size={14} /> No sign-up. Just curiosity.
                </span>
              </div>
              <span className="guide-note">
                <Sparkles size={13} /> Your shortcut to the relevant details.
              </span>
            </Reveal>
            <Reveal>
              <Assistant />
            </Reveal>
          </section>
          <section id="contact" className="section wrap contact-section">
            <Reveal>
              <div className="eyebrow">
                <span>06</span> THE NEXT CHAPTER
              </div>
              <h2>
                Good work starts with
                <br />
                <span>a good conversation.</span>
              </h2>
              <p>
                Have a complex problem, an interesting role, or a thoughtful
                question?
                <br />
                I’d love to hear about it.
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
                {copied ? "Email copied to clipboard." : ""}
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
            <Reveal>
              <form
                className="contact-form panel"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const subject = encodeURIComponent(
                    "Portfolio enquiry from " + data.get("name"),
                  );
                  const body = encodeURIComponent(
                    `From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`,
                  );
                  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
                  setFormStatus(
                    "Your email app has been requested. Send the prepared message there, or email me directly.",
                  );
                }}
              >
                <span className="tiny-label">HAVE SOMETHING IN MIND?</span>
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      name="name"
                      placeholder="Alex Taylor"
                      required
                      maxLength={100}
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      placeholder="alex@company.com"
                      required
                      maxLength={254}
                    />
                  </label>
                </div>
                <label>
                  Your message
                  <textarea
                    name="message"
                    placeholder="A little about what you’re building…"
                    required
                    maxLength={3000}
                    rows={4}
                  />
                </label>
                <button className="button primary" type="submit">
                  Let’s start a conversation <Send size={14} />
                </button>
                <small>
                  Opens your email app. No message is stored on this site.
                </small>
                <p className="form-status" role="status">
                  {formStatus}
                </p>
              </form>
            </Reveal>
          </section>
        </main>
        <footer className="footer wrap">
          <a href="#" className="brand">
            <span className="monogram">
              c<span>p</span>
              <i />
            </span>
            <span>chetana.</span>
          </a>
          <span>Built with intention. Always a work in progress.</span>
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
