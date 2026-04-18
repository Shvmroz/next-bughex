// ============================================================
// SITE-WIDE MOCK DATA — edit all website text from here
// ============================================================

// ─── SITE META ────────────────────────────────────────────
export const siteMeta = {
  name: 'BugHex',
  tagline: 'Launching Ideas Into Real Products',
  subTagline: 'From Zero to Product — Fast & Smart',
  copyright: `© ${new Date().getFullYear()} Bughex Ltd. All Rights Reserved.`,
};

// ─── NAVIGATION ───────────────────────────────────────────
export const navLinks = [
  { label: 'OUR PROJECTS', href: '/projects', hasDropdown: true },
  { label: 'INSIGHTS', href: '/insights', hasDropdown: false },
  { label: 'CONTACT', href: '/contact', hasDropdown: false },
];

export const megaMenuData = {
  'WHAT WE DO': [
    { title: 'Flutter Development', subtitle: 'Cross-platform mobile excellence', href: '/#services' },
    { title: 'AI Solutions', subtitle: 'Intelligent automation & ML', href: '/#services' },
    { title: 'Web & Backend', subtitle: 'React, Node.js, Laravel', href: '/#services' },
    { title: 'Native Mobile', subtitle: 'iOS & Android specialists', href: '/#services' },
  ],
  'OUR PROJECTS': [
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
  title: 'Our Global Leadership',
};

export const leaders = [
  { nameFirst: 'Umair', nameLast: 'Hashmi', role: 'Founder & CEO' },
  { nameFirst: 'Zain', nameLast: 'Sherazi', role: 'Chief Finance Officer' },
  { nameFirst: 'Ammar', nameLast: 'Yousaf', role: 'Chief of Staff' },
  { nameFirst: 'Shamroz', nameLast: 'Khan', role: 'Chief Delivery Officer' },
  { nameFirst: 'Atif', nameLast: 'Umair', role: 'VP Operations' },
  { nameFirst: 'Moeen', nameLast: 'U Din', role: 'Lead Developer' },
];

// ─── CONTACT SECTION ──────────────────────────────────────
export const contactSectionContent = {
  preText: 'Ready to build?',
  title: 'Start Your Project',
  subtitle: 'Ready to build something extraordinary? Let\'s talk about your vision.',
  bodyText:
    'Whether you need a Flutter app, a complex backend, or an AI-powered solution, BugHex has the expertise to bring your vision to life. We work with startups and enterprises alike.',
  contactInfo: [
    { icon: 'mdi:email-outline', label: 'Email', value: 'hello@bughex.dev' },
    { icon: 'mdi:map-marker-outline', label: 'Location', value: 'Remote — Worldwide' },
    { icon: 'mdi:clock-outline', label: 'Response Time', value: 'Within 24 hours' },
  ],
  serviceOptions: [
    'Flutter Development',
    'React Native',
    'JavaScript / React',
    'Laravel / PHP',
    'Node.js Backend',
    'iOS / Android',
    'AI Solutions',
  ],
  successTitle: 'Message Sent!',
  successSubtext: "We'll get back to you within 24 hours.",
};

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
    'Digital Consulting & Strategy',
    'Digital Commerce',
    'Business Applications',
    'Cloud Operations & Migration',
    'Cloud Applications',
    'Development & Integrations',
    'Managed Services',
  ],
  Industries: ['Communications', 'Banking & Financial Services', 'Public Sector', 'Health', 'Retail'],
  Insights: ['Case Studies', 'Newsroom', 'Whitepapers', 'Blogs'],
  'Quick Links': ['Who we are', 'Careers', 'Our Leadership', 'Investor Relation', 'Financial Reports'],
};

