/**
 * Single source of truth for every project on the site.
 * The homepage list, the /work page, and each /[slug] detail page all read
 * from here, so a project only ever needs to be edited in one place.
 *
 * Each project has:
 *   liveUrl  - a public URL if the project has one, otherwise null
 *   status   - short label shown when liveUrl is missing (e.g. "In private beta")
 */
export const projects = [
  {
    slug: 'socle',
    title: 'Socle',
    category: 'Consumer App',
    type: 'Consumer App · Discovery · Beta',
    tagline: 'Discover places you will actually love.',
    image: '/images/socle.webp',
    liveUrl: 'https://socle.pages.dev',
    status: 'In beta',
    featured: true,
    description:
      'A social discovery platform helping people find and organize restaurants, cafés, hotels, and places through curated recommendations, lists, AI-powered taste profiles, and social features - instead of scrolling endless reviews.',
    achievements: [
      'In beta, with 65 people signed up to the waitlist',
      'AI-powered taste profiles personalize recommendations to each user',
      'Curated collections and lists replace endless review feeds',
    ],
    skills: [
      'Product Design',
      'UI/UX',
      'Full-stack Development',
      'User Research',
    ],
  },
  {
    slug: 'equity-intelligence',
    title: 'Equity Intel',
    fullTitle: 'Automated Equity Intelligence Platform',
    category: 'FinTech / Automation',
    type: 'FinTech · Data Engineering · Automation',
    tagline: 'Real-time market data, aggregated.',
    image: '/images/equity-intel.webp',
    liveUrl: null,
    status: 'In private use',
    featured: true,
    description:
      'A cloud-hosted market data project that aggregates public data from Yahoo Finance, SEC EDGAR, congressional disclosures, insider-trading disclosures, and institutional filings into one personal learning feed.',
    achievements: [
      'Running daily for the past month, with around 500 signals surfaced across five data streams',
      'Aggregates public data from Yahoo Finance, SEC EDGAR, and congressional disclosure filings into one feed',
      'Built as a personal learning project to understand market data pipelines and event-driven backends',
    ],
    skills: [
      'APIs',
      'Node.js',
      'Cloud Deployment',
      'Automation',
      'Financial Data',
      'Backend Engineering',
      'Analytics',
    ],
  },
  {
    slug: 'wheres-my-context',
    title: "Where's My Context",
    category: 'AI Infrastructure',
    type: 'AI Infrastructure · Knowledge Graph',
    tagline: 'Persistent memory for AI agents.',
    image: '/images/my-context.png',
    liveUrl: null,
    status: 'In private use',
    featured: true,
    description:
      'A persistent AI memory system that transforms notes, documentation, and code into a searchable knowledge graph, so AI agents can retain project context across sessions.',
    achievements: [
      'Built because ChatGPT and Claude kept losing project context between sessions, forcing us to re-explain everything from scratch every time',
      'Turns notes, documentation, and code into a searchable knowledge graph agents can query',
      'In active daily use - demo and repo private for now',
    ],
    skills: [
      'FastAPI',
      'Knowledge Graphs',
      'AI',
      'D3.js',
      'System Design',
      'Cloud APIs',
    ],
  },
  {
    slug: 'bio-eoc-prep',
    title: 'Bio EOC Prep',
    fullTitle: 'Biology EOC Prep Platform',
    category: 'EdTech Platform',
    type: 'EdTech · Web Development',
    tagline: 'Practice smarter. Build confidence.',
    image: '/images/bioeoc.webp',
    liveUrl: null,
    status: 'Live',
    featured: true,
    description:
      'An online Biology EOC study platform that reached thousands of students by providing high-quality practice resources and exam preparation.',
    achievements: [
      '1,000+ students used it in the first month it went live',
      'Students used it to score 90+ on the Biology EOC',
      'Adopted by a biology teacher and shared with their class',
      '250+ practice questions across 18 Biology topics, with instant scoring and focused review',
    ],
    skills: ['Web Development', 'Education Technology', 'Product Design'],
  },
  {
    slug: 'student-insight-lab',
    title: 'Student Insight Lab',
    category: 'Research',
    type: 'Research · Data Analysis',
    tagline: 'What school actually costs students.',
    image: '/images/student-insight-lab.png',
    liveUrl: null,
    status: 'Research paper in progress',
    featured: false,
    description:
      'A research initiative analyzing student workload, stress, and sleep using survey data collected directly from students.',
    achievements: [
      'Designed and ran a survey on student workload, stress, and sleep',
      '50 students responded and completed the full survey',
      'Currently analyzing the results and writing them up for publication',
    ],
    skills: ['Research', 'Data Analysis', 'Survey Design'],
  },
  {
    slug: 'the-climate-note',
    title: 'The Climate Note',
    category: 'Community / Leadership',
    type: 'Community · Writing · Sustainability',
    tagline: 'A youth-led environmental newsletter.',
    image: '/images/project-climate-note.svg',
    liveUrl: null,
    status: 'Active',
    featured: false,
    description:
      'A youth-led environmental newsletter and community focused on writing, sustainability, and getting more young people involved in climate work.',
    achievements: [
      'Youth-led writing and community project on environmental issues',
      'Contributed to writing, editorial direction, and community-building',
    ],
    skills: ['Leadership', 'Community Building', 'Writing', 'Sustainability'],
  },
  {
    slug: 'truecost',
    title: 'TrueCost',
    category: 'Personal Finance',
    type: 'Personal Finance · Product Design',
    tagline: 'Every price, measured in time.',
    image: '/images/truecost.png',
    liveUrl: null,
    status: 'In private use',
    featured: false,
    description:
      'A personal finance application that converts purchases into the amount of work or study time required to earn that money.',
    achievements: [
      'Built to track my own spending after finding other expense apps too clunky to use',
      'Functional and in daily use by family and friends',
      'Not publicly deployed yet',
    ],
    skills: ['Finance', 'Product Design', 'App Development'],
  },
  {
    slug: 'pennyscout',
    title: 'PennyScout',
    category: 'FinTech',
    type: 'FinTech · Web Development',
    tagline: 'Stock analysis, built from scratch.',
    image: '/images/pennyscout.png',
    liveUrl: null,
    status: 'Functional prototype',
    featured: false,
    description:
      'A stock and financial analysis platform pulling live market data from Yahoo Finance.',
    achievements: [
      'Uses Yahoo Finance as the live market data source',
      'Full-stack build with Next.js, external APIs, and a database backend',
    ],
    skills: ['Next.js', 'APIs', 'Databases', 'Backend Development'],
  },
];

/** @param {string} slug */
export function getProject(slug) {
  return projects.find(project => project.slug === slug);
}

/** The project after this one, wrapping around at the end of the list. */
export function getNextProject(slug) {
  const index = projects.findIndex(project => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
