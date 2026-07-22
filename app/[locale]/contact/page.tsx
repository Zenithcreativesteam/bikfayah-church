'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [contactState, setContactState] = useState<FormState>('idle');
  const [prayerState, setPrayerState] = useState<FormState>('idle');
  const [prayerPrivate, setPrayerPrivate] = useState(false);

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactState('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setContactState(res.ok ? 'success' : 'error');
  };

  const handlePrayer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrayerState('sending');
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), private: prayerPrivate };
    const res = await fetch('/api/prayer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setPrayerState(res.ok ? 'success' : 'error');
  };

  return (
    <>
      <HeroSection label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSubtitle')} minHeight="min-h-[60vh]" />

      <section className="section-warm">
        <div className="container-church grid lg:grid-cols-3 gap-10">
          {/* Contact form */}
          <div className="lg:col-span-2 space-y-8">
            <RevealOnScroll direction="left">
              <div className="card-warm">
                <SectionHeader label={t('contactFormLabel')} title={t('contactFormTitle')} centered={false} />
                <AnimatePresence mode="wait">
                  {contactState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="text-5xl mb-4">✉️</div>
                      <h3 className="font-serif text-2xl text-brown-deep mb-2">{t('successTitle')}</h3>
                      <p className="text-brown-mid">{t('successText')}</p>
                      <button onClick={() => setContactState('idle')} className="btn-outline mt-6 text-sm">
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleContact}
                      className="space-y-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input name="name" required placeholder={t('namePlaceholder')} className="input-warm" />
                        <input name="email" type="email" required placeholder={t('emailPlaceholder')} className="input-warm" />
                      </div>
                      <input name="phone" type="tel" placeholder={t('phonePlaceholder')} className="input-warm" />
                      <input name="subject" required placeholder={t('subjectPlaceholder')} className="input-warm" />
                      <textarea name="message" required rows={5} placeholder={t('messagePlaceholder')} className="input-warm resize-none" />
                      <button
                        type="submit"
                        disabled={contactState === 'sending'}
                        className="btn-gold w-full justify-center disabled:opacity-60"
                      >
                        {contactState === 'sending' ? t('sending') : t('send')}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>

            {/* Prayer form */}
            <RevealOnScroll direction="left" delay={0.1}>
              <div className="card-warm" style={{ borderLeft: '3px solid #B8860B' }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🙏</span>
                  <div>
                    <p className="label-gold text-xs">{t('prayerFormLabel')}</p>
                    <h2 className="font-serif text-2xl text-brown-deep">{t('prayerFormTitle')}</h2>
                  </div>
                </div>
                <p className="text-brown-mid mb-6">{t('prayerText')}</p>
                <AnimatePresence mode="wait">
                  {prayerState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-8 text-center"
                    >
                      <div className="text-4xl mb-3">🕊</div>
                      <p className="text-brown-mid">{t('prayerSuccess')}</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handlePrayer}
                      className="space-y-4"
                    >
                      <input name="name" required placeholder={t('prayerNamePlaceholder')} className="input-warm" />
                      <textarea name="request" required rows={4} placeholder={t('prayerRequestPlaceholder')} className="input-warm resize-none" />
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={prayerPrivate}
                          onChange={e => setPrayerPrivate(e.target.checked)}
                          className="w-4 h-4 accent-gold rounded"
                        />
                        <span className="text-brown-mid text-sm group-hover:text-brown-deep">{t('prayerPrivate')}</span>
                      </label>
                      <button
                        type="submit"
                        disabled={prayerState === 'sending'}
                        className="btn-gold w-full justify-center disabled:opacity-60"
                      >
                        {prayerState === 'sending' ? '...' : t('prayerSubmit')}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          </div>

          {/* Info sidebar */}
          <div className="space-y-5">
            <RevealOnScroll direction="right">
              <div className="card-warm">
                <h3 className="font-serif text-xl text-brown-deep mb-5">{t('infoTitle')}</h3>
                <ul className="space-y-4 text-sm">
                  {[
                    { icon: '📍', value: t('address') },
                    { icon: '📞', value: t('phone'), href: `tel:${t('phone')}` },
                    { icon: '✉', value: t('email'), href: `mailto:${t('email')}` },
                  ].map(item => (
                    <li key={item.icon} className="flex items-start gap-3">
                      <span className="text-gold flex-shrink-0 mt-0.5 text-base">{item.icon}</span>
                      {item.href ? (
                        <a href={item.href} className="text-brown-mid hover:text-gold transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-brown-mid">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.1}>
              <div className="card-warm">
                <h3 className="font-serif text-lg text-brown-deep mb-4">Office Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-brown-muted">Sunday</span>
                    <span className="text-brown-deep">{t('sundayHours')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brown-muted">Wednesday</span>
                    <span className="text-brown-deep">{t('wednesdayHours')}</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Map placeholder */}
            <RevealOnScroll direction="right" delay={0.15}>
              <div
                className="rounded-2xl h-52 flex items-center justify-center shadow-warm"
                style={{ background: 'linear-gradient(135deg, #FDF3DC, #E8D9A0)' }}
              >
                <div className="text-center">
                  <p className="text-4xl mb-2">🗺</p>
                  <p className="text-brown-mid font-serif">Bikfaya, Lebanon</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
