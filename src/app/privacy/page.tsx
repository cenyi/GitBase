// app/privacy-policy/page.tsx
export const metadata = {
  title: 'Privacy Policy - GitBase Open Source CMS | Data Protection & Security',
  description: 'Learn how GitBase protects your personal data and respects your privacy. Our privacy policy explains what information we collect and how we use it.',
  keywords: ['GitBase privacy policy', 'data protection', 'website security', 'personal data collection', '隐私政策', '数据保护', '网站安全'],
  openGraph: {
    title: 'Privacy Policy - GitBase Open Source CMS',
    description: 'Learn how we protect your personal data and respect your privacy',
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
    title: 'Privacy Policy - GitBase Open Source CMS',
    description: 'Learn how we protect your personal data and respect your privacy',
    images: ['https://yourdomain.com/og-privacy.jpg'],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          GitBase respects your privacy and is committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data 
          when you visit our website and tell you about your privacy rights.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect, use, store and transfer different kinds of personal data about you 
          which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Identity Data includes first name, last name, username or similar identifier.</li>
          <li>Contact Data includes email address.</li>
          <li>Technical Data includes internet protocol (IP) address, browser type and version, 
          time zone setting and location, browser plug-in types and versions, operating system 
          and platform, and other technology on the devices you use to access this website.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Data</h2>
        <p className="mb-4">
          We will only use your personal data when the law allows us to. Most commonly, 
          we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">3. Data Security</h2>
        <p className="mb-4">
          We have put in place appropriate security measures to prevent your personal data 
          from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">4. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. The updated version will be 
          indicated by an updated "Revised" date and the updated version will be effective 
          as soon as it is accessible.
        </p>
        
        <p className="mt-8 text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}