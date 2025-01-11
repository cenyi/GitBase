import * as React from "react" // 导入 React 库

import { cn } from "@/lib/utils" // 导入 cn 工具函数，用于处理 CSS 类名

/**
 * Textarea 组件的属性。
 * 继承自 React.TextareaHTMLAttributes，并扩展了自定义属性。
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * 可重用的 Textarea 组件。
 * @param {TextareaProps} props - Textarea 组件的属性。
 * @param {React.Ref<HTMLTextAreaElement>} ref - 组件的 ref。
 * @returns {JSX.Element} - 渲染的 Textarea 组件。
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

// 定义 Textarea 组件的显示名称，用于调试和日志记录
Textarea.displayName = "Textarea"

// 导出 Textarea 组件，使其可以在其他地方使用
export { Textarea }
