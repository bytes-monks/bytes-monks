// ─── Ars Vocandi · Talent sourcing content ───────────────────────────────────
//
// ⚠ OWNER: every commercial claim on /sourcing is driven from this file, and
// nothing here asserts a figure the house cannot yet evidence. Before the first
// campaign, settle the values in TERMS below and re-read `policyClaims`.
//
// Deliberately NOT stated anywhere on the page (no evidence yet): placement
// counts, time-to-shortlist medians, fill rates, client names, testimonials.
// Add them here once they are real — the components already have the slots.

export const TERMS = {
  /** Replacement-guarantee window in days. Set a number to publish it; null renders the wording without a figure. */
  guaranteeDays: null as number | null,
  /** Direct-placement fee as a % of first-year gross. Set a number to publish it. */
  placementFeePercent: null as number | null,
} as const;

/** Claims the page makes on the house's behalf. Confirm each before launch. */
export const policyClaims = [
  'Candidates are never charged a fee.',
  'Every candidate is screened by a working engineer before shortlisting.',
  'Two references are taken directly by us.',
  'IP assignment and confidentiality are written into every contract.',
  'Every direct placement carries a replacement guarantee.',
] as const;

// ─── Disciplines: the six role families, also the Bench filter vocabulary ─────
// Names and subtitles come from src/data/disciplines.ts so /sourcing and the
// home page's Services section can never disagree; only the sourcing gloss is
// defined here.

import { allDisciplines } from './disciplines';
import type { Discipline } from './disciplines';

const GLOSS: Record<string, string> = {
  intelligentia: 'Agents, LLM systems, applied ML.',
  fabricandi: 'Backend, full-stack, mobile, APIs.',
  datarum: 'Pipelines, warehouses, vector stores.',
  sustinendi: 'Kubernetes, CI/CD, observability, cost.',
  formae: 'Interfaces, design systems, research.',
  regendi: 'Tech leads, EMs, product managers.',
};

export interface SourcedDiscipline extends Discipline {
  gloss: string;
}

export const disciplines: SourcedDiscipline[] = allDisciplines.map((d) => ({ ...d, gloss: GLOSS[d.id] }));

// ─── The Bench ───────────────────────────────────────────────────────────────
//
// ⚠ These describe the SHAPE of the roles the house sources — seniority, stack,
// and what good looks like. They are not people, and nothing here may imply a
// live roster: no names, no photos, and deliberately no availability status.
// When real (still anonymised) folios exist, replace these and keep the
// disclaimer that sits above the grid.

export interface Hand {
  ref: string;
  role: string;
  seniority: string;
  years: string;
  stack: string[];
  note: string;
  discipline: string;
}

export const bench: Hand[] = [
  {
    ref: 'Hand I', role: 'AI Engineer', seniority: 'Senior', years: 'VIII years',
    stack: ['Python', 'PyTorch', 'LangGraph', 'RAG', 'AWS Bedrock'],
    note: 'Ships agents that survive contact with real users.', discipline: 'intelligentia',
  },
  {
    ref: 'Hand II', role: 'Backend Engineer', seniority: 'Staff', years: 'XI years',
    stack: ['Go', 'PostgreSQL', 'gRPC', 'Kafka', 'Kubernetes'],
    note: 'Has deleted more code than most engineers write.', discipline: 'fabricandi',
  },
  {
    ref: 'Hand III', role: 'Full-Stack Engineer', seniority: 'Senior', years: 'VII years',
    stack: ['TypeScript', 'React', 'Node', 'Next.js', 'Postgres'],
    note: 'Fluent in both halves of the wire.', discipline: 'fabricandi',
  },
  {
    ref: 'Hand IV', role: 'Data Engineer', seniority: 'Mid–Senior', years: 'VI years',
    stack: ['Python', 'dbt', 'Airflow', 'Snowflake', 'Spark'],
    note: 'Makes the warehouse legible to the board.', discipline: 'datarum',
  },
  {
    ref: 'Hand V', role: 'DevOps / SRE', seniority: 'Senior', years: 'IX years',
    stack: ['Terraform', 'Kubernetes', 'AWS', 'ArgoCD', 'Prometheus'],
    note: 'Keeps the vigil so the team sleeps.', discipline: 'sustinendi',
  },
  {
    ref: 'Hand VI', role: 'ML / MLOps Engineer', seniority: 'Mid', years: 'V years',
    stack: ['Python', 'MLflow', 'Kubeflow', 'Vertex AI', 'Docker'],
    note: 'Takes models out of notebooks, into production.', discipline: 'intelligentia',
  },
  {
    ref: 'Hand VII', role: 'Product Designer', seniority: 'Senior', years: 'VIII years',
    stack: ['Figma', 'Design systems', 'Prototyping', 'Research', 'WCAG'],
    note: 'Draws the thing before anyone builds the wrong one.', discipline: 'formae',
  },
  {
    ref: 'Hand VIII', role: 'Engineering Manager', seniority: 'Lead', years: 'XII years',
    stack: ['Architecture', 'Hiring', 'Delivery', 'Mentoring', 'Roadmap'],
    note: 'Turns six good engineers into one good team.', discipline: 'regendi',
  },
  {
    ref: 'Hand IX', role: 'Mobile Engineer', seniority: 'Senior', years: 'VII years',
    stack: ['Swift', 'Kotlin', 'React Native', 'Store CI', 'Offline sync'],
    note: 'Ships to two app stores without drama.', discipline: 'fabricandi',
  },
  {
    ref: 'Hand X', role: 'QA / Test Engineer', seniority: 'Mid–Senior', years: 'VI years',
    stack: ['Playwright', 'Cypress', 'pytest', 'Load testing', 'CI gates'],
    note: 'Finds the bug before your customer does.', discipline: 'fabricandi',
  },
];

