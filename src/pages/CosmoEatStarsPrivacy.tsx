import LegalLayout from '../components/LegalLayout';

const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white font-semibold">{children}</span>
);

const sections = [
  {
    title: 'Introduction',
    content: (
      <>
        This Privacy Policy applies exclusively to <P>Cosmo Eats Stars</P> (Google Play package:{' '}
        <P>com.bytesmonks.CosmoEatStar</P>), a one-touch arcade mobile game developed and published
        by <P>Bytes Monks</P> ("we", "us", "our"). This policy explains what information is
        collected, how it is used, and your rights as a player. By downloading or playing Cosmo Eats
        Stars you agree to the practices described herein.
      </>
    ),
  },
  {
    title: 'About the Game',
    content: [
      <>
        <P>Cosmo Eats Stars</P> is a casual arcade game rated for <P>Everyone</P> on Google Play.
        The game involves guiding a character to eat falling stars while avoiding obstacles.
      </>,
      'The game does not require account registration, sign-in, or any personally identifying information to play.',
      'The game is designed to be enjoyable for all age groups and complies with the Google Play Families Policy.',
    ],
  },
  {
    title: 'Information We Collect',
    content: [
      <>
        <P>No personal data collected by us:</P> We do not collect your name, email address, phone
        number, or any other directly identifying information.
      </>,
      <>
        <P>Gameplay analytics:</P> Anonymised data such as session duration, level progress, and
        crash reports may be collected to improve game stability and performance. This data cannot be
        used to identify you personally.
      </>,
      <>
        <P>Android Advertising ID (GAID):</P> Our advertising partner Google AdMob may read the
        Android Advertising ID on your device to deliver advertisements. You can reset or opt out of
        ad personalisation at any time in{' '}
        <span className="text-gray-300">Settings → Privacy → Ads</span> on your Android device.
      </>,
      <>
        <P>Device information:</P> AdMob may collect device model, OS version, IP address, and
        general location (country/region) for the purpose of serving appropriate ads and detecting
        fraud.
      </>,
    ],
  },
  {
    title: 'Advertising — Google AdMob',
    content: (
      <>
        <P>Cosmo Eats Stars</P> displays advertisements served by{' '}
        <P>Google AdMob (Google LLC)</P>. Our AdMob publisher ID is{' '}
        <P>pub-3898970011871442</P>. AdMob is configured to serve{' '}
        <P>family-safe, non-personalised ads</P> by default, consistent with the Google Play
        Families Policy. You may opt into personalised ads by adjusting your Android device's
        ad-personalisation setting. For details on how Google uses data from apps using AdMob, see
        google.com/policies/privacy/partners.
      </>
    ),
  },
  {
    title: 'Ad Format & Families Policy Compliance',
    content: [
      <>
        <P>Clearly labelled advertisements:</P> Every advertisement displayed within Cosmo Eats
        Stars is visually and textually distinct from game content. All ad units carry a visible{' '}
        <P>"Ad"</P> or <P>"Advertisement"</P> label so players can immediately distinguish ads from
        gameplay elements.
      </>,
      <>
        <P>Visual separation:</P> Ads are rendered inside dedicated, bordered containers with a
        contrasting background. No ad unit is styled to resemble a star, obstacle, button, or any
        other in-game element. The game's colour palette and art style are never replicated inside
        ad creative.
      </>,
      <>
        <P>No deceptive placement:</P> Ad units are not placed over gameplay areas, do not overlap
        interactive controls, and do not appear at moments designed to cause accidental taps (e.g.
        immediately after a level ends before the results screen renders).
      </>,
      <>
        <P>Closeable interstitials:</P> Any full-screen (interstitial) ad is displayed only between
        natural game sessions — never mid-level — and always provides a clearly visible close button
        within the time permitted by AdMob's own policies.
      </>,
      <>
        <P>No fake in-app purchase prompts:</P> Any offer to purchase in-app content is presented
        through the standard Google Play billing interface. No custom UI mimics the game's art to
        present purchase offers.
      </>,
      <>
        <P>Families Policy:</P> The app is enrolled in Google Play's Families programme. All ad
        SDKs and mediation networks used are certified under the{' '}
        <P>Google Play Families Self-Certified Ads SDK</P> programme. No ad network that is not
        certified for Families use is initialised in the app.
      </>,
    ],
  },
  {
    title: 'App Permissions',
    content: [
      <>
        <P>INTERNET</P> — required to load and display advertisements and to submit anonymised crash
        reports.
      </>,
      <>
        <P>ACCESS_NETWORK_STATE</P> — used to check connectivity before making network requests,
        preventing unnecessary errors.
      </>,
      'No other permissions are requested. The app does not access the camera, microphone, location, contacts, external storage, phone state, or any other sensitive device resource.',
    ],
  },
  {
    title: "Children's Privacy (COPPA & GDPR-K)",
    content: [
      'Cosmo Eats Stars is a general-audience game and is not directed at children under 13 as its primary audience.',
      'We do not knowingly collect personal data from children under 13 (or under 16 in the European Economic Area).',
      'AdMob is configured with child-directed treatment tags and content-rating signals so that only family-safe, non-personalised ad content is eligible to serve to younger audiences.',
      'If you are a parent or guardian and believe your child has provided us with personal information, please contact us at contact@bytesmonks.com and we will delete it promptly.',
    ],
  },
  {
    title: 'Data Sharing',
    content: [
      'We do not sell, rent, or trade any player data to third parties.',
      <>
        <P>Google AdMob (Google LLC)</P> — receives device information and, where permitted,
        Advertising ID for ad delivery. Governed by Google's Privacy Policy.
      </>,
      <>
        <P>Crash-reporting service</P> — receives anonymised crash logs. No personally identifying
        information is included.
      </>,
      'Legal authorities — data may be disclosed if required by law, court order, or to protect the rights and safety of users or the public.',
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'We do not store personal player profiles on our own servers.',
      'Anonymised crash and analytics data is retained for up to 12 months.',
      <>
        Data held by <P>Google AdMob</P> is subject to Google's own retention policies. You can
        review and manage it via your Google account's "My Ad Center" dashboard.
      </>,
    ],
  },
  {
    title: 'Your Rights & Opt-Outs',
    content: [
      <>
        <P>Opt out of personalised ads:</P> Go to Settings → Privacy → Ads on your Android device
        and enable "Opt out of Ads Personalisation".
      </>,
      <>
        <P>Reset Advertising ID:</P> In the same Ads settings screen, tap "Reset advertising ID" to
        unlink previous ad-interaction history from your device.
      </>,
      <>
        <P>Request data deletion:</P> Because we do not store a personal player profile, there is
        no account to delete. For data held by AdMob, visit Google's data controls at
        myaccount.google.com.
      </>,
      <>
        <P>Contact us:</P> For any privacy question or concern related to this app, email{' '}
        <P>contact@bytesmonks.com</P> with the subject line "Cosmo Eats Stars – Privacy". We will
        respond within 30 days.
      </>,
    ],
  },
  {
    title: 'Data Security',
    content:
      'All network communication between the app and external services (AdMob, crash reporting) is conducted over encrypted HTTPS/TLS connections. We apply appropriate technical and organisational measures to protect the limited data we handle against unauthorised access, alteration, or disclosure.',
  },
  {
    title: 'International Data Transfers',
    content:
      "Your device data may be processed in countries outside your own, including the United States, by Google LLC (AdMob). Google relies on Standard Contractual Clauses and other approved mechanisms to transfer data from the European Economic Area. For details, see Google's Privacy Policy.",
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy to reflect changes in the app, advertising partners, or applicable law. When we do, we will revise the "Last updated" date above. We encourage you to review this page periodically. Continued use of the app after any update constitutes acceptance of the revised policy.',
  },
  {
    title: 'Contact',
    content: (
      <>
        For questions about this Privacy Policy or your privacy rights in relation to{' '}
        <P>Cosmo Eats Stars</P>, please contact us at <P>contact@bytesmonks.com</P>. You also have
        the right to lodge a complaint with the data protection authority in your jurisdiction.
        <br />
        <br />
        <span className="text-gray-600 text-xs">
          Developer: Bytes Monks · bytesmonks.com · App package: com.bytesmonks.CosmoEatStar
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
