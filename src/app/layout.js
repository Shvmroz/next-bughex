import './globals.css';

export const metadata = {
  title: 'Bughex — Software Development Agency',
  description:'Bughex is a software development agency delivering scalable web, mobile, and AI solutions. We specialize in Flutter, React Native, React.js, Next.js, Laravel, Node.js, Android/iOS, and custom software development for startups and enterprises.',
  keywords: 'flutter, react native, react js, next js, javascript, laravel, php, android, ios, nodejs, ai, development agency',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Bughex — Software Development Agency',
    description:'Bughex is a software development agency delivering scalable web, mobile, and AI solutions. We specialize in Flutter, React Native, React.js, Next.js, Laravel, Node.js, Android/iOS, and custom software development for startups and enterprises.',
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
