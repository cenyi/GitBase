// components/Footer.js
import Link from 'next/link';

/**
 * 定义一个名为 Footer 的 React 组件，用于渲染页面的页脚部分。
 * 
 * @returns {JSX.Element} 渲染的页脚组件。
 */
export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">About</h3>
            <p className="mt-2 text-base text-gray-500">
              GitBase is an open-source dynamic website solution without a traditional database, built with Next.js and powered by GitHub.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-1 space-y-1">
              <li>
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
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Connect</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <a href="https://gitbase.app/" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
                  GitBase
                </a>
              </li>
              <li>
                <a href="https://github.com/qiayue/gitbase" target="_blank" className="text-base text-gray-500 hover:text-gray-900">
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
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Legal</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <Link href="/privacy-policy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Links</h3>
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
        <div className="mt-2 border-t border-gray-200 pt-2">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} GitBase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}