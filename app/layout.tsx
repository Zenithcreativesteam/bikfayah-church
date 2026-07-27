import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'Bikfaya Baptist Church', template: '%s | Bikfaya Baptist Church' },
  description: 'A gospel-centered community gathered in the mountains of Bikfaya, Lebanon.',
  keywords: ['church', 'Bikfaya', 'Lebanon', 'Baptist', 'gospel', 'كنيسة', 'بكفيا', 'لبنان'],
  openGraph: {
    siteName: 'Bikfaya Baptist Church',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
