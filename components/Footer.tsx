'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import CrossIcon from './CrossIcon';
import { CHURCH_MAPS_URL, CHURCH_PHONE_TEL } from '@/lib/church-location';

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
    { key: 'gallery', href: `/${locale}/gallery` },
    { key: 'joinUs', href: `/${locale}/join-us` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <footer style={{ background: 'linear-gradient(135deg, #071529 0%, #0F2044 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A853)' }}>
                <CrossIcon size={18} color="white" />
              </div>
              <div>
                <p className="font-serif text-white font-semibold">Bikfaya Baptist Church</p>
                <p className="text-amber-400 text-xs">Bikfaya, Lebanon</p>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5">{t('tagline')}</p>
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
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-amber-400 text-xs hover:border-gold hover:text-gold transition-colors"
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
                  <Link href={link.href} className="text-white/60 text-sm hover:text-white transition-colors">
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
                  <p className="text-white/55 text-sm">{s.label}</p>
                  <p className="text-white font-serif text-base">{s.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white text-lg mb-5">{t('connect')}</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={CHURCH_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('address')} — ${t('directions')}`}
                  className="group flex items-center gap-3 rounded-2xl border border-gold/50 bg-white/5 p-3 pr-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/15 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-white leading-snug">{t('address')}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold group-hover:text-amber-300">
                      {t('directions')}
                      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold flex-shrink-0">📞</span>
                <a href={CHURCH_PHONE_TEL} className="text-white/60 hover:text-white transition-colors">{t('phone')}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold flex-shrink-0">✉</span>
                <a href={`mailto:${t('email')}`} className="text-white/60 hover:text-white transition-colors">{t('email')}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-200/50 text-xs text-center">
            {t('rights', { year: String(year) })}
          </p>
          <p className="text-blue-200/40 text-xs italic font-serif">
            "To God alone be the glory"
          </p>
        </div>
      </div>
    </footer>
  );
}
