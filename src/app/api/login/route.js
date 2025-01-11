import { NextResponse } from 'next/server'; // 导入Next.js的NextResponse模块，用于创建响应
import { createToken } from '@/lib/auth'; // 从@/lib/auth模块导入createToken函数，用于生成令牌

/**
 * 处理POST请求的函数，用于用户登录。
 * 如果密码正确，将创建一个令牌并将其设置在Cookie中，然后返回一个成功的响应。
 * 如果密码不正确，将返回一个401 Unauthorized的响应。
 * 
 * @param {Request} request - 包含请求信息的对象。
 * @returns {NextResponse} - 根据登录结果返回的响应对象。
 */
export async function POST(request) {
  const { password } = await request.json(); // 从请求体中获取密码
  
  // 检查密码是否与环境变量中的访问密码匹配
  if (password === process.env.ACCESS_PASSWORD) {
    const token = createToken(); // 创建一个令牌
    
    // 创建一个JSON响应，包含成功消息和状态码200
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

    // 在响应的Cookie中设置令牌
    response.cookies.set({
      name: 'auth_token', // Cookie的名称
      value: token, // Cookie的值，即令牌
      httpOnly: true, // 标记为HTTP only，防止客户端脚本访问
      secure: process.env.NODE_ENV === 'production', // 在生产环境中设置为安全Cookie
      sameSite: 'strict', // 防止跨站请求伪造
      maxAge: 3600, // Cookie的过期时间，单位为秒（这里是1小时）
      path: '/', // Cookie的路径，设置为根路径
    });

    return response;
  } else {
    // 如果密码不正确，返回一个JSON响应，包含错误消息和状态码401
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }
}