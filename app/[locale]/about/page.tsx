'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import Accordion from '@/components/Accordion';
import StaffCard from '@/components/StaffCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import { fallbackStaff } from '@/lib/fallback-data';

// NOTE: This page uses client components (tabs); Sanity data is passed as props
// from a server wrapper in production. For now, it falls back gracefully.
type Tab = 'beliefs' | 'leadership' | 'history';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<Tab>('beliefs');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'beliefs', label: t('tabBeliefs') },
    { key: 'leadership', label: t('tabLeadership') },
    { key: 'history', label: t('tabHistory') },
  ];

  const confessionChapters = [
    { title: t('lf1Title'), content: t('lf1Text') },
    { title: t('lf2Title'), content: t('lf2Text') },
    { title: t('lf3Title'), content: t('lf3Text') },
    { title: t('lf4Title'), content: t('lf4Text') },
    { title: t('lf5Title'), content: t('lf5Text') },
    { title: t('lf6Title'), content: t('lf6Text') },
    { title: t('lf14Title'), content: t('lf14Text') },
    { title: t('lf29Title'), content: t('lf29Text') },
  ];

  const timeline = [
    { year: t('hist1Year'), title: t('hist1Title'), text: t('hist1Text') },
    { year: t('hist2Year'), title: t('hist2Title'), text: t('hist2Text') },
    { year: t('hist3Year'), title: t('hist3Title'), text: t('hist3Text') },
    { year: t('hist4Year'), title: t('hist4Title'), text: t('hist4Text') },
    { year: t('hist5Year'), title: t('hist5Title'), text: t('hist5Text') },
    { year: t('hist6Year'), title: t('hist6Title'), text: t('hist6Text') },
  ];

  return (
    <>
      <HeroSection label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      <div className="sticky top-16 md:top-20 z-30 bg-warm-white border-b border-gold-light shadow-warm-sm">
        <div className="container-church max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-6 py-4 font-sans text-sm font-medium border-b-2 transition-all ${activeTab === tab.key ? 'border-gold text-gold' : 'border-transparent text-brown-muted hover:text-brown-deep'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'beliefs' && (
          <motion.section key="beliefs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="section-warm">
            <div className="container-church max-w-4xl">
              <RevealOnScroll><SectionHeader label={t('beliefsLabel')} title={t('beliefsTitle')} /></RevealOnScroll>
              <RevealOnScroll delay={0.05}><p className="text-brown-mid text-lg text-center mb-10">{t('beliefsIntro')}</p></RevealOnScroll>
              <RevealOnScroll delay={0.1}><Accordion items={confessionChapters} /></RevealOnScroll>
            </div>
          </motion.section>
        )}
        {activeTab === 'leadership' && (
          <motion.section key="leadership" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="section-warm">
            <div className="container-church">
              <RevealOnScroll><SectionHeader label={t('leadershipLabel')} title={t('leadershipTitle')} /></RevealOnScroll>

              {(() => {
                const pastors = fallbackStaff.filter(m => m.staffType !== 'deacon');
                const senior = pastors.find(m => m.role === 'Senior Pastor');
                const secondary = pastors.filter(m => m.role !== 'Senior Pastor');
                return (
                  <div className="max-w-5xl mx-auto mb-20">
                    {/* Senior Pastor — full-width featured */}
                    {senior && (
                      <RevealOnScroll>
                        <div className="bg-white rounded-3xl shadow-warm-md border border-gold-light overflow-hidden mb-12">
                          <div className="grid md:grid-cols-2 gap-0">
                            <div className="flex items-center justify-center min-h-64 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2044, #1B3A6B)' }}>
                              {senior.photo ? (
                                <img src={senior.photo} alt={senior.name} className="w-full h-full object-cover object-top" style={{ minHeight: '16rem' }} />
                              ) : (
                                <div className="text-center p-10">
                                  <div className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center font-serif text-3xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A853)' }}>
                                    {senior.initials}
                                  </div>
                                  <p className="text-amber-300 label-gold text-sm tracking-widest">{locale === 'ar' ? senior.roleAr : senior.role}</p>
                                </div>
                              )}
                            </div>
                            <div className="p-10 flex flex-col justify-center">
                              <h3 className="font-serif text-3xl text-brown-deep mb-1">{locale === 'ar' ? senior.nameAr : senior.name}</h3>
                              <p className="label-gold text-xs mb-5">{locale === 'ar' ? senior.roleAr : senior.role}</p>
                              <p className="text-brown-mid text-sm leading-relaxed mb-6">{locale === 'ar' ? senior.bioAr : senior.bio}</p>
                              <Link href={`/${locale}/sermons`} className="btn-outline text-sm self-start">
                                {locale === 'ar' ? 'استمع إلى العظات' : 'Listen to Sermons'}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </RevealOnScroll>
                    )}

                    {/* Associate Pastors — separated clearly */}
                    {secondary.length > 0 && (
                      <>
                        <RevealOnScroll>
                          <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
                            <p className="label-gold text-xs tracking-widest whitespace-nowrap">
                              {locale === 'ar' ? 'القسوس المساعدون' : 'Associate Pastors'}
                            </p>
                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
                          </div>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {secondary.map((member, i) => (
                            <RevealOnScroll key={member._id} delay={i * 0.1}>
                              <div className="bg-white rounded-2xl shadow-warm border border-gold-light p-8 flex gap-6 items-start">
                                {member.photo ? (
                                  <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full flex-shrink-0 object-cover object-top" />
                                ) : (
                                  <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center font-serif text-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A853)' }}>
                                    {member.initials}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-serif text-xl text-brown-deep mb-0.5">{locale === 'ar' ? member.nameAr : member.name}</h3>
                                  <p className="label-gold text-xs mb-4">{locale === 'ar' ? member.roleAr : member.role}</p>
                                  <p className="text-brown-mid text-sm leading-relaxed">{locale === 'ar' ? member.bioAr : member.bio}</p>
                                </div>
                              </div>
                            </RevealOnScroll>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}

              {/* Deacon Board */}
              <RevealOnScroll>
                <div className="flex items-center gap-4 mb-10 max-w-5xl mx-auto">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
                  <div className="text-center px-4">
                    <p className="label-gold text-xs tracking-widest mb-1">{locale === 'ar' ? 'مجلس الشمامسة' : 'Deacon Board'}</p>
                    <h3 className="font-serif text-2xl text-brown-deep">{locale === 'ar' ? 'الشمامسة' : 'Our Deacons'}</h3>
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
                </div>
              </RevealOnScroll>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
                {fallbackStaff.filter(m => m.staffType === 'deacon').map((member, i) => (
                  <RevealOnScroll key={member._id} delay={i * 0.08}>
                    <div className="bg-white rounded-2xl border border-gold-light shadow-warm text-center py-8 px-4">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover object-top" />
                      ) : (
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center font-serif text-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2C4F8A)' }}>
                          {member.initials}
                        </div>
                      )}
                      <p className="font-serif text-base font-semibold text-brown-deep leading-snug">{locale === 'ar' ? member.nameAr : member.name}</p>
                      <p className="text-xs text-brown-muted mt-1">{locale === 'ar' ? member.roleAr : member.role}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </motion.section>
        )}
        {activeTab === 'history' && (
          <motion.section key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="section-warm">
            <div className="container-church max-w-4xl">
              <RevealOnScroll><SectionHeader label={t('historyLabel')} title={t('historyTitle')} /></RevealOnScroll>
              {/* Timeline with centered spine */}
              <div className="relative">
                {/* Vertical center line (desktop only) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #B8860B 8%, #B8860B 92%, transparent)' }} />
                <div className="space-y-12">
                  {timeline.map((item, i) => (
                    <RevealOnScroll key={item.year} delay={i * 0.08}>
                      <div className={`flex flex-col md:flex-row gap-6 items-center md:items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* Content card */}
                        <div className="flex-1 card-warm">
                          <h3 className="font-serif text-xl text-brown-deep mb-1">{item.title}</h3>
                          <p className="text-brown-mid text-sm leading-relaxed">{item.text}</p>
                        </div>
                        {/* Year dot — always centered */}
                        <div className="relative flex flex-col items-center flex-shrink-0 z-10">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-warm-md border-4 border-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A853)', color: 'white' }}>
                            <span className="font-serif text-base font-bold text-center leading-tight">{item.year}</span>
                          </div>
                        </div>
                        {/* Empty space on the other side (desktop) */}
                        <div className="flex-1 hidden md:block" />
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
