import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - GitBase Open Source CMS | Our Story & Mission',
  description: 'Learn about GitBase, an open-source database-free CMS built with Next.js and GitHub API. Discover our mission and the team behind this project.',
  keywords: ['GitBase about', 'open source CMS', 'Next.js project', 'database-free website', 'GitHub API CMS'],
  openGraph: {
    title: 'About - GitBase Open Source CMS',
    description: 'Learn about our mission to create a database-free CMS using Next.js and GitHub API',
    url: 'https://yourdomain.com/about',
    siteName: 'GitBase',
    images: [
      {
        url: 'https://yourdomain.com/og-about.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - GitBase Open Source CMS',
    description: 'Learn about our mission to create a database-free CMS using Next.js and GitHub API',
    images: ['https://yourdomain.com/og-about.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">About GitBase</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          GitBase is an open-source, database-free content management system built with Next.js, 
          Tailwind CSS, and Shadcn/UI. Our mission is to provide developers with a lightweight 
          alternative to traditional CMS solutions by leveraging the GitHub API for content storage.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Our Story</h2>
        <p className="mb-4">
          GitBase is an open-source dynamic website solution without a traditional database, built with Next.js, Tailwind CSS, and Shadcn/UI. It leverages GitHub as a content management system, providing a seamless way to create and manage website content.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Technology Stack</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Next.js - React framework for server-side rendering</li>
          <li>Tailwind CSS - Utility-first CSS framework</li>
          <li>Shadcn/UI - Beautifully designed components</li>
          <li>GitHub API - Content storage and version control</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">The Team</h2>
        <p className="mb-4">
          GitBase is developed and maintained by a small team of passionate developers who 
          believe in open-source software and innovative solutions to common web development challenges.
        </p>
      </div>
    </div>
  );
}