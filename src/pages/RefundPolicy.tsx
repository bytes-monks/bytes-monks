import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    title: 'Overview',
    content:
      'Our work is custom and billed for time, so most of it cannot be undone. This policy says what we refund and what we don\'t.',
  },
  {
    title: 'Deposits',
    content:
      'Project deposits are not refunded. They pay for discovery, planning and the people we set aside before the main work starts.',
  },
  {
    title: 'Milestone Projects',
    content: [
      'A milestone you have approved is not refunded.',
      'Cancel mid-milestone and we invoice the work done up to that date.',
      'Anything prepaid beyond that is refunded within 14 business days.',
    ],
  },
  {
    title: 'Retainers',
    content: [
      'Retainers are billed in advance and not refunded once the month has started.',
      'Give 14 days\' written notice before the next billing date and you won\'t be charged for the following month.',
      'There are no partial-month refunds.',
    ],
  },
  {
    title: 'Platform Plans',
    content: [
      'Cancel within 48 hours of a new billing cycle and we refund that cycle in full.',
      'After that, the plan runs to the end of the paid period with no partial refund.',
    ],
  },
  {
    title: 'When We Refund',
    content: [
      'We failed to deliver the agreed scope and did not fix it within a reasonable time.',
      'We cancelled the project without cause.',
      'You paid twice by mistake. The duplicate is refunded in full within 5 business days.',
    ],
  },
  {
    title: 'Disputes',
    content:
      'Email contact@bytesmonks.com and tell us what went wrong. A conversation usually sorts it out. If it doesn\'t, both sides try mediation before going to court.',
  },
  {
    title: 'How to Ask',
    content:
      'Email contact@bytesmonks.com with the project name, invoice number and reason. We acknowledge within 2 business days and aim to settle within 10.',
  },
  {
    title: 'How You Get It Back',
    content:
      'Refunds go back to the original payment method, usually within 5 to 10 business days of approval depending on your bank.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may change this policy. Changes apply to projects signed after the change. Running projects keep the policy they signed under.',
  },
  {
    title: 'Contact',
    content: 'Billing questions: contact@bytesmonks.com.',
  },
];

export default function RefundPolicy() {
  return (
    <LegalLayout
      title="Refund Policy"
      subtitle="Legal"
      lastUpdated="September 15, 2026"
      sections={sections}
    />
  );
}
