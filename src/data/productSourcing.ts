// ─── Ars Mercatoria · product sourcing and trade from China ──────────────────
//
// ⚠ OWNER — READ BEFORE THE FIRST CAMPAIGN.
// Nothing here states a figure the house cannot yet evidence: no supplier
// counts, no savings percentages, no lead times, no factory or client names,
// no testimonials. Every promise is a PROCESS the house controls, not an
// outcome that would need history to prove.
//
// But four of those processes need a capability you must confirm you have:
//
//   1. Inspection on the ground in China. `assay`, the proof band, the hero
//      panel and `theBalance` all depend on an inspector you can appoint —
//      your own person, or a contracted QC firm. If you cannot appoint one,
//      cut items 02-04 of `assay`, cut `theBalance`, and drop the inspection
//      door from the form.
//   2. Staged supplier payments with the balance released after inspection.
//      `theBalance` is false without this. Cut it rather than soften it.
//   3. A licensed customs broker at each destination you quote.
//      `handled` and the Via Tota model both state this as a service.
//   4. Importer of record for Via Tota — are you buying in your own name and
//      reselling, or acting as agent? This changes VAT, customs liability and
//      product-safety exposure. Settle it with an accountant.
//
// Also settle: the three figures in TERMS below; whether Ars Electrica is a
// category you will really take (CE / EMC / RoHS obligations follow it into
// the EU); and whether you will release supplier contacts (proof cell IV).

export const TERMS = {
  /** Flat fee for a one-off sourcing project. Set a number to publish it. */
  projectFee: null as number | null,
  /** Monthly retainer for ongoing sourcing. Set a number to publish it. */
  monthlyRetainer: null as number | null,
  /** Percentage of order value on the retainer model. */
  orderValuePercent: null as number | null,
  /** Percentage of landed cost on full import management. */
  landedCostPercent: null as number | null,
} as const;

/** Claims the page makes on the house's behalf. Confirm each before launch. */
export const capabilityClaims = [
  'We can appoint an inspector to walk a factory floor in China.',
  'Supplier payments are staged, with the balance released after inspection.',
  'We work with a licensed customs broker at each destination we quote.',
  'We hand over supplier contact details when a client asks.',
  'We do not source food, medicine, medical goods, or counterfeits.',
] as const;

// ─── What we source ──────────────────────────────────────────────────────────

export interface Category {
  id: string;
  num: string;
  sigil: string;
  name: string;
  subtitle: string;
  gloss: string;
}

export const categories: Category[] = [
  { id: 'domestica', num: 'I', sigil: '✜', name: 'Ars Domestica', subtitle: 'Home & Kitchen', gloss: 'Housewares, storage, small kitchen tools.' },
  { id: 'textoria', num: 'II', sigil: '❋', name: 'Ars Textoria', subtitle: 'Textiles & Apparel', gloss: 'Workwear, bags, caps, plain garments.' },
  { id: 'electrica', num: 'III', sigil: '❈', name: 'Ars Electrica', subtitle: 'Electronics & Accessories', gloss: 'Cables, chargers, lighting, small devices.' },
  { id: 'ferramenti', num: 'IV', sigil: '✧', name: 'Ars Ferramenti', subtitle: 'Tools & Hardware', gloss: 'Hand tools, fittings, fasteners, spares.' },
  { id: 'involvendi', num: 'V', sigil: '⊛', name: 'Ars Involvendi', subtitle: 'Packaging & Print', gloss: 'Boxes, labels, pouches, printed inserts.' },
  { id: 'signandi', num: 'VI', sigil: '⁑', name: 'Ars Signandi', subtitle: 'Branded & Promotional', gloss: 'Merch, gifts, giveaways with your mark.' },
];

// ─── The Passage: brief to delivered goods ───────────────────────────────────

