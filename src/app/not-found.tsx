import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <span className="eyebrow">404 / A PATH NOT TAKEN</span>
      <h1>
        Nothing here.
        <br />
        Plenty to explore.
      </h1>
      <p>This page doesn’t exist. The work does.</p>
      <Link className="button primary" href="/">
        Back to the portfolio ↗
      </Link>
    </main>
  );
}
