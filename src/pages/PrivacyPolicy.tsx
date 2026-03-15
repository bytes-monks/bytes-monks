import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    title: 'Introduction',
    content:
      'Bytes Monks ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it when you visit bytesmonks.com or engage our services.',
  },
  {
    title: 'Information We Collect',
    content: [
      'Contact information you provide via our contact form: name, email address, and project details.',
      'Analytics data collected via Google Analytics (only with your consent): pages visited, session duration, general location, and device type.',
      'Business information exchanged during a client engagement: company name, project requirements, and communications.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To respond to your enquiries and deliver the services you request.',
      'To send project updates, invoices, and relevant service communications.',
      'To analyse and improve website performance (analytics, with consent only).',
      'To comply with legal obligations.',
    ],
  },
  {
    title: 'Cookies & Analytics',
    content:
      'We use Google Analytics to understand how visitors interact with our website. This service uses cookies to collect anonymised usage data. Analytics cookies are only set after you have given explicit consent via our cookie banner. You may withdraw consent at any time by clearing your browser\'s localStorage or adjusting your browser settings.',
  },
  {
    title: 'Data Sharing',
    content:
      'We do not sell, rent, or trade your personal data. We may share data with trusted third-party service providers (e.g. Google Analytics, email providers) strictly to operate our business. These providers are contractually bound to handle your data securely and only as directed by us.',
  },
  {
    title: 'Data Retention',
    content:
      'Contact form submissions are retained for up to 2 years. Client project data is retained for 5 years after project completion for legal and accounting purposes. You may request deletion of your personal data at any time, subject to legal retention obligations.',
  },
  {
    title: 'Your Rights',
    content: [
      'Access – request a copy of the personal data we hold about you.',
      'Rectification – ask us to correct inaccurate data.',
      'Erasure – request deletion of your data where no legal obligation requires us to retain it.',
      'Restriction – ask us to limit processing of your data.',
      'Portability – receive your data in a structured, machine-readable format.',
      'Objection – object to processing based on our legitimate interests.',
    ],
  },
  {
    title: 'Data Security',
    content:
      'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All data transmissions to our website are encrypted via HTTPS.',
  },
  {
    title: 'Third-Party Links',
    content:
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.',
  },
  {
    title: 'Contact',
    content:
      'To exercise any of your rights or for questions about this Privacy Policy, email us at hello@bytesmonks.com.',
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Legal"
      lastUpdated="March 15, 2026"
      sections={sections}
    />
  );
}
