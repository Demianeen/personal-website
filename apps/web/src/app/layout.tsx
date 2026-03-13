import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demian Netliukh',
  description: 'Personal website of Demian Netliukh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
