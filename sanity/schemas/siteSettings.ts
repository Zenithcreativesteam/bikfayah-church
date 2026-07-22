import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity & Branding' },
    { name: 'colors', title: 'Colors' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'social', title: 'Social Media' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // ── Identity ──
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', group: 'identity', initialValue: 'Bikfayah Baptist Church' }),
    defineField({ name: 'siteNameAr', title: 'Site Name (Arabic)', type: 'string', group: 'identity', initialValue: 'كنيسة بكفيّا المعمدانية' }),
    defineField({ name: 'tagline', title: 'Tagline (English)', type: 'string', group: 'identity' }),
    defineField({ name: 'taglineAr', title: 'Tagline (Arabic)', type: 'string', group: 'identity' }),
    defineField({ name: 'logo', title: 'Logo Image', type: 'image', group: 'identity', options: { hotspot: true } }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', group: 'identity' }),

    // ── Colors ──
    defineField({ name: 'colorGold', title: 'Gold Accent Color', type: 'string', group: 'colors', initialValue: '#B8860B', description: 'Hex color, e.g. #B8860B' }),
    defineField({ name: 'colorHeroDark', title: 'Hero Background Color', type: 'string', group: 'colors', initialValue: '#2C1A08' }),
    defineField({ name: 'colorPageBg', title: 'Page Background Color', type: 'string', group: 'colors', initialValue: '#FDFBF7' }),
    defineField({ name: 'colorTextPrimary', title: 'Primary Text Color', type: 'string', group: 'colors', initialValue: '#1C1208' }),

    // ── Contact ──
    defineField({ name: 'address', title: 'Address (English)', type: 'string', group: 'contact' }),
    defineField({ name: 'addressAr', title: 'Address (Arabic)', type: 'string', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', group: 'contact' }),
    defineField({ name: 'googleMapsUrl', title: 'Google Maps URL', type: 'url', group: 'contact' }),
    defineField({ name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url', group: 'contact', description: 'The embed src URL from Google Maps' }),

    // ── Social ──
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url', group: 'social' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube Channel URL', type: 'url', group: 'social' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'social' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string', group: 'social' }),

    // ── Footer ──
    defineField({ name: 'footerTagline', title: 'Footer Tagline (English)', type: 'text', rows: 2, group: 'footer' }),
    defineField({ name: 'footerTaglineAr', title: 'Footer Tagline (Arabic)', type: 'text', rows: 2, group: 'footer' }),
    defineField({ name: 'copyrightText', title: 'Copyright Text', type: 'string', group: 'footer' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
