interface ServiceTimeCardProps {
  title: string;
  time: string;
  note?: string;
  icon?: string;
}

export default function ServiceTimeCard({ title, time, note, icon }: ServiceTimeCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-8 text-center shadow-warm border border-gold-light hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5"
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="font-serif text-lg text-brown-deep mb-3 leading-tight">{title}</h3>
      <div
        className="w-16 h-0.5 mx-auto mb-3"
        style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }}
      />
      <p className="font-serif text-2xl font-semibold text-gold mb-2">{time}</p>
      {note && <p className="text-brown-muted text-sm">{note}</p>}
    </div>
  );
}
