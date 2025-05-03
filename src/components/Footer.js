// components/Footer.js
import Link from 'next/link';

/**
 * 定义一个名为 Footer 的 React 组件，用于渲染页面的页脚部分。
 * 
 * @returns {JSX.Element} 渲染的页脚组件。
 */
{/* 页脚容器：使用渐变背景和顶部边框，支持暗黑模式切换 */}
    {/* bg-gradient-to-b: 垂直渐变背景 from-gray-50 to-gray-100: 浅色渐变 */}
    {/* dark:from-gray-800 dark:to-gray-900: 暗黑模式下的深色渐变 */}
export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* 响应式网格布局：移动端单列，桌面端7列 */}
        {/* grid-cols-1: 移动端单列 md:grid-cols-7: 桌面端7列 gap-8: 列间距 */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-4">About</h3>
            <p className="mt-2 text-base text-gray-500">
              GitBase is an open-source dynamic website solution without a traditional database, built with Next.js and powered by GitHub.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-4"></h3>
            <p className="mt-2 text-base text-gray-500">
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="mt-1 space-y-1">
              <li>
                {/* Next.js Link组件用于客户端导航，避免页面刷新 */}
                <Link href="/" className="text-base text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-base text-gray-500 hover:text-gray-900">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-base text-gray-500 hover:text-gray-900">
                  Articles
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-4">Connect</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <a href="https://gitbase.app/" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
                  GitBase
                </a>
              </li>
              <li>
                <a href="https://github.com/cenyi/GitBase/tree/my-master" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/gefei55" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-4">Links</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  Link 3
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {/* 动态生成当前年份的版权信息 */}
            &copy; {new Date().getFullYear()} GitBase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}