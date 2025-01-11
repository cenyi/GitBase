// 导入 fs 模块，用于文件系统操作
import fs from 'fs';
// 导入 path 模块，用于处理和转换文件路径
import path from 'path';
// 导入 ResourceList 组件，用于展示资源列表
import ResourceList from '@/components/ResourceList';

/**
 * 定义一个元数据对象，包含页面的标题和描述。
 */
export const metadata = {
  title: 'Resources',
  description: 'Explore our curated list of resources for web development, GitHub, and more.',
};

/**
 * Resources 组件，用于展示资源列表。
 * @returns {JSX.Element} 渲染的资源列表页面。
 */
export default function Resources() {
  // 使用 process.cwd() 获取当前工作目录，然后拼接出 resources.json 文件的路径
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json');
  // 使用 fs.readFileSync 同步读取 resources.json 文件，并使用 JSON.parse 解析内容
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));

  // 返回一个包含 ResourceList 组件的 div 元素，传入 resources 作为 props
  return (
    <div className="container mx-auto py-12">
      <ResourceList resources={resources} showMoreLink={false} />
    </div>
  );
}