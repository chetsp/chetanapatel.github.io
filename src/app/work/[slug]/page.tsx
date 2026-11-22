import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects, profile } from "@/data/portfolio";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p ? `${p.name} — Chetana Patel` : "Project not found" };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      <header className="case-nav wrap">
        <Link href="/" className="brand">
          chetana.
        </Link>
        <Link href="/#work">
          <ArrowLeft size={14} /> All work
        </Link>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer">
          Résumé ↓
        </a>
      </header>
      <main id="main" className={`case-main wrap ${p.color}`}>
        <Link href="/#work" className="inline-link">
          <ArrowLeft size={14} /> Back to selected work
        </Link>
        <div className="eyebrow">CASE STUDY / {p.kicker}</div>
        <h1>{p.name}</h1>
        <p className="case-lead">{p.description}</p>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <a
          className="button primary"
          href={p.repo}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} /> Explore source <ArrowUpRight size={15} />
        </a>
        <div className="case-summary panel">
          <div>
            <span className="tiny-label">THE SCOPE</span>
            <h3>{p.metric}</h3>
            <p>{p.metricLabel}</p>
          </div>
          <div>
            <span className="tiny-label">A NOTE ON EVIDENCE</span>
            <p>{p.note}</p>
          </div>
        </div>
        <section className="case-section">
          <span className="eyebrow">01 / THE PROBLEM</span>
          <h2>Start with the real question.</h2>
          <p>{p.problem}</p>
        </section>
        <section className="case-section">
          <span className="eyebrow">02 / ARCHITECTURE</span>
          <h2>How the pieces fit.</h2>
          <div className="architecture-flow">
            {p.architecture.map((a, i) => (
              <div key={a}>
                <span>0{i + 1}</span>
                <strong>{a}</strong>
                {i < p.architecture.length - 1 && (
                  <span className="flow-arrow">→</span>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="case-section">
          <span className="eyebrow">03 / ENGINEERING DECISIONS</span>
          <h2>The choices behind the code.</h2>
          {p.decisions.map((d, i) => (
            <div className="decision" key={d}>
              <span>0{i + 1}</span>
              <p>{d}</p>
            </div>
          ))}
        </section>
        <section className="case-section">
          <span className="eyebrow">04 / OUTCOMES & BOUNDARIES</span>
          <h2>What it demonstrates.</h2>
          <ul className="case-outcomes">
            {p.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className="evidence-note">
            Source: public repository README, inspected November 22, 2026.{" "}
            {p.note}
          </p>
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-link"
          >
            Read the project documentation <ArrowUpRight size={15} />
          </a>
        </section>
        <Link href={`/work/${next.slug}`} className="next-project panel">
          <span className="tiny-label">UP NEXT</span>
          <strong>{next.name}</strong>
          <ArrowUpRight />
        </Link>
      </main>
      <footer className="footer wrap">
        <Link href="/">Chetana Patel</Link>
        <Link href="/#contact">Let’s build something useful ↗</Link>
      </footer>
    </>
  );
}