export const passage = [
  {
    num: 'I', title: 'Definiamus', en: 'We define',
    body: 'We write the product down before we go looking for it.',
    practice: 'Spec sheet · target price · quantity',
  },
  {
    num: 'II', title: 'Inveniamus', en: 'We find',
    body: 'We shortlist factories that make the thing, not desks that resell it.',
    practice: 'Supplier search · business licence · references',
  },
  {
    num: 'III', title: 'Temptemus', en: 'We try',
    body: 'Samples come to us first, then to you with our notes.',
    practice: 'Samples · photos · written notes',
  },
  {
    num: 'IV', title: 'Pangamus', en: 'We settle terms',
    body: 'We agree price, MOQ, lead time and payment stages in writing.',
    practice: 'Quote · Incoterms · staged payments',
  },
  {
    num: 'V', title: 'Inspiciamus', en: 'We inspect',
    body: 'Someone checks the goods against the approved sample before they ship.',
    practice: 'Pre-shipment QC · report · photos',
  },
  {
    num: 'VI', title: 'Mittamus', en: 'We ship',
    body: 'We book the freight, clear customs, and tell you where the boxes are.',
    practice: 'Air or sea · customs · delivery',
  },
];

// ─── The Assay: quality control ──────────────────────────────────────────────

export const assay = [
  { t: 'The spec is written first', d: 'Colour, material, tolerance and packaging are agreed on paper before production starts.' },
  { t: 'One golden sample, kept', d: 'We hold the sample you approved and check the run against it.' },
  { t: 'Eyes on the line', d: 'An inspector we appoint walks the floor and sends dated photos we can trace.' },
  { t: 'Checked before the balance is paid', d: 'Inspection happens while the supplier still has money to collect from you.' },
  { t: 'Papers read, not assumed', d: 'Test reports, certificates and HS codes are reviewed before anything is booked.' },
];

// ─── The Refusals ────────────────────────────────────────────────────────────
// Cheap, honest credibility for a house with no track record yet. Adjust the
// list to your actual licences — do not delete an item to widen the offer.

export const refusals = [
  { t: 'Counterfeits and lookalikes', d: 'No branded copies, no “same factory as” goods, no exceptions.' },
  { t: 'Anything you eat, drink or take', d: 'Food, supplements and medical goods need licences we do not hold.' },
  { t: 'Orders priced below the spec', d: 'If the target price cannot make the sample, we say so instead of finding a worse factory.' },
  { t: 'Suppliers we cannot verify', d: 'No licence, no address, no order.' },
];

// ─── What we handle ──────────────────────────────────────────────────────────

export const handled: { t: string; d: string }[] = [
  { t: 'Supplier search', d: 'We find factories that make your product, and check they exist.' },
  { t: 'Factory audit', d: 'Licence, capacity, and a walk through the floor before you commit.' },
  { t: 'Sample handling', d: 'Samples come to us, get opened, and reach you with notes.' },
  { t: 'Price negotiation', d: 'We negotiate unit price, MOQ and payment stages in your name.' },
  { t: 'QC inspection', d: 'Goods checked against the approved sample before the balance is paid.' },
  { t: 'Private label / OEM', d: 'Your brand, your packaging, artwork proofed before production.' },
  { t: 'Freight and customs', d: 'We book the shipment and clear it with a licensed broker.' },
  { t: 'After-sales', d: 'If a carton is wrong, we chase the supplier for a fix or a credit.' },
];

// ─── Terms of Engagement ─────────────────────────────────────────────────────

export interface TradeModel {
  num: string;
  name: string;
  subtitle: string;
  line: string;
  includes: string[];
  price: string;
  bestFor: string;
  highlight: boolean;
}

export const tradeModels: TradeModel[] = [
  {
    num: 'I', name: 'Expeditio', subtitle: 'One-Off Sourcing Project', highlight: false,
    line: 'One product, found, sampled, inspected and shipped once.',
    includes: [
      'Written spec and a target price agreed up front',
      'Supplier search with a shortlist and our reasons',
      'Samples handled, opened and sent on with notes',
      'Price and payment stages negotiated in your name',
      'Pre-shipment inspection with photos before the balance',
    ],
    price: TERMS.projectFee
      ? `A flat fee of ${TERMS.projectFee} per project · agreed before we contact anyone`
      : 'A flat fee per project · agreed before we contact anyone',
    bestFor: 'A first import, or one product you need done properly.',
  },
  {
    num: 'II', name: 'Mercatura Continua', subtitle: 'Ongoing Sourcing Retainer', highlight: true,
    line: 'A standing desk in China for a catalogue that keeps moving.',
    includes: [
      'Repeat orders placed and tracked without a new brief each time',
      'New products sourced as your range grows',
      'Supplier relationships held and renegotiated for you',
      'Inspection on every shipment, not on the big ones only',
      'One monthly report on orders, costs and what slipped',
    ],
    price: 'A monthly retainer · plus a percentage of order value',
    bestFor: 'Shops and brands reordering month after month.',
  },
  {
    num: 'III', name: 'Via Tota', subtitle: 'Full Import Management', highlight: false,
    line: 'You approve the sample. We do the rest, to your door.',
    includes: [
      'Sourcing, negotiation and ordering handled end to end',
      'Payments staged and released against inspection',
      'Freight booked, insured and tracked',
      'Customs cleared at destination with a licensed broker',
      'One invoice showing the landed cost of each line',
    ],
    price: 'A percentage of landed cost · quoted per shipment',
    bestFor: 'Buyers who want boxes, not a shipping education.',
  },
];

