'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider, createTheme } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme();

  return (
    <html lang='en'>
      <ThemeProvider theme={theme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
