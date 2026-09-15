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
    tagline: 'Run our social accounts and write about what we build.',
    about:
      "You'll run our LinkedIn, Twitter/X and Instagram: write about our products (Genify, Form Temple) and our client work, and talk to the people who reply.",
    responsibilities: [
      'Plan and publish 4 to 6 posts a week',
      'Make technical topics readable',
      'Reply to comments and DMs in our voice',
      'Report reach and follower growth weekly',
      'Work with the dev team on launch posts',
      'Bring post ideas from what is happening in tech and AI',
      'Write short video scripts and briefs for visuals',
    ],
    requirements: [
      'Studying or recently finished marketing, communications, or similar',
      'Clear written English',
      'Interest in tech and startups',
      'You know how posts work on each platform',
      'You work on your own and hit deadlines without reminders',
      'At least 20 hours a week',
    ],
    niceToHave: [
      'Canva, Figma, or Adobe Express',
      'Some SEO',
      'Past social media work, paid or not',
      'You like AI or developer tools',
    ],
    perks: [
      'Remote, flexible hours',
      'A letter of recommendation at the end',
      'Early access to all Bytes Monks products',
      'Can turn into a paid role',
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
    tagline: 'Find us new clients and see how deals get closed.',
    about:
      "You'll help us find and win new clients, working with the founders through the whole sales cycle.",
    responsibilities: [
      'Find and qualify leads through LinkedIn, cold email, and events',
      'Help with discovery calls, proposals, and follow-ups',
      'Keep in touch with prospects and clients',
      'Learn what the tech team does so you can explain it',
      'Keep the CRM current and report weekly',
      'Represent us at online startup events',
      'Tell us what prospects are asking for',
    ],
    requirements: [
      'Studying or recently finished business, marketing, or similar',
      'You can hold a call and write a clear follow-up',
      'Interest in tech and startups',
      'You start things yourself and follow through',
      'At least 20 hours a week, self-managed',
      'Fluent English, spoken and written',
    ],
    niceToHave: [
      'Any sales or client-facing work',
      'Some idea how SaaS businesses make money',
      'You already know people in the startup or SME scene',
    ],
    perks: [
      'Remote, flexible hours',
      'A letter of recommendation at the end',
      'Mentoring from the founders',
      'Early access to all Bytes Monks products',
      'Can turn into a paid role',
    ],
  },
];
