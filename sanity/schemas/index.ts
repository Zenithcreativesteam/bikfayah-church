import sermon from './sermon';
import staff from './staff';
import event from './event';
import testimonial from './testimonial';
import siteSettings from './siteSettings';
import navigation from './navigation';
import ministry from './ministry';
import serviceTime from './serviceTime';
import faqItem from './faqItem';
import { homePage, jesusPage, aboutPage, communityPage, sermonsPage, joinUsPage, contactPage } from './pages';

export const schemaTypes = [
  // Singletons
  siteSettings,
  navigation,
  homePage,
  jesusPage,
  aboutPage,
  communityPage,
  sermonsPage,
  joinUsPage,
  contactPage,
  // Collections
  sermon,
  staff,
  ministry,
  serviceTime,
  faqItem,
  event,
  testimonial,
];
