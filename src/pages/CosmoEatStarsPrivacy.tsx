import LegalLayout from '../components/LegalLayout';

const P = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{children}</span>
);

const sections = [
  {
    title: 'Introduction',
    content: (
      <>
        This Privacy Policy applies exclusively to <P>Cosmo Eats Stars</P> (Google Play package:{' '}
        <P>com.bytesmonks.CosmoEatStar</P>), a one-touch arcade mobile game developed and published
        by <P>Bytes Monks</P> ("we", "us", "our"). This policy explains what information is
        collected, how it is used, and your rights — including the rights of parents and guardians
        on behalf of children. By downloading or playing Cosmo Eats Stars you agree to the
        practices described herein.
      </>
    ),
  },
  {
    title: 'About the Game & Audience',
    content: [
      <>
        <P>Cosmo Eats Stars</P> is a casual arcade game rated{' '}
        <P>Everyone (E)</P> on Google Play. It is a{' '}
        <P>mixed-audience application</P> — it is designed to be enjoyed by players of all ages,
        including children.
      </>,
      'The game does not require account registration, sign-in, or any personally identifying information to play.',
      <>
        Because the game is accessible to children, it is enrolled in the{' '}
        <P>Google Play Families programme</P> and all data practices described in this policy are
        designed to meet or exceed the requirements of that programme as well as applicable
        children's privacy laws worldwide.
      </>,
    ],
  },
  {
    title: 'Information We Collect',
    content: [
      <>
        <P>No personal data collected by us:</P> We do not collect names, email addresses, phone
        numbers, dates of birth, precise location, photos, or any other directly identifying
        information from any player, including children.
      </>,
      <>
        <P>Gameplay analytics:</P> Anonymised data such as session duration, level progress, and
        crash reports may be collected solely to improve game stability and performance. This data
        cannot identify any individual player.
      </>,
      <>
        <P>Android Advertising ID (GAID) — adults only:</P> For players who are adults, our
        advertising partner Google AdMob may access the Android Advertising ID to deliver
        advertisements. However, because the app is enrolled in the Families programme and{' '}
        <P>child-directed treatment is enabled</P>, AdMob does{' '}
        <P>not</P> use the Advertising ID, cookies, or any other persistent identifier to track or
        profile child users. See the "Advertising" section below for full details.
      </>,
      <>
        <P>Device information:</P> AdMob may collect device model, OS version, IP address, and
        general location (country/region) for fraud detection and to serve geographically
        appropriate ads. For child-directed requests, this data is used only to serve a single
        ad impression and is not used to build a profile.
      </>,
    ],
  },
  {
    title: 'Advertising — Google AdMob & Child-Directed Treatment',
    content: [
      <>
        <P>Cosmo Eats Stars</P> displays advertisements served by{' '}
        <P>Google AdMob (Google LLC)</P>. Our AdMob publisher ID is{' '}
        <P>pub-3898970011871442</P>.
      </>,
      <>
        <P>Child-directed treatment (COPPA):</P> The app sets AdMob's{' '}
        <P>tagForChildDirectedTreatment(true)</P> flag. This instructs AdMob to:{' '}
        (a) not use the Android Advertising ID, (b) not use cookies or any persistent identifier
        for interest-based targeting, and (c) serve only{' '}
        <P>non-personalised, family-safe ad content</P> to all users of the app.
      </>,
      <>
        <P>Under-age-of-consent tag (GDPR):</P> For users in the European Economic Area the app
        also sets <P>tagForUnderAgeOfConsent(true)</P>, ensuring AdMob applies the most restrictive
        data-processing rules regardless of whether the individual user has declared their age.
      </>,
      <>
        <P>No behavioural or interest-based advertising:</P> Because child-directed treatment is
        active for the entire app, <P>no player</P> — adult or child — receives personalised or
        behavioural ads through this application. All ads are contextual and non-personalised.
      </>,
      <>
        <P>Family-safe content only:</P> AdMob is instructed to serve only ads that meet Google's
        family-safe content standards. Ad categories inappropriate for children (gambling, alcohol,
        adult content, violence) are blocked at the publisher level.
      </>,
      <>
        For details on how Google uses data when child-directed treatment is active, see{' '}
        <span className="text-gray-300">families.google.com/familylink/privacy/child-policy</span>{' '}
        and <span className="text-gray-300">google.com/policies/privacy/partners</span>.
      </>,
    ],
  },
  {
    title: 'Ad Format & Families Policy Compliance',
    content: [
      <>
        <P>Clearly labelled advertisements:</P> Every advertisement displayed within Cosmo Eats
        Stars is visually and textually distinct from game content. All ad units carry a visible{' '}
        <P>"Ad"</P> or <P>"Advertisement"</P> label so players of any age can immediately
        distinguish ads from gameplay elements.
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
        natural game sessions — never mid-level — and always provides a clearly visible close
        button within the time permitted by AdMob's own policies.
      </>,
      <>
        <P>No fake in-app purchase prompts:</P> Any offer to purchase in-app content is presented
        exclusively through the standard Google Play billing interface. No custom UI mimics the
        game's art to present purchase offers.
      </>,
      <>
        <P>Certified SDK programme:</P> All ad SDKs and mediation networks used are certified
        under the <P>Google Play Families Self-Certified Ads SDK</P> programme. No ad network that
        is not certified for Families use is initialised in the app.
      </>,
    ],
  },
  {
    title: 'App Permissions',
    content: [
      <>
        <P>INTERNET</P> — required to load and display advertisements and to submit anonymised
        crash reports.
      </>,
      <>
        <P>ACCESS_NETWORK_STATE</P> — used to check connectivity before making network requests,
        preventing unnecessary errors.
      </>,
      'No other permissions are requested. The app does not access the camera, microphone, location, contacts, external storage, phone state, or any other sensitive device resource.',
    ],
  },
  {
    title: "Children's Privacy — COPPA, GDPR-K & Google Play Families",
    content: [
      <>
        <P>Mixed-audience designation:</P> Cosmo Eats Stars is accessible to players of all ages.
        We treat all users as potentially being children and apply the strongest available
        protections to everyone, not just to users who self-identify as children.
      </>,
      <>
        <P>No personal data collected from children:</P> We do not knowingly collect — and have no
        technical mechanism to collect — any personal information from children under 13 (US /
        COPPA) or under 16 (EEA / GDPR-K). This includes names, email addresses, phone numbers,
        precise location, photos, persistent device identifiers, or any biometric data.
      </>,
      <>
        <P>No behavioural profiling of children:</P> Child-directed treatment is enabled app-wide
        (see "Advertising" section), which prevents any persistent identifier from being used to
        build a behavioural or interest-based profile of any player.
      </>,
      <>
        <P>No targeted advertising to children:</P> In compliance with COPPA and the Google Play
        Families Policy, children are never shown personalised or interest-based advertisements.
        All ads served through this app are non-personalised and family-safe.
      </>,
      <>
        <P>No third-party data sharing for children's advertising:</P> We do not share, sell, or
        disclose any data relating to child users to third parties for advertising, analytics, or
        any commercial purpose beyond what is strictly necessary to serve a single non-personalised
        ad impression.
      </>,
      <>
        <P>No in-app purchases requiring parental approval flows:</P> Any purchase within the app
        goes through the standard Google Play billing system, which provides Google's own
        parental-approval mechanisms (Google Family Library, parental approval prompts). We do not
        operate a separate payment or subscription flow.
      </>,
      <>
        <P>COPPA compliance:</P> We comply with the U.S. Children's Online Privacy Protection Act
        (COPPA, 15 U.S.C. § 6501 et seq.) and the FTC's implementing regulations (16 CFR Part
        312).
      </>,
      <>
        <P>GDPR-K compliance:</P> We comply with Article 8 of the EU General Data Protection
        Regulation and applicable Member State implementing legislation relating to the processing
        of children's personal data.
      </>,
    ],
  },
  {
    title: 'Parental Rights & Controls',
    content: [
      <>
        <P>Right to know:</P> Parents and guardians may contact us at{' '}
        <P>contact@bytesmonks.com</P> to ask what, if any, information we hold that relates to
        their child. Because we do not collect personal player profiles, in almost all cases the
        answer is that we hold no such information.
      </>,
      <>
        <P>Right to deletion:</P> If you believe we inadvertently collected personal information
        from your child, email <P>contact@bytesmonks.com</P> with the subject line{' '}
        <P>"Cosmo Eats Stars — Child Data Deletion"</P>. We will investigate and, if data exists,
        delete it within <P>14 business days</P> and confirm by email.
      </>,
      <>
        <P>Right to refuse / opt out of further collection:</P> Because no personal data is
        collected by us, there is nothing to opt out of on our side. To prevent AdMob from
        accessing even the limited device signals it may use for non-personalised ads, you may
        uninstall the app.
      </>,
      <>
        <P>Disable ads entirely (no purchase required):</P> The app does not require a paid version
        to remove ads, but you may block ad network traffic through your device's network or
        parental-control settings.
      </>,
      <>
        <P>Google Family Link:</P> Parents using{' '}
        <span className="text-gray-300">Google Family Link</span> can manage, approve, and remove
        apps installed on their child's device and can review app permissions. We encourage parents
        to use Family Link for additional oversight.
      </>,
      <>
        <P>Response time:</P> We will acknowledge parental enquiries within{' '}
        <P>5 business days</P> and resolve them within <P>30 days</P>.
      </>,
    ],
  },
  {
    title: 'Data Sharing',
    content: [
      'We do not sell, rent, or trade any player data — including children\'s data — to third parties.',
      <>
        <P>Google AdMob (Google LLC)</P> — receives minimal device signals to serve a single
        non-personalised, family-safe ad impression. Under child-directed treatment, no Advertising
        ID or persistent identifier is passed. Governed by Google's Privacy Policy and COPPA
        safe-harbor certification.
      </>,
      <>
        <P>Crash-reporting service</P> — receives anonymised, non-identifiable crash logs to
        improve app stability. No personal or child data is included.
      </>,
      'Legal authorities — data may be disclosed if required by law, court order, or to protect the rights and safety of users or the public.',
      <>
        <P>No data is shared for the purpose of advertising to, or profiling, children under any
        circumstances.</P>
      </>,
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'We do not store personal player profiles on our own servers — for children or adults.',
      'Anonymised crash and performance analytics are retained for up to 12 months and contain no personally identifying information.',
      <>
        Data held by <P>Google AdMob</P> under child-directed treatment is subject to Google's
        restricted retention policies for child-directed content. You can review Google's practices
        at <span className="text-gray-300">families.google.com/familylink/privacy/child-policy</span>.
      </>,
    ],
  },
  {
    title: 'Your Rights & Opt-Outs (All Players)',
    content: [
      <>
        <P>Opt out of non-personalised ads entirely:</P> All ads in this app are already
        non-personalised. If you wish to prevent any ad from loading, you may use a network-level
        content blocker or uninstall the app.
      </>,
      <>
        <P>Reset Advertising ID:</P> Go to{' '}
        <span className="text-gray-300">Settings → Privacy → Ads</span> on your Android device and
        tap "Reset advertising ID". Because child-directed treatment is active, this ID is not
        used by this app, but resetting it affects other apps too.
      </>,
      <>
        <P>Request data deletion:</P> We do not store personal player profiles. For any data held
        by AdMob, visit{' '}
        <span className="text-gray-300">myaccount.google.com</span> or contact Google directly.
      </>,
      <>
        <P>Contact us:</P> For any privacy question, email{' '}
        <P>contact@bytesmonks.com</P> with the subject line{' '}
        <P>"Cosmo Eats Stars – Privacy"</P>. We will respond within 30 days. Parental enquiries
        are prioritised and acknowledged within 5 business days.
      </>,
    ],
  },
  {
    title: 'Data Security',
    content:
      'All network communication between the app and external services (AdMob, crash reporting) is conducted over encrypted HTTPS/TLS connections. We apply appropriate technical and organisational security measures to protect the limited data we handle against unauthorised access, alteration, or disclosure.',
  },
  {
    title: 'International Data Transfers',
    content:
      "Your device data may be processed in countries outside your own, including the United States, by Google LLC (AdMob). Google relies on Standard Contractual Clauses and other approved transfer mechanisms for data originating from the European Economic Area. For child-directed requests, Google applies its most restrictive data-handling rules regardless of geography.",
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy to reflect changes in the app, advertising partners, or applicable law. When we do, we will revise the "Last updated" date above. We encourage parents and guardians to review this page periodically. Continued use of the app after any update constitutes acceptance of the revised policy.',
  },
  {
    title: 'Contact & Regulatory Information',
    content: (
      <>
        For questions about this Privacy Policy, to exercise your or your child's privacy rights,
        or to raise a concern, contact us at <P>contact@bytesmonks.com</P>.
        <br />
        <br />
        Parents and guardians in the United States may also contact the{' '}
        <P>FTC</P> (ftc.gov/tips-advice/business-center/privacy-and-security/children's-privacy)
        for information about their rights under COPPA. EEA residents may lodge a complaint with
        the data protection authority in their Member State.
        <br />
        <br />
        <span className="text-gray-600 text-xs">
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