// ─── The Rite: the sourcing process ──────────────────────────────────────────

export const rite = [
  {
    num: 'I', title: 'Quaeramus', en: 'We inquire',
    body: 'We take the brief apart: the seat, the stack, the band, and the person who will actually stay in it.',
    practice: 'Role brief · scorecard · salary band',
  },
  {
    num: 'II', title: 'Vocemus', en: 'We call',
    body: 'We go to the people who aren\'t applying. Referrals and quiet outreach beat job boards.',
    practice: 'Sourcing · referrals · direct outreach',
  },
  {
    num: 'III', title: 'Probemus', en: 'We test',
    body: 'An engineer screens every hand before you see it. We check the claims against the work.',
    practice: 'Technical screen · work sample · references',
  },
  {
    num: 'IV', title: 'Praesentemus', en: 'We present',
    body: 'A short list of folios, each with a written reason. Never a spreadsheet of maybes.',
    practice: 'Shortlist · written notes · scheduling',
  },
  {
    num: 'V', title: 'Maneamus', en: 'We remain',
    body: 'We stay through offer, notice period, and the first months. A placement is not a delivery.',
    practice: 'Offer support · onboarding · guarantee window',
  },
];

// ─── The Vetting ─────────────────────────────────────────────────────────────

export const vetting = [
  { t: 'Read by an engineer', d: 'Engineers who do the work read the CVs. No keyword filter in between.' },
  { t: 'Code seen, not claimed', d: 'A repository, a take-home, or a walkthrough of something real they shipped.' },
  { t: 'One hour, one real problem', d: 'A live session on a real problem from your own domain.' },
  { t: 'Two references, taken by us', d: 'We call former leads ourselves and send you the notes.' },
  { t: 'Speech, time zone, and terms', d: 'We confirm English, overlap hours, notice period, and band before you meet anyone.' },
];

// ─── Terms of Engagement ─────────────────────────────────────────────────────

export interface EngagementModel {
  num: string;
  name: string;
  subtitle: string;
  line: string;
  includes: string[];
  price: string;
  bestFor: string;
  highlight: boolean;
}

