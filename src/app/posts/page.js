// 导入 ArticleList 组件
import ArticleList from '@/components/ArticleList'
// 导入用于获取排序后文章数据的函数
import { getSortedPostsData } from '@/lib/posts';

/**
 * Articles 页面的元数据。
 * 这些元数据用于 SEO 和在社交媒体上分享时显示。
 */
export const metadata = {
  title: 'Articles - GitBase Open Source CMS | Web Development & GitHub Tips',
  description: 'Explore our latest articles on web development, Next.js, GitHub API integration, and best practices for database-free CMS solutions.',
  keywords: ['web development articles', 'GitHub tips', 'Next.js tutorials', 'CMS best practices', 'database-free solutions'],
  openGraph: {
    title: 'Articles - GitBase Open Source CMS',
    description: 'Learn web development, GitHub integration and CMS best practices with GitBase articles',
    url: 'https://yourdomain.com/posts',
    siteName: 'GitBase',
    images: [
      {
        url: 'https://yourdomain.com/og-articles.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles - GitBase Open Source CMS',
    description: 'Learn web development, GitHub integration and CMS best practices with GitBase articles',
    images: ['https://yourdomain.com/og-articles.jpg'],
  },
};

/**
 * 渲染 Articles 页面的组件。
 * 它使用 ArticleList 组件来显示文章列表。
 * @returns {JSX.Element} 渲染的 Articles 页面。
 */
export default function Articles() {
  // 获取所有排序后的文章数据
  const allPostsData = getSortedPostsData();

  // 返回包含文章列表的页面
  return (
    <div className="container mx-auto py-4">
      {/* 渲染文章列表组件，并传递文章数据和一个布尔值来控制是否显示“显示更多”链接 */}
      <ArticleList articles={allPostsData} showMoreLink={false} />
    </div>
  )
}
