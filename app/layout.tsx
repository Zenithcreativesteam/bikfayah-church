import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'Bikfayah Baptist Church', template: '%s | Bikfayah Baptist Church' },
  description: 'A gospel-centered community gathered in the mountains of Bikfaya, Lebanon.',
  keywords: ['church', 'Bikfaya', 'Lebanon', 'Baptist', 'gospel', 'كنيسة', 'بكفيا', 'لبنان'],
  openGraph: {
    siteName: 'Bikfayah Baptist Church',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
