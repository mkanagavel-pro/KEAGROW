import {
  ProjectItem,
  ServiceCategory,
  CreativeService,
  WhyPrinciple,
  ProcessStage,
  TeamMember,
  TechCategory,
} from '../types';

export const BRAND = {
  name: 'KEAGROW',
  tagline: 'Grow Your Business With Us.',
  subline:
    'We build modern websites, custom software solutions and digital experiences designed to help businesses grow.',
  aboutCopy:
    'KEAGROW is a technology-driven team focused on building modern websites, custom software solutions and digital experiences for businesses, startups and individuals. We turn ideas into practical, responsive and scalable digital products designed around real-world needs. From business websites and web applications to custom software and project solutions, we combine creativity, technology and continuous learning to deliver meaningful results.',
  primaryService: {
    title: 'Website Development',
    description:
      'Modern, responsive and purpose-built websites designed around your business, audience and goals.',
  },
  location: 'Mettur, Salem District, Tamil Nadu, India',
  copyright: '© 2026 KEAGROW. All rights reserved.',
  contactPlaceholders: {
    phone: '[PHONE NUMBER]',
    whatsapp: '[WHATSAPP NUMBER]',
    email: '[EMAIL ADDRESS]',
    instagram: '[INSTAGRAM HANDLE]',
    instagramUrl: '#',
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'royal-snacks',
    title: 'Royal Snacks',
    category: 'Business / E-commerce Website',
    tagline: 'Direct-to-consumer digital snack storefront with brand-led catalog showcase',
    description:
      'A bespoke web storefront created for Royal Snacks to display artisan snack offerings, optimize customer product discovery, and enable direct commercial order placement.',
    liveUrl: 'https://royal-snacks-six.vercel.app/',
    isPlaceholder: false,
    statusBadge: 'Live Production',
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    caseStudy: {
      challenge:
        'Deliver a fast, visually appetizing digital presence that lets customers browse regional snacks smoothly across mobile smartphones with instant order inquiries.',
      solution:
        'Engineered a responsive, high-performance web application featuring custom product categorization, vibrant card layouts, and frictionless contact-to-order integration.',
      technology: 'Modern Frontend Architecture, Mobile-First Viewports, Dynamic Catalog Filtering',
      outcome:
        'Launched a functional commercial website that elevates the brand identity and delivers swift loading speeds for mobile shoppers.',
    },
    accentColor: '#f59e0b',
  },
  {
    id: 'namma-oor-workers',
    title: 'Namma Ooru Workers',
    category: 'Local Service Discovery Platform',
    tagline: 'Community workforce discovery and on-demand artisan booking platform',
    description:
      'A full-stack localized service directory connecting skilled daily-wage technicians, electricians, plumbers, and local workers with nearby household service seekers.',
    liveUrl: 'https://namma-oor-workers.onrender.com/',
    isPlaceholder: false,
    statusBadge: 'Live Platform',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    caseStudy: {
      challenge:
        'Bridge the digital gap between unorganized municipal skilled workers and local families needing trustworthy on-demand domestic repair services.',
      solution:
        'Architected a full-stack database-driven application with categorised worker directories, local search endpoints, responsive profile listings, and clean Express routing.',
      technology: 'Node.js server environment, Express REST API, MongoDB data schemas, Vanilla JS client',
      outcome:
        'Successfully deployed a functioning regional service hub demonstrating real-world database integration and practical community utility.',
    },
    accentColor: '#10b981',
  },
  {
    id: 'enterprise-resource-hub',
    title: 'Enterprise Operations Engine',
    category: 'Custom Software / Management System',
    tagline: 'Modular business operational control center with role-based records',
    description:
      'Comprehensive administrative management system engineered to automate internal company records, streamline inventory status, and track daily operational workflows.',
    isPlaceholder: true,
    statusBadge: 'Project Showcase',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    caseStudy: {
      challenge:
        'Eliminate fragmented spreadsheet records and redundant manual paperwork across multi-department operations.',
      solution:
        'Configured a central database-backed management system with customized data tables, status flags, and automated activity logging.',
      technology: 'React UI components, Secure API endpoints, MongoDB collections, Normalized state',
      outcome:
        'Consolidated company recordkeeping into a single high-efficiency internal dashboard.',
    },
    accentColor: '#06b6d4',
  },
  {
    id: 'digital-retail-suite',
    title: 'Retail Commerce & Inventory',
    category: 'E-commerce & Web Application',
    tagline: 'High-conversion digital retail experience with catalog state control',
    description:
      'Next-generation digital storefront built with real-time stock notifications, rich product attribute selectors, and rapid search filtering.',
    isPlaceholder: true,
    statusBadge: 'Coming Soon',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Database Integration'],
    caseStudy: {
      challenge:
        'Ensure fluid catalog exploration on low-bandwidth cellular connections without sacrificing visual fidelity.',
      solution:
        'Implemented progressive asset loading, lightweight UI state transitions, and responsive grid layouts.',
      technology: 'Vite build tooling, Tailwind responsive utilities, Modular component primitives',
      outcome:
        'Sub-second page rendering and clean checkout enquiry funnel.',
    },
    accentColor: '#8b5cf6',
  },
  {
    id: 'institutional-web-system',
    title: 'Institutional Portal & Directory',
    category: 'Web Application & Portal',
    tagline: 'Structured multi-tier content portal for modern organizations and institutions',
    description:
      'An accessible, content-rich institutional portal structured for departmental news publishing, event calendars, faculty directories, and student information dissemination.',
    isPlaceholder: true,
    statusBadge: 'Coming Soon',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Responsive Web Design'],
    caseStudy: {
      challenge:
        'Deliver a secure, high-density information architecture meeting modern accessibility standards across institutional stakeholders.',
      solution:
        'Engineered clear hierarchical navigation, search-indexed document categories, and mobile-friendly layouts.',
      technology: 'Semantic HTML, Modular stylesheet architecture, Dynamic filtering',
      outcome:
        'Intuitive navigation structure with seamless navigation across all viewport sizes.',
    },
    accentColor: '#3b82f6',
  },
  {
    id: 'smart-analytics-board',
    title: 'Operational Analytics Dashboard',
    category: 'Business Management System',
    tagline: 'Data-driven visual telemetry and metric visualization dashboard',
    description:
      'Executive telemetry console translating complex database logs into actionable visual trend graphs, task distributions, and real-time operational status updates.',
    isPlaceholder: true,
    statusBadge: 'Project Showcase',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs'],
    caseStudy: {
      challenge:
        'Synthesize voluminous operational logs into clear, actionable executive insights for rapid decision-making.',
      solution:
        'Built interactive visual widgets with responsive breakdown charts and status tracking indicators.',
      technology: 'Dynamic UI components, Custom SVG metrics, Reactive filter state',
      outcome:
        'Real-time situational visibility designed for high-frequency operational teams.',
    },
    accentColor: '#ec4899',
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    number: '01',
    title: 'WEBSITES',
    tagline: 'High-impact digital front doors engineered for conversion, prestige, and velocity',
    items: [
      'Business Websites',
      'Portfolio Websites',
      'E-commerce Websites',
      'Landing Pages',
      'Service Websites',
      'Restaurant / Hotel Websites',
      'College / Institution Websites',
      'Event Websites',
      'Blog / Content Websites',
      'Booking / Appointment Websites',
      'Personal Websites',
      'Custom Web Applications',
    ],
  },
  {
    number: '02',
    title: 'SOFTWARE & APPLICATIONS',
    tagline: 'Robust internal systems and web platforms that automate operational friction',
    items: [
      'Custom Software Solutions',
      'Management Systems',
      'Admin Dashboards',
      'Business Management Systems',
      'Database-driven Applications',
      'Web Applications',
      'Internal Business Tools',
    ],
  },
  {
    number: '03',
    title: 'ACADEMIC & PROJECT SOLUTIONS',
    tagline: 'End-to-end technical implementations developed to rigorous technical specifications',
    items: [
      'Database-driven Applications',
      'Full-Stack Architecture Implementations',
      'Custom Algorithm & Logic Modules',
      'Comprehensive Technical Documentation',
      'Interactive Web Systems',
    ],
    note: 'Practical, database-driven projects and software applications designed around academic and real-world requirements.',
  },
];

