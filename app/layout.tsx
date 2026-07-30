import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vishal Sir Birthday Web Experience | Blue Lock & Mahadeva Edition',
  description: 'Interactive birthday web gift for Vishal Sir featuring basketball shoot mini-game, video tree, and mentor wishes.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#040814',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#040814]">
        {children}
      </body>
    </html>
  );
}
