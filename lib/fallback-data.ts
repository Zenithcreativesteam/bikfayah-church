// ────────────────────────────────────────────────────────────
// Fallback data — used when Sanity is not yet connected
// ────────────────────────────────────────────────────────────

export interface Sermon {
  _id: string;
  slug: string;
  title: string;
  titleAr: string;
  speaker: string;
  speakerAr: string;
  date: string;
  series: string;
  seriesAr: string;
  scripture: string;
  duration: number;
  youtubeUrl: string;
  thumbnailUrl?: string;
  excerpt: string;
  excerptAr: string;
  tags: string[];
  featured: boolean;
}

export interface StaffMember {
  _id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  initials: string;
  staffType?: 'pastor' | 'deacon';
}

export interface Testimonial {
  _id: string;
  quote: string;
  quoteAr: string;
  author: string;
  role: string;
}

export const fallbackSermons: Sermon[] = [
  {
    _id: 's1',
    slug: 'the-bread-of-life',
    title: 'The Bread of Life',
    titleAr: 'خبز الحياة',
    speaker: 'Pastor Samuel Kharat',
    speakerAr: 'القس صموئيل خرّاط',
    date: '2024-06-02',
    series: 'Gospel of John',
    seriesAr: 'إنجيل يوحنا',
    scripture: 'John 6:35–51',
    duration: 42,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'Jesus declares "I am the bread of life." What does it mean to feed on Christ and find lasting satisfaction? This sermon explores the great I AM statement and what it demands from us.',
    excerptAr: 'يعلن يسوع "أنا هو خبز الحياة." ماذا يعني أن نتغذى على المسيح ونجد الرضا الدائم؟ تستكشف هذه العظة عبارة "أنا هو" العظيمة وما تتطلبه منا.',
    tags: ['Gospel of John', 'I AM', 'Faith', 'Jesus'],
    featured: true,
  },
  {
    _id: 's2',
    slug: 'the-good-shepherd',
    title: 'The Good Shepherd',
    titleAr: 'الراعي الصالح',
    speaker: 'Pastor Samuel Kharat',
    speakerAr: 'القس صموئيل خرّاط',
    date: '2024-05-26',
    series: 'Gospel of John',
    seriesAr: 'إنجيل يوحنا',
    scripture: 'John 10:1–18',
    duration: 38,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'In a region where shepherds are known, Jesus takes the familiar image and fills it with eternal meaning — He is not just a good shepherd, He is THE Good Shepherd who lays down His life.',
    excerptAr: 'في منطقة يعرف فيها الرعاة، يأخذ يسوع الصورة المألوفة ويملأها بمعنى أبدي — إنه ليس مجرد راعٍ صالح، بل هو الراعي الصالح الذي يبذل حياته.',
    tags: ['Gospel of John', 'I AM', 'Atonement'],
    featured: false,
  },
  {
    _id: 's3',
    slug: 'justified-by-faith',
    title: 'Justified by Faith Alone',
    titleAr: 'مبرَّرون بالإيمان وحده',
    speaker: 'Wissam Nasrallah',
    speakerAr: 'وسام نصر الله',
    date: '2024-05-19',
    series: 'Romans: The Gospel Unpacked',
    seriesAr: 'رومية: الإنجيل مشروح',
    scripture: 'Romans 3:21–26',
    duration: 45,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'The Reformation\'s great recovery — "by faith alone, in Christ alone" — is not a medieval invention but a biblical treasure we must guard and proclaim.',
    excerptAr: 'استرداد الإصلاح العظيم — "بالإيمان وحده، في المسيح وحده" — ليس اختراعاً في العصور الوسطى بل كنز كتابي يجب أن نحرسه ونكرز به.',
    tags: ['Romans', 'Justification', 'Gospel', 'Reformation'],
    featured: false,
  },
  {
    _id: 's4',
    slug: 'the-prodigal-son',
    title: 'The Father Who Runs',
    titleAr: 'الآب الذي يركض',
    speaker: 'Rick Warner',
    speakerAr: 'ريك وارنر',
    date: '2024-05-12',
    series: 'Parables of Grace',
    seriesAr: 'أمثال النعمة',
    scripture: 'Luke 15:11–32',
    duration: 50,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'The Parable of the Prodigal Son is perhaps the most beloved story in all of Scripture. But the hero is not the son — it\'s the father who sees from far off and runs.',
    excerptAr: 'مَثَل الابن الشاطر ربما هو القصة الأحب في كل الكتاب المقدس. لكن البطل ليس الابن — بل الآب الذي يرى من بعيد ويركض.',
    tags: ['Luke', 'Grace', 'Parables', 'Prodigal'],
    featured: false,
  },
  {
    _id: 's5',
    slug: 'the-resurrection-and-the-life',
    title: 'The Resurrection and the Life',
    titleAr: 'القيامة والحياة',
    speaker: 'Pastor Samuel Kharat',
    speakerAr: 'القس صموئيل خرّاط',
    date: '2024-04-07',
    series: 'Easter 2024',
    seriesAr: 'عيد القيامة ٢٠٢٤',
    scripture: 'John 11:17–27',
    duration: 48,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'At the tomb of Lazarus, Jesus makes the most audacious claim in history: "I am the resurrection and the life." Everything depends on whether He means it.',
    excerptAr: 'عند قبر لعازر، يُدلي يسوع بأجرأ إعلان في التاريخ: "أنا هو القيامة والحياة." كل شيء يتوقف على ما إذا كان يعني ذلك.',
    tags: ['John', 'Easter', 'Resurrection', 'I AM'],
    featured: false,
  },
  {
    _id: 's6',
    slug: 'the-sermon-on-the-mount',
    title: 'Blessed Are the Poor in Spirit',
    titleAr: 'طوبى للمساكين بالروح',
    speaker: 'Wissam Nasrallah',
    speakerAr: 'وسام نصر الله',
    date: '2024-03-24',
    series: 'The Sermon on the Mount',
    seriesAr: 'العظة على الجبل',
    scripture: 'Matthew 5:1–12',
    duration: 55,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'The Beatitudes are a revolution. Jesus turns the world\'s value system upside down and declares that the Kingdom belongs not to the powerful, but to those who know their need of God.',
    excerptAr: 'التطويبات ثورة. يقلب يسوع نظام قيم العالم رأساً على عقب ويُعلن أن الملكوت لا ينتمي للأقوياء بل لمن يعرفون احتياجهم لله.',
    tags: ['Matthew', 'Beatitudes', 'Kingdom', 'Sermon on the Mount'],
    featured: false,
  },
  {
    _id: 's7',
    slug: 'by-grace-through-faith',
    title: 'By Grace Through Faith',
    titleAr: 'بالنعمة بالإيمان',
    speaker: 'Rick Warner',
    speakerAr: 'ريك وارنر',
    date: '2024-03-10',
    series: 'Ephesians: In the Heavenly Places',
    seriesAr: 'أفسس: في السماويات',
    scripture: 'Ephesians 2:1–10',
    duration: 44,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'We were dead — not sick, not wounded, but dead. And God, rich in mercy, made us alive. This passage contains what may be the most important four-word phrase in the New Testament: "But God..."',
    excerptAr: 'كنّا أمواتاً — ليس مرضى، ليس جرحى، بل أمواتاً. والله الغني في الرحمة أحيانا. تحتوي هذه الآيات على ما قد يكون أهم عبارة من كلمتين في العهد الجديد: "لكن الله..."',
    tags: ['Ephesians', 'Grace', 'Salvation', 'Faith'],
    featured: false,
  },
  {
    _id: 's8',
    slug: 'knowing-god',
    title: 'Knowing God — Not Just About Him',
    titleAr: 'معرفة الله — لا مجرد معرفة عنه',
    speaker: 'Pastor Samuel Kharat',
    speakerAr: 'القس صموئيل خرّاط',
    date: '2024-02-25',
    series: 'Special Messages',
    seriesAr: 'رسائل خاصة',
    scripture: 'John 17:3',
    duration: 40,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'Jesus defines eternal life not as a destination but as a relationship: "This is eternal life, that they know you." There is a world of difference between knowing facts about God and knowing God personally.',
    excerptAr: 'يعرّف يسوع الحياة الأبدية ليس كوجهة بل كعلاقة: "وهذه هي الحياة الأبدية أن يعرفوك." هناك فرق كبير بين معرفة حقائق عن الله ومعرفة الله شخصياً.',
    tags: ['John', 'Knowing God', 'Eternal Life', 'Prayer'],
    featured: false,
  },
];

