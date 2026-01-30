import type { Metadata } from "next";
import "./globals.css";
import { Navigation, Footer, SmoothScroll, CursorBlob, GooeyTransitionLayer } from "@/components";

export const metadata: Metadata = {
  title: "Manyr | Agent Firewall for Autonomous AI",
  description: "Governance layer for AI agents. Intercept, evaluate, and audit autonomous agent actions with the Manyr Firewall.",
  keywords: ["AI agents", "agent firewall", "AI governance", "autonomous AI", "AI security", "agent security"],
  authors: [{ name: "Manyr" }],
  openGraph: {
    title: "Manyr | Agent Firewall for Autonomous AI",
    description: "Governance layer for AI agents. Make autonomy deployable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F6F3EE] text-[#1C1C1C]">
        <SmoothScroll>
          <CursorBlob />
          <GooeyTransitionLayer />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
