// ─── The house's disciplines, named once ─────────────────────────────────────
// Both src/components/Services.tsx and src/data/talentSourcing.ts render these on the
// home page, so the Latin name and its English subtitle have to agree. Anything
// specific to one surface (an oath, a sourcing gloss) lives with that surface.

export interface Discipline {
  id: string;
  num: string;
  sigil: string;
  name: string;
  subtitle: string;
}

/** The four crafts the house practises itself. */
export const coreDisciplines: Discipline[] = [
  { id: 'intelligentia', num: 'I', sigil: '✚', name: 'Ars Intelligentia', subtitle: 'AI & Machine Learning' },
  { id: 'fabricandi', num: 'II', sigil: '⚜', name: 'Ars Fabricandi', subtitle: 'Custom Software Development' },
  { id: 'datarum', num: 'III', sigil: '❖', name: 'Ars Datarum', subtitle: 'Data Engineering' },
  { id: 'sustinendi', num: 'IV', sigil: '⁕', name: 'Ars Sustinendi', subtitle: 'DevOps & Scaling' },
];

/** Sourced but not practised in-house — the two crafts that steer the other four. */
export const steeringDisciplines: Discipline[] = [
  { id: 'formae', num: 'V', sigil: '◈', name: 'Ars Formae', subtitle: 'Product Design & UX' },
  { id: 'regendi', num: 'VI', sigil: '☘', name: 'Ars Regendi', subtitle: 'Product & Engineering Leadership' },
];

export const allDisciplines: Discipline[] = [...coreDisciplines, ...steeringDisciplines];