export const fallbackStaff: StaffMember[] = [
  {
    _id: 'st1',
    name: 'Pastor Samuel Kharat',
    nameAr: 'القس صموئيل خرّاط',
    role: 'Senior Pastor',
    roleAr: 'القس الرئيسي',
    staffType: 'pastor',
    initials: 'SK',
    bio: 'Pastor Dr. Samuel Kharat has served Bikfaya Baptist Church since 1979. He is a graduate of the Arab Baptist Theological Seminary (ABTS) in Beirut and served as a professor of Pastoral Theology and Christian Counseling there from 1985 to 2019. He is the founder of ACME (Association of Counselling Ministry and Education) and holds a PhD in Psychological Counseling from Alabama, USA. He has also served as president of the Association of Evangelical Baptist Churches in Lebanon. He and his wife Rouda have two children and five grandchildren.',
    bioAr: 'القس الدكتور صمونيل الخرّاط راعي كنيسة بكفيّا البابتية الإنجيلية منذ عام ١٩٧٩. تخرّج من كلية اللاهوت المعمدانية العربية (ABTS) في بيروت، وخدم أستاذاً لمواد اللاهوت الراعوي والإرشاد المسيحي فيها من ١٩٨٥ حتى ٢٠١٩. مؤسس ورئيس مؤسسة «أكمي» للتعليم والإرشاد، وحاصل على درجة الدكتوراه في الإرشاد النفسي من ألاباما، أمريكا. خدم أيضاً رئيساً لمجمع الكنائس المعمدانية الإنجيلية في لبنان. متزوج من رودا الحمصي ولهما ولدان وخمسة أحفاد.',
  },
  {
    _id: 'st2',
    name: 'Wissam Nasrallah',
    nameAr: 'وسام نصر الله',
    role: 'Assistant Pastor',
    roleAr: 'القس المساعد',
    staffType: 'pastor',
    initials: 'WN',
    bio: 'Bio coming soon.',
    bioAr: 'السيرة الذاتية قريباً.',
  },
  {
    _id: 'st3',
    name: 'Rick Warner',
    nameAr: 'ريك وارنر',
    role: 'Young Adult Pastor',
    roleAr: 'قسيس الشباب',
    staffType: 'pastor',
    initials: 'RW',
    bio: 'Rick serves as our young adult pastor at Bikfaya Baptist. Originally from Australia, Rick served as a pastor across two cities before moving to serve God in the Middle East. Rick\'s prayer is for God to raise up a generation of believers who are deeply formed by the cross of Jesus.',
    bioAr: 'يخدم ريك قسيساً للشباب في كنيسة بكفيّا المعمدانية. أصله من أستراليا، خدم قسيساً في مدينتين قبل أن ينتقل لخدمة الله في الشرق الأوسط. صلاة ريك هي أن يُقيم الله جيلاً من المؤمنين متشكّلاً في عمقه بصليب يسوع.',
  },
  // Deacon Board
  {
    _id: 'dc1',
    name: 'Issam Salemeh',
    nameAr: 'عصام سالمه',
    role: 'Deacon',
    roleAr: 'شماس',
    staffType: 'deacon',
    initials: 'IS',
    bio: '',
    bioAr: '',
  },
  {
    _id: 'dc2',
    name: 'Joseph Joubran',
    nameAr: 'جوزيف جبران',
    role: 'Deacon',
    roleAr: 'شماس',
    staffType: 'deacon',
    initials: 'JJ',
    bio: '',
    bioAr: '',
  },
  {
    _id: 'dc3',
    name: 'Ghassan Atwe',
    nameAr: 'غسان عطوي',
    role: 'Deacon',
    roleAr: 'شماس',
    staffType: 'deacon',
    initials: 'GA',
    bio: '',
    bioAr: '',
  },
  {
    _id: 'dc4',
    name: 'Moussa Kharrat',
    nameAr: 'موسى خرّاط',
    role: 'Deacon',
    roleAr: 'شماس',
    staffType: 'deacon',
    initials: 'MK',
    bio: '',
    bioAr: '',
  },
  {
    _id: 'dc5',
    name: 'Jean Chaaya',
    nameAr: 'جان شعيا',
    role: 'Deacon',
    roleAr: 'شماس',
    staffType: 'deacon',
    initials: 'JC',
    bio: '',
    bioAr: '',
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'tm1',
    quote: 'I came to Bikfayah Baptist as a skeptic, just accompanying my wife. Three months later I surrendered my life to Christ. The preaching here is unlike anything I\'d heard — it\'s real, it\'s rooted in Scripture, and it changed everything for me.',
    quoteAr: 'جئت إلى كنيسة بكفيّا المعمدانية شكّاكاً، فقط مرافقاً لزوجتي. بعد ثلاثة أشهر سلّمت حياتي للمسيح. الكرازة هنا لا مثيل لها فيما سمعته — إنها حقيقية، متجذّرة في الكتاب المقدس، وغيّرت كل شيء بالنسبة لي.',
    author: 'Elie M.',
    role: 'Church member since 2021',
  },
  {
    _id: 'tm2',
    quote: 'Through the hardest years our family has faced — loss, illness, crisis — this church family was there. Not with easy answers, but with presence, prayer, and the Word of God. We have been held.',
    quoteAr: 'خلال أصعب السنوات التي واجهتها عائلتنا — الخسارة والمرض والأزمة — كانت عائلة الكنيسة هذه موجودة. ليس بإجابات سهلة بل بالحضور والصلاة وكلام الله. لقد اُحتُضنّا.',
    author: 'Nadia & Joseph K.',
    role: 'Founding family members',
  },
  {
    _id: 'tm3',
    quote: 'As a young Lebanese woman trying to navigate faith and modern life, I needed a community that took the Bible seriously without being closed-off. I found that here. The youth ministry gave me roots and wings at the same time.',
    quoteAr: 'كفتاة لبنانية شابة تحاول التعامل مع الإيمان والحياة الحديثة، كنت بحاجة إلى مجتمع يأخذ الكتاب المقدس بجدية دون أن يكون منغلقاً. وجدت ذلك هنا. أعطتني خدمة الشبيبة جذوراً وأجنحة في نفس الوقت.',
    author: 'Maya R.',
    role: 'Youth ministry leader',
  },
  {
    _id: 'tm4',
    quote: 'The Lord used this church to bring me to a deeper love for His Word and a greater desire to follow Christ. Faithful teaching, genuine fellowship, and God\'s grace have shaped my life in ways I never expected.',
    quoteAr: 'استخدم الرب هذه الكنيسة ليقودني إلى محبة أعمق لكلمته ورغبة أكبر في اتباع المسيح. التعليم الأمين، الشركة الحقيقية، ونعمة الله شكّلت حياتي بطرق لم أتوقعها أبداً.',
    author: 'Samir Nakhle',
    role: 'Church member since 2024',
  },
];

