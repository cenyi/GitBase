/**
 * 实现了一个可重用的 UI 组件，用于在网页中显示警告信息
 */
// 导入 React 库
import * as React from "react";
// 导入 class-variance-authority 库中的 cva 和 VariantProps 类型
import { cva, type VariantProps } from "class-variance-authority";
// 导入 cn 工具函数，用于生成类名
import { cn } from "@/lib/utils";

// 定义 alert 组件的样式变体
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// 定义 Alert 组件，它是一个可重用的 UI 组件，用于显示警告信息
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
// 设置 Alert 组件的显示名称，用于调试和日志记录
Alert.displayName = "Alert";

// 定义 AlertTitle 组件，用于显示警告标题
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
// 设置 AlertTitle 组件的显示名称，用于调试和日志记录
AlertTitle.displayName = "AlertTitle";

// 定义 AlertDescription 组件，用于显示警告描述信息
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
// 设置 AlertDescription 组件的显示名称，用于调试和日志记录
AlertDescription.displayName = "AlertDescription";

// 导出 Alert、AlertTitle 和 AlertDescription 组件，以便在其他地方使用
export { Alert, AlertTitle, AlertDescription };
