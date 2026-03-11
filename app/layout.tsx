import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UT AmbassadorAI",
  description: "AI campus guidance and student ambassador mentorship for UT Austin."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
