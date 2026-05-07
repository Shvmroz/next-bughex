// ============================================================
// SITE-WIDE MOCK DATA — edit all website text from here
// ============================================================

// ─── SITE META ────────────────────────────────────────────
export const siteMeta = {
  name: 'BugHex',
  tagline: 'Launching Ideas Into Real Products. We combine engineering excellence with design thinking to build world-class digital products that scale.',
  subTagline: 'From Zero to Product — Fast & Smart',
  copyright: `© ${new Date().getFullYear()} Bughex Ltd. All Rights Reserved.`,
};

// ─── NAVIGATION ───────────────────────────────────────────
export const navLinks = [
  { label: 'WHO WE ARE', href: '/about', hasDropdown: false },
  { label: 'PROJECTS', href: '/projects', hasDropdown: true },
  { label: 'CONTACT', href: '/contact', hasDropdown: false },
];

export const megaMenuData = {
  'PROJECTS': [
    { title: 'E-Commerce Solutions', subtitle: 'Modern sales platforms', href: '/projects' },
    { title: 'AI & ML Products', subtitle: 'Intelligent automation', href: '/projects' },
    { title: 'Enterprise Apps', subtitle: 'Scaling business operations', href: '/projects' },
    { title: 'Mobile Ecosystems', subtitle: 'Flutter & Native experiences', href: '/projects' },
  ],
};

// ─── HERO SECTION ─────────────────────────────────────────
export const heroContent = {
  heading1: 'We Build',
  headingHighlight1: 'Digital',
  heading2: 'Products That',
  headingHighlight2: 'Matter',
  subtext:
    'Premium development agency delivering Flutter, React Native, AI, and full-stack solutions. We transform ideas into market-leading products.',
  videoSrc: '/vecteezy_futuristic.mp4',
};

// ─── SERVICES SECTION ─────────────────────────────────────
export const servicesSectionContent = {
  tag: 'What We Do',
  title: 'Services We Offer',
  subtitle:
    'From mobile apps to enterprise backends, we cover the full spectrum of modern software development.',
};

export const services = [
  {
    id: 1,
    title: 'Flutter Development',
    description:
      'Cross-platform apps with native performance. One codebase for iOS, Android, Web, and Desktop.',
    icon: '◈',
    features: ['Single codebase', 'Native performance', 'Beautiful animations', '6-platform support'],
  },
  {
    id: 2,
    title: 'React Native',
    description:
      'JavaScript-powered mobile apps with true native components and seamless platform integration.',
    icon: '⬡',
    features: ['Native components', 'Huge ecosystem', 'Hot reloading', 'JavaScript/TypeScript'],
  },
  {
    id: 3,
    title: 'JavaScript / React',
    description:
      'Modern web applications with React, Next.js, and cutting-edge frontend technologies.',
    icon: '◉',
    features: ['React & Next.js', 'TypeScript', 'Performance first', 'SEO optimized'],
  },
  {
    id: 4,
    title: 'Laravel / PHP',
    description:
      'Robust, scalable backend systems with Laravel — the PHP framework for web artisans.',
    icon: '⬢',
    features: ['RESTful APIs', 'Eloquent ORM', 'Queue systems', 'Authentication'],
  },
  {
    id: 5,
    title: 'iOS Development',
    description:
      'Native iOS applications in Swift with pixel-perfect UI and Apple ecosystem integration.',
    icon: '◆',
    features: ['Swift & SwiftUI', 'App Store ready', 'Core APIs', 'Apple ecosystem'],
  },
  {
    id: 6,
    title: 'Android Development',
    description:
      'Native Android apps with Kotlin, Jetpack Compose, and Google Play Store deployment.',
    icon: '◇',
    features: ['Kotlin & Compose', 'Material Design', 'Google Play', 'Background services'],
  },
  {
    id: 7,
    title: 'Node.js Backend',
    description:
      'Scalable, high-performance backend APIs and microservices built on Node.js and Express.',
    icon: '⬣',
    features: ['REST & GraphQL', 'Microservices', 'Real-time with WS', 'Cloud-native'],
  },
  {
    id: 8,
    title: 'AI Solutions',
    description:
      'Intelligent automation and AI integration — chatbots, computer vision, and predictive analytics.',
    icon: '◈',
    features: ['LLM integration', 'Computer vision', 'Data pipelines', 'Custom models'],
  },
];

// ─── LEADERSHIP SECTION ───────────────────────────────────
export const leadershipSectionContent = {
  title: 'Our Founders',
};

export const leaders = [
  {
    nameFirst: 'Zain',
    nameLast: 'Sherazi',
    role: 'Project Management & Android Specialist',
    linkedin: 'https://www.linkedin.com/in/syed-zain-ul-abidin-sherazi',
    image: 'team/zain-sherazi.png',
  },
  {
    nameFirst: 'Umair',
    nameLast: 'Hashmi',
    role: 'Flutter Specialist & Client Relations Management',
    linkedin: 'https://www.linkedin.com/in/umair-hashmi',
    image: 'team/umair-hashmi.png'
  },
  {
    nameFirst: 'Atif',
    nameLast: 'Raza',
    role: 'Backend Specialist & Head of AI',
    linkedin: 'https://www.linkedin.com/in/atif-raza-7a6855217'
  },
  {
    nameFirst: 'Ammar',
    nameLast: 'Yousaf',
    role: 'React Native Specialist & Head of Global Marketing',
    linkedin: 'https://www.linkedin.com/in/ammar-yousaf-react-native-53321a19a'
  },
  {
    nameFirst: 'Moeen',
    nameLast: 'U Din',
    role: 'Full-Stack Developer & Head of DevOps',
    linkedin: 'https://www.linkedin.com/in/moeen-u-din'
  },
  {
    nameFirst: 'Shamroz',
    nameLast: 'Khan',
    role: 'MERN Developer & UI/UX Specialist',
    linkedin: 'https://www.linkedin.com/in/shvmroz',
    image: 'team/shamroz-khan.png',
  },
];

