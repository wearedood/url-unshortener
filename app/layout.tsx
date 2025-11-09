import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "URL Revealer",
  description: "A simple Next.js app to reveal the actual destination of shortened URLs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
