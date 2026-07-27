import React from 'react';

interface VerseBlockProps {
  verse: string;
  reference: string;
  className?: string;
}

export default function VerseBlock({ verse, reference, className = '' }: VerseBlockProps) {
  return (
    <div
      className={`verse-block rounded-r-xl ${className}`}
      style={{ background: 'linear-gradient(to right, rgba(214,228,245,0.6), rgba(214,228,245,0.1))' }}
    >
      <p className="font-serif text-xl md:text-2xl italic text-brown-deep leading-relaxed mb-3">
        {verse}
      </p>
      <p className="label-gold">{reference}</p>
    </div>
  );
}