// ─── STATS ────────────────────────────────────────────────
export const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '8+', label: 'Years Experience' },
  { value: '15+', label: 'Team Experts' },
];

// ─── TESTIMONIALS ─────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'James Wilson',
    role: 'CEO, TechVentures',
    avatar: 'JW',
    text: 'BugHex transformed our vision into a stunning Flutter app in record time. Their attention to detail and technical expertise is unmatched.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophia Nguyen',
    role: 'CTO, DataFlow Inc',
    avatar: 'SN',
    text: 'The AI integration they built for us increased our productivity by 40%. Exceptional team with a deep understanding of modern tech stacks.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Torres',
    role: 'Founder, AppStudio',
    avatar: 'MT',
    text: 'From React Native to Node.js backend, BugHex handled our entire stack with professionalism. Highly recommend their services.',
    rating: 5,
  },
];

// ─── FOOTER ───────────────────────────────────────────────
export const footerData = {
  Services: [
    { label: 'Flutter', icon: 'logos:flutter' },
    { label: 'React Native', icon: 'logos:react' },
    { label: 'React / Next.js', icon: 'logos:nextjs-icon' },
    { label: 'Node.js', icon: 'logos:nodejs-icon' },
    { label: 'Laravel / PHP', icon: 'logos:laravel' },
    { label: 'iOS', icon: 'logos:apple-app-store' },
    { label: 'Android', icon: 'logos:android-icon' },
  ],
  Industries: [
    { label: 'FinTech', icon: 'mdi:bank-outline' },
    { label: 'Healthcare', icon: 'mdi:heart-pulse' },
    { label: 'E-Commerce', icon: 'mdi:shopping-outline' },
    { label: 'Education', icon: 'mdi:school-outline' },
    { label: 'Real Estate', icon: 'mdi:home-city-outline' },
    { label: 'Logistics', icon: 'mdi:truck-outline' },
    { label: 'SaaS', icon: 'mdi:cloud-outline' },
  ],
  Insights: [
    { label: 'Case Studies', href: '/projects' },
    { label: 'Blogs', href: '/projects' },
  ],
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const socialLinks = [
  { name: 'LinkedIn', icon: 'mdi:linkedin', href: '#', hoverColor: '#0A66C2' },
  {
    name: 'Instagram',
    icon: 'mdi:instagram',
    href: '#',
    hoverColor:
      'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    isGradient: true,
  },
  { name: 'Facebook', icon: 'mdi:facebook', href: '#', hoverColor: '#1877F2' },

];

// ─── PROJECTS PAGE ────────────────────────────────────────
export const projectsPageContent = {
  title: 'Our',
  titleHighlight: 'Projects',
  subtitle: 'Insights, case studies, and deep dives into BugHex creations.',
  searchPlaceholder: 'Search articles...',
  emptyState: 'No articles found for your search.',
  categories: ['All', 'Flutter', 'AI & ML', 'Mobile Development', 'Backend'],
};

// ─── CAPABILITIES PAGE ─────────────────────────────────────────

export const capabilities = [
  {
    number: '01',
    icon: 'mingcute:ai-line',
    stroke: '#1bb5a2',
    title: 'AI Integration',
    subtitle: 'Automation & Intelligence',
    body: 'Build AI assistants and automate workflows with smart systems.',
  },
  {
    number: '02',
    icon: 'logos:flutter',
    stroke: '#02569B',
    title: 'Flutter',
    subtitle: 'Cross-Platform Mobile',
    body: 'High-performance apps using one codebase across platforms.',
  },
  {
    number: '03',
    icon: 'logos:react',
    stroke: '#61DAFB',
    title: 'React Native',
    subtitle: 'Native Mobile Apps',
    body: 'Create fast mobile apps with near-native performance using React.',
  },
  {
    number: '04',
    icon: 'logos:apple',
    stroke: '#111111',
    title: 'iOS Development',
    subtitle: 'Apple Platforms',
    body: 'Build polished iOS apps using Swift and Apple frameworks.',
  },
  {
    number: '05',
    icon: 'logos:android-icon',
    stroke: '#3DDC84',
    title: 'Android Development',
    subtitle: 'Google Platforms',
    body: 'Develop reliable Android apps with Kotlin and development standards.',
  },
  {
    number: '06',
    icon: 'logos:nextjs-icon',
    stroke: '#000000',
    title: 'React / Next.js',
    subtitle: 'Web Platforms',
    body: 'Scalable web apps with optimized performance and architecture.',
  },
  {
    number: '07',
    icon: 'logos:nodejs-icon',
    stroke: '#339933',
    title: 'Node.js',
    subtitle: 'Backend & APIs',
    body: 'Engineer fast backend systems for scalable real-time applications.',
  },
  {
    number: '08',
    icon: 'logos:laravel',
    stroke: '#FF2D20',
    title: 'Laravel / PHP',
    subtitle: 'Server-Side Engineering',
    body: 'Develop secure backend systems and dashboards for workflows.',
  },
  {
    number: '09',
    icon: 'logos:mongodb-icon',
    stroke: '#47A248',
    title: 'MongoDB',
    subtitle: 'NoSQL Database',
    body: 'Design scalable NoSQL databases with flexible schemas and access.',
  },
  {
    number: '10',
    icon: 'logos:mysql-icon',
    stroke: '#00758F',
    title: 'MySQL',
    subtitle: 'Relational Database',
    body: 'Build reliable relational databases with optimized queries consistency.',
  },
];