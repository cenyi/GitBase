/**
 * 主要功能是编辑文章。以下是对代码的详细解释：

导入必要的库和组件：

useState和useEffect：用于管理组件的状态和副作用。
useSearchParams：用于获取URL中的查询参数。
Button、Input和Textarea：自定义的UI组件。
定义ArticleEditor组件：

useState：初始化文章的状态，包括标题、描述、内容和路径。
useState：初始化加载状态和错误状态。
useSearchParams：获取URL中的文章路径。
处理路径变化：

useEffect：当路径变化时，获取文章数据。
如果没有提供路径，设置错误状态并停止加载。
获取文章数据：

fetchArticle：异步函数，用于通过API获取文章数据。
发送GET请求到/api/articles，并处理响应。
处理输入变化：

handleInputChange：处理输入框的变化，更新文章状态。
保存文章：

handleSave：异步函数，用于保存文章到服务器。
发送POST请求到/api/articles，并处理响应。
渲染组件：

根据加载状态和错误状态渲染不同的内容。
如果正在加载，显示加载中提示。
如果发生错误，显示错误信息。
渲染文章编辑表单，包括标题、描述、内容输入框和保存按钮。
 */

'use client';

// 导入 React 的 useState 和 useEffect 钩子
import { useState, useEffect } from 'react';
// 导入 Next.js 的 useSearchParams 钩子
import { useSearchParams } from 'next/navigation';
// 导入自定义的 Button 组件
import { Button } from "@/components/ui/button";
// 导入自定义的 Input 组件
import { Input } from "@/components/ui/input";
// 导入自定义的 Textarea 组件
import { Textarea } from "@/components/ui/textarea";

/**
 * ArticleEditor 是一个 React 组件，用于编辑文章。
 * 它使用 Next.js 的 useSearchParams 钩子来获取文章的路径，
 * 并使用 fetch API 来获取和保存文章数据。
 */
export default function ArticleEditor() {
  // 定义一个状态变量，用于存储文章的标题、描述、内容和路径
  const [article, setArticle] = useState({ title: '', description: '', content: '', path: '' });
  // 定义一个状态变量，用于存储加载状态
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  // 定义一个状态变量，用于存储错误信息
  const [error, setError] = useState(null);
  // 使用 useSearchParams 钩子获取 URL 中的查询参数
  const searchParams = useSearchParams();
  // 从查询参数中获取文章的路径
  const path = searchParams.get('path');

  /**
   * 当路径发生变化时，获取文章数据。
   */
  useEffect(() => {
    if (path) {
      fetchArticle(decodeURIComponent(path));
    } else {
      setError('No article path provided');
      setIsLoading(false);
    }
  }, [path]);

  /**
   * 通过 API 获取文章数据。
   * @param {string} articlePath - 文章的路径。
   */
  const fetchArticle = async (articlePath) => {
    setIsLoading(true);
    setError(null);
    try {
      // 发送 GET 请求到 /api/articles 接口，参数为文章路径
      const response = await fetch(`/api/articles?path=${encodeURIComponent(articlePath)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      // 将响应数据解析为 JSON 格式
      const data = await response.json();
      // 更新文章状态
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Failed to fetch article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 处理输入框的变化，更新文章状态。
   * @param {Object} e - 事件对象。
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  /**
   * 保存文章到服务器。
   */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 发送 POST 请求到 /api/articles 接口，参数为文章对象
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article }),
      });
      if (!response.ok) {
        throw new Error('Failed to save article');
      }
      // 弹出提示框，显示保存成功
      alert('Article saved successfully');
      // 保存成功后跳转到文章列表页面
      window.location.href = '/admin/articles';
    } catch (error) {
      console.error('Error saving article:', error);
      setError('Failed to save article. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // 如果文章正在加载，显示加载中提示
  if (isLoading) return <div>Loading article...</div>;
  // 如果发生错误，显示错误信息
  if (error) return <div>Error: {error}</div>;

  // 渲染文章编辑表单
  return (
    <div className="space-y-4">
      {/* 文章标题输入框 */}
      <Input
        name="title"
        value={article.title}
        onChange={handleInputChange}
        placeholder="Article Title"
      />
      {/* 文章描述输入框 */}
      <Input
        name="description"
        value={article.description}
        onChange={handleInputChange}
        placeholder="Article Description"
      />
      {/* 文章内容文本域 */}
      <Textarea
        name="content"
        value={article.content}
        onChange={handleInputChange}
        placeholder="Article Content"
        rows={20}
      />
      {/* 保存文章按钮 */}
      <div className="relative">
        {isSaving && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded">Saving...</div>
          </div>
        )}
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Article'}
        </Button>
      </div>
    </div>
  );
}