import { NextResponse } from 'next/server';

/**
 * 处理用户注销请求的 POST 路由
 * 当用户请求注销时，此路由会清除用户的认证令牌 cookie，使用户登出
 * @returns {NextResponse} 包含成功注销信息的响应对象
 */
export async function POST() {
  // 创建一个包含成功注销信息的 JSON 响应，状态码为 200
  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

  // 设置一个 cookie，名为 auth_token，值为空字符串，表示清除用户的认证令牌
  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    // 如果环境是生产环境，则设置 secure 属性为 true，确保 cookie 仅通过 HTTPS 传输
    secure: process.env.NODE_ENV === 'production',
    // 设置 sameSite 属性为 strict，确保 cookie 仅在同一站点的请求中发送
    sameSite: 'strict',
    // 设置 maxAge 属性为 0，表示立即过期
    maxAge: 0,
    // 设置 cookie 的路径为 /，表示在整个站点都有效
    path: '/',
  });

  // 返回响应对象，完成注销操作
  return response;
}