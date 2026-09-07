// ─── Open roles ──────────────────────────────────────────────────────────────
// Rendered by src/pages/Hiring.tsx and emitted as Google-Jobs-eligible
// JobPosting structured data by src/lib/pageSchema.ts.
//
// ⚠ `datePosted` / `validThrough` must be real ISO dates. Google drops a
// posting once validThrough is in the past, so refresh these when you refresh
// the ad — a stale date silently removes the role from Google Jobs.

export interface JobOffer {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  commitment: string;
  badge?: string;
  numeral: string;
  tagline: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  perks: string[];
  /** ISO date the role was published. */
  datePosted: string;
  /** ISO date the ad expires. Past dates are dropped from Google Jobs. */
  validThrough: string;
  /** Countries an applicant may be based in. Google drops a TELECOMMUTE
   *  posting whose applicantLocationRequirements is not a real place, so
   *  list the countries the house can actually contract in — not "Worldwide". */
  applicantCountries: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const jobs: JobOffer[] = [
  {
    id: 'social-media-manager-intern',
    datePosted: '2026-08-18',
    validThrough: '2026-12-31',
    applicantCountries: ['Tunisia'],
    title: 'Social Media Manager',
    type: 'Internship',
    location: 'Remote',
    department: 'Marketing',
    commitment: 'Part-time · 20 hrs / week',
    badge: 'Now Hiring',
    numeral: 'I',
    tagline: 'Shape our voice online and grow a community around what we build.',
    about:
      "We're looking for a Social Media Manager Intern to run our LinkedIn, Twitter/X and Instagram. You'll write about our products (Genify, Form Temple) and our agency work, and talk to the people who reply.",
    responsibilities: [
      'Plan and publish 4–6 posts per week across LinkedIn, Twitter/X, and Instagram',
      'Write copy that makes technical topics readable for everyone',
      'Reply to comments, DMs, and mentions quickly and in our voice',
      'Track reach, engagement, and follower growth, and report weekly',
      'Work with the dev team on launch and release posts',
      'Watch what happens in tech, AI, and SaaS for post ideas',
      'Write short video scripts and briefs for visuals',
    ],
    requirements: [
      'Enrolled in or recently graduated from a Marketing, Communications, or related programme',
      'Clear, readable written English',
      'Genuine interest in technology, startups, or SaaS products',
      'Familiarity with LinkedIn, Twitter/X, and Instagram content formats',
      'You work on your own and hit deadlines without reminders',
      'Available for at least 20 hours per week',
    ],
    niceToHave: [
      'Experience with Canva, Figma, or Adobe Express for visual content',
      'Basic understanding of SEO and content marketing',
      'Prior internship or freelance social media work',
      'You like AI or developer tools',
    ],
    perks: [
      'Fully remote & flexible hours',
      'Letter of recommendation upon successful completion',
      'Early access to all Bytes Monks products',
      'Potential conversion to paid role based on performance',
    ],
  },
  {
    id: 'business-developer-intern',
    datePosted: '2026-08-18',
    validThrough: '2026-12-31',
    applicantCountries: ['Tunisia'],
    title: 'Business Developer',
    type: 'Internship',
    location: 'Remote',
    department: 'Growth',
    commitment: 'Part-time · 20 hrs / week',
    badge: 'Now Hiring',
    numeral: 'II',
    tagline: 'Help us find new work and learn how deals actually get closed.',
    about:
      "We're looking for a Business Developer Intern to help us find and win new work. You'll work with the founders and see the whole sales cycle up close.",
    responsibilities: [
      'Find and qualify leads through LinkedIn, cold email, and events',
      'Help with discovery calls, proposals, and follow-ups',
      'Keep in touch with prospects, clients, and partners',
      'Learn what the tech team does so you can explain it',
      'Track the pipeline in the CRM and report against weekly targets',
      'Show up for Bytes Monks at online tech and startup events',
      'Bring back what the market says so we can adjust the roadmap',
    ],
    requirements: [
      'Enrolled in or recently graduated from a Business, Marketing, or related programme',
      'You can hold a call and write a clear follow-up',
      'Genuine interest in technology, startups, or SaaS products',
      'You start things yourself and follow through',
      'You manage your own time across 20 hours a week',
      'Fluent written and spoken English',
    ],
    niceToHave: [
      'Prior experience in sales, business development, or a client-facing role',
      'Understanding of web technologies or SaaS business models',
      'You already know people in the startup or SME scene',
    ],
    perks: [
      'Fully remote & flexible hours',
      'Letter of recommendation upon successful completion',
      'Mentorship from the founders and a close look at how a startup runs',
      'Early access to all Bytes Monks products and internal tools',
      'Potential conversion to paid role based on performance',
    ],
  },
];
