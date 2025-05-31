'use client';

import { Analytics } from '@vercel/analytics/react';
import "leaflet/dist/leaflet.css";
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false
});

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
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

export default ClientWrapper; 