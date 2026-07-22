'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(allowMultiple ? prev : new Set<number>());
      if (prev.has(index)) { next.delete(index); }
      else { next.add(index); }
      return next;
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = openItems.has(i);
        return (
          <div
            key={i}
            className="bg-white rounded-xl border border-gold-light shadow-warm-sm overflow-hidden"
            style={{ borderColor: isOpen ? 'rgba(184,134,11,0.35)' : undefined }}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-brown-deep group-hover:text-gold transition-colors">
                {item.title}
              </span>
              <span
                className="flex-shrink-0 ml-4 w-6 h-6 rounded-full border border-gold flex items-center justify-center transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-5 text-brown-mid leading-relaxed border-t border-gold-light pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
