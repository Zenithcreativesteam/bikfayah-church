import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const singletons = ['siteSettings', 'navigation', 'homePage', 'jesusPage', 'aboutPage', 'communityPage', 'sermonsPage', 'joinUsPage', 'contactPage'];

export default defineConfig({
  name: 'bikfayah-baptist',
  title: 'Bikfayah Baptist Church CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Global ──────────────────────────────────────
            S.listItem().title('⚙️  Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.listItem().title('🧭  Navigation').child(
              S.document().schemaType('navigation').documentId('navigation')
            ),
            S.divider(),

            // ── Pages ────────────────────────────────────────
            S.listItem().title('📄  Pages').child(
              S.list().title('Pages').items([
                S.listItem().title('🏠  Home Page').child(S.document().schemaType('homePage').documentId('homePage')),
                S.listItem().title('✝️   Jesus Page').child(S.document().schemaType('jesusPage').documentId('jesusPage')),
                S.listItem().title('ℹ️   About Page').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
                S.listItem().title('🤝  Community Page').child(S.document().schemaType('communityPage').documentId('communityPage')),
                S.listItem().title('🎙️  Sermons Page').child(S.document().schemaType('sermonsPage').documentId('sermonsPage')),
                S.listItem().title('🚪  Join Us Page').child(S.document().schemaType('joinUsPage').documentId('joinUsPage')),
                S.listItem().title('✉️   Contact Page').child(S.document().schemaType('contactPage').documentId('contactPage')),
              ])
            ),
            S.divider(),

            // ── Content Collections ───────────────────────────
            S.listItem().title('🎙️  Sermons').child(S.documentTypeList('sermon').title('Sermons')),
            S.listItem().title('👥  Staff Members').child(S.documentTypeList('staff').title('Staff')),
            S.listItem().title('⛪  Ministries').child(S.documentTypeList('ministry').title('Ministries')),
            S.listItem().title('🕐  Service Times').child(S.documentTypeList('serviceTime').title('Service Times')),
            S.listItem().title('❓  FAQ Items').child(S.documentTypeList('faqItem').title('FAQ Items')),
            S.listItem().title('📅  Events').child(S.documentTypeList('event').title('Events')),
            S.listItem().title('💬  Testimonials').child(S.documentTypeList('testimonial').title('Testimonials')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