export const socialLinks = [
  { name: 'LinkedIn', icon: 'mdi:linkedin', href: '#', hoverColor: '#0A66C2' },
  { name: 'Facebook', icon: 'mdi:facebook', href: '#', hoverColor: '#1877F2' },
  {
    name: 'Instagram',
    icon: 'mdi:instagram',
    href: '#',
    hoverColor:
      'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    isGradient: true,
  },
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

// ─── BLOG / PROJECT DATA ──────────────────────────────────
export const blogs = [
  {
    id: 1,
    slug: 'future-of-flutter-in-2025',
    title: 'The Future of Flutter Development in 2025',
    excerpt:
      'Explore how Flutter is revolutionizing cross-platform development with its powerful rendering engine and growing ecosystem.',
    content: `Flutter has emerged as one of the most compelling cross-platform frameworks available today. With Google's continued investment and a thriving community, the framework continues to evolve at a rapid pace.

## Why Flutter Stands Out

Flutter's unique approach uses a custom rendering engine (Skia/Impeller) that draws every pixel directly, ensuring pixel-perfect consistency across iOS, Android, Web, Desktop, and beyond. This means one codebase, infinite possibilities.

## Performance Gains with Impeller

The new Impeller rendering engine promises significant performance improvements, eliminating jank and delivering smooth 120fps animations on modern hardware. Early benchmarks show 3x improvement in frame rendering times.

## The Growing Ecosystem

With over 30,000 packages on pub.dev, Flutter's ecosystem is maturing rapidly. From state management solutions like Riverpod and Bloc to UI libraries and backend integrations, developers have everything they need.

## Looking Ahead

As Flutter Web reaches production quality and Flutter Desktop gains enterprise adoption, we're entering an era where truly universal apps become the norm rather than the exception. For businesses looking to maximize their development investment, Flutter represents an unparalleled opportunity.`,
    category: 'Flutter',
    author: 'Alex Morgan',
    authorRole: 'Senior Flutter Developer',
    date: 'March 15, 2025',
    readTime: '5 min read',
    tags: ['Flutter', 'Mobile', 'Cross-Platform', 'Dart'],
  },
  {
    id: 2,
    slug: 'ai-integration-modern-web-apps',
    title: 'Integrating AI into Modern Web Applications',
    excerpt:
      'A comprehensive guide to embedding AI capabilities into your web apps using OpenAI, LangChain, and custom ML models.',
    content: `Artificial intelligence is no longer a buzzword — it's a practical tool that forward-thinking development teams are embedding directly into their products. Here's how to do it right.

## Choosing the Right AI Integration Strategy

Not all AI integrations are created equal. The right approach depends on your use case:

- **API-based integrations** (OpenAI, Anthropic) — fastest to implement, great for NLP tasks
- **Self-hosted models** (Ollama, Hugging Face) — better privacy, lower long-term costs
- **Custom trained models** — maximum control, highest investment

## Building with LangChain

LangChain provides a powerful abstraction layer over various LLM providers. It enables chains, agents, and memory systems that make complex AI workflows manageable.

## Real-time AI with WebSockets

Streaming responses from AI models creates a dramatically better user experience. We'll walk through implementing SSE (Server-Sent Events) with Node.js to deliver token-by-token responses.

## Production Considerations

Rate limiting, caching, fallback strategies, and cost monitoring are essential when shipping AI features. Learn how to build resilient systems that gracefully handle API outages.`,
    category: 'AI & ML',
    author: 'Sarah Chen',
    authorRole: 'AI Solutions Architect',
    date: 'March 10, 2025',
    readTime: '8 min read',
    tags: ['AI', 'Node.js', 'OpenAI', 'LangChain'],
  },
  {
    id: 3,
    slug: 'react-native-vs-flutter-2025',
    title: 'React Native vs Flutter: The 2025 Verdict',
    excerpt:
      'An in-depth comparison of the two leading cross-platform mobile frameworks to help you make the right choice for your project.',
    content: `The debate between React Native and Flutter continues to evolve as both frameworks mature. In 2025, the gap has narrowed significantly, but key differences remain that should drive your technology choice.

## Performance: A Closer Look

Flutter's compiled Dart code and custom rendering engine generally outperform React Native's JavaScript bridge. However, React Native's New Architecture with JSI (JavaScript Interface) has dramatically reduced this gap.

## Developer Experience

React Native's JavaScript/TypeScript familiarity lowers the barrier for web developers. Flutter's Dart language, while initially foreign to most developers, has proven intuitive and powerful once mastered.

## Ecosystem and Libraries

React Native benefits from the vast npm ecosystem. Flutter's pub.dev, while smaller, maintains higher quality standards through community curation.

## When to Choose Each

Choose **React Native** when: You have a strong JavaScript team, need tight npm integration, or require server-side rendering capabilities.

Choose **Flutter** when: Performance is critical, you need pixel-perfect UI across all platforms, or you're building for Desktop alongside Mobile.`,
    category: 'Mobile Development',
    author: 'Marcus Johnson',
    authorRole: 'Mobile Tech Lead',
    date: 'March 5, 2025',
    readTime: '7 min read',
    tags: ['React Native', 'Flutter', 'Mobile', 'iOS', 'Android'],
  },
  {
    id: 4,
    slug: 'laravel-11-enterprise-features',
    title: 'Laravel 11 Enterprise Features Deep Dive',
    excerpt:
      'Discover the powerful new features in Laravel 11 that make it the go-to choice for enterprise PHP applications.',
    content: `Laravel 11 brings a refined, slimmer application skeleton while adding powerful enterprise-grade features. Here's everything you need to know.

## The Streamlined Application Structure

Laravel 11 reduces boilerplate significantly, with a cleaner routes directory, unified config files, and a more intuitive bootstrap process. The result is a leaner starting point that scales gracefully.

## Health Check Routing

Built-in health check endpoints make integration with load balancers, container orchestration platforms, and uptime monitoring services seamless. Simply configure your checks and deploy.

## Context API

The new Context API allows you to share contextual information (user ID, request ID, etc.) across all logged messages without threading it through every function call.

## Improved Queue System

Enhanced queue batching, improved job middleware, and better error handling make Laravel's queue system more robust than ever for high-throughput applications.

## API Development with Laravel

Combined with Sanctum for authentication and Resources for transformation, Laravel remains the most productive PHP framework for building production APIs.`,
    category: 'Backend',
    author: 'Elena Rodriguez',
    authorRole: 'Backend Engineer',
    date: 'February 28, 2025',
    readTime: '6 min read',
    tags: ['Laravel', 'PHP', 'Backend', 'API'],
  },
  {
    id: 5,
    slug: 'nodejs-microservices-architecture',
    title: 'Building Scalable Microservices with Node.js',
    excerpt:
      'Learn how to architect and deploy production-ready microservices using Node.js, Docker, and Kubernetes.',
    content: `Microservices architecture enables teams to build, deploy, and scale services independently. Node.js, with its non-blocking I/O model, is exceptionally well-suited for microservices workloads.

## The Case for Node.js Microservices

Node.js excels at I/O-bound tasks — exactly what most microservices handle. HTTP requests, database queries, and message queue consumption all benefit from Node's event-driven model.

## Service Communication Patterns

- **REST over HTTP** — simple, well-understood, great for external APIs
- **gRPC** — efficient binary protocol, ideal for internal service communication
- **Message queues** (RabbitMQ, Kafka) — decoupled, resilient async processing

## Docker and Container Strategy

Each service lives in its own container with minimal footprint. Alpine-based Node.js images keep container sizes small. Multi-stage builds ensure development dependencies don't reach production.

## Kubernetes Orchestration

Deploying microservices to Kubernetes provides automatic scaling, self-healing, and rolling deployments. Learn how to write effective Helm charts for Node.js services.`,
    category: 'Backend',
    author: 'David Kim',
    authorRole: 'DevOps Engineer',
    date: 'February 20, 2025',
    readTime: '9 min read',
    tags: ['Node.js', 'Microservices', 'Docker', 'Kubernetes'],
  },
  {
    id: 6,
    slug: 'ios-android-native-optimization',
    title: 'Native iOS & Android Performance Optimization',
    excerpt:
      'Expert techniques for squeezing maximum performance from native mobile applications on both iOS and Android platforms.',
    content: `Native mobile development offers unparalleled performance and access to platform APIs. However, achieving smooth 60fps (or 120fps on ProMotion) requires understanding the platform deeply.

## iOS Performance Tips

**Memory Management:** ARC handles most memory automatically, but retain cycles still haunt Swift developers. Use instruments to identify memory leaks early.

**Main Thread Rule:** Every UI update must happen on the main thread. Dispatch heavy work to background queues, then dispatch UI updates back to main.

**Core Data Optimization:** Batch updates, faulting, and proper indexing can turn a sluggish data layer into a performance powerhouse.

## Android Optimization Strategies

**RecyclerView Mastery:** Proper ViewHolder patterns, DiffUtil for efficient updates, and view recycling are fundamental to smooth list performance.

**Coroutines for Async:** Kotlin coroutines replace callback hell with clean, sequential-looking async code that's easy to reason about.

**Baseline Profiles:** Generate Baseline Profiles with Macrobenchmark to pre-compile critical code paths and eliminate startup jank.`,
    category: 'Mobile Development',
    author: 'Lisa Park',
    authorRole: 'Native Mobile Specialist',
    date: 'February 15, 2025',
    readTime: '10 min read',
    tags: ['iOS', 'Android', 'Swift', 'Kotlin', 'Performance'],
  },
];

export const getBlogBySlug = (slug) => blogs.find((b) => b.slug === slug);
export const getBlogsByCategory = (category) => blogs.filter((b) => b.category === category);

// ─── INSIGHTS PAGE ────────────────────────────────────────
export const insightsPageContent = {
  title: 'Insights &',
  titleHighlight: 'Expertise',
  subtitle: 'Thought leadership, technical deep-dives, and industry perspectives from the BugHex team.',
  searchPlaceholder: 'Search insights...',
  emptyState: 'No insights found for your search.',
  categories: ['All', 'Flutter', 'AI & ML', 'Mobile Development', 'Backend'],
};

// ─── CONTACT PAGE ─────────────────────────────────────────
export const contactPageContent = {
  preText: 'Get In Touch',
  title: 'Let\'s Build',
  titleHighlight: 'Together',
  subtitle: 'Have a project in mind? We\'d love to hear about it.',
  formTitle: 'Send Us a Message',
  formSubtitle: 'Fill out the form and we\'ll get back to you within 24 hours.',
  infoTitle: 'Contact Information',
  infoBody:
    'Whether you need a Flutter app, a complex backend, or an AI-powered solution, BugHex has the expertise to bring your vision to life.',
  contactInfo: [
    { icon: 'mdi:email-outline', label: 'Email', value: 'hello@bughex.dev' },
    { icon: 'mdi:map-marker-outline', label: 'Location', value: 'Remote — Worldwide' },
    { icon: 'mdi:clock-outline', label: 'Response Time', value: 'Within 24 hours' },
  ],
  serviceOptions: [
    'Flutter Development',
    'React Native',
    'JavaScript / React',
    'Laravel / PHP',
    'Node.js Backend',
    'iOS / Android',
    'AI Solutions',
  ],
  successTitle: 'Message Sent!',
  successSubtext: "We'll get back to you within 24 hours.",
};
