// components/ArticleList.js
import Link from 'next/link' // 导入Link组件，用于实现页面间的导航链接
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card" // 导入Card相关组件，用于展示文章列表

/**
 * ArticleList 组件用于展示文章列表，并提供链接到更多文章的功能。
 * @param {Object} props - 组件的属性。
 * @param {Array} props.articles - 要展示的文章列表。
 * @param {boolean} [props.showMoreLink=true] - 是否显示“更多文章”链接。
 * @returns {JSX.Element} - 渲染的文章列表组件。
 */
export default function ArticleList({ articles, showMoreLink = true }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tighter">Articles</h2>
        {showMoreLink && (
          <Link href="/posts" className="text-blue-600 hover:text-blue-800 transition-colors">
            More articles →
          </Link>
        )}
      </div>
      <div className="space-y-4 md:space-y-6">
        {articles.map(({ id, title, description }) => (
          <Card key={id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="space-y-3">
              <Link 
                href={`/posts/${id}`}
                className="group text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1.5"
              >
                <CardTitle className="group-hover:underline decoration-2">{title}</CardTitle>
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
              <CardDescription className="text-gray-600 line-clamp-2">{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}