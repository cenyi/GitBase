// 导入 NextResponse 模块，用于处理请求和响应
import { NextResponse } from 'next/server';
// 导入 verifyToken 模块，用于验证 token 的有效性
import { verifyToken } from './src/lib/auth';

/**
 * 中间件函数，用于处理请求和响应
 * @param {Request} request - 请求对象
 * @returns {NextResponse} - 响应对象
 */
export function middleware(request) {
  // 获取请求的路径
  const path = request.nextUrl.pathname;

  // 检查以 /admin 或 /admin/resources 开头的路径的认证
  if (path.startsWith('/admin') && !path.startsWith('/admin/resources')) {
    // 从 cookie 中获取 auth_token
    const token = request.cookies.get('auth_token')?.value;
    // 验证 token 是否有效
    const isLoggedIn = token && verifyToken(token);

    // 如果未登录，重定向到登录页面
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 继续处理请求
  return NextResponse.next();
}

/**
 * 配置对象，用于指定中间件的匹配规则
 */
export const config = {
  // 匹配所有以 /admin 开头的路径
  matcher: [
    '/admin/:path*',
    '/admin/resources/:path*',
  ],
};