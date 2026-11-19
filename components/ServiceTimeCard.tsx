interface ServiceTimeCardProps {
  title: string;
  time: string;
  note?: string;
  icon?: string;
  image?: string;
  featured?: boolean;
}

export default function ServiceTimeCard({ title, time, note, icon, image, featured = false }: ServiceTimeCardProps) {
  if (!image) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-warm border border-gold-light hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5">
        {icon && <div className="text-3xl mb-3">{icon}</div>}
        <h3 className="font-serif text-lg text-brown-deep mb-3 leading-tight">{title}</h3>
        <div className="w-16 h-0.5 mx-auto mb-3" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
        <p className="font-serif text-2xl font-semibold text-gold mb-2">{time}</p>
        {note && <p className="text-brown-muted text-sm">{note}</p>}
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-warm-md ${
        featured ? 'h-72 md:h-96' : 'h-80'
      }`}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(15,32,68,0.95) 0%, rgba(15,32,68,0.55) 45%, rgba(15,32,68,0.05) 75%)' }}
      />
      <div className={`absolute inset-x-0 bottom-0 text-white ${featured ? 'p-8 md:p-12' : 'p-6'}`}>
        <p className={`font-serif font-semibold text-amber-300 leading-none ${featured ? 'text-5xl md:text-6xl' : 'text-3xl'}`}>
          {time}
        </p>
        <div className="my-3 h-0.5 w-12" style={{ background: 'linear-gradient(90deg, #D4A853, transparent)' }} />
        <h3 className={`font-serif leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{title}</h3>
        {note && <p className="mt-1 text-sm text-blue-100/80">{note}</p>}
      </div>
    </div>
  );
}
