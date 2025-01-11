'use client'

// 导入 useState 钩子，用于管理组件的状态
import { useState } from 'react';
// 导入 useRouter 钩子，用于在客户端路由
import { useRouter } from 'next/navigation';

/**
 * 登录页面组件。
 * 这个组件显示一个表单，用户可以输入密码进行登录。
 * 如果密码正确，用户将被重定向到管理页面。
 * 如果密码不正确，会显示一个错误消息。
 * 
 * @returns {JSX.Element} 渲染的登录页面。
 */
export default function LoginPage() {
  // 使用 useState 钩子来管理密码状态
  const [password, setPassword] = useState('');
  // 使用 useRouter 钩子来获取路由实例
  const router = useRouter();

  /**
   * 处理表单提交事件。
   * 当用户提交表单时，这个函数会被调用。
   * 它会发送一个 POST 请求到 /api/login 端点，并根据响应来处理登录。
   * 
   * @param {Event} e - 表单提交事件。
   */
  const handleSubmit = async (e) => {
    // 阻止表单的默认提交行为
    e.preventDefault();
    // 发送 POST 请求到 /api/login 端点
    const response = await fetch('/api/login', {
      // 请求方法为 POST
      method: 'POST',
      // 请求头设置为 JSON 类型
      headers: { 'Content-Type': 'application/json' },
      // 请求体为包含密码的 JSON 字符串
      body: JSON.stringify({ password }),
    });

    // 如果响应状态码为 200，表示登录成功
    if (response.ok) {
      // 使用 router.push 方法导航到 /admin 页面
      router.push('/admin');
    } else {
      // 如果登录失败，显示错误消息
      alert('Invalid password');
    }
  };

  // 渲染登录页面
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}