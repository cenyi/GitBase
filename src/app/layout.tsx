// 引入全局 CSS 文件
import './globals.css'
// 引入 Google 字体 Inter
import { Inter } from 'next/font/google'
// 引入布局组件
import { Layout } from '@/components/Layout'
// 引入 Next.js 的 Metadata 组件
import { Metadata } from 'next'

// 加载 Inter 字体，设置拉丁字母子集
const inter = Inter({ subsets: ['latin'] })

/**
 * 定义元数据对象，用于设置网页的标题和描述。
 */
export const metadata: Metadata = {
  title: {
    default: 'GitBase',
    template: '%s | GitBase'
  },
  description: 'Open source dynamic website without database, built with Next.js and GitHub API',
  keywords: ['GitHub', 'Next.js', '无数据库网站', '开源项目'],
  openGraph: {
    title: 'GitBase',
    description: 'Open source dynamic website without database, built with Next.js and GitHub API',
    url: 'https://yourdomain.com',
    siteName: 'GitBase',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitBase',
    description: 'Open source dynamic website without database, built with Next.js and GitHub API',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
}

/**
 * RootLayout 组件的属性。
 * @interface RootLayoutProps
 * @property {React.ReactNode} children - 将在布局中渲染的子组件。
 */
interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * 应用的根布局组件。
 * @param {RootLayoutProps} { children } - 包含要在布局中渲染的子组件的属性。
 * @returns {JSX.Element} - 渲染的根布局元素。
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* 文档的 body 部分 */}
      <body className={inter.className}>
        {/* 使用 Layout 组件包裹子组件 */}
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}