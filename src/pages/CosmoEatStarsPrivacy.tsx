import LegalLayout from '../components/LegalLayout';

const P = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{children}</span>
);

const sections = [
  {
    title: 'Introduction',
    content: (
      <>
        This policy covers <P>Cosmo Eats Stars</P> (Google Play package <P>com.bytesmonks.CosmoEatStar</P>), an
        arcade game by <P>Bytes Monks</P> ("we", "us"). It says what the game collects, how that is used, and
        what you, or a parent on a child's behalf, can ask us to do. Playing the game means you accept it.
      </>
    ),
  },
  {
    title: 'The Game and Its Audience',
    content: [
      <><P>Cosmo Eats Stars</P> is rated <P>Everyone</P> on Google Play and made for players of all ages, children included.</>,
      'There is no account, no sign-in, and nothing to type in to play.',
      <>Because children can play, the game is in the <P>Google Play Families programme</P>, and everything below is built to meet its rules and children's privacy law.</>,
    ],
  },
  {
    title: 'What We Collect',
    content: [
      <><P>No personal data.</P> We collect no names, emails, phone numbers, birthdays, precise location, photos, or anything else that identifies a player.</>,
      <><P>Anonymous gameplay data.</P> Session length, level progress and crash reports, used only to keep the game stable. None of it can identify anyone.</>,
      <><P>Device signals, read by AdMob.</P> Device model, OS version, IP address and country, used to detect fraud and serve one ad. Because child-directed treatment is on (see Advertising), AdMob does not use the Advertising ID or any persistent identifier to track or profile players.</>,
    ],
  },
  {
    title: 'Advertising — Google AdMob',
    content: [
      <>Ads come from <P>Google AdMob (Google LLC)</P>, publisher ID <P>pub-3898970011871442</P>.</>,
      <><P>Child-directed treatment is on for everyone.</P> The app sets <P>tagForChildDirectedTreatment(true)</P>, so AdMob does not use the Advertising ID or cookies for targeting, and serves only non-personalised, family-safe ads. No player, adult or child, gets behavioural ads.</>,
      <><P>EEA players.</P> The app also sets <P>tagForUnderAgeOfConsent(true)</P>, so AdMob applies its strictest rules regardless of declared age.</>,
      <><P>Family-safe content only.</P> Gambling, alcohol, adult and violent ad categories are blocked at the publisher level.</>,
      <><P>Certified SDKs only.</P> Every ad SDK and mediation network in the app is certified under the Google Play Families Self-Certified Ads SDK programme.</>,
      <>How Google handles child-directed data: <P>families.google.com/familylink/privacy/child-policy</P> and <P>google.com/policies/privacy/partners</P>.</>,
    ],
  },
  {
    title: 'How Ads Appear',
    content: [
      <><P>Labelled.</P> Every ad carries a visible "Ad" or "Advertisement" label.</>,
      <><P>Separate from the game.</P> Ads sit in bordered containers on a contrasting background. Nothing in an ad is styled to look like a star, obstacle, button or other game element.</>,
      <><P>Not in the way.</P> Ads never cover the play area or controls, and never appear at moments that invite accidental taps.</>,
      <><P>Interstitials close.</P> Full-screen ads show only between sessions, never mid-level, and always have a visible close button.</>,
      <><P>Purchases go through Google Play.</P> Any in-app offer uses the standard Google Play billing screen, with Google's own parental approval, never a custom prompt styled like the game.</>,
    ],
  },
  {
    title: 'App Permissions',
    content: [
      <><P>INTERNET</P> — to load ads and send anonymous crash reports.</>,
      <><P>ACCESS_NETWORK_STATE</P> — to check for a connection before trying.</>,
      'Nothing else. No camera, microphone, location, contacts, storage or phone state.',
    ],
  },
  {
    title: "Children's Privacy — COPPA, GDPR-K, Google Play Families",
    content: [
      'We treat every player as if they might be a child and apply the strongest protections to all of them.',
      'We do not collect, and have no way to collect, personal information from children under 13 (US, COPPA) or under 16 (EEA, GDPR Article 8). That includes names, contact details, precise location, photos, persistent identifiers and biometrics.',
      'No child is profiled or shown personalised ads. No child data is shared with anyone for advertising, analytics or any commercial purpose beyond serving one non-personalised ad.',
      'We comply with COPPA (15 U.S.C. § 6501 et seq. and 16 CFR Part 312) and with GDPR Article 8 and the Member State laws that implement it.',
    ],
  },
  {
    title: 'Parents and Guardians',
    content: [
      <><P>Ask what we hold.</P> Email <P>contact@bytesmonks.com</P>. Because there are no player profiles, the answer is almost always nothing.</>,
      <><P>Ask us to delete.</P> If you think we collected something about your child, email us with the subject <P>"Cosmo Eats Stars — Child Data Deletion"</P>. We investigate, delete anything we find within <P>14 business days</P>, and confirm by email.</>,
      <><P>Stop the device signals.</P> We collect no personal data, so there is nothing to opt out of on our side. To stop AdMob reading device signals, block ad traffic in your device or parental-control settings, or uninstall the game.</>,
      <><P>Google Family Link</P> lets you approve, review and remove apps on a child's device.</>,
      <><P>Response time.</P> We acknowledge parental enquiries within <P>5 business days</P> and resolve them within <P>30 days</P>.</>,
    ],
  },
  {
    title: 'Who We Share It With',
    content: [
      "We do not sell, rent or trade player data, children's or anyone's.",
      <><P>Google AdMob</P> — minimal device signals to serve one non-personalised, family-safe ad. No Advertising ID or persistent identifier under child-directed treatment. Governed by Google's privacy policy and its COPPA safe-harbor certification.</>,
      <><P>Crash reporting</P> — anonymous crash logs with no personal data.</>,
      'Authorities — if the law, a court order, or someone\'s safety requires it.',
    ],
  },
  {
    title: 'How Long We Keep It',
    content: [
      'We keep no player profiles on our servers.',
      'Anonymous crash and performance data is kept for up to 12 months.',
      <>What AdMob holds under child-directed treatment follows Google's restricted retention rules at <P>families.google.com/familylink/privacy/child-policy</P>.</>,
    ],
  },
  {
    title: 'Your Rights (All Players)',
    content: [
      <><P>Stop ads loading.</P> Ads are already non-personalised. To block them entirely, use a network-level blocker or uninstall the game.</>,
      <><P>Reset your Advertising ID.</P> <P>Settings → Privacy → Ads → "Reset advertising ID"</P>. This app doesn't use it, but other apps do.</>,
      <><P>Delete data held by Google.</P> We hold no profiles. For AdMob's side, use <P>myaccount.google.com</P> or contact Google.</>,
      <><P>Contact us.</P> Email <P>contact@bytesmonks.com</P> with the subject <P>"Cosmo Eats Stars – Privacy"</P>. We answer within 30 days, parents within 5 business days.</>,
    ],
  },
  {
    title: 'Security',
    content:
      'All traffic between the game and AdMob or crash reporting is encrypted with HTTPS/TLS. We protect the little data we handle with appropriate technical and organisational measures.',
  },
  {
    title: 'International Transfers',
    content:
      'Device data may be processed outside your country, including in the United States by Google LLC. Google uses Standard Contractual Clauses for data leaving the EEA and applies its strictest rules to child-directed requests everywhere.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'When the app, our ad partners or the law change, we update this page and the date at the top. Parents, check back now and then. Continuing to play after a change means you accept it.',
  },
  {
    title: 'Contact',
    content: (
      <>
        Privacy questions, or to exercise your or your child's rights: <P>contact@bytesmonks.com</P>.
        <br />
        <br />
        US parents can also read about COPPA rights at ftc.gov. EEA residents can complain to the data
        protection authority in their Member State.
        <br />
        <br />
        <span className="mono" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
          Developer: Bytes Monks · bytesmonks.com · App package: com.bytesmonks.CosmoEatStar ·
          AdMob publisher: pub-3898970011871442
        </span>
      </>
    ),
  },
];

export default function CosmoEatStarsPrivacy() {
  return (
    <LegalLayout
      title="Cosmo Eats Stars — Privacy Policy"
      subtitle="Mobile App"
      lastUpdated="April 13, 2026"
      sections={sections}
    />
  );
}
