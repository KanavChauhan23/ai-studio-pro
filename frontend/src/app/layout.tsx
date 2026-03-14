import type { Metadata } from 'next';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AI Studio Pro',
  description: '17 professional AI tools in one workspace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* ── Animated scene background ── */}
        <div className="scene" aria-hidden="true">
          <div className="scene-grid" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
          <div className="orb orb-5" />
          {/* floating particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i * 8.3) % 100}%`,
                animationDuration: `${12 + (i * 3.7) % 14}s`,
                animationDelay: `${(i * 1.8) % 10}s`,
                width: i % 3 === 0 ? '3px' : '2px',
                height: i % 3 === 0 ? '3px' : '2px',
                opacity: 0.4 + (i % 4) * 0.1,
              }}
            />
          ))}
        </div>

        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(14,14,24,0.95)',
              backdropFilter: 'blur(20px)',
              color: '#f0f0ff',
              border: '1px solid rgba(124,92,252,0.3)',
              fontSize: '13px',
              fontFamily: 'Sora, sans-serif',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(124,92,252,0.15)',
            },
            success: { iconTheme: { primary: '#10d9a0', secondary: '#040408' } },
            error:   { iconTheme: { primary: '#f43f5e', secondary: '#040408' } },
          }}
        />
      </body>
    </html>
  );
}
