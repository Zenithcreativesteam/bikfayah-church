import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ label, title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <p className={`label-gold mb-3 ${light ? 'text-amber-300' : 'text-gold'}`}>{label}</p>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 ${
          light ? 'text-white' : 'text-brown-deep'
        }`}
      >
        {title}
      </h2>
      <div className="gold-divider" style={{ background: light ? 'linear-gradient(90deg, transparent, rgba(214,228,245,0.7), transparent)' : undefined }} />
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-blue-100' : 'text-brown-mid'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
