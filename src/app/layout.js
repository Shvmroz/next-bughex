import './globals.css';

export const metadata = {
  title: 'BugHex — Development Agency',
  description: 'Premium development agency specializing in Flutter, React Native, JavaScript, Laravel, PHP, Android, iOS, Node.js, and AI solutions.',
  keywords: 'flutter, react native, javascript, laravel, php, android, ios, nodejs, ai, development agency',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'BugHex — Development Agency',
    description: 'We build exceptional digital products. Flutter, React Native, AI, and beyond.',
    type: 'website',
  },
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
