import type { Metadata } from "next";
import ThemeProvider from "@/components/theme-provider";
import { profile } from "@/data/portfolio";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Chetana Patel — Software & Applied AI Engineer",
  description: profile.tagline,
  openGraph: {
    title: "Chetana Patel — Software & Applied AI Engineer",
    description:
      "Software engineering experience in financial data platforms, backend systems, and agentic workflows.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
