/**
 * TrueWayGrowth Persistent Client & Business Database
 * Handles user authentication, role-based access, quote/inquiry submissions,
 * services catalog, client deliverables, testimonials, and admin broadcasts.
 */

export type UserRole = 'student' | 'admin' | 'instructor';

export interface GrowthUser {
  id: string;
  name: string;
  email: string;
  passwordHash?: string; // Stored securely in client database
  role: UserRole;
  avatar?: string;
  phone?: string;
  company?: string;
  country: string;
  timezone: string;
  status: 'active' | 'inactive';
  emailVerified: boolean;
  createdAt: string;
  enrolledServices: string[]; // service or course IDs
  invoices: InvoiceRecord[];
  notifications: NotificationItem[];
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  serviceTitle: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'processing';
  downloadUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'announcement' | 'update' | 'invoice' | 'service';
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  keyBenefits: string[];
  workProcess: Array<{ step: number; title: string; desc: string }>;
  startingPriceUSD: number;
  startingPriceGBP: number;
  turnaround: string;
  popular?: boolean;
}

export interface QuoteInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  serviceId: string;
  serviceName: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  serviceCategory: string;
  verified: boolean;
  featured: boolean;
  avatar?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  results: Array<{ metric: string; label: string }>;
  servicesUsed: string[];
  image: string;
}

