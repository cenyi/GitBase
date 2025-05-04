// app/terms-of-service/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - GitBase AI Tool Navigator | Usage Guidelines',
  description: 'Review the terms and conditions for using GitBase AI tool navigation platform. Understand your rights and responsibilities when using our services.',
  keywords: [
    'GitBase AI terms',
    'AI tool usage agreement',
    'AI navigation site terms',
    'GitBase service policy',
    'AI tool legal disclaimer',
    'AI user responsibility',
  ],
  openGraph: {
    title: 'Terms of Service - GitBase AI Tool Navigator',
    description: 'Review the terms and conditions for using GitBase AI tool navigation platform',
    url: 'https://yourdomain.com/terms',
    siteName: 'GitBase',
    images: [
      {
        url: 'https://yourdomain.com/og-terms.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - GitBase AI Tool Navigator',
    description: 'Review the terms and conditions for using GitBase AI tool navigation platform',
    images: ['https://yourdomain.com/og-terms.jpg'],
  },
};

export default function TermsOfService() {
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
  "name": "Terms of Service",
  "description": "GitBase's terms and conditions for using AI tool navigation services.",
  "url": "https://yourdomain.com/terms",
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

      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          Welcome to GitBase, an AI tool navigation platform. By accessing or using our services, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using GitBase, you accept and agree to these Terms, our <Link href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</Link>, and all applicable laws. If you do not agree with any part of these terms, you must not use our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">2. User Responsibilities</h2>
        <p className="mb-4">
          You are responsible for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Maintaining the confidentiality of your account credentials.</li>
          <li>Restricting access to your computer or device used to access GitBase.</li>
          <li>Ensuring compliance with all applicable laws when using our services.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">3. AI Tool Usage</h2>
        <p className="mb-4">
          GitBase provides a navigation platform for third-party AI tools. By using AI tools listed on our site:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>You agree not to use AI tools for illegal, harmful, or discriminatory purposes.</li>
          <li>You are solely responsible for any content generated or decisions made based on AI tool outputs.</li>
          <li>You must comply with the terms of service of the AI tool providers.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">4. Content Ownership</h2>
        <p className="mb-4">
          All content provided on GitBase is the property of GitBase or its content suppliers and protected by international copyright laws. Unauthorized use of content may violate these terms and applicable laws.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">5. User-Generated Content</h2>
        <p className="mb-4">
          By submitting content (e.g., reviews, ratings) to GitBase:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>You grant us a non-exclusive, royalty-free license to display and distribute your content.</li>
          <li>You warrant that your content does not infringe on third-party rights (e.g., copyright, privacy).</li>
          <li>We reserve the right to remove content violating these terms without notice.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          GitBase shall not be liable for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>The accuracy or reliability of third-party AI tools listed on our platform.</li>
          <li>Decisions made based on AI-generated outputs.</li>
          <li>Any indirect, incidental, special, consequential, or punitive damages resulting from your use of the services.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">7. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. We will notify you of changes by posting the updated Terms on this page. Continued use of GitBase after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">8. Dispute Resolution</h2>
        <p className="mb-4">
          Any disputes arising from these terms or your use of GitBase shall be resolved through:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Negotiation in good faith between parties.</li>
          <li>If unresolved, binding arbitration under the rules of <Link href="https://example-arbitration.org" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Arbitration Institution</Link>.</li>
          <li>Governing law: [Your Jurisdiction] law applies to all matters.</li>
        </ul>

        <p className="mt-8 text-gray-500">
          Last updated: July 1, 2024
        </p>

        <div className="mt-12 text-sm text-gray-500">
          <p>
            Related policies: 
            <Link href="/privacy-policy" className="ml-2 text-blue-600 underline">Privacy Policy</Link> | 
            <Link href="/cookie-policy" className="ml-2 text-blue-600 underline">Cookie Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