// ─── The Balance ─────────────────────────────────────────────────────────────
// A mechanism, not an outcome — true without any track record, and false
// without staged supplier terms. Cut it rather than soften it.

export const theBalance = {
  eyebrow: 'The Balance',
  plain: 'We inspect while the money is',
  accent: 'still ours to hold.',
  body: 'Payment is staged. The last stage is released after inspection, not before.',
  micro: 'Written into the engagement letter. Not a handshake.',
};

// ─── FAQ — also the source of the FAQPage JSON-LD ────────────────────────────
// Answers front-load the direct answer in sentence one, then stop.

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'How do I find a supplier in China?',
    a: 'Start with a written spec, then shortlist factories instead of replying to the first seller who answers. We run that search for you and tell you which of them actually makes the product.',
  },
  {
    q: 'What does a sourcing agent charge?',
    a: 'Usually either a flat fee per project or a percentage of order value. We quote ours against your brief, in writing, before we contact a single supplier.',
  },
  {
    q: 'Is Alibaba safe?',
    a: 'Alibaba is a directory, not a guarantee. Trade Assurance helps with payment, but it will not tell you whether the seller owns a factory or just a phone.',
  },
  {
    q: 'What is MOQ?',
    a: 'MOQ is the minimum order quantity a factory will accept. It is often negotiable early on, especially if you take a stock colour or a longer lead time.',
  },
  {
    q: 'Who pays for samples?',
    a: 'You do, courier included, in almost every case. Many factories credit the sample cost against a first order, and we ask for that in writing.',
  },
  {
    q: 'What are Incoterms?',
    a: 'Incoterms say where the seller’s job ends and yours begins. EXW and FOB leave the freight to you, while DDP means the price already covers delivery and duty.',
  },
  {
    q: 'How do I avoid being scammed by a Chinese supplier?',
    a: 'Check the business licence, pay in stages, and inspect the goods before you release the balance. Never send the full amount up front, and never to a personal account.',
  },
  {
    q: 'What is the difference between a factory and a trading company?',
    a: 'A factory makes the product; a trading company buys it and resells it to you. Trading companies are not always the wrong answer, but you should know which one you are paying.',
  },
  {
    q: 'How long does it take to get products from China?',
    a: 'It depends on the product, the tooling and the time of year. We get the lead time from the supplier in writing and tell you what could push it.',
  },
  {
    q: 'Can you put my brand on the product?',
    a: 'Yes. That runs from a printed logo through to your own packaging and full private label, and artwork is proofed before production starts.',
  },
  {
    q: 'Do you handle shipping and customs?',
    a: 'Yes. We book air or sea freight and clear it at destination with a licensed broker, then hand you one invoice showing the landed cost.',
  },
  {
    q: 'Can you inspect a supplier I already found?',
    a: 'Yes, and that is often the cheapest place to start. Send us the supplier and the order, and we will come back with what an inspection covers and what it costs.',
  },
];

// ─── Proof band — qualitative, no figures ────────────────────────────────────

export const proof = [
  { k: 'I', t: 'Inspected before you pay', d: 'Goods are checked while the supplier still wants the balance.' },
  { k: 'II', t: 'Photos we took ourselves', d: 'Dated pictures from the line, not the seller’s catalogue.' },
  { k: 'III', t: 'One landed cost, not three', d: 'Unit price, freight and duty quoted as one number.' },
  { k: 'IV', t: 'The supplier is yours', d: 'We hand over the contact whenever you ask for it.' },
];
