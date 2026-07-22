import { Testimonial } from '@/lib/fallback-data';

interface TestimonialCardProps {
  testimonial: Testimonial;
  locale?: string;
}

export default function TestimonialCard({ testimonial, locale = 'en' }: TestimonialCardProps) {
  const quote = locale === 'ar' ? testimonial.quoteAr : testimonial.quote;

  return (
    <div className="card-warm hover:shadow-warm-md transition-all duration-300 relative flex flex-col">
      {/* Quote mark */}
      <div
        className="absolute top-5 right-6 font-serif text-7xl leading-none select-none pointer-events-none"
        style={{ color: 'rgba(184,134,11,0.10)' }}
        aria-hidden="true"
      >
        "
      </div>
      <blockquote className="font-serif italic text-lg text-brown-deep leading-relaxed mb-6 flex-1">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3 border-t border-gold-light pt-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-serif font-semibold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #FDF3DC, #D4A853)', color: '#5C3D0A' }}
        >
          {testimonial.author.split(' ').map(n => n[0]).join('').slice(0,2)}
        </div>
        <div>
          <p className="font-medium text-brown-deep text-sm">{testimonial.author}</p>
          <p className="text-brown-muted text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
