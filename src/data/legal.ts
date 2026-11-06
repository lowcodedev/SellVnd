export interface LegalSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  intro:
    'This policy explains what information SellVnd collects through this website, why we collect it and how we look after it. SellVnd is currently in development and this website is an early-access waitlist.',
  sections: [
    {
      heading: '1. Information we collect',
      paragraphs: [
        'When you join the early-access waitlist, we collect the details you choose to provide:',
      ],
      points: [
        'Your full name and business name',
        'Your email address and WhatsApp phone number',
        'The business category you selected',
        'The sales channels you currently use, if you choose to share them',
        'The date and time you submitted the form',
      ],
    },
    {
      heading: '2. How we use your information',
      paragraphs: [
        'We use your information only to communicate with you about SellVnd early access and relevant product updates. We do not sell your personal information, and we do not use it for third-party advertising.',
      ],
    },
    {
      heading: '3. Where your information is stored',
      paragraphs: [
        'Waitlist entries are stored in a secure database provided by Supabase. Access to the stored entries is restricted; the public form can add new entries but cannot view entries submitted by others.',
      ],
    },
    {
      heading: '4. How long we keep your information',
      paragraphs: [
        'We keep waitlist entries until you ask us to remove them or until the early-access programme has concluded, whichever happens first. When we no longer need your information, we will delete it.',
      ],
    },
    {
      heading: '5. Your choices and rights',
      paragraphs: [
        'You may ask to see, correct or delete the information you have given us, and you may ask us to stop contacting you at any time. Depending on where you live, additional rights may apply under local data protection law.',
      ],
    },
    {
      heading: '6. Cookies and website technology',
      paragraphs: [
        'This website does not use advertising or tracking cookies. Fonts are loaded from Google Fonts, which may receive standard technical information such as your IP address when the page loads.',
      ],
    },
    {
      heading: '7. Changes to this policy',
      paragraphs: [
        'We may update this policy as SellVnd develops. The date at the top of this page will change when we do, and material changes will be communicated to people on the waitlist.',
      ],
    },
    {
      heading: '8. Contact',
      paragraphs: [
        'Contact details for privacy requests will be published here before SellVnd launches.',
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  title: 'Terms of Service',
  intro:
    'These terms govern your use of the SellVnd website and early-access waitlist. By joining the waitlist you agree to them.',
  sections: [
    {
      heading: '1. About SellVnd',
      paragraphs: [
        'SellVnd is an AI-powered social-commerce operating system that is currently in development. The features described on this website are planned capabilities. They are not all available today, and their final form may change.',
      ],
    },
    {
      heading: '2. Early-access waitlist',
      paragraphs: [
        'Joining the waitlist does not guarantee access to SellVnd, a place in any particular programme, or a launch date. We will contact you about early access when it is available. Submitting the form does not create a contract for the provision of services.',
      ],
    },
    {
      heading: '3. Accurate information',
      paragraphs: [
        'You agree to provide accurate and current details when you join the waitlist, and to keep them updated if they change.',
      ],
    },
    {
      heading: '4. Platform integrations',
      paragraphs: [
        'SellVnd plans to connect with third-party sales and social platforms. Those connections depend on each platform providing supported APIs and granting the required permissions. We cannot guarantee that any specific platform will be supported.',
      ],
    },
    {
      heading: '5. Website content',
      paragraphs: [
        'The content on this website, including text, design and images, is provided for information. Dashboard visuals are conceptual previews and their figures are illustrative, not live statistics.',
      ],
    },
    {
      heading: '6. Acceptable use',
      paragraphs: [
        'You agree not to submit false information, not to attempt to access or interfere with the website or its systems, and not to use the waitlist to send unsolicited messages to others.',
      ],
    },
    {
      heading: '7. Disclaimers and limitation of liability',
      paragraphs: [
        'The website and waitlist are provided as they are, without warranties of any kind. To the fullest extent permitted by law, SellVnd is not liable for losses arising from your use of this website or from delays in the development of the platform.',
      ],
    },
    {
      heading: '8. Changes to these terms',
      paragraphs: [
        'We may update these terms as SellVnd develops. Continued use of the website after an update means you accept the revised terms.',
      ],
    },
    {
      heading: '9. Contact',
      paragraphs: [
        'Contact details will be published on this page before SellVnd launches.',
      ],
    },
  ],
};
