import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing or using any services provided by Bytes Monks ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
  },
  {
    title: 'Services',
    content:
      'Bytes Monks provides custom software development, AI/ML systems, data engineering, DevOps, and related digital services. The exact scope, timeline, and deliverables for each engagement are defined in a separate Statement of Work (SOW) or service agreement signed by both parties.',
  },
  {
    title: 'Client Responsibilities',
    content: [
      'Provide accurate, timely information and feedback required to deliver the agreed services.',
      'Ensure you hold the rights to any materials, assets, or data you supply to us.',
      'Designate a point of contact who has authority to approve decisions on your behalf.',
      'Pay invoices within the agreed payment terms.',
    ],
  },
  {
    title: 'Intellectual Property',
    content:
      'Upon receipt of full payment, all custom deliverables created specifically for you become your property. Bytes Monks retains ownership of pre-existing tools, frameworks, libraries, and methodologies used in the delivery of services. We reserve the right to reference your project in our portfolio unless you request otherwise in writing.',
  },
  {
    title: 'Confidentiality',
    content:
      'Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement. This obligation survives the termination of the service agreement for a period of three (3) years.',
  },
  {
    title: 'Warranties & Liability',
    content:
      'We warrant that services will be performed with reasonable skill and care. Our total liability for any claim arising from the services shall not exceed the fees paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.',
  },
  {
    title: 'Termination',
    content:
      'Either party may terminate a service agreement with 14 days written notice. You remain liable for payment of all work completed up to the termination date. Bytes Monks reserves the right to suspend services immediately for non-payment or material breach.',
  },
  {
    title: 'Governing Law',
    content:
      'These terms are governed by the laws of the jurisdiction in which Bytes Monks is registered. Any disputes shall be resolved through good-faith negotiation before pursuing formal legal remedies.',
  },
  {
    title: 'Changes to Terms',
    content:
      'We may update these Terms of Service from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated terms. We will notify active clients of material changes via email.',
  },
  {
    title: 'Contact',
    content:
      'For questions about these Terms of Service, contact us at contact@bytesmonks.com.',
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
