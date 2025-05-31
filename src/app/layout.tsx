'use client';
import { Analytics } from '@vercel/analytics/react';
import "leaflet/dist/leaflet.css";
import { Metadata } from 'next';
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A modern, space-themed portfolio website',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

// Client Component wrapper
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <DefaultSeo 
        title="Kappasutra Portfolio"
        description="Futuristic portfolio showcasing innovative projects and developments"
        canonical="https://your-portfolio-url.com"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://your-portfolio-url.com',
          siteName: 'Kappasutra Portfolio',
          title: 'Kappasutra Portfolio',
          description: 'Futuristic portfolio showcasing innovative projects and developments',
          images: [
            {
              url: '/og-image.png',
              width: 1200,
              height: 630,
              alt: 'Kappasutra Portfolio',
            }
          ],
        }}
        twitter={{
          handle: '@yourtwitterhandle',
          site: '@yourtwitterhandle',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1',
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            name: 'theme-color',
            content: '#ea580c',
          },
        ]}
      />
      {children}
      <Analytics />
    </ErrorBoundary>
  );
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
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} transition-colors duration-300 bg-black text-white overflow-hidden`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}