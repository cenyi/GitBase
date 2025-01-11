// 导入 React 库
import * as React from "react";
// 导入 Radix UI 的 Slot 组件
import { Slot } from "@radix-ui/react-slot";
// 导入 class-variance-authority 库的 cva 函数
import { cva, type VariantProps } from "class-variance-authority";
// 导入工具函数 cn
import { cn } from "@/lib/utils";

// 使用 cva 定义按钮的样式变体
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 定义 Button 组件的属性
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  // 指示是否将子组件渲染为 Slot 的子组件
  asChild?: boolean;
}

// 创建 Button 组件
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // 根据 asChild 属性决定使用的组件
    const Comp = asChild ? Slot : "button";
    // 使用 cn 函数合并 className 和样式变体
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
// 设置 Button 组件的显示名称
Button.displayName = "Button";

// 导出 Button 组件和样式变体
export { Button, buttonVariants };
