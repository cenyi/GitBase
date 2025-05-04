// app/privacy-policy/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - GitBase AI Tool Navigator | Data Protection',
  description: 'GitBase protects your personal data when using our AI tool navigation platform. Learn how we collect, use, and secure your information.',
  keywords: [
    'GitBase privacy policy',
    'AI tool user data protection',
    'AI navigation site privacy',
    'GitBase data security',
    'AI tool GDPR compliance',
    'AI data ethics',
  ],
  openGraph: {
    title: 'Privacy Policy - GitBase AI Tool Navigator',
    description: 'Learn how GitBase protects your personal data in AI tool navigation',
    url: 'https://yourdomain.com/privacy',
    siteName: 'GitBase',
    images: [
      {
        url: 'https://yourdomain.com/og-privacy.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - GitBase AI Tool Navigator',
    description: 'Learn how GitBase protects your personal data in AI tool navigation',
    images: ['https://yourdomain.com/og-privacy.jpg'],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* 结构化数据（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "GitBase's commitment to protecting user data in AI tool navigation.",
  "url": "https://yourdomain.com/privacy",
  "publisher": {
    "@type": "Organization",
    "name": "GitBase",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourdomain.com/logo.png"
    }
  },
  "datePublished": "2024-07-01",
  "dateModified": "2024-07-01"
}
`,
        }}
      />

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          GitBase respects your privacy and is committed to protecting your personal data. 
          This privacy policy explains how we collect, use, and secure your information when you use our AI tool navigation platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect, use, store and transfer different kinds of personal data about you:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Identity Data:</strong> includes first name, last name, username, or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address.</li>
          <li><strong>Technical Data:</strong> includes IP address, browser type, time zone, device identifiers, and other technology data.</li>
          <li><strong>Usage Data:</strong> includes interactions with AI tools (e.g., search queries, tool preferences, feedback), which may be used to improve AI model accuracy.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Data</h2>
        <p className="mb-4">
          We will only use your personal data when the law allows us to. Most commonly:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To perform the contract we have with you.</li>
          <li>To pursue legitimate interests (e.g., improving AI recommendations).</li>
          <li>To comply with legal obligations.</li>
          <li>To train or refine AI algorithms (without linking data to personal identities).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">3. Data Security</h2>
        <p className="mb-4">
          We have implemented appropriate security measures to prevent unauthorized access, loss, or disclosure of your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">4. AI Tool Usage and Automated Decisions</h2>
        <p className="mb-4">
          Our AI tools may use your anonymized data to generate recommendations or insights. 
          No decisions with legal or significant effects are made solely by automated systems.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Privacy Rights</h2>
        <p className="mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access or update your personal data via your account settings.</li>
          <li>Request deletion of your data by contacting us at <a href="mailto:privacy@gitbase.com" className="text-blue-600 underline" rel="noopener noreferrer">privacy@gitbase.com</a>.</li>
          <li>Opt out of data collection for AI training via browser settings or our <Link href="/cookie-policy" className="text-blue-600 underline">Cookie Policy</Link>.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">6. Third-Party Services</h2>
        <p className="mb-4">
          We use third-party services (e.g., Google Analytics, Mixpanel) to understand user behavior. 
          These services may collect data such as IP addresses and browsing activity. 
          Learn how to opt out via our <Link href="/cookie-policy" className="text-blue-600 underline">Cookie Policy</Link>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">7. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and will be effective as soon as it is accessible.
        </p>

        <p className="mt-8 text-gray-500">
          Last updated: July 1, 2024
        </p>

        <div className="mt-12 text-sm text-gray-500">
          <p>
            Learn more: 
            <Link href="/terms-of-service" className="ml-2 text-blue-600 underline">Terms of Service</Link> | 
            <Link href="/cookie-policy" className="ml-2 text-blue-600 underline">Cookie Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
