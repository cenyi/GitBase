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
  title: 'GitBase - Open Source Dynamic Website CMS Without Database', // 页面标题
  description: 'A Next.js site with Tailwind & Shadcn/UI, using GitHub API for content management. No database needed for dynamic updates.', // 页面描述
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
    <div className="container mx-auto py-12 space-y-16"> {/* 主容器，设置了最大宽度、内边距和间距 */}
      <section className="text-center space-y-4"> {/* 页面的主要部分，包含标题、描述和段落文本 */}
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"> {/* 主标题，使用了不同屏幕尺寸的字体大小 */}
          GitBase
        </h1>
        <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl"> {/* 副标题，同样使用了响应式字体大小 */}
          Open Source Dynamic Website CMS Without Database
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl"> {/* 段落文本，设置了最大宽度和颜色，同样使用了响应式字体大小 */}
          GitBase is a dynamic, database-free website built with Next.js, Tailwind CSS, and Shadcn/UI, featuring a content management system powered by the GitHub API for seamless updates and administration.
        </p>
      </section>

      <ResourceList resources={resources} /> {/* 资源列表组件，传入了资源数据 */}
      <ArticleList articles={allPostsData} /> {/* 文章列表组件，传入了文章数据 */}
    </div>
  )
}