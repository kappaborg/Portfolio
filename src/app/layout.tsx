import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GodEye - IP Location Tracker",
  description: "Discover your IP location with GodEye - Real-time tracking with weather and aviation data",
  keywords: "IP tracker, location, weather, aviation, real-time tracking",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://godeye.vercel.app',
    title: 'GodEye - IP Location Tracker',
    description: 'Real-time IP location tracking with weather and aviation data',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GodEye Preview',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          <DefaultSeo 
            canonical="https://godeye.vercel.app"
            additionalMetaTags={[
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, maximum-scale=1',
              },
            ]}
          />
          <ThemeToggle />
          {children}
          <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
            Created with ❤️ by <a href="https://github.com/kappasutra" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors">kappasutra</a>
          </footer>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}