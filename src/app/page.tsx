// pages/index.js
import fs from 'fs' // 导入文件系统模块
import path from 'path' // 导入路径处理模块
import { getSortedPostsData } from '@/lib/posts' // 导入获取排序后的文章数据的函数
import ResourceList from '@/components/ResourceList' // 导入资源列表组件
import ArticleList from '@/components/ArticleList' // 导入文章列表组件
import { Metadata } from 'next' // 导入Next.js的Metadata类型

/**
 * Home 页面的元数据。
 * 这些元数据将用于搜索引擎优化和在社交媒体上分享。
 */
export const metadata: Metadata = {
  title: 'GitBase - Open Source Dynamic Website CMS Without Database | Next.js GitHub CMS',
  description: 'GitBase is an open-source, database-free CMS built with Next.js, Tailwind CSS & Shadcn/UI. Manage content via GitHub API for seamless updates. Perfect for developers looking for a lightweight alternative to traditional CMS solutions.',
  keywords: ['Next.js CMS', 'GitHub CMS', 'database-free website', 'open source CMS', 'developer tools', '无数据库网站', 'Next.js内容管理系统', 'GitHub API CMS', '轻量级CMS'],
  openGraph: {
    title: 'GitBase - Open Source Dynamic Website CMS Without Database',
    description: 'Database-free CMS powered by Next.js and GitHub API',
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
    title: 'GitBase - Open Source Dynamic Website CMS Without Database',
    description: 'Database-free CMS powered by Next.js and GitHub API',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
}

/**
 * Home 页面的主要组件。
 * 它显示了一个标题、一个描述、一个资源列表和一个文章列表。
 * @returns {JSX.Element} 渲染的Home页面。
 */
export default function Home() {
  // 构建资源文件的路径
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json')
  // 读取并解析资源文件
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'))
  // 获取前6篇排序后的文章数据
  const allPostsData = getSortedPostsData().slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-6 md:py-4 space-y-10 md:space-y-12">
      <section className="text-center space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-4">
          {/* 
            h1标题样式说明：
            - 基础字体大小：text-2xl (1.875rem/30px)，可调整范围text-xs(0.75rem)到text-9xl(8rem)
            - 响应式断点设置：
              * sm:≥640px, md:≥768px, lg:≥1024px, xl:≥1280px
              * 建议保持当前断点比例关系
            - 字体粗细：font-bold(700)，可选值：font-thin(100)到font-black(900)
            - 字距调整：tracking-tighter(-0.05em)，可选值：tracking-tight(-0.025em)到tracking-widest(0.1em)
            - 渐变背景色：
              * from-blue-600(#2563eb)到blue-400(#60a5fa)
              * 颜色代码格式：blue-{100-900}或自定义[#RRGGBB]
              * 方向：可改为to-right/to-left/to-top/to-bottom
            - 背景裁剪：bg-clip-text(必须配合text-transparent使用)
            - 文字透明：text-transparent(必须设置)
            调整指南：
            1. 修改字体大小类名时保持响应式比例关系
            2. 颜色调整建议使用Tailwind内置颜色或测试对比度≥4.5:1
            3. 渐变方向修改需保持from-{color}和to-{color}配对使用
          */}
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              CMS BY GITBASE
          </h1>
          {/* <h2 className="text-xl tracking-tighter sm:text-2xl md:text-3xl lg:text-3xl text-gray-700 dark:text-gray-300">
            Open Source Dynamic Website CMS Without Database
          </h2> */}
        </div>
        <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-lg leading-relaxed">
            GitBase is an open-source, database free, and amazing template website
        </p>
      </section>

      <ResourceList resources={resources} /> {/* 资源列表组件，传入了资源数据 */}
      
    </div>
  )
}