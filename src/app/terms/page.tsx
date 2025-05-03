// app/terms-of-service/page.tsx
export const metadata = {
  title: 'Terms of Service - GitBase Open Source CMS | Usage Guidelines',
  description: 'Review the terms and conditions for using GitBase, an open-source database-free CMS. Understand your rights and responsibilities when using our platform.',
  keywords: ['GitBase terms', 'website terms of service', 'open source CMS terms', '使用条款', '服务协议'],
  openGraph: {
    title: 'Terms of Service - GitBase Open Source CMS',
    description: 'Review the terms and conditions for using GitBase platform',
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
    title: 'Terms of Service - GitBase Open Source CMS',
    description: 'Review the terms and conditions for using GitBase platform',
    images: ['https://yourdomain.com/og-terms.jpg'],
  },
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          Welcome to GitBase. These Terms of Service govern your use of our website and services.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">2. User Responsibilities</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">3. Content Ownership</h2>
        <p className="mb-4">
          All content provided on our service is the property of GitBase or its content suppliers and protected by international copyright laws.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          GitBase shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the services.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">5. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. We will provide notice of any changes by posting the new Terms on this page.
        </p>
        
        <p className="mt-8 text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}