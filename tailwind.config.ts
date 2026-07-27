import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        'warm-white': '#FDFBF7',
        'parchment': '#F2EBD9',
        'parchment-light': '#F7F0E4',
        'honey-light': '#FDF3DC',
        'honey': '#F0E4C0',
        // Text (navy-based)
        'brown-deep': '#0D1F3C',
        'brown-mid': '#1E3A5F',
        'brown-muted': '#5B7FA6',
        // Accent
        'gold': '#B8860B',
        'gold-light': 'rgba(184,134,11,0.15)',
        // Hero / dark backgrounds (navy)
        'hero-dark': '#0F2044',
        'hero-darker': '#071529',
        // Navy blue palette
        'navy-deep': '#0F2044',
        'navy': '#1B3A6B',
        'navy-mid': '#2C4F8A',
        'navy-muted': '#4A6B9A',
        'navy-light': 'rgba(27,58,107,0.12)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 4px rgba(13,31,60,0.07)',
        'warm': '0 2px 12px rgba(13,31,60,0.09)',
        'warm-md': '0 4px 24px rgba(13,31,60,0.12)',
        'warm-lg': '0 8px 48px rgba(13,31,60,0.15)',
      },
      backgroundImage: {
        'honey-gradient': 'linear-gradient(135deg, #FDF3DC 0%, #F0E4C0 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0F2044 0%, #1B3A6B 100%)',
        'gold-divider': 'linear-gradient(90deg, transparent, #B8860B, transparent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
