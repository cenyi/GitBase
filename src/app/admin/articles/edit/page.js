'use client';

// 引入 React 库中的 useState、useEffect、useCallback 和 Suspense 钩子
import { useState, useEffect, useCallback, Suspense } from 'react';
// 引入 Next.js 的 useRouter 钩子，用于处理路由
import { useRouter } from 'next/navigation';
// 引入 dynamic 函数，用于动态加载组件
import dynamic from 'next/dynamic';
// 引入自定义组件 Button、Input 和 Textarea
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 动态加载 ArticleEditor 组件，设置 ssr 为 false，表示该组件不在服务器端渲染
const ArticleEditor = dynamic(() => import('@/components/ArticleEditor'), {
  ssr: false,
});

/**
 * 文章编辑页面组件。
 * 该组件检查用户是否已登录，并在登录状态下显示文章编辑器。
 * @returns {JSX.Element} 渲染的文章编辑页面。
 */
export default function ArticleEditorPage() {
  // 定义状态变量 isLoading，初始值为 true
  const [isLoading, setIsLoading] = useState(true);
  // 定义状态变量 error，初始值为 null
  const [error, setError] = useState(null);
  // 使用 useRouter 钩子获取路由实例
  const router = useRouter();

  /**
   * 检查用户是否已登录的回调函数。
   * 如果用户未登录，则重定向到登录页面。
   * @returns {Promise<void>} 一个 Promise，表示检查完成。
   */
  const checkAuth = useCallback(async () => {
    try {
      // 发送请求到 /api/check-auth 端点检查用户是否已登录
      const response = await fetch('/api/check-auth');
      // 将响应解析为 JSON 格式
      const data = await response.json();
      // 如果用户未登录，使用 router.push 方法重定向到登录页面
      if (!data.isLoggedIn) {
        router.push('/login');
      } else {
        // 如果用户已登录，设置 isLoading 为 false，表示加载完成
        setIsLoading(false);
      }
    } catch (error) {
      // 如果检查登录状态时发生错误，记录错误并设置 isLoading 为 false
      console.error('Error checking auth:', error);
      setError('Failed to authenticate. Please try again.');
      setIsLoading(false);
    }
  }, [router]);

  // 在组件挂载时调用 checkAuth 函数
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 如果 isLoading 为 true，显示加载中提示
  if (isLoading) return <div className="container mx-auto p-4">Loading...</div>;
  // 如果 error 不为 null，显示错误信息
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

  // 渲染文章编辑页面
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      {/* 使用 Suspense 组件加载 ArticleEditor 组件，并在加载时显示 fallback 内容 */}
      <Suspense fallback={<div>Loading editor...</div>}>
        <ArticleEditor />
      </Suspense>
    </div>
  );
}