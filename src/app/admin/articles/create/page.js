'use client';

// 导入 React 的 useState 钩子，用于管理组件的状态
import { useState } from 'react';
// 导入 Next.js 的 useRouter 钩子，用于在客户端进行路由导航
import { useRouter } from 'next/navigation';
// 导入自定义的 UI 组件，如按钮、输入框、文本域和警告框
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";

/**
 * CreateArticlePage 是一个 React 组件，用于创建新的文章。
 * 它使用 useState 钩子来管理文章的标题、描述、内容和 slug，以及错误状态和加载状态。
 * 它使用 useRouter 钩子来在创建文章后导航到文章列表页面。
 * 它使用 fetch API 来与服务器通信，创建新的文章。
 * 
 * @returns {JSX.Element} 一个表单，用于输入文章的标题、描述、内容和 slug，以及一个保存按钮。
 */
export default function CreateArticlePage() {
  // 使用 useState 钩子来管理文章的状态
  const [article, setArticle] = useState({ title: '', description: '', content: '', slug: '' });
  // 使用 useState 钩子来管理错误状态
  const [error, setError] = useState(null);
  // 使用 useState 钩子来管理加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 使用 useRouter 钩子来获取路由对象
  const router = useRouter();

  /**
   * 处理输入框的 onChange 事件，更新文章的状态。
   * 
   * @param {Object} e - 事件对象。
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  /**
   * 处理保存按钮的 onClick 事件，发送 POST 请求到服务器创建文章。
   * 
   * @async
   * @throws {Error} 如果创建文章失败，抛出错误信息。
   */
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 发送 POST 请求到服务器创建文章
      const response = await fetch('/api/articles/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });

      // 如果响应不是 ok，抛出错误
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create article');
      }

      // 创建成功，导航到文章列表页面
      router.push('/admin/articles');
    } catch (error) {
      // 打印错误信息到控制台
      console.error('Error creating article:', error);
      // 设置错误状态
      setError(error.message);
    } finally {
      // 无论成功或失败，设置加载状态为 false
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}
      <div className="space-y-4">
        <Input
          name="title"
          value={article.title}
          onChange={handleInputChange}
          placeholder="Article Title"
        />
        <Input
          name="description"
          value={article.description}
          onChange={handleInputChange}
          placeholder="Article Description"
        />
        <Input
          name="slug"
          value={article.slug}
          onChange={handleInputChange}
          placeholder="Article Slug (e.g., my-new-article)"
        />
        <Textarea
          name="content"
          value={article.content}
          onChange={handleInputChange}
          placeholder="Article Content (Markdown)"
          rows={20}
        />
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Article'}
        </Button>
      </div>
    </div>
  );
}