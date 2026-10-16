'use client';
import { motion } from 'framer-motion';
import React from 'react';
import CrossIcon from './CrossIcon';

interface HeroSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  minHeight?: string;
  backgroundImageUrl?: string;
  overlayOpacity?: number;
}

export default function HeroSection({
  label,
  title,
  subtitle,
  children,
  minHeight = 'min-h-[70vh]',
  backgroundImageUrl,
  overlayOpacity = 55,
}: HeroSectionProps) {
  const overlayAlpha = Math.round((overlayOpacity / 100) * 255).toString(16).padStart(2, '0');

  return (
    <section
      className={`relative ${minHeight} flex items-center justify-center overflow-hidden`}
      style={{
        background: backgroundImageUrl
          ? undefined
          : 'linear-gradient(135deg, #0F2044 0%, #1B3A6B 55%, #0F2044 100%)',
      }}
    >
      {/* Background image */}
      {backgroundImageUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
          {/* Dark overlay over image */}
          <div
            className="absolute inset-0"
            style={{ background: `#0D1F3C${overlayAlpha}` }}
          />
        </>
      )}

      {/* Dot pattern (only without image) */}
      {!backgroundImageUrl && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #B8860B 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Warm gold radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(27,58,107,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Decorative cross watermark */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
        <CrossIcon size={280} color="#B8860B" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-4"
          >
            {label}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 whitespace-pre-line"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-blue-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
