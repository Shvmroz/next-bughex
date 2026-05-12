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
  { label: 'SERVICES', href: '/services', hasDropdown: true },
  { label: 'PROJECTS', href: '/projects', hasDropdown: false },
  { label: 'BLOGS', href: '/blogs', hasDropdown: false },
  { label: 'CONTACT', href: '/contact', hasDropdown: false },
];

export const megaMenuData = {
  'SERVICES': [
    {
      category: 'Mobile Development',
      items: [
        { label: 'iOS App Development', href: '/services/ios-development' },
        { label: 'Android App Development', href: '/services/android-development' },
        { label: 'Cross-Platform Apps', href: '/services/cross-platform-apps' },
      ]
    },
    {
      category: 'Web Development',
      items: [
        { label: 'Frontend Development', href: '/services/frontend-development' },
        { label: 'Backend Development', href: '/services/backend-development' },
        { label: 'Full Stack Development', href: '/services/full-stack-development' },
      ]
    },
    {
      category: 'Custom Software',
      items: [
        { label: 'Enterprise Solutions', href: '/services/enterprise-solutions' },
        { label: 'SaaS Development', href: '/services/saas-development' },
        { label: 'API Development', href: '/services/api-development' },
      ]
    },
    {
      category: 'Design & UX',
      items: [
        { label: 'UI/UX Design', href: '/services/ui-ux-design' },
        { label: 'Wireframing', href: '/services/wireframing' },
        { label: 'Prototyping', href: '/services/prototyping' },
      ]
    },
    {
      category: 'Game Development',
      items: [
        { label: '2D Game Development', href: '/services/2d-game-development' },
        { label: '3D Game Development', href: '/services/3d-game-development' },
        { label: 'Unity Development', href: '/services/unity-development' },
      ]
    },
    {
      category: 'Artificial Intelligence',
      items: [
        { label: 'Machine Learning', href: '/services/machine-learning' },
        { label: 'Natural Language Processing', href: '/services/natural-language-processing' },
        { label: 'Computer Vision', href: '/services/computer-vision' },
      ]
    },
    {
      category: 'Cloud Services',
      items: [
        { label: 'AWS Solutions', href: '/services/aws-solutions' },
        { label: 'Azure Integration', href: '/services/azure-integration' },
        { label: 'Google Cloud', href: '/services/google-cloud' },
      ]
    },
    {
      category: 'Blockchain Development',
      items: [
        { label: 'Smart Contract Development', href: '/services/smart-contract-development' },
        { label: 'DeFi Applications', href: '/services/defi-applications' },
        { label: 'NFT Marketplace', href: '/services/nft-marketplace' },
      ]
    }
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
    image: '/team/zain-sherazi.png',
  },
  {
    nameFirst: 'Umair',
    nameLast: 'Hashmi',
    role: 'Flutter & Client Relations Management',
    linkedin: 'https://www.linkedin.com/in/umair-hashmi',
    image: '/team/umair-hashmi.png'
  },
  {
    nameFirst: 'Atif',
    nameLast: 'Raza',
    role: 'Backend Specialist & Head of AI',
    linkedin: 'https://www.linkedin.com/in/atif-raza-7a6855217'
    // image: '/team/atif-raza.png',
  },
  {
    nameFirst: 'Ammar',
    nameLast: 'Yousaf',
    role: 'React Native & Head of Global Marketing',
    linkedin: 'https://www.linkedin.com/in/ammar-yousaf-react-native-53321a19a'
    // image: '/team/ammar-yousaf.png',
  },
  {
    nameFirst: 'Moeen',
    nameLast: 'U Din',
    role: 'Full-Stack Developer & Head of DevOps',
    linkedin: 'https://www.linkedin.com/in/moeen-u-din'
    // image: '/team/moeen-u-din.png',
  },
  {
    nameFirst: 'Shamroz',
    nameLast: 'Khan',
    role: 'MERN Developer & UI/UX Specialist',
    linkedin: 'https://www.linkedin.com/in/shvmroz',
    image: '/team/shamroz-khan.png',
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
  Technologies: [
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
    { label: 'Blogs', href: '/blogs' },
  ],
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/#services' },
    { label: 'Projects', href: '/projects' },

    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const socialLinks = [
  { name: 'LinkedIn', icon: 'mdi:linkedin', href: 'https://www.linkedin.com/company/the-bughex', hoverColor: '#0A66C2' },
  { name: 'Facebook', icon: 'mdi:facebook', href: 'https://www.facebook.com/thebughex', hoverColor: '#1877F2' },
  { name: 'WhatsApp', icon: 'mdi:whatsapp', href: 'https://wa.me/923156861473', hoverColor: '#25D366' },
];


// ─── PROJECTS PAGE ────────────────────────────────────────
export const projectsPageContent = {
  title: 'Our',
  titleHighlight: 'Projects',
  subtitle: 'Explore our latest projects, innovative solutions, and real-world digital experiences crafted by BugHex.', searchPlaceholder: 'Search projects...',
  emptyState: 'No projects found for your search.',
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