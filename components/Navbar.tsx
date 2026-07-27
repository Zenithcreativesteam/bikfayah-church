'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import CrossIcon from './CrossIcon';

const navKeys = ['home', 'jesus', 'about', 'community', 'sermons'] as const;
const navPaths: Record<string, string> = {
  home: '/', jesus: '/jesus', about: '/about',
  community: '/community', sermons: '/sermons',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const isActive = (key: string) => {
    const path = `/${locale}${navPaths[key]}`;
    if (key === 'home') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-warm-white shadow-warm-md border-b border-gold-light'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2.5 group flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-warm-sm transition-all group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0F2044, #1B3A6B)' }}
              >
                <CrossIcon size={18} color="white" />
              </div>
              <div className="leading-tight">
                <p className={`font-serif text-base font-semibold transition-colors ${scrolled ? 'text-brown-deep' : 'text-white'}`}>
                  Bikfaya Baptist
                </p>
                <p className={`text-xs transition-colors ${scrolled ? 'text-brown-muted' : 'text-amber-200'}`}>
                  Bikfaya, Lebanon
                </p>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navKeys.map(key => (
                <Link
                  key={key}
                  href={`/${locale}${navPaths[key]}`}
                  className={`nav-link px-4 py-2 rounded-lg transition-colors ${
                    scrolled ? '' : 'text-amber-100 hover:text-white'
                  } ${isActive(key) ? 'active font-semibold' : ''}`}
                >
                  {t(key)}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={switchLocale}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  scrolled
                    ? 'border-gold text-gold hover:bg-gold hover:text-white'
                    : 'border-amber-300 text-amber-100 hover:bg-white hover:text-brown-deep'
                }`}
              >
                {locale === 'en' ? 'العربية' : 'English'}
              </button>
              <Link
                href={`/${locale}/join-us`}
                className="btn-gold text-sm px-5 py-2.5"
              >
                {t('joinUs')}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className={`block w-5 h-0.5 transition-all duration-300 ${scrolled ? 'bg-brown-deep' : 'bg-white'}`}
                  style={{
                    transform: mobileOpen
                      ? i === 0 ? 'translateY(8px) rotate(45deg)' : i === 2 ? 'translateY(-8px) rotate(-45deg)' : 'scaleX(0)'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'linear-gradient(135deg, #071529, #0F2044)' }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              {navKeys.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.15 }}
                >
                  <Link
                    href={`/${locale}${navPaths[key]}`}
                    className="font-serif text-3xl text-white hover:text-amber-300 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Link
                  href={`/${locale}/join-us`}
                  className="btn-gold mt-4"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('joinUs')}
                </Link>
              </motion.div>
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                onClick={switchLocale}
                className="mt-2 px-4 py-2 rounded-full border border-amber-300 text-amber-200 text-sm"
              >
                {locale === 'en' ? 'العربية' : 'English'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