export const CREATIVE_SERVICES: CreativeService[] = [
  {
    title: 'Business Posters & Designs',
    description:
      'Clean, print-ready and digital marketing materials crafted to complement your brand presence across physical and online marketing channels.',
    deliverables: ['Event & Promotional Posters', 'Social Media Campaign Assets', 'Business Signage & Announcements'],
    iconName: 'Layout',
  },
  {
    title: 'T-Shirt & Branded Merchandise',
    description:
      'Cohesive visual concepts for corporate uniforms, event apparel, and custom team merchandise aligned with your brand identity.',
    deliverables: ['Vector Apparel Artwork', 'Embroidery & Screenprint Prep', 'Branded Merchandise Mockups'],
    iconName: 'Shirt',
  },
  {
    title: 'Advertisement & Video Editing',
    description:
      'Crisp promotional video editing and motion pacing designed for social reels, product demonstrations, and business advertising.',
    deliverables: ['Short-Form Social Reels', 'Product Feature Highlights', 'Commercial Promo Assembly'],
    iconName: 'Film',
  },
];

export const WHY_PRINCIPLES: WhyPrinciple[] = [
  {
    number: '01',
    title: 'Built Around Your Business',
    description: 'Every solution starts with understanding the business and its actual requirements.',
    highlight: 'Requirement-driven architecture tailored directly to your commercial objectives.',
  },
  {
    number: '02',
    title: 'Modern & Responsive',
    description: 'Experiences designed to work smoothly across desktop, tablet and mobile.',
    highlight: 'Fluid layouts engineered for zero friction on any screen size or network speed.',
  },
  {
    number: '03',
    title: 'Custom Solutions',
    description: 'We build around your needs instead of forcing your business into a fixed template.',
    highlight: 'Bespoke codebases that grow flexibly with your enterprise rather than rigid templates.',
  },
  {
    number: '04',
    title: 'Clear Communication',
    description: 'Simple communication and a transparent development process from idea to delivery.',
    highlight: 'Honest milestones, regular status check-ins, and direct collaborative partnership.',
  },
  {
    number: '05',
    title: 'Quality-Focused Delivery',
    description: 'We focus on usability, performance, reliability and overall experience.',
    highlight: 'Rigorous attention to clean code, fast load times, and intuitive user experiences.',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Your Idea',
    description: 'Understand your business, requirements and goals.',
    deliverable: 'Discovery session, functional requirements outline, and technical scope alignment.',
  },
  {
    step: '02',
    title: 'Planning',
    description: 'Define features, structure and technical approach.',
    deliverable: 'Information architecture, technology stack selection, and delivery roadmap.',
  },
  {
    step: '03',
    title: 'Design',
    description: 'Create the visual direction and user experience.',
    deliverable: 'Modern wireframes, typography pairings, color systems, and UI prototypes.',
  },
  {
    step: '04',
    title: 'Development',
    description: 'Build the actual website or software solution.',
    deliverable: 'Clean modular code, responsive interfaces, and robust backend/database integration.',
  },
  {
    step: '05',
    title: 'Testing',
    description: 'Check responsiveness, functionality and user experience.',
    deliverable: 'Cross-browser verification, mobile touch testing, form audit, and speed optimization.',
  },
  {
    step: '06',
    title: 'Launch',
    description: 'Prepare and deliver the final product.',
    deliverable: 'Production deployment, domain setup assistance, and handover documentation.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Aravinth',
    role: 'Developer',
    bio: 'Developer focused on building practical digital solutions and exploring modern web technologies.',
    specialization: ['Frontend Architecture', 'Interactive Web Applications', 'Modern JavaScript Ecosystems'],
    initials: 'AR',
    photo: '/team/aravinth.jpg',
  },
  {
    name: 'Ezrajid',
    role: 'Developer',
    bio: 'Developer focused on creating functional, user-friendly applications and turning ideas into working solutions.',
    specialization: ['User-Centric Applications', 'System Logic & UI Flow', 'Client-Side Engineering'],
    initials: 'EZ',
    photo: '/team/ezrajid.jpg',
  },
  {
    name: 'Kanagavel',
    role: 'Developer',
    bio: 'Developer focused on solution planning, development and building digital products around real-world requirements.',
    specialization: ['Solution Architecture', 'Database & API Integration', 'Product Lifecycle Delivery'],
    initials: 'KA',
    photo: '/team/kanagavel.jpg',
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Core Foundations',
    items: [
      { name: 'HTML5', tag: 'Semantic Markup' },
      { name: 'CSS3', tag: 'Modern Styling' },
      { name: 'JavaScript', tag: 'ESNext Standard' },
    ],
  },
  {
    title: 'Frontend Frameworks',
    items: [
      { name: 'React.js', tag: 'Component Systems' },
      { name: 'Vite', tag: 'Next-Gen Tooling' },
      { name: 'Tailwind CSS', tag: 'Utility Architecture' },
    ],
  },
  {
    title: 'Backend & Runtime',
    items: [
      { name: 'Node.js', tag: 'Event-Driven Runtime' },
      { name: 'Express.js', tag: 'RESTful API Services' },
    ],
  },
  {
    title: 'Data Storage & Logic',
    items: [
      { name: 'MongoDB', tag: 'Document Database' },
      { name: 'Python', tag: 'Data & Automation' },
    ],
  },
  {
    title: 'Engineering Capabilities',
    items: [
      { name: 'Git', tag: 'Version Control' },
      { name: 'REST APIs', tag: 'Service Integration' },
      { name: 'Responsive Web Design', tag: 'Multi-Device Layouts' },
      { name: 'Authentication', tag: 'Access Governance' },
      { name: 'Database Integration', tag: 'Persistent Schemas' },
    ],
  },
];
