// Billing and engagement FAQ. Rendered by src/pages/Pricing.tsx and emitted
// as FAQPage structured data by src/lib/pageSchema.ts.

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  { q: 'How does billing work?', a: 'Monthly or annually, in advance. A tax-compliant invoice lands in your inbox after each payment.' },
  { q: 'Can I switch plans at any time?', a: 'Yes, from your billing dashboard. Upgrades apply immediately and are prorated for the rest of the cycle; downgrades start on the next one.' },
  { q: 'Is there a free trial?', a: "Yes, on the Growth plan: 14 days, no credit card. Retainers have no trial, but you can cancel with 14 days' notice before your next billing date." },
  { q: 'What is your refund policy?', a: 'Cancel a platform plan within 48 hours of a new billing cycle and we refund that cycle in full. After that, the period runs out with no partial refund. Details are in the Refund Policy.' },
  { q: 'Who handles my payment data?', a: 'A PCI-DSS Level 1 payment provider. We never see or store your card number.' },
  { q: 'Are prices inclusive of tax?', a: 'No. Your local tax is added at checkout, before you confirm.' },
  { q: 'Can I cancel at any time?', a: 'Yes. Platform plans cancel from the billing dashboard and access runs to the end of the paid period. Retainers need 14 days written notice before the next billing date.' },
  { q: 'Do you offer custom enterprise pricing?', a: 'Yes. Email contact@bytesmonks.com about large teams, custom infrastructure, or multi-year contracts.' },
];
