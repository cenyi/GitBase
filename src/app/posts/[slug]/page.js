// 导入用于获取文章数据的函数
import { getPostData } from '@/lib/posts';
// 导入用于创建链接的组件
import Link from 'next/link';
// 导入用于显示图标的组件
import { ArrowLeft, ChevronRight } from 'lucide-react';

/**
 * 生成文章的元数据，包括标题和描述。
 * @param {Object} params - 包含文章 slug 的参数对象。
 * @returns {Object} - 包含文章标题和描述的元数据对象。
 */
export async function generateMetadata({ params }) {
  // 获取文章数据
  const postData = await getPostData(params.slug);
  return {
    // 设置文章标题
    title: `${postData.title}`,
    // 设置文章描述，如果没有则使用默认描述
    description: postData.description || `Read about ${postData.title} on GitBase`,
  };
}

/**
 * 渲染单个文章页面。
 * @param {Object} params - 包含文章 slug 的参数对象。
 * @returns {JSX.Element} - 渲染的文章页面。
 */
export default async function Post({ params }) {
  // 获取文章数据
  const postData = await getPostData(params.slug);
  
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* 面包屑导航 */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        {/* 链接到主页 */}
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {/* 右箭头图标 */}
        <ChevronRight className="mx-2" size={16} />
        {/* 链接到文章列表页 */}
        <Link href="/posts" className="hover:text-blue-600">Articles</Link>
        {/* 右箭头图标 */}
        <ChevronRight className="mx-2" size={16} />
        {/* 显示当前文章标题 */}
        <span className="text-gray-900">{postData.title}</span>
      </nav>
      
      {/* 元信息卡片 */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        {postData.date && (
          <p className="text-gray-600 mb-2">{new Date(postData.date).toLocaleDateString()}</p>
        )}
        {postData.description && (
          <p className="text-gray-800">{postData.description}</p>
        )}
      </div>
      
      {/* 文章内容 */}
      <div 
        className="prose prose-lg max-w-none"
        // 使用 dangerouslySetInnerHTML 渲染 HTML 内容
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
      
      {/* 返回文章列表链接 */}
      <div className="mt-12">
        {/* 链接到文章列表页 */}
        <Link href="/posts" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
          {/* 左箭头图标 */}
          <ArrowLeft size={20} />
          {/* 显示文本 */}
          Back to articles
        </Link>
      </div>
    </article>
  );
}