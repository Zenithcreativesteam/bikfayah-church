'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [staffSearch, setStaffSearch] = useState('');
  const [staffRole, setStaffRole] = useState('All');

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

              {/* Pastor search + role filter */}
              <RevealOnScroll>
                <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="relative w-full sm:w-64">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                      type="search"
                      value={staffSearch}
                      onChange={e => setStaffSearch(e.target.value)}
                      placeholder={locale === 'ar' ? 'ابحث عن راعٍ...' : 'Search pastors...'}
                      className="input-warm pl-9 py-2 text-sm"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Senior Pastor', 'Assistant Pastor', 'Young Adult Pastor'].map(role => (
                      <button
                        key={role}
                        onClick={() => setStaffRole(role)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          staffRole === role
                            ? 'bg-gold text-white border-gold'
                            : 'border-gold-light text-brown-mid hover:border-gold hover:text-gold bg-white'
                        }`}
                      >
                        {role === 'All' ? (locale === 'ar' ? 'الجميع' : 'All') : role}
                      </button>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Pastoral Staff */}
              {(() => {
                const pastors = fallbackStaff.filter(m => m.staffType !== 'deacon').filter(m => {
                  const name = locale === 'ar' ? m.nameAr : m.name;
                  const matchesSearch = !staffSearch || name.toLowerCase().includes(staffSearch.toLowerCase());
                  const matchesRole = staffRole === 'All' || m.role === staffRole;
                  return matchesSearch && matchesRole;
                });
                return pastors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                    {pastors.map((member, i) => (
                      <RevealOnScroll key={member._id} delay={i * 0.1}>
                        <StaffCard member={member} locale={locale} />
                      </RevealOnScroll>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-brown-muted mb-16">
                    {locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                  </div>
                );
              })()}
              {/* Deacon Board */}
              <RevealOnScroll>
                <div className="text-center mb-8">
                  <p className="label-gold mb-2">{locale === 'ar' ? 'مجلس الشمامسة' : 'Deacon Board'}</p>
                  <h3 className="font-serif text-3xl text-brown-deep">{locale === 'ar' ? 'الشمامسة' : 'Our Deacons'}</h3>
                  <div className="gold-divider mt-3" />
                </div>
              </RevealOnScroll>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 max-w-4xl mx-auto">
                {fallbackStaff.filter(m => m.staffType === 'deacon').map((member, i) => (
                  <RevealOnScroll key={member._id} delay={i * 0.08}>
                    <div className="card-warm text-center py-6 px-3">
                      <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-serif text-lg font-semibold text-white" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2C4F8A)' }}>
                        {member.initials}
                      </div>
                      <p className="font-serif text-sm font-semibold text-brown-deep">{locale === 'ar' ? member.nameAr : member.name}</p>
                      <p className="text-xs text-brown-muted mt-0.5">{locale === 'ar' ? member.roleAr : member.role}</p>
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
              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <RevealOnScroll key={item.year} delay={i * 0.08}>
                    <div className={`flex flex-col md:flex-row gap-6 items-center md:items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="flex-1 card-warm md:max-w-[45%]">
                        <h3 className="font-serif text-xl text-brown-deep mb-1">{item.title}</h3>
                        <p className="text-brown-mid text-sm leading-relaxed">{item.text}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2 flex-shrink-0 z-10">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-warm-md" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A853)', color: 'white' }}>
                          <span className="font-serif text-xs font-bold text-center leading-tight px-1">{item.year}</span>
                        </div>
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
