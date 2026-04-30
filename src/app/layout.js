import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.thebughex.com'),

  title: {
    default: 'BugHex | Software Development Agency',
    template: '%s | BugHex',
  },

  description:
    'BugHex is a software development agency delivering scalable web, mobile, and AI solutions. We specialize in Flutter, React Native, Laravel, Node.js, and custom software development for startups and enterprises.',

  keywords: [
    'BugHex',
    'software development agency',
    'custom software development',
    'web development company',
    'mobile app development',
    'flutter development',
    'react native development',
    'laravel development',
    'nodejs development',
    'AI software solutions',
    'full stack development',
  ],

  authors: [{ name: 'BugHex' }],
  creator: 'BugHex',
  publisher: 'BugHex',

  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'BugHex | Software Development Agency',
    description:
      'A software development agency building scalable web, mobile, and AI-powered solutions with modern technologies.',
    url: 'https://www.thebughex.com',
    siteName: 'BugHex',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BugHex Software Development Agency',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'BugHex | Software Development Agency',
    description:
      'Software development agency for web, mobile, and AI solutions.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.thebughex.com',
  },

  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