export const engagements: EngagementModel[] = [
  {
    num: 'I', name: 'Collocatio', subtitle: 'Direct Placement', highlight: false,
    line: 'A permanent hire, on your payroll, yours to keep.',
    includes: [
      'Role brief, scorecard, and salary benchmarking',
      'Sourcing, screening, and vetting by an engineer',
      'A shortlist with written notes on every hand',
      'Interview scheduling, offer support, notice period',
      'Replacement guarantee, written into the engagement letter',
    ],
    price: TERMS.placementFeePercent
      ? `${TERMS.placementFeePercent}% of first-year gross · invoiced on start date`
      : 'A percentage of first-year gross · invoiced on start date',
    bestFor: 'Core roles you intend to keep for years.',
  },
  {
    num: 'II', name: 'Manus Conductae', subtitle: 'Contract Hands · Staff Augmentation', highlight: true,
    line: 'Vetted engineers embedded in your team, billed monthly, ended on notice.',
    includes: [
      'Matched hands, briefed and ready before they start',
      'We handle the contracting, invoicing, and compliance',
      'They report to your leads and work in your tools',
      'Monthly rate per hand, ended on written notice',
      'Free replacement if the fit is wrong in the opening period',
    ],
    price: 'Monthly rate per hand · by seniority',
    bestFor: 'Capacity now, without a headcount fight.',
  },
  {
    num: 'III', name: 'Cohors', subtitle: 'Embedded Squad', highlight: false,
    line: 'A ready-made team with a lead, assembled by us.',
    includes: [
      'A lead and the hands around them, shaped to the brief',
      'One point of contact, one invoice',
      'Delivery cadence, ceremonies, and written reporting',
      'Ramp-up plan and documented handover from day one',
      'Scale the squad up or down on notice',
    ],
    price: 'Single monthly squad rate',
    bestFor: 'A whole workstream nobody internal can carry.',
  },
];

// ─── FAQ — also the source of the FAQPage JSON-LD ────────────────────────────
// Answers front-load the direct answer in sentence one so they can win a
// featured snippet. Keep them factual; do not add figures the house cannot show.

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What does a tech talent sourcing agency do?',
    a: 'A tech talent sourcing agency finds and screens candidates for technical roles you have no time to fill yourself. We do the search, the vetting, and the shortlist; you make the hire.',
  },
  {
    q: 'How long does it take to get a shortlist?',
    a: 'We put a shortlist date in writing before the search starts. Common stacks move fast; leadership seats and rare specialisms take longer.',
  },
  {
    q: 'How much does tech recruitment cost?',
    a: 'Direct placements cost a percentage of first-year gross, invoiced when the person starts. Contract hands bill monthly per person, squads as one monthly rate, and we quote exact figures against your brief first.',
  },
  {
    q: 'What is staff augmentation?',
    a: 'Staff augmentation means vetted engineers on contract, working inside your team and reporting to your leads. You get capacity without permanent headcount, and we handle the contracts and invoicing.',
  },
  {
    q: 'What technical roles do you source?',
    a: 'We source AI and machine learning engineers, backend and full-stack engineers, data engineers, DevOps and SRE, product designers, and engineering leads. We don\'t source sales, finance, or admin.',
  },
  {
    q: 'How do you vet candidates?',
    a: 'A working engineer screens every candidate before you see them. We read real code, run an hour on a problem from your own domain, and call two references ourselves.',
  },
  {
    q: 'Do you source remote engineers?',
    a: 'Yes, remote-first. We filter for overlap with your working hours, and we confirm which countries we can contract in before the search starts.',
  },
  {
    q: 'What happens if the hire does not work out?',
    a: TERMS.guaranteeDays
      ? `Every direct placement carries a ${TERMS.guaranteeDays}-day replacement guarantee. If they leave, or you let them go inside the window, we search again at no further fee.`
      : 'Every direct placement carries a replacement guarantee. If they leave, or you let them go inside the agreed window, we search again at no further fee.',
  },
  {
    q: 'Do candidates pay anything?',
    a: 'No, never. The hiring company pays us, and we tell candidates the salary band before they sit an interview.',
  },
  {
    q: 'Can you build a whole team rather than one person?',
    a: 'Yes — that\'s the embedded squad. We find a lead and the hands around them from one brief, and you get one invoice.',
  },
  {
    q: 'Who owns the code a contracted engineer writes?',
    a: 'You do. IP assignment and confidentiality go into every contract before the first commit.',
  },
];

// ─── The qualitative proof band ──────────────────────────────────────────────
// Swap for real figures once there are placements to count.

export const proof = [
  { k: 'I', t: 'Engineers vetting engineers', d: 'No keyword filters between you and the work.' },
  { k: 'II', t: 'One standard across all six', d: 'The four crafts we practise, and the two that steer them.' },
  { k: 'III', t: 'Written notes on every hand', d: 'A reason beside each name, never a bare CV.' },
  { k: 'IV', t: 'A guarantee on direct placements', d: 'Set down in the engagement letter, not a handshake.' },
];
