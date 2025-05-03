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
      router.push('/admin/resources');
    } else {
      // 如果登录失败，显示错误消息
      alert('Invalid password');
    }
  };

  // 渲染登录页面
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Portal</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your password to access the admin dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}