// 8 Core Digital Marketing Services as specified in user request
export const DEFAULT_GROWTH_SERVICES: ServiceItem[] = [
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'Social Media',
    tagline: 'Build authority, expand community, and drive daily engagement',
    description: 'Data-informed social media marketing across TikTok, Instagram, Facebook, and LinkedIn. We craft high-impact creative campaigns, schedule multi-platform content, and manage direct conversations to convert followers into loyal paying customers.',
    iconName: 'Share2',
    keyBenefits: [
      'Multi-platform strategy tailored to your niche and audience demographic',
      'Consistent daily brand presence with trend-jacking and viral hooks',
      'Community management: replying to comments and direct inquiries',
      'Detailed monthly engagement analytics and follower growth audits'
    ],
    workProcess: [
      { step: 1, title: 'Audience & Competitor Audit', desc: 'Identify your target demographic, peak activity hours, and competitor gaps.' },
      { step: 2, title: 'Content Calendar & Strategy', desc: 'Develop monthly calendars with visual themes, value carousels, and video reels.' },
      { step: 3, title: 'Publishing & Community Management', desc: 'Active posting, story engagement, and customer conversation nurturing.' },
      { step: 4, title: 'Review & Scaling', desc: 'Analyze top-performing creative pillars to double down on what converts.' }
    ],
    startingPriceUSD: 499,
    startingPriceGBP: 399,
    turnaround: 'Monthly Retainer',
    popular: true
  },
  {
    id: 'seo-search-engine-optimization',
    title: 'Search Engine Optimization (SEO)',
    category: 'Search & Visibility',
    tagline: 'Dominate Google search results and capture high-intent organic buyers',
    description: 'Comprehensive On-Page, Off-Page, and Technical SEO designed to rank your business at the top of Google. We conduct forensic keyword research, optimize Core Web Vitals, build high-authority backlinks, and target high-converting buyer queries.',
    iconName: 'Search',
    keyBenefits: [
      'Permanent, compounding organic traffic that reduces paid ad dependency',
      'Comprehensive technical audit: site speed, indexation, schema architecture',
      'Targeted commercial keywords that bring ready-to-buy visitors',
      'Local SEO & Google Business Profile optimization for regional dominance'
    ],
    workProcess: [
      { step: 1, title: 'Technical Site Audit', desc: 'Eliminate crawl errors, broken links, slow loading, and indexing blocks.' },
      { step: 2, title: 'High-Intent Keyword Map', desc: 'Uncover low-competition, high-volume commercial search terms.' },
      { step: 3, title: 'On-Page & Content Optimization', desc: 'Optimize titles, headings, semantic schema, and metadata.' },
      { step: 4, title: 'Authority Link Building', desc: 'Acquire editorial backlinks from reputable industry domains.' }
    ],
    startingPriceUSD: 599,
    startingPriceGBP: 479,
    turnaround: '3 to 6 Month Campaign'
  },
  {
    id: 'facebook-instagram-advertising',
    title: 'Facebook & Instagram Advertising',
    category: 'Paid Acquisition',
    tagline: 'High-ROI Meta advertising campaigns engineered for maximum conversions',
    description: 'Laser-targeted Meta advertising campaigns designed to scale revenue profitably. We handle high-converting creative production, audience segmentation, pixel tracking, CBO budget optimization, and aggressive retargeting funnels.',
    iconName: 'TrendingUp',
    keyBenefits: [
      'Engineered for 3x+ Return on Ad Spend (ROAS)',
      'A/B tested creative hooks, direct-response copy, and video creatives',
      'Deep retargeting funnels that recover abandoned carts and lost visitors',
      'Custom audience creation leveraging lookalikes and customer LTV data'
    ],
    workProcess: [
      { step: 1, title: 'Pixel & CAPI Setup', desc: 'Accurate server-side tracking and attribution setup.' },
      { step: 2, title: 'Creative Hook Production', desc: 'Develop 5-10 distinct video hooks and carousel designs.' },
      { step: 3, title: 'Testing & Audience Discovery', desc: 'Launch micro-budget tests to find winning ad sets.' },
      { step: 4, title: 'Aggressive Budget Scaling', desc: 'Scale winning creatives horizontally and vertically while maintaining ROAS.' }
    ],
    startingPriceUSD: 699,
    startingPriceGBP: 559,
    turnaround: 'Bi-Weekly / Monthly',
    popular: true
  },
  {
    id: 'influencer-marketing',
    title: 'Influencer Marketing',
    category: 'Creator Partnerships',
    tagline: 'Harness trusted niche voices to amplify your brand credibly',
    description: 'End-to-end influencer partnership management. We scout verified creators aligned with your brand values, negotiate performance-based contracts, manage product seeding, and monitor trackable affiliate conversion codes.',
    iconName: 'Users',
    keyBenefits: [
      'Instant brand trust through authentic, non-salesy social proof',
      'Access to highly engaged, hyper-targeted niche communities',
      'High-quality User Generated Content (UGC) licensed for paid ads',
      'Performance tracking via custom UTM links and unique discount codes'
    ],
    workProcess: [
      { step: 1, title: 'Creator Scouting & Vetting', desc: 'Filter influencers by real engagement rate, audience demographics, and authenticity.' },
      { step: 2, title: 'Outreach & Contract Negotiation', desc: 'Secure favorable deliverables, usage rights, and affiliate incentives.' },
      { step: 3, title: 'Briefing & Creative Direction', desc: 'Provide non-restrictive creative briefs for natural storytelling.' },
      { step: 4, title: 'Post-Campaign Reporting', desc: 'Evaluate impressions, clicks, conversions, and cost-per-acquisition (CPA).' }
    ],
    startingPriceUSD: 799,
    startingPriceGBP: 649,
    turnaround: 'Campaign-based'
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    category: 'Creative Production',
    tagline: 'Thumb-stopping short-form video, long-form articles, and brand storytelling',
    description: 'High-retention content tailored for modern digital consumers. From viral TikToks and Instagram Reels to SEO-optimized blog guides and whitepapers, our team produces persuasive assets that inform, entertain, and convert.',
    iconName: 'PenTool',
    keyBenefits: [
      'Professional scriptwriting, voiceover, and motion graphics editing',
      'SEO-grounded long-form articles that rank and generate organic leads',
      'Format-optimized assets: Vertical 9:16 for Reels/Shorts, 1:1 for Feeds',
      'Full commercial rights and source files provided'
    ],
    workProcess: [
      { step: 1, title: 'Content Ideation & Scripting', desc: 'Formulate viral angles based on current industry trends and audience pain points.' },
      { step: 2, title: 'Asset Production & Editing', desc: 'Polished cutting, dynamic subtitles, color grading, and royalty-free audio.' },
      { step: 3, title: 'Review & Client Revision', desc: 'Collaborative feedback round to ensure exact brand tone.' },
      { step: 4, title: 'Distribution Delivery', desc: 'Deliver batch assets ready for immediate publication.' }
    ],
    startingPriceUSD: 399,
    startingPriceGBP: 319,
    turnaround: '5-7 Business Days'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    category: 'Brand Identity',
    tagline: 'Distinctive visual branding that commands respect and drives clicks',
    description: 'Professional visual communication tailored to your brand identity. We design conversion-focused ad banners, social media templates, pitch decks, brochures, website banners, and complete visual guidelines that stand out from competitors.',
    iconName: 'Layout',
    keyBenefits: [
      'Consistent aesthetic aligned with your official color palette and typography',
      'Conversion-optimized visual hierarchy designed to guide customer eyes',
      'Editable Figma & Canva templates for agile internal team use',
      'Fast turnaround with unlimited revisions during initial drafting'
    ],
    workProcess: [
      { step: 1, title: 'Creative Brief & Moodboard', desc: 'Align on visual aesthetic, target audience expectations, and core messaging.' },
      { step: 2, title: 'Concept Exploration', desc: 'Present 2-3 distinct design directions for initial client selection.' },
      { step: 3, title: 'Refinement & Typography Lock', desc: 'Fine-tune alignments, contrast, vector assets, and export formats.' },
      { step: 4, title: 'Master Asset Pack Delivery', desc: 'Deliver high-res PNGs, SVGs, PDFs, and editable source files.' }
    ],
    startingPriceUSD: 349,
    startingPriceGBP: 279,
    turnaround: '3-5 Business Days'
  },
  {
    id: 'social-media-management',
    title: 'Social Media Account Management',
    category: 'Full Management',
    tagline: 'Complete hands-off account management so you can focus on running your business',
    description: 'Comprehensive day-to-day management of your social presence. We handle schedule planning, caption copywriting, hashtag strategy, direct message triage, community moderation, and reputation management across all active channels.',
    iconName: 'CheckCircle',
    keyBenefits: [
      '100% hands-off peace of mind with 30-day scheduled content queues',
      'Timely response to customer DMs and comments within hours',
      'Reputation protection: swift handling of negative feedback or spam',
      'Monthly executive growth reviews with actionable next-step roadmaps'
    ],
    workProcess: [
      { step: 1, title: 'Channel Onboarding & Access', desc: 'Secure credential handoff and profile aesthetic makeover.' },
      { step: 2, title: 'Monthly Batch Scheduling', desc: 'Upload and stage all copy, creative, and hashtags in advance.' },
      { step: 3, title: 'Daily Monitoring & DM Handling', desc: 'Active monitoring of notifications, mentions, and customer leads.' },
      { step: 4, title: 'Monthly Performance Recap', desc: 'Deliver transparent ROI reports detailing follower gain and lead conversion.' }
    ],
    startingPriceUSD: 549,
    startingPriceGBP: 439,
    turnaround: 'Ongoing Monthly Management'
  },
  {
    id: 'digital-marketing-consultation',
    title: 'Digital Marketing Consultation',
    category: 'Executive Strategy',
    tagline: '1-on-1 strategic growth consulting with senior marketing directors',
    description: 'High-level strategic consulting for business owners and leadership teams. We audit your existing marketing funnels, identify hidden revenue leaks, map out an actionable 90-day growth roadmap, and train your internal staff.',
    iconName: 'Target',
    keyBenefits: [
      'Comprehensive funnel diagnosis: audit website UX, ad spend, and retention',
      'Bespoke 90-day growth blueprint customized to your revenue milestones',
      'Direct WhatsApp and video access to senior growth directors',
      'Internal team enablement and marketing SOP documentation'
    ],
    workProcess: [
      { step: 1, title: 'Pre-Session Questionnaire', desc: 'Gather your metrics, revenue history, ad accounts, and primary bottlenecks.' },
      { step: 2, title: 'Deep Funnel Audit', desc: 'Our senior directors analyze conversion drop-offs and competitor positioning.' },
      { step: 3, title: 'Live Strategy Workshop', desc: '60-minute intensive video session walking through exact action steps.' },
      { step: 4, title: 'Written Action Blueprint', desc: 'Deliver recording, milestone spreadsheet, and implementation checklist.' }
    ],
    startingPriceUSD: 299,
    startingPriceGBP: 239,
    turnaround: 'Instant Booking'
  }
];

