// 导入 React 库
import * as React from "react";

// 导入 cn 工具函数，用于处理 CSS 类名的合并
import { cn } from "@/lib/utils";

/**
 * Input 组件的属性。
 * 继承自 React.InputHTMLAttributes，包含所有 HTML 输入元素的属性。
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * 可重用的输入组件。
 * @param {InputProps} props - 输入组件的属性。
 * @param {React.Ref<HTMLInputElement>} ref - 输入元素的引用。
 * @returns {JSX.Element} - 渲染的输入元素。
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // 使用 cn 函数合并默认类名和传入的类名
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

// 设置 Input 组件的显示名称，便于调试和识别
Input.displayName = "Input";

// 导出 Input 组件，供其他组件使用
export { Input };
