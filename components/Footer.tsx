'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import CrossIcon from './CrossIcon';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const navLinks = [
    { key: 'home', href: `/${locale}` },
    { key: 'jesus', href: `/${locale}/jesus` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'community', href: `/${locale}/community` },
    { key: 'sermons', href: `/${locale}/sermons` },
    { key: 'joinUs', href: `/${locale}/join-us` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <footer style={{ background: 'linear-gradient(135deg, #1C1208 0%, #2C1A08 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A853)' }}>
                <CrossIcon size={18} color="white" />
              </div>
              <div>
                <p className="font-serif text-white font-semibold">Bikfayah Baptist</p>
                <p className="text-amber-400 text-xs">Bikfaya, Lebanon</p>
              </div>
            </div>
            <p className="text-amber-200 text-sm leading-relaxed mb-5 opacity-80">{t('tagline')}</p>
            <div className="flex gap-3">
              {/* Social icons */}
              {[
                { label: 'Facebook', icon: 'f', href: '#' },
                { label: 'YouTube', icon: '▶', href: '#' },
                { label: 'Instagram', icon: '◈', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-amber-800 flex items-center justify-center text-amber-400 text-xs hover:border-gold hover:text-gold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-white text-lg mb-5">{t('quickLinks')}</h4>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.key}>
                  <Link href={link.href} className="text-amber-300 text-sm hover:text-white transition-colors opacity-75 hover:opacity-100">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <h4 className="font-serif text-white text-lg mb-5">{t('serviceTimes')}</h4>
            <ul className="space-y-4">
              {[
                { label: t('sundayMorning'), time: t('sundayTime') },
                { label: t('sundaySchool'), time: t('sundaySchoolTime') },
                { label: t('bibleStudy'), time: t('bibleStudyTime') },
              ].map(s => (
                <li key={s.label}>
                  <p className="text-amber-300 text-sm opacity-75">{s.label}</p>
                  <p className="text-white font-serif text-base">{s.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white text-lg mb-5">{t('connect')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 flex-shrink-0">📍</span>
                <span className="text-amber-300 opacity-80">{t('address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold flex-shrink-0">📞</span>
                <a href={`tel:${t('phone')}`} className="text-amber-300 opacity-80 hover:opacity-100 hover:text-white transition-colors">{t('phone')}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold flex-shrink-0">✉</span>
                <a href={`mailto:${t('email')}`} className="text-amber-300 opacity-80 hover:opacity-100 hover:text-white transition-colors">{t('email')}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-amber-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-amber-700 text-xs text-center">
            {t('rights').replace('{year}', String(year))}
          </p>
          <p className="text-amber-800 text-xs italic font-serif">
            "To God alone be the glory"
          </p>
        </div>
      </div>
    </footer>
  );
}
