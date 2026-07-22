import { StaffMember } from '@/lib/fallback-data';

interface StaffCardProps {
  member: StaffMember;
  locale?: string;
}

export default function StaffCard({ member, locale = 'en' }: StaffCardProps) {
  const name = locale === 'ar' ? member.nameAr : member.name;
  const role = locale === 'ar' ? member.roleAr : member.role;
  const bio = locale === 'ar' ? member.bioAr : member.bio;

  return (
    <div className="card-warm text-center hover:shadow-warm-md transition-all duration-300 group">
      {/* Photo placeholder */}
      <div
        className="w-28 h-28 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl font-serif font-light shadow-warm"
        style={{ background: 'linear-gradient(135deg, #FDF3DC 0%, #D4A853 100%)' }}
      >
        <span className="text-amber-900 font-serif text-3xl font-semibold select-none">
          {member.initials}
        </span>
      </div>
      <h3 className="font-serif text-xl text-brown-deep mb-1 group-hover:text-gold transition-colors">
        {name}
      </h3>
      <p className="label-gold mb-4">{role}</p>
      <div
        className="w-12 h-0.5 mx-auto mb-4"
        style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }}
      />
      <p className="text-brown-mid text-sm leading-relaxed">{bio}</p>
    </div>
  );
}
