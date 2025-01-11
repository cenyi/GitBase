// 导入 React 库和 cn 函数，用于生成类名
import React from "react";
import { cn } from "@/lib/utils";

// 定义一个名为 Card 的组件，它接受一个 ref 和一些属性，并返回一个 div 元素
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // 使用 cn 函数生成类名，并将 ref 和其他属性传递给 div 元素
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));

// 设置 Card 组件的 displayName，用于在调试时显示组件的名称
Card.displayName = "Card";

// 定义一个名为 CardHeader 的组件，它接受一个 ref 和一些属性，并返回一个 div 元素
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // 使用 cn 函数生成类名，并将 ref 和其他属性传递给 div 元素
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

// 设置 CardHeader 组件的 displayName，用于在调试时显示组件的名称
CardHeader.displayName = "CardHeader";

// 定义一个名为 CardTitle 的组件，它接受一个 ref 和一些属性，并返回一个 h3 元素
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  // 使用 cn 函数生成类名，并将 ref 和其他属性传递给 h3 元素
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));

// 设置 CardTitle 组件的 displayName，用于在调试时显示组件的名称
CardTitle.displayName = "CardTitle";

// 定义一个名为 CardDescription 的组件，它接受一个 ref 和一些属性，并返回一个 p 元素
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  // 使用 cn 函数生成类名，并将 ref 和其他属性传递给 p 元素
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

// 设置 CardDescription 组件的 displayName，用于在调试时显示组件的名称
CardDescription.displayName = "CardDescription";

// 定义一个名为 CardContent 的组件，它接受一个 ref 和一些属性，并返回一个 div 元素
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // 使用 cn 函数生成类名，并将 ref 和其他属性传递给 div 元素
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

// 设置 CardContent 组件的 displayName，用于在调试时显示组件的名称
CardContent.displayName = "CardContent";

// 定义一个名为 CardFooter 的组件，它接受一个 ref 和一些属性，并返回一个 div 元素
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // 使用 cn 函数生成类名，并将 ref 和其他属性传递给 div 元素
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

// 设置 CardFooter 组件的 displayName，用于在调试时显示组件的名称
CardFooter.displayName = "CardFooter";

// 导出 Card、CardHeader、CardFooter、CardTitle、CardDescription 和 CardContent 组件
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
