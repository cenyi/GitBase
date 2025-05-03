'use client'

// 导入 React 的 useState 和 useEffect 钩子
import { useState, useEffect } from 'react';
// 导入 Next.js 的 Link 组件，用于实现客户端路由
import Link from 'next/link';
// 导入 Next.js 的 usePathname 和 useRouter 钩子，用于获取当前路由和导航
import { usePathname, useRouter } from 'next/navigation';
// 导入 lucide-react 的 Github 图标
import { Github } from 'lucide-react';
// 导入 @/lib/utils 中的 cn 函数，用于条件性地加入 CSS 类名
import { cn } from "@/lib/utils";
// 导入 @/components/ui/button 中的 Button 组件
import { Button } from "@/components/ui/button";

// 定义导航项数组
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/resources', label: 'Resources' },
  { path: '/about', label: 'About' },
];

// 定义 Navigation 组件
export function Navigation() {
  // 使用 usePathname 钩子获取当前路由路径
  const pathname = usePathname();
  // 使用 useRouter 钩子获取路由实例
  const router = useRouter();
  // 使用 useState 钩子管理登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 使用 useState 钩子管理加载状态
  const [isLoading, setIsLoading] = useState(true);

  // 使用 useEffect 钩子在组件挂载后检查登录状态
  useEffect(() => {
    let isMounted = true;
    const checkLoginStatus = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        // 发送请求到 /api/check-auth 端点检查用户是否已登录
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        if (isMounted) setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkLoginStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  // 定义处理登出的函数
  const handleLogout = async () => {
    try {
      // 发送 POST 请求到 /api/logout 端点执行登出操作
      await fetch('/api/logout', { method: 'POST' });
      setIsLoggedIn(false);
      // 登出后重定向到首页
      router.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // 返回 Navigation 组件的 JSX 结构
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="inline-block font-bold text-lg group-hover:text-blue-600 transition-colors">GitBase</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  item.path === pathname && "text-foreground font-semibold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/cenyi/GitBase/tree/my-master"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-600 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          {!isLoading && (
            isLoggedIn ? (
              <>
                <Link href="/admin/resources">
                  <Button variant="ghost">Admin</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              </>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  )
}