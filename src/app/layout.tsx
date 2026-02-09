import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vignesh Jeyaraman",
  description:
    "I build things I shouldn't be able to build alone. Product builder exploring what one person can do with AI.",
  openGraph: {
    title: "Vignesh Jeyaraman",
    description:
      "I build things I shouldn't be able to build alone.",
    url: "https://vignesh.ai",
    siteName: "vignesh.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vignesh Jeyaraman",
    description:
      "I build things I shouldn't be able to build alone.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
