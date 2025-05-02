// components/Layout.js
import { Navigation } from './Navigation' // 导入 Navigation 组件
import { Footer } from '@/components/Footer' // 导入 Footer 组件

/**
 * Layout 组件，用于渲染页面的布局结构。
 * 它包含一个导航栏、一个主内容区域和一个页脚。
 *
 * @param {ReactNode} children - 要渲染的子组件。
 * @returns {JSX.Element} - 渲染的布局组件。
 */
export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col"> {/* 应用背景样式的容器 */}
      <Navigation /> {/* 导航栏组件 */}
      <main className="flex-1">{children}</main> {/* 主内容区域，flex-1 使其填满剩余空间 */}
      <Footer className="mt-auto" /> {/* 页脚组件，使用mt-auto固定在底部 */}
    </div>
  )
}