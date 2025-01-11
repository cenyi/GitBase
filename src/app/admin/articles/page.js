'use client';

// 引入 React 相关的库
import { useState, useEffect, useCallback } from 'react';
// 引入 Next.js 的路由相关的库
import { useRouter } from 'next/navigation';
// 引入 Next.js 的 Link 组件
import Link from 'next/link';
// 引入自定义的 Button 组件
import { Button } from "@/components/ui/button";
// 引入自定义的 Table 组件
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/**
 * 管理文章的页面组件。
 * 
 * @returns {JSX.Element} 渲染的组件。
 */
export default function AdminArticlesPage() {
  // 定义状态变量来存储文章列表
  const [articles, setArticles] = useState([]);
  // 定义状态变量来指示是否正在加载文章
  const [isLoading, setIsLoading] = useState(true);
  // 定义状态变量来存储错误信息
  const [error, setError] = useState(null);
  // 获取路由实例
  const router = useRouter();

  /**
   * 检查用户是否已登录。
   * 如果未登录，则重定向到登录页面。
   */
  const checkAuth = useCallback(async () => {
    try {
      // 发送请求到 /api/check-auth 端点来检查用户是否已登录
      const response = await fetch('/api/check-auth');
      const data = await response.json();
      // 如果用户未登录
      if (!data.isLoggedIn) {
        // 重定向到登录页面
        router.push('/login');
      }
    } catch (error) {
      // 如果检查登录状态时发生错误，记录错误并重定向到登录页面
      console.error('Error checking auth:', error);
      router.push('/login');
    }
  }, [router]);

  /**
   * 获取文章列表。
   * @param {boolean} sync - 是否同步获取文章。
   */
  const fetchArticles = useCallback(async (sync = false) => {
    // 设置加载状态为 true
    setIsLoading(true);
    // 清除错误状态
    setError(null);
    try {
      // 发送请求到 /api/articles 端点来获取文章列表
      const response = await fetch(`/api/articles${sync ? '?sync=true' : ''}`);
      // 如果响应状态不是 ok
      if (!response.ok) {
        // 抛出错误
        throw new Error('Failed to fetch articles');
      }
      // 获取响应数据并转换为 JSON
      const data = await response.json();
      // 更新文章列表状态
      setArticles(data);
    } catch (error) {
      // 如果获取文章时发生错误，记录错误
      console.error('Error fetching articles:', error);
      // 设置错误状态
      setError('Failed to fetch articles. Please try again.');
    } finally {
      // 无论成功或失败，都设置加载状态为 false
      setIsLoading(false);
    }
  }, []);

  /**
   * 组件挂载后，检查用户是否已登录并获取文章列表。
   */
  useEffect(() => {
    // 检查用户是否已登录
    checkAuth();
    // 获取文章列表
    fetchArticles();
  }, [checkAuth, fetchArticles]);

  /**
   * 处理同步文章的操作。
   */
  const handleSync = useCallback(() => {
    // 调用获取文章的函数，并传入参数 true 表示同步获取
    fetchArticles(true);
  }, [fetchArticles]);

  // 如果正在加载文章，显示加载中的提示
  if (isLoading) return <div className="container mx-auto p-4">Loading...</div>;
  // 如果发生错误，显示错误信息
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

  // 渲染页面
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Article Management</h1>
      <div className="mb-4 flex justify-between">
        <Link href="/admin">
          <Button>Back to Admin Dashboard</Button>
        </Link>
        <div>
          <Button onClick={handleSync} className="mr-2">Sync Articles</Button>
          <Link href="/admin/articles/create">
            <Button>Create New Article</Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article, index) => (
            <TableRow key={index}>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.description}</TableCell>
              <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(article.lastModified).toLocaleString()}</TableCell>
              <TableCell>
                <Link href={`/admin/articles/edit?path=${encodeURIComponent(article.path)}`}>
                  <Button>Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}