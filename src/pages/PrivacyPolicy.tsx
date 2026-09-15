import LegalLayout from '../components/LegalLayout';

const P = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{children}</span>
);

const sections = [
  {
    title: 'Introduction',
    content:
      'This policy explains what Bytes Monks ("we", "us") collects, why, who sees it, and what you can ask us to do with it. It covers bytesmonks.com, our web apps, and our Android apps on Google Play.',
  },
  {
    title: 'What This Covers',
    content: [
      <><P>bytesmonks.com</P> — our website and contact form.</>,
      <><P>Genify</P> (genify.bytesmonks.com) — file conversion and AI content generation.</>,
      <><P>Form Temple</P> (formtemple.bytesmonks.com) — a form backend with spam protection.</>,
      <><P>Cosmo Eats Stars</P> (Google Play, com.bytesmonks.CosmoEatStar) — an arcade game for Android.</>,
      'New products fall under this policy unless we publish a separate one.',
    ],
  },
  {
    title: 'What We Collect',
    content: [
      'Contact and account data: your name, email, and whatever you write in the contact form or when you open a web app account.',
      'Web analytics: pages visited, time on site, rough location, device type and referrer, through Google Analytics and only after you accept cookies.',
      <>Game analytics (<P>Cosmo Eats Stars</P>): session length, scores, level progress, crash reports, device model and OS version.</>,
      <>Advertising ID (<P>Cosmo Eats Stars</P>): Google AdMob may read the Android Advertising ID to serve ads. You can reset it or opt out under Settings → Privacy → Ads on your device.</>,
      <>Form submissions (<P>Form Temple</P>): whatever people submit to forms you build. We process it on your behalf as a data processor.</>,
      <>Uploaded files (<P>Genify</P>): processed in memory for the conversion and discarded afterwards, unless you save them to your account.</>,
      'Payment data: we never see your card number. A PCI-DSS Level 1 payment provider handles it and sends us a confirmation and invoice details.',
      'Emails and documents exchanged during a client project.',
    ],
  },
  {
    title: 'Mobile App Permissions (Cosmo Eats Stars)',
    content: [
      <><P>INTERNET</P> — to load ads and send crash reports.</>,
      <><P>ACCESS_NETWORK_STATE</P> — to check for a connection before trying.</>,
      'Nothing else. No camera, microphone, location, contacts or storage.',
      'The game has no accounts and asks players for no names, emails or other identifying details.',
    ],
  },
  {
    title: 'How We Use It',
    content: [
      'To answer you and do the work you asked for.',
      'To run and fix our apps.',
      <>To show ads in <P>Cosmo Eats Stars</P> through Google AdMob, within your device's ad settings.</>,
      'To send invoices, project updates and account emails.',
      'To see how the site and apps perform overall, with consent where the law requires it.',
      'To meet legal obligations.',
    ],
  },
  {
    title: 'Advertising',
    content: (
      <>
        <P>Cosmo Eats Stars</P> shows ads from Google AdMob (Google LLC), publisher ID <P>pub-3898970011871442</P>.
        AdMob may use the Android Advertising ID and device details to serve them. To opt out of personalised
        ads, open <P>Settings → Privacy → Ads</P> on your device. Google explains its side at
        google.com/policies/privacy/partners.
      </>
    ),
  },
  {
    title: 'Cookies',
    content:
      'Our sites use Google Analytics, which sets cookies to measure anonymised usage. They are only set after you click accept on the cookie banner. To withdraw, clear your browser\'s site data for bytesmonks.com. We set no advertising cookies on our sites.',
  },
  {
    title: 'Who We Share It With',
    content: [
      'We don\'t sell, rent or trade your personal data.',
      'Google Analytics — aggregated site usage, only with your consent.',
      <>Google AdMob — ads in <P>Cosmo Eats Stars</P>, under Google's privacy policy.</>,
      'Payment processors — only what is needed to take the payment.',
      'Cloud hosting providers — under data-processing agreements.',
      'Authorities — when the law, a court order, or someone\'s safety requires it.',
      'Every processor is bound by contract to handle your data securely and only on our instructions.',
    ],
  },
  {
    title: 'How Long We Keep It',
    content: [
      'Contact form submissions: up to 2 years.',
      'Client project data: 5 years after the project ends, for accounting and legal reasons.',
      <>Web app accounts (<P>Genify</P>, <P>Form Temple</P>): while the account is open and up to 1 year after deletion, unless the law requires longer.</>,
      <><P>Cosmo Eats Stars</P>: anonymised crash and analytics data for up to 12 months. We keep no player profiles.</>,
      <>Uploaded files (<P>Genify</P>): not kept after the conversion unless you save them.</>,
      'You can ask us to delete your data at any time. See "Your Rights".',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Access — a copy of what we hold about you.',
      'Correction — fix anything wrong or incomplete.',
      'Deletion — unless the law requires us to keep it.',
      'Restriction — limit how we process it.',
      'Portability — your data in a common machine-readable format.',
      'Objection — to processing based on our legitimate interests.',
      'Withdraw consent — at any time, without affecting what was lawfully done before.',
      'Email contact@bytesmonks.com. We answer within 30 days.',
    ],
  },
  {
    title: 'Deleting Your Account',
    content: (
      <>
        To delete a <P>Genify</P> or <P>Form Temple</P> account and its data, email contact@bytesmonks.com with the
        subject "Account Deletion Request". We do it within 14 business days and confirm by email.{' '}
        <P>Cosmo Eats Stars</P> has no accounts and stores no personal data on our servers, so there is nothing to
        delete beyond opting out of ad personalisation on your device.
      </>
    ),
  },
  {
    title: "Children's Privacy",
    content: [
      'bytesmonks.com, Genify and Form Temple are not for children under 13 (under 16 in the EEA). We do not knowingly collect their data.',
      <>
        <P>Cosmo Eats Stars</P> is open to all ages, so we treat every player as if they might be a child.
        Child-directed treatment is on for the whole app, no Advertising ID or persistent identifier is used
        for profiling, all ads are non-personalised and family-safe, and no personal data is collected from
        anyone. Full details are in the <P>Cosmo Eats Stars Privacy Policy</P> at
        bytesmonks.com/cosmo-eat-stars/privacy.
      </>,
      <>
        <P>COPPA (US):</P> we do not knowingly collect personal information from children under 13 without
        verifiable parental consent. Cosmo Eats Stars collects none, so no consent flow is needed.
      </>,
      <>
        <P>GDPR Article 8 (EEA):</P> for EEA players the game also sets AdMob's tagForUnderAgeOfConsent flag,
        applying the strictest data rules regardless of age.
      </>,
      'If you think your child has given us personal data, email contact@bytesmonks.com with the subject "Child Data Deletion". We investigate and delete anything we find within 14 business days.',
    ],
  },
  {
    title: 'Security',
    content:
      'Everything between you and our sites and apps travels over HTTPS/TLS. Stored personal data is only reachable by the people who need it for their work.',
  },
  {
    title: 'International Transfers',
    content:
      'Your data may be processed outside your country, including in the United States where some of our providers run. For transfers out of the EEA we rely on Standard Contractual Clauses.',
  },
  {
    title: 'Links to Other Sites',
    content:
      'Our sites link to other services, including Google Play. Their privacy practices are their own.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'When we change this policy we update the date at the top. For material changes we also email you or show a notice in the app. Using our services after that date means you accept the change.',
  },
  {
    title: 'Contact',
    content:
      'Privacy questions or requests: contact@bytesmonks.com. You can also complain to your local data protection authority.',
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Legal"
      lastUpdated="April 9, 2026"
      sections={sections}
    />
  );
}
