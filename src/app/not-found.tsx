import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>
        This page does not exist. Return to the portfolio to browse experience
        and projects.
      </p>
      <Link className="button primary" href="/">
        Back to the portfolio ↗
      </Link>
    </main>
  );
}
