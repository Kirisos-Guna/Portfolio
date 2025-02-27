import type { Viewport } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import ViewportHeightProvider from "../components/ViewportHeightProvider";
import metadata from './metadata';

// Modern sans-serif font for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Modern display font for headings
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

// Modern monospace font for code and technical content
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

// Define viewport separately as recommended by Next.js
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#9333EA", // Brighter purple-600 color for status bar
}

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <ViewportHeightProvider>
            {children}
          </ViewportHeightProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
