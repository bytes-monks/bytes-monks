import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    title: 'Overview',
    content:
      'At Bytes Monks, we take pride in the quality of our work. Because our services are custom and time-based, our refund policy is designed to be fair to both parties while protecting the investment of time and resources committed to each project.',
  },
  {
    title: 'Deposits & Upfront Payments',
    content:
      'Deposits paid to initiate a project are non-refundable. The deposit covers initial discovery, planning, resource allocation, and kickoff work performed before the main engagement begins.',
  },
  {
    title: 'Milestone-Based Projects',
    content: [
      'Payments made for a completed and approved milestone are non-refundable.',
      'If you cancel before a milestone is complete, you will be invoiced for the proportional work completed up to the cancellation date.',
      'Any unused portion of a prepaid milestone payment will be refunded within 14 business days, minus the value of work already delivered.',
    ],
  },
  {
    title: 'Retainer & Subscription Services',
    content: [
      'Monthly retainers are billed in advance and are non-refundable once the billing cycle has started.',
      'You may cancel a retainer with 14 days written notice before the next billing cycle to avoid being charged for the following period.',
      'No partial-month refunds are issued for early cancellation within an active billing cycle.',
    ],
  },
  {
    title: 'Eligibility for Refund',
    content: [
      'Bytes Monks has materially failed to deliver the agreed scope of work after a reasonable cure period.',
      'The project was cancelled by Bytes Monks without cause.',
      'A duplicate payment was made — the duplicate amount will be refunded in full within 5 business days.',
    ],
  },
  {
    title: 'Dispute Resolution',
    content:
      'Before requesting a refund, we encourage clients to contact us at hello@bytesmonks.com to discuss concerns. Most issues can be resolved through open communication. If a resolution cannot be reached, both parties agree to attempt mediation before pursuing formal legal action.',
  },
  {
    title: 'How to Request a Refund',
    content:
      'Send a written refund request to hello@bytesmonks.com with your project name, invoice number, and reason for the request. We will acknowledge your request within 2 business days and aim to resolve it within 10 business days.',
  },
  {
    title: 'Refund Method',
    content:
      'Approved refunds will be returned via the original payment method. Processing time may vary depending on your bank or payment provider (typically 5–10 business days after approval).',
  },
  {
    title: 'Changes to This Policy',
    content:
      'Bytes Monks reserves the right to update this Refund Policy at any time. Changes take effect for new projects signed after the updated policy date. Active projects remain governed by the policy in place at the time the contract was signed.',
  },
  {
    title: 'Contact',
    content:
      'For refund enquiries or billing questions, reach us at hello@bytesmonks.com.',
  },
];

export default function RefundPolicy() {
  return (
    <LegalLayout
      title="Refund Policy"
      subtitle="Legal"
      lastUpdated="March 15, 2026"
      sections={sections}
    />
  );
}
