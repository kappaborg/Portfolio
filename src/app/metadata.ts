import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "kappasutra Web Development Portfolio",
  description: "Explore a collection of innovative web projects including IP tracking, quantum computing, and language translation applications.",
  keywords: "web development, portfolio, IP tracking, quantum computing, translation, Next.js, React",
  authors: [{ name: "kappasutra", url: "https://github.com/kappaborg" }],
  creator: "kappasutra",
  publisher: "kappasutra",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ip-location-mapper-fin.vercel.app/',
    siteName: 'kappasutra Hub',
    title: 'kappasutra Web Development Portfolio',
    description: 'Explore a collection of innovative web projects including IP tracking, quantum computing, and language translation applications.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'kappasutra Hub Preview',
      },
    ],
  },
  alternates: {
    canonical: 'https://ip-location-mapper-fin.vercel.app/',
  },
  other: {
    'instagram:creator': '@kappasutra',
    'github:creator': 'kappaborg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GIqWP-Hdoho6FrWcRL281ayU7Boe1qhCDLNT8c1eWoI',
  },
}; 