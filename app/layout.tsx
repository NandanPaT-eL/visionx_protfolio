import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Patel — VisionX Marketing",
  description:
    "Brand strategist & digital designer. Logo design, branding, social media creatives, WordPress & e-commerce websites. Based in Gujarat, India.",
  openGraph: {
    title: "Harsh Patel — VisionX Marketing",
    description: "Premium branding, design & web solutions from Gujarat, India.",
    url: "https://marketingvisionx.com",
    siteName: "VisionX Marketing",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
