// ─── Page-level JSON-LD, keyed by route ──────────────────────────────────────
// Single source for both the runtime <Seo /> and the build-time prerender, so
// the static HTML and the hydrated DOM always declare the same graph.
// index.html carries Organization + WebSite; keep these disjoint from those.

import { employmentAgency, faqPage, jobPosting, service, servicePriceBand } from './schema';
import type { JsonLd } from './schema';
import { engagements, faqs as talentFaqs } from '../data/talentSourcing';
import { faqs as productFaqs, tradeModels } from '../data/productSourcing';
import { faqs as pricingFaqs } from '../data/pricingFaqs';
import { platformPlans, retainerPlans } from '../data/pricing';
import { jobs } from '../data/jobs';

/** Strip a job posting down to the plain-text description Google expects. */
function jobDescription(job: (typeof jobs)[number]): string {
  const list = (heading: string, items: string[]) =>
    `<p><strong>${heading}</strong></p><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  return [
    `<p>${job.about}</p>`,
    list("What you'll do", job.responsibilities),
    list("What we're looking for", job.requirements),
    list('Nice to have', job.niceToHave),
    list("What you'll get", job.perks),
  ].join('');
}

const HOME_SERVICES = [
  {
    name: 'AI & Machine Learning',
    description: 'Intelligent AI systems, LLM agents, and machine learning models built for production.',
  },
  {
    name: 'Custom Software Development',
    description: 'Scalable, high-performance web, SaaS, and mobile applications built with modern technologies.',
  },
  {
    name: 'Data Engineering',
    description: 'Data pipelines, warehousing, vector search, and analytics infrastructure.',
  },
  {
    name: 'DevOps & Cloud',
    description: 'CI/CD pipelines, cloud infrastructure, observability, and DevOps automation.',
  },
  {
    name: 'Tech Talent Sourcing',
    description: 'Sourcing, technical vetting, and placement of engineers — permanent, contract, or an embedded squad.',
  },
  {
    name: 'Product Sourcing & Trade',
    description: 'Finding and vetting factories in China, checking the goods, and handling freight to your door.',
  },
];

export function pageJsonLd(path: string): JsonLd[] {
  switch (path) {
    case '/':
      return [
        service({
          id: 'service',
          name: 'Bytes Monks — Software, AI & Talent',
          description:
            'Custom software development, AI/ML systems, data engineering, DevOps, and tech talent sourcing for ambitious companies.',
          serviceType: 'Software engineering, AI systems, and technical recruitment',
          path: '/',
          offers: HOME_SERVICES,
        }),
      ];

    case '/talent-sourcing':
      return [
        employmentAgency({
          name: 'Bytes Monks · Ars Vocandi',
          description:
            'Tech talent sourcing for AI, software, data and cloud teams. Every candidate is screened by a working engineer before shortlisting.',
          path: '/talent-sourcing',
        }),
        service({
          id: 'talent-sourcing',
          name: 'Tech Talent Sourcing & Staff Augmentation',
          description:
            'Sourcing, technical vetting and placement of AI, software, data, DevOps, design and engineering-leadership talent — permanent, contract, or a full embedded squad.',
          serviceType: 'Technical recruitment and staff augmentation',
          path: '/talent-sourcing',
          offers: engagements.map((e) => ({ name: `${e.name} — ${e.subtitle}`, description: e.line })),
        }),
        faqPage('/talent-sourcing', talentFaqs),
      ];

    case '/product-sourcing':
      return [
        service({
          id: 'product-sourcing',
          name: 'China Product Sourcing & Import Management',
          description:
            'Supplier search and verification, sample handling, price negotiation, quality inspection, private label and OEM production, freight and customs for goods manufactured in China.',
          serviceType: 'Product sourcing, supplier verification and import management',
          path: '/product-sourcing',
          offers: tradeModels.map((m) => ({ name: `${m.name} — ${m.subtitle}`, description: m.line })),
        }),
        faqPage('/product-sourcing', productFaqs),
      ];

    case '/pricing':
      return [
        servicePriceBand({
          id: 'managed-platform',
          name: 'Managed Platform Plans',
          description: 'Managed cloud infrastructure, CI/CD, monitoring, and support for deployed products.',
          path: '/pricing',
          currency: 'USD',
          unitText: 'MON',
          tiers: platformPlans.map((p) => ({ name: p.name, price: p.monthlyPrice, description: p.description })),
        }),
        servicePriceBand({
          id: 'engineering-retainer',
          name: 'Engineering Retainers',
          description: 'Ongoing engineering capacity with a contracted monthly hour allocation and response SLA.',
          path: '/pricing',
          currency: 'USD',
          unitText: 'MON',
          tiers: retainerPlans.map((p) => ({ name: p.name, price: p.price, description: p.description })),
        }),
        faqPage('/pricing', pricingFaqs),
      ];

    case '/hiring':
      return jobs.map((job) =>
        jobPosting({
          id: job.id,
          title: job.title,
          description: jobDescription(job),
          employmentType: job.type.toLowerCase() === 'internship' ? 'INTERN' : 'FULL_TIME',
          datePosted: job.datePosted,
          validThrough: job.validThrough,
          remote: job.location.toLowerCase().includes('remote'),
          countries: job.applicantCountries,
        })
      );

    default:
      return [];
  }
}
