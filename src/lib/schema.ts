// ─── JSON-LD builders ────────────────────────────────────────────────────────
// index.html carries the site-wide graph (Organization + WebSite) so that a
// crawler which never runs JS still sees it. Everything here is PAGE-level and
// is injected by <Seo /> — keep the two sets disjoint to avoid duplicate nodes.

import { SITE_NAME, SITE_URL, absoluteUrl } from './site';
import type { Crumb } from './site';

export type JsonLd = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function webPage(opts: {
  path: string;
  title: string;
  description: string;
  breadcrumb?: Crumb[];
}): JsonLd {
  const url = absoluteUrl(opts.path);
  const node: JsonLd = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  };
  if (opts.breadcrumb?.length) {
    node.breadcrumb = { '@id': `${url}#breadcrumb` };
  }
  return node;
}

export function breadcrumbList(path: string, crumbs: Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqPage(path: string, faqs: { q: string; a: string }[]): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function service(opts: {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  path: string;
  offers?: { name: string; description: string }[];
}): JsonLd {
  const node: JsonLd = {
    '@type': 'Service',
    '@id': `${SITE_URL}/#${opts.id}`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: absoluteUrl(opts.path),
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'Tunisia' },
      { '@type': 'Place', name: 'European Union' },
      { '@type': 'Place', name: 'Worldwide (remote)' },
    ],
  };
  if (opts.offers?.length) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: opts.name,
      itemListElement: opts.offers.map((o) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o.name, description: o.description },
      })),
    };
  }
  return node;
}

export function employmentAgency(opts: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    '@type': 'EmploymentAgency',
    '@id': `${SITE_URL}/#employmentagency`,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    parentOrganization: { '@id': ORG_ID },
    email: 'contact@bytesmonks.com',
    knowsAbout: [
      'Artificial intelligence engineering',
      'Machine learning engineering',
      'Software engineering',
      'Data engineering',
      'DevOps and site reliability engineering',
      'Technical recruiting',
    ],
    areaServed: [
      { '@type': 'Country', name: 'Tunisia' },
      { '@type': 'Place', name: 'European Union' },
      { '@type': 'Place', name: 'Worldwide (remote)' },
    ],
  };
}

/**
 * Google Jobs-eligible JobPosting. `datePosted` and `validThrough` must be real
 * ISO dates — a posting with a stale validThrough is dropped from the index.
 */
export function jobPosting(opts: {
  id: string;
  title: string;
  description: string;
  employmentType: string;
  datePosted: string;
  validThrough: string;
  remote?: boolean;
  countries?: string[];
}): JsonLd {
  const node: JsonLd = {
    '@type': 'JobPosting',
    '@id': `${SITE_URL}/hiring#${opts.id}`,
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted,
    validThrough: opts.validThrough,
    employmentType: opts.employmentType,
    // Repeat name/url alongside the @id: Google resolves cross-block @id
    // references inconsistently, and hiringOrganization.name is required.
    hiringOrganization: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    identifier: {
      '@type': 'PropertyValue',
      name: SITE_NAME,
      value: opts.id,
    },
    // directApply is false: the only application path is a mailto: link, not
    // an on-site form. Claiming otherwise misrepresents the flow to Google.
    directApply: false,
  };
  if (opts.remote && opts.countries?.length) {
    node.jobLocationType = 'TELECOMMUTE';
    node.applicantLocationRequirements = opts.countries.map((name) => ({
      '@type': 'Country',
      name,
    }));
  }
  return node;
}

/** A Service whose tiers are summarised as an AggregateOffer price band. */
export function servicePriceBand(opts: {
  id: string;
  name: string;
  description: string;
  path: string;
  currency: string;
  unitText: string;
  tiers: { name: string; price: number; description: string }[];
}): JsonLd {
  const prices = opts.tiers.map((t) => t.price);
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/#${opts.id}`,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': ORG_ID },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: opts.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: opts.tiers.length,
      offers: opts.tiers.map((t) => ({
        '@type': 'Offer',
        name: t.name,
        description: t.description,
        price: t.price,
        priceCurrency: opts.currency,
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: t.price,
          priceCurrency: opts.currency,
          unitText: opts.unitText,
        },
      })),
    },
  };
}

export function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export const SITE_LABEL = SITE_NAME;
