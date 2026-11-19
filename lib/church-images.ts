// Church photos of Bikfaya Baptist Church, used as fallbacks when no Sanity image is set.
export interface ChurchPhoto { src: string; thumb: string; width: number; height: number }

export const churchImages = {
  homeHero: '/church/church-30.jpg',        // congregation in front of the church
  homeWelcome: '/church/church-60.jpg',     // sanctuary
  aboutHero: '/church/church-42.jpg',       // church facade
  jesusHero: '/church/church-55.jpg',       // pulpit
  jesusWho: '/church/church-61.jpg',        // preaching
  communityHero: '/church/church-06.jpg',   // church hike
  communityYouth: '/church/church-05.jpg',  // youth hike
  communityBible: '/church/church-61.jpg',  // Bible study: pastor teaching in church
  sermonsHero: '/church/church-49.jpg',     // Sunday sermon
  joinUsHero: '/church/church-37.jpg',      // church gate sign
  joinUsFamilies: '/church/church-23.jpg',  // church family gathering
  galleryHero: '/church/church-31.jpg',

  // Photo-led sections
  welcomeCollage: ['/church/church-60.jpg', '/church/church-21.jpg', '/church/church-32.jpg'],
  // Service time cards, in the same order as the service times list
  serviceTimes: ['/church/church-44.jpg', '/church/church-15.jpg', '/church/church-64.jpg', '/church/church-03.jpg'],
  lifeTogether: ['/church/church-08.jpg', '/church/church-05.jpg', '/church/church-02.jpg', '/church/church-21.jpg', '/church/church-33.jpg', '/church/church-16.jpg'],
  gospelBand: '/church/church-54.jpg',
  jesusSteps: '/church/church-56.jpg',
  pastorBand: '/church/church-64.jpg',
  youthCollage: ['/church/church-05.jpg', '/church/church-08.jpg', '/church/church-03.jpg'],
  testimonialsBand: '/church/church-34.jpg',
  joinUsSunday: '/church/church-60.jpg',
  joinUsLocation: '/church/church-36.jpg',
  joinUsFaq: '/church/church-13.jpg',
  beliefs: '/church/church-48.jpg',
  contactHero: '/church/church-46.jpg',
  contactSide: '/church/church-23.jpg',
  // About > history timeline (buildings and interiors only, not dated events)
  history: ['/church/church-36.jpg', '/church/church-42.jpg', '/church/church-55.jpg', '/church/church-60.jpg', '/church/church-08.jpg', '/church/church-31.jpg'],
};

export const galleryPhotos: ChurchPhoto[] = [
  { src: '/church/church-01.jpg', thumb: '/church/thumbs/church-01.jpg', width: 1600, height: 1200 },
  { src: '/church/church-02.jpg', thumb: '/church/thumbs/church-02.jpg', width: 1280, height: 960 },
  { src: '/church/church-03.jpg', thumb: '/church/thumbs/church-03.jpg', width: 1280, height: 960 },
  { src: '/church/church-04.jpg', thumb: '/church/thumbs/church-04.jpg', width: 1920, height: 865 },
  { src: '/church/church-05.jpg', thumb: '/church/thumbs/church-05.jpg', width: 1920, height: 1440 },
  { src: '/church/church-06.jpg', thumb: '/church/thumbs/church-06.jpg', width: 1280, height: 960 },
  { src: '/church/church-07.jpg', thumb: '/church/thumbs/church-07.jpg', width: 1920, height: 865 },
  { src: '/church/church-08.jpg', thumb: '/church/thumbs/church-08.jpg', width: 1920, height: 1440 },
  { src: '/church/church-09.jpg', thumb: '/church/thumbs/church-09.jpg', width: 1920, height: 1440 },
  { src: '/church/church-10.jpg', thumb: '/church/thumbs/church-10.jpg', width: 1081, height: 1920 },
  { src: '/church/church-11.jpg', thumb: '/church/thumbs/church-11.jpg', width: 1920, height: 1080 },
  { src: '/church/church-12.jpg', thumb: '/church/thumbs/church-12.jpg', width: 1280, height: 963 },
  { src: '/church/church-13.jpg', thumb: '/church/thumbs/church-13.jpg', width: 1920, height: 1280 },
  { src: '/church/church-14.jpg', thumb: '/church/thumbs/church-14.jpg', width: 1920, height: 1280 },
  { src: '/church/church-16.jpg', thumb: '/church/thumbs/church-16.jpg', width: 1920, height: 1280 },
  { src: '/church/church-21.jpg', thumb: '/church/thumbs/church-21.jpg', width: 1920, height: 1280 },
  { src: '/church/church-23.jpg', thumb: '/church/thumbs/church-23.jpg', width: 1280, height: 960 },
  { src: '/church/church-32.jpg', thumb: '/church/thumbs/church-32.jpg', width: 1280, height: 853 },
  { src: '/church/church-33.jpg', thumb: '/church/thumbs/church-33.jpg', width: 1600, height: 1200 },
  { src: '/church/church-36.jpg', thumb: '/church/thumbs/church-36.jpg', width: 1920, height: 1280 },
  { src: '/church/church-37.jpg', thumb: '/church/thumbs/church-37.jpg', width: 1920, height: 1280 },
  { src: '/church/church-42.jpg', thumb: '/church/thumbs/church-42.jpg', width: 1920, height: 1280 },
  { src: '/church/church-44.jpg', thumb: '/church/thumbs/church-44.jpg', width: 1920, height: 1280 },
  { src: '/church/church-46.jpg', thumb: '/church/thumbs/church-46.jpg', width: 1920, height: 1280 },
  { src: '/church/church-54.jpg', thumb: '/church/thumbs/church-54.jpg', width: 1920, height: 1280 },
  { src: '/church/church-58.jpg', thumb: '/church/thumbs/church-58.jpg', width: 1920, height: 1280 },
  { src: '/church/church-60.jpg', thumb: '/church/thumbs/church-60.jpg', width: 1920, height: 1280 },
  { src: '/church/church-61.jpg', thumb: '/church/thumbs/church-61.jpg', width: 1920, height: 1280 },
];
