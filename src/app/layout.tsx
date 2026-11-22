import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Chetana Patel — Software & Applied AI Engineer",
  description:
    "Building production AI agents, scalable data platforms, and reliable software infrastructure. Explore Chetana Patel’s experience, projects, and engineering approach.",
  openGraph: {
    title: "Chetana Patel — Software & Applied AI Engineer",
    description: "Applied AI. Reliable systems. Real-world impact.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
