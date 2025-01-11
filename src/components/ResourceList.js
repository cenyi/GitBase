// components/ResourceList.js
import Link from 'next/link' // 导入Link组件，用于实现内部链接
import { ExternalLink } from 'lucide-react' // 导入ExternalLink图标组件
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card" // 导入Card相关组件

/**
 * 资源列表组件。
 * 显示一组资源，并提供链接到更多资源的选项。
 * 
 * @param {Object} props - 组件的属性。
 * @param {Array} props.resources - 要显示的资源列表。
 * @param {boolean} [props.showMoreLink=true] - 是否显示“更多资源”链接。
 * @returns {JSX.Element} - 渲染的资源列表组件。
 */
export default function ResourceList({ resources, showMoreLink = true }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tighter">Resources</h2>
        {showMoreLink && (
          <Link href="/resources" className="text-blue-600 hover:text-blue-800 transition-colors">
            More resources →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle>{resource.name}</CardTitle>
                <ExternalLink size={16} />
              </a>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}