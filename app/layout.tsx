import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Núcleo Valora',
  description: 'Peças compartilhadas entre os sistemas, com dados de exemplo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-br"><body>{children}</body></html>;
}
