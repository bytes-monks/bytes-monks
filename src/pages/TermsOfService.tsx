import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    title: 'Acceptance of Terms',
    content:
      'Using any Bytes Monks ("we", "us") service means you accept these terms. If you don\'t, don\'t use the service.',
  },
  {
    title: 'Services',
    content:
      'We build software, AI systems, data pipelines and infrastructure. Scope, timeline and deliverables for each engagement live in a Statement of Work signed by both sides.',
  },
  {
    title: 'Client Responsibilities',
    content: [
      'Give us the information and feedback we need, on time.',
      'Make sure you own the rights to anything you hand us.',
      'Name one person who can approve decisions for you.',
      'Pay invoices on the agreed terms.',
    ],
  },
  {
    title: 'Intellectual Property',
    content:
      'Once the final invoice is paid, everything we built for you is yours. We keep our own tools, libraries and methods. We may list your project in our portfolio unless you ask us in writing not to.',
  },
  {
    title: 'Confidentiality',
    content:
      'Both sides keep the other\'s confidential information confidential, during the work and for three years after it ends.',
  },
  {
    title: 'Warranties & Liability',
    content:
      'We do the work with reasonable skill and care. Our total liability on any claim is capped at what you paid for the service the claim concerns. We are not liable for indirect or consequential losses.',
  },
  {
    title: 'Termination',
    content:
      'Either side can end an agreement with 14 days\' written notice. You pay for work done up to that date. We can suspend work immediately for non-payment or a serious breach.',
  },
  {
    title: 'Governing Law',
    content:
      'These terms follow the law where Bytes Monks is registered. We try to settle disputes by talking before either side goes to court.',
  },
  {
    title: 'Changes to Terms',
    content:
      'We may change these terms. We email active clients about material changes. Continuing to use the service after a change means you accept it.',
  },
  {
    title: 'Contact',
    content: 'Questions about these terms: contact@bytesmonks.com.',
  },
];

export default function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Legal"
      lastUpdated="March 15, 2026"
      sections={sections}
    />
  );
}