export const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'E-Commerce Fashion Scaling',
    client: 'Velvet & Thread Apparel',
    category: 'Paid Social & Creative',
    description: 'Scaled direct-to-consumer apparel brand from $12k/mo to $85k/mo within 4 months using dynamic Meta video creatives and structured retargeting.',
    results: [
      { metric: '340%', label: 'Average ROAS' },
      { metric: '+$85,000', label: 'Monthly Revenue Added' },
      { metric: '-38%', label: 'Lower Cost Per Acquisition' }
    ],
    servicesUsed: ['Facebook & Instagram Advertising', 'Content Creation', 'Social Media Marketing'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'port-2',
    title: 'B2B SaaS Lead Engine',
    client: 'CloudFlow CRM Platform',
    category: 'SEO & Content',
    description: 'Restructured technical site architecture, built 45 high-authority industry backlinks, and ranked #1 for 18 commercial keywords.',
    results: [
      { metric: '4.2x', label: 'Organic Traffic Lift' },
      { metric: '1,200+', label: 'Qualified Demo Signups' },
      { metric: '#1 Rank', label: 'For 18 High-Volume Keywords' }
    ],
    servicesUsed: ['Search Engine Optimization (SEO)', 'Content Creation'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'port-3',
    title: 'Global Quran Academy Scaling',
    client: 'True Way Quran & UstadLeads',
    category: 'Full-Funnel Growth',
    description: 'Built global student acquisition funnel across UK, USA, Canada, and Gulf. Trained 500+ teachers and scaled academy to 1,000+ active students.',
    results: [
      { metric: '1,000+', label: 'Active Global Students' },
      { metric: '500+', label: 'Teachers Mentored' },
      { metric: '25+', label: 'Countries Reached' }
    ],
    servicesUsed: ['Digital Marketing Consultation', 'Facebook & Instagram Advertising', 'Social Media Management'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'port-4',
    title: 'Real Estate High-Intent Leads',
    client: 'Apex Capital Properties UK',
    category: 'Paid Acquisition & Lead Gen',
    description: 'Deployed hyper-targeted Meta & Google search campaigns capturing high-net-worth property investors and first-time homebuyers.',
    results: [
      { metric: '450+', label: 'Qualified Buyer Inquiries' },
      { metric: '£4.2M', label: 'Property Sales Closed' },
      { metric: '£18.50', label: 'Average Cost Per Lead' }
    ],
    servicesUsed: ['Facebook & Instagram Advertising', 'Graphic Design'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Sarah Jenkins',
    role: 'Founder & CEO',
    company: 'Luxe Botanics UK',
    rating: 5,
    quote: 'TrueWayGrowth completely revolutionized our digital acquisition. In just 90 days, our Meta ad ROAS jumped from 1.6x to 3.8x, and our organic search traffic has more than doubled. Their communication and weekly reports are immaculate.',
    serviceCategory: 'Paid Advertising & SEO',
    verified: true,
    featured: true
  },
  {
    id: 'test-2',
    clientName: 'Abdul Basit Saleem',
    role: 'Director & Founder',
    company: 'UstadLeads & True Way Quran',
    rating: 5,
    quote: 'Thanks to the digital marketing strategies and consulting from TrueWayGrowth, we expanded our Academy to over 1,000 students worldwide across 25 countries. If you want sustainable, halal, and measurable business growth, work with this team.',
    serviceCategory: 'Growth Consultation',
    verified: true,
    featured: true
  },
  {
    id: 'test-3',
    clientName: 'Marcus Vance',
    role: 'Head of Growth',
    company: 'Nexus SaaS Solutions',
    rating: 5,
    quote: 'The SEO and technical content strategy executed by TrueWayGrowth brought us 1,200+ qualified demo requests. They do not just give advice; they execute with surgical precision.',
    serviceCategory: 'Search Engine Optimization',
    verified: true,
    featured: true
  },
  {
    id: 'test-4',
    clientName: 'Fatima Al-Rashid',
    role: 'Managing Director',
    company: 'Al-Madina Global Trading',
    rating: 5,
    quote: 'Professional, responsive, and deeply knowledgeable. Our social media accounts grew by 45,000 targeted followers, and our customer inquiry inbox is filled daily. Highly recommended!',
    serviceCategory: 'Social Media Management',
    verified: true,
    featured: false
  }
];

// Seeded Users
export const DEFAULT_USERS: GrowthUser[] = [
  {
    id: 'usr-admin-1',
    name: 'TrueWay Admin',
    email: 'admin@truewaygrowth.com',
    passwordHash: 'admin123',
    role: 'admin',
    phone: '+92 306 8959085',
    company: 'TrueWayGrowth Head Office',
    country: 'United Kingdom',
    timezone: 'Europe/London (GMT)',
    status: 'active',
    emailVerified: true,
    createdAt: '2026-01-10T10:00:00Z',
    enrolledServices: ['social-media-marketing', 'seo-search-engine-optimization'],
    invoices: [
      {
        id: 'inv-101',
        invoiceNumber: 'TWG-2026-001',
        date: '2026-10-01',
        serviceTitle: 'Quarterly SEO & Growth Retainer',
        amount: 1499,
        currency: 'GBP',
        status: 'paid'
      }
    ],
    notifications: [
      {
        id: 'notif-1',
        title: 'Welcome to TrueWayGrowth Admin Console',
        message: 'Manage client accounts, inquiries, services, and growth reports from this dashboard.',
        date: '2026-10-01',
        read: false,
        type: 'announcement'
      }
    ]
  },
  {
    id: 'usr-client-1',
    name: 'Demo Client',
    email: 'client@truewaygrowth.com',
    passwordHash: 'client123',
    role: 'student',
    phone: '+44 7911 123456',
    company: 'Nexus Retail UK',
    country: 'United Kingdom',
    timezone: 'Europe/London (GMT)',
    status: 'active',
    emailVerified: true,
    createdAt: '2026-10-15T14:30:00Z',
    enrolledServices: ['social-media-marketing', 'facebook-instagram-advertising'],
    invoices: [
      {
        id: 'inv-102',
        invoiceNumber: 'TWG-2026-042',
        date: '2026-10-15',
        serviceTitle: 'Meta Ads Launch & Creative Suite',
        amount: 699,
        currency: 'USD',
        status: 'paid'
      },
      {
        id: 'inv-103',
        invoiceNumber: 'TWG-2026-078',
        date: '2026-11-01',
        serviceTitle: 'Monthly Social Media Retainer (Nov)',
        amount: 499,
        currency: 'USD',
        status: 'paid'
      }
    ],
    notifications: [
      {
        id: 'notif-2',
        title: 'Campaign Audit Ready',
        message: 'Your monthly Meta ad creative performance report and next-month roadmap are now live.',
        date: '2026-11-02',
        read: false,
        type: 'update'
      },
      {
        id: 'notif-3',
        title: 'Welcome to TrueWayGrowth!',
        message: 'Your dedicated account manager is assigned. Chat directly via WhatsApp or help desk.',
        date: '2026-10-15',
        read: true,
        type: 'service'
      }
    ]
  }
];

export const DEFAULT_INQUIRIES: QuoteInquiry[] = [
  {
    id: 'inq-1',
    name: 'Tariq Mehmood',
    email: 'tariq@skylineproperties.co.uk',
    phone: '+44 7890 123456',
    company: 'Skyline Properties Ltd',
    website: 'https://skylineproperties.co.uk',
    serviceId: 'facebook-instagram-advertising',
    serviceName: 'Facebook & Instagram Advertising',
    budget: '£1,000 - £2,500 / month',
    message: 'We need qualified buyer inquiries for our new luxury residential development in Manchester. Please share your case studies and consultation availability.',
    status: 'new',
    createdAt: '2026-11-06T09:24:00Z'
  },
  {
    id: 'inq-2',
    name: 'Elena Rostova',
    email: 'elena@vividskin.com',
    phone: '+1 312 555 0192',
    company: 'Vivid Skin Care USA',
    website: 'https://vividskin.com',
    serviceId: 'social-media-marketing',
    serviceName: 'Social Media Marketing',
    budget: '$500 - $1,000 / month',
    message: 'Looking to outsource our daily Instagram and TikTok management. We need 3-4 reels per week and active community replies.',
    status: 'contacted',
    createdAt: '2026-11-04T15:10:00Z'
  },
  {
    id: 'inq-3',
    name: 'Dr. Harris Ahmed',
    email: 'harris@smileortho.com',
    phone: '+44 808 555 9900',
    company: 'Smile Orthodontics Clinic',
    website: 'https://smileortho.com',
    serviceId: 'seo-search-engine-optimization',
    serviceName: 'Search Engine Optimization (SEO)',
    budget: '£500 - £1,000 / month',
    message: 'We want to rank #1 in London for Invisalign and teeth straightening keywords.',
    status: 'in_progress',
    createdAt: '2026-10-28T11:45:00Z'
  }
];

// Helper storage functions
const USERS_KEY = 'twg_users_db';
const INQUIRIES_KEY = 'twg_inquiries_db';
const TESTIMONIALS_KEY = 'twg_testimonials_db';

export function getStoredUsers(): GrowthUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_USERS;
}

export function saveStoredUsers(users: GrowthUser[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}

export function getStoredInquiries(): QuoteInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_INQUIRIES;
}

export function saveStoredInquiries(inquiries: QuoteInquiry[]): void {
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  } catch {}
}

export function getStoredTestimonials(): TestimonialItem[] {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_TESTIMONIALS;
}

export function saveStoredTestimonials(testimonials: TestimonialItem[]): void {
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  } catch {}
}
