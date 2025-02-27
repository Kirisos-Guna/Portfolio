import type { Metadata } from 'next';

const title = 'Kirisos Guna | Full Stack Developer';
const description = 'Portfolio website of Kirisos Guna, a Full Stack Developer specializing in creating beautiful, responsive, and user-friendly web applications.';
const url = 'https://yourdomain.com';

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Kirisos Guna',
  },
  description,
  keywords: [
    'Kirisos Guna',
    'Full Stack Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'React Developer',
    'Next.js Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Kirisos Guna' }],
  creator: 'Kirisos Guna',
  publisher: 'Kirisos Guna',
  metadataBase: new URL(url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
};

export default metadata; 