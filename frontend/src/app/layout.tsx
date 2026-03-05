import type { Metadata } from 'next';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AI Studio Pro',
  description: '17 AI tools in one professional workspace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1c1c1c', color: '#f0f0f0', border: '1px solid #2a2a2a', fontSize: '13px', borderRadius: '10px' },
            success: { iconTheme: { primary: '#7c6af5', secondary: '#0d0d0d' } },
          }}
        />
      </body>
    </html>
  );
}
