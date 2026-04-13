import LegalLayout from '../components/LegalLayout';

const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white font-semibold">{children}</span>
);

const sections = [
  {
    title: 'Introduction',
    content:
      'Bytes Monks ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, who we share it with, and your rights in relation to it. It applies to all Bytes Monks digital properties, including our website (bytesmonks.com), our web applications, and our mobile applications published on the Google Play Store.',
  },
  {
    title: 'Scope — Products Covered',
    content: [
      <><P>bytesmonks.com</P> — our corporate website and contact portal.</>,
      <><P>Genify</P> (genify.bytesmonks.com) — a file conversion and AI content generation web app.</>,
      <><P>Form Temple</P> (formtemple.bytesmonks.com) — a serverless form backend and spam-protection web app.</>,
      <><P>Cosmo Eats Stars</P> (available on Google Play, package: com.bytesmonks.CosmoEatStar) — a one-touch arcade mobile game for Android.</>,
      'Any future Bytes Monks products or services will be governed by this policy unless a separate policy is published for them.',
    ],
  },
  {
    title: 'Information We Collect',
    content: [
      'Contact & account data: name, email address, and project details you submit via our contact form or when registering for a web app account.',
      <>Usage & analytics data (<P>web</P>): pages visited, session duration, general geographic location, device type, and referral source — collected via Google Analytics only with your explicit consent.</>,
      <>Usage & analytics data (<P>mobile — Cosmo Eats Stars</P>): gameplay session duration, scores, level progress, crash reports, and device model/OS version, collected to improve game stability and experience.</>,
      <>Advertising Identifier (<P>mobile</P>): the Android Advertising ID (GAID) may be collected by our advertising partner (Google AdMob) to serve contextually relevant ads within <P>Cosmo Eats Stars</P>. You can reset or opt out of personalised advertising at any time in your Android device settings under Privacy → Ads.</>,
      <>Form submission content (<P>Form Temple</P>): data submitted through forms you create or that end-users submit to forms powered by <P>Form Temple</P>. We process this data on your behalf as a data processor.</>,
      <>File content (<P>Genify</P>): files you upload for conversion are processed in memory to perform the requested conversion and are not stored beyond the duration of the operation unless you explicitly save them to your account.</>,
      'Payment data: we do not store payment card details. Transactions are handled by a PCI-DSS Level 1 certified payment provider. We receive only a transaction confirmation and invoice metadata.',
      'Business communications: emails, messages, and documents exchanged during a client engagement.',
    ],
  },
  {
    title: 'Mobile App Permissions (Cosmo Eats Stars)',
    content: [
      <><P>INTERNET</P> — required to display ads served by Google AdMob and to submit crash reports.</>,
      <><P>ACCESS_NETWORK_STATE</P> — used to detect connectivity before making network requests.</>,
      'No other sensitive permissions (camera, microphone, location, contacts, storage) are requested by this application.',
      'The app does not require account registration and does not collect names, email addresses, or any directly identifying information from players.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To respond to your enquiries and deliver the services you request.',
      'To operate and improve our web and mobile applications, including fixing bugs and optimising performance.',
      <>To display non-personalised or personalised advertisements within <P>Cosmo Eats Stars</P> via Google AdMob, subject to your ad-personalisation preference on your Android device.</>,
      'To send transactional communications: project updates, invoices, service notifications, and account-related emails.',
      'To analyse aggregate website and app performance metrics (with consent where required).',
      'To comply with applicable legal and regulatory obligations.',
    ],
  },
  {
    title: 'Advertising & Third-Party SDKs',
    content: (
      <>
        <P>Cosmo Eats Stars</P> uses Google AdMob (operated by Google LLC) to serve in-app advertisements. AdMob may collect and use the Android Advertising ID and certain device information to deliver ads. You can opt out of personalised ads by going to{' '}
        <span className="text-gray-300">Settings → Privacy → Ads</span> on your Android device and enabling "Opt out of Ads Personalisation". For more information on how Google uses data from apps that use AdMob, see google.com/policies/privacy/partners. Our AdMob publisher ID is <P>pub-3898970011871442</P>.
      </>
    ),
  },
  {
    title: 'Cookies & Web Analytics',
    content:
      'Our websites use Google Analytics to understand how visitors interact with our pages. This service uses cookies to collect anonymised usage data. Analytics cookies are only set after you have given explicit consent via our cookie consent banner. You may withdraw consent at any time by clearing your browser\'s localStorage or adjusting your browser settings. We do not use tracking cookies for advertising purposes on our websites.',
  },
  {
    title: 'Data Sharing',
    content: [
      'We do not sell, rent, or trade your personal data to third parties.',
      <>Google Analytics (Google LLC) — aggregated website usage analytics, used only with your consent.</>,
      <>Google AdMob (Google LLC) — in-app advertising within <P>Cosmo Eats Stars</P>; subject to Google's own Privacy Policy.</>,
      'Payment processors — transaction processing only; they receive no more data than is necessary to complete a payment.',
      'Cloud infrastructure providers — hosting and storage of application data under strict data-processing agreements.',
      'Legal authorities — where required by law, court order, or to protect the rights and safety of our users or the public.',
      'All third-party processors are contractually bound to handle your data securely and only as directed by us.',
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'Contact form submissions: retained for up to 2 years.',
      'Client project data: retained for 5 years after project completion for legal and accounting purposes.',
      <>Web app account data (<P>Genify</P>, <P>Form Temple</P>): retained for the duration of your account and for up to 1 year after account deletion, unless a legal obligation requires longer retention.</>,
      <><P>Cosmo Eats Stars</P>: aggregate and anonymised crash/analytics data is retained for up to 12 months. No personal player profile is stored on our servers.</>,
      <>Uploaded files (<P>Genify</P>): processed in-memory and not persisted beyond the session unless saved by the user.</>,
      'You may request deletion of your personal data at any time (see "Your Rights" below).',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Access — request a copy of the personal data we hold about you.',
      'Rectification — ask us to correct inaccurate or incomplete data.',
      'Erasure — request deletion of your data where no legal obligation requires us to retain it.',
      'Restriction — ask us to limit the processing of your data.',
      'Portability — receive your data in a structured, commonly used, machine-readable format.',
      'Objection — object to processing based on our legitimate interests.',
      'Withdraw consent — withdraw any consent you have given at any time without affecting the lawfulness of processing carried out before withdrawal.',
      'To exercise any of these rights, email contact@bytesmonks.com. We will respond within 30 days.',
    ],
  },
  {
    title: 'Account & Data Deletion',
    content: (
      <>
        If you have an account with any of our web apps (<P>Genify</P> or <P>Form Temple</P>), you may request deletion of your account and all associated personal data by emailing contact@bytesmonks.com with the subject line "Account Deletion Request". We will process your request within 14 business days and confirm deletion by email. For <P>Cosmo Eats Stars</P>, no account is created; no personal data is stored on our servers, so no deletion request is necessary beyond opting out of ad personalisation on your device.
      </>
    ),
  },
  {
    title: "Children's Privacy",
    content: [
      'Our corporate website and web applications (bytesmonks.com, Genify, Form Temple) are not directed at children under the age of 13 (or under 16 in the European Economic Area) and we do not knowingly collect personal data from children through those services.',
      <>
        <P>Cosmo Eats Stars</P> is a mixed-audience mobile game accessible to players of all ages.
        For that app we apply the strongest available protections to all users: child-directed
        treatment is enabled app-wide (preventing any persistent identifier or Advertising ID from
        being used for profiling), all advertisements are non-personalised and family-safe, and no
        personal data is collected from any player — child or adult. Full details are in the{' '}
        <P>Cosmo Eats Stars Privacy Policy</P> at bytesmonks.com/cosmo-eat-stars/privacy.
      </>,
      <>
        <P>COPPA (US):</P> We comply with the Children's Online Privacy Protection Act. We do not
        knowingly collect, use, or disclose personal information from children under 13 without
        verifiable parental consent. Because Cosmo Eats Stars collects no personal player data, no
        such consent mechanism is required for that app.
      </>,
      <>
        <P>GDPR-K (EEA):</P> We comply with Article 8 GDPR and applicable Member State legislation
        on children's data. For EEA users of Cosmo Eats Stars, the app also sets AdMob's
        tagForUnderAgeOfConsent flag, applying maximum data restrictions regardless of declared age.
      </>,
      'If you are a parent or guardian and believe your child has provided us with personal data through any Bytes Monks service, please contact us at contact@bytesmonks.com with the subject line "Child Data Deletion". We will investigate and, where data exists, delete it within 14 business days.',
    ],
  },
  {
    title: 'Data Security',
    content:
      'We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All data transmissions to our websites and web apps are encrypted via HTTPS/TLS. Our mobile app communicates exclusively over encrypted connections. Access to stored personal data is restricted to authorised personnel on a need-to-know basis.',
  },
  {
    title: 'International Data Transfers',
    content:
      'Your data may be processed in countries outside your own, including the United States, where our infrastructure and third-party service providers operate. Where we transfer data from the European Economic Area, we rely on appropriate safeguards such as Standard Contractual Clauses to ensure your data remains protected.',
  },
  {
    title: 'Third-Party Links',
    content:
      'Our website and applications may contain links to third-party websites or services (including the Google Play Store). We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies independently.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of the page and, where changes are material, notify you via email or an in-app notice. Continued use of our services after the effective date of the revised policy constitutes your acceptance of the changes.',
  },
  {
    title: 'Contact',
    content:
      'For any questions about this Privacy Policy, to exercise your rights, or to raise a privacy concern, please contact us at contact@bytesmonks.com. You also have the right to lodge a complaint with the data protection authority in your jurisdiction.',
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
