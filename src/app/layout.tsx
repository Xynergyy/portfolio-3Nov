import type { Metadata } from "next";
import { Montserrat, Syne } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Carrot — Portfolio",
    template: "%s · Carrot",
  },
  description:
    "Portfolio of Pariyakorn Saelao (Carrot) — 3D character, mocap, UI, and interactive media.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
