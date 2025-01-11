import { NextResponse } from 'next/server'; // 导入Next.js的NextResponse模块
import { verifyToken } from '@/lib/auth'; // 从@/lib/auth模块导入verifyToken函数

/**
 * 处理GET请求的函数，用于检查用户是否已登录
 * @param {Request} request - 传入的请求对象
 * @returns {NextResponse} - 返回一个包含isLoggedIn状态的JSON响应
 */
export async function GET(request) {
  const token = request.cookies.get('auth_token')?.value; // 从请求的cookie中获取auth_token的值
  const isLoggedIn = token ? verifyToken(token) : false; // 如果存在token，则验证token，否则isLoggedIn为false

  return NextResponse.json({ isLoggedIn }); // 返回一个JSON响应，包含isLoggedIn状态
}