import './globals.css';
import LetsTalkFloating from '@/components/home/LetsTalkFloating';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: 'Bughex — Software Development Agency',
  description: 'Bughex is a software development agency delivering scalable web, mobile, and AI solutions. We specialize in Flutter, React Native, React.js, Next.js, Laravel, Node.js, Android/iOS, and custom software development for startups and enterprises.',
  keywords: 'flutter, react native, react js, next js, javascript, laravel, php, android, ios, nodejs, ai, development agency',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Bughex — Software Development Agency',
    description: 'Bughex is a software development agency delivering scalable web, mobile, and AI solutions. We specialize in Flutter, React Native, React.js, Next.js, Laravel, Node.js, Android/iOS, and custom software development for startups and enterprises.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {children}
        <LetsTalkFloating />
      </body>
    </html>
  );
}