export const fallbackMarqueeVerses = [
  { text: '"For God so loved the world that he gave his one and only Son" — John 3:16', textAr: '"لأَنَّهُ هكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ" — يوحنا ٣:١٦' },
  { text: '"Taste and see that the LORD is good" — Psalm 34:8', textAr: '"ذُوقُوا وَانْظُرُوا مَا أَطْيَبَ الرَّبَّ" — مزمور ٣٤:٨' },
  { text: '"Come to me, all who are weary and burdened" — Matthew 11:28', textAr: '"تَعَالَوا إِلَيَّ يَا جَمِيعَ الْمُتْعَبِينَ وَالثَّقِيلِي الأَحْمَالِ" — متى ١١:٢٨' },
  { text: '"The LORD is my shepherd, I shall not want" — Psalm 23:1', textAr: '"الرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ" — مزمور ٢٣:١' },
  { text: '"I am the way, the truth, and the life" — John 14:6', textAr: '"أَنَا هُوَ الطَّرِيقُ وَالْحَقُّ وَالْحَيَاةُ" — يوحنا ١٤:٦' },
  { text: '"The grass withers, the flower fades, but the word of our God stands forever" — Isaiah 40:8', textAr: '"الْعُشْبُ يَيْبَسُ وَالزَّهْرُ يَسْقُطُ وَأَمَّا كَلِمَةُ إِلهِنَا فَتَثْبُتُ إِلَى الأَبَدِ" — إشعياء ٤٠:٨' },
];

export const fallbackServiceTimes = [
  { title: 'Sunday Morning Worship', titleAr: 'عبادة صباح الأحد', time: '10:30 AM', timeAr: '١٠:٣٠ صباحاً', icon: '✝', note: 'Main worship service', noteAr: 'خدمة العبادة الرئيسية' },
  { title: 'Sunday School', titleAr: 'مدرسة الأحد', time: '9:30 AM', timeAr: '٩:٣٠ صباحاً', icon: '📖', note: 'All ages', noteAr: 'لجميع الأعمار' },
  { title: 'Friday Bible Study', titleAr: 'دراسة الكتاب - الجمعة', time: '7:00 PM', timeAr: '٧:٠٠ مساءً', icon: '🕯', note: 'Verse by verse', noteAr: 'آية بآية' },
  { title: 'Saturday Youth Group', titleAr: 'شبيبة - السبت', time: '6:00 PM', timeAr: '٦:٠٠ مساءً', icon: '🌿', note: 'Ages 12–25', noteAr: 'أعمار ١٢–٢٥' },
];
