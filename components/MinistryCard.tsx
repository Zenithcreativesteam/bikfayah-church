interface MinistryCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function MinistryCard({ title, description, icon }: MinistryCardProps) {
  return (
    <div className="card-warm hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5 group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-warm-sm"
        style={{ background: 'linear-gradient(135deg, #FDF3DC, #F0E4C0)', border: '1px solid rgba(184,134,11,0.2)' }}
      >
        {icon}
      </div>
      <h3 className="font-serif text-lg text-brown-deep mb-2 group-hover:text-gold transition-colors">
        {title}
      </h3>
      <p className="text-brown-mid text-sm leading-relaxed">{description}</p>
    </div>
  );
}
