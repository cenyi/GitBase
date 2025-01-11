"use client"

// 导入 React 库
import * as React from "react";
// 导入 Radix UI 的 DropdownMenu 组件及其相关子组件
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
// 导入 Lucide React 图标库中的一些图标
import { Check, ChevronRight, Circle } from "lucide-react";
// 导入一个工具函数，用于生成 CSS 类名
import { cn } from "@/lib/utils";

// 定义 DropdownMenu 组件，它是 Radix UI 的 DropdownMenu 根组件的封装
const DropdownMenu = DropdownMenuPrimitive.Root;

// 定义 DropdownMenuTrigger 组件，它是触发下拉菜单的按钮或元素
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// 定义 DropdownMenuGroup 组件，它用于将下拉菜单项分组
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

// 定义 DropdownMenuPortal 组件，它用于将下拉菜单内容渲染到 DOM 中的不同位置
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

// 定义 DropdownMenuSub 组件，它用于创建子菜单
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

// 定义 DropdownMenuRadioGroup 组件，它用于创建单选按钮组
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// 定义 DropdownMenuSubTrigger 组件，它是子菜单的触发器
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
// 设置 DropdownMenuSubTrigger 组件的显示名称，以便在调试时识别
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

// 定义 DropdownMenuSubContent 组件，它是子菜单的内容部分
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
// 设置 DropdownMenuSubContent 组件的显示名称，以便在调试时识别
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

// 定义 DropdownMenuContent 组件，它是下拉菜单的内容部分
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
// 设置 DropdownMenuContent 组件的显示名称，以便在调试时识别
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// 定义 DropdownMenuItem 组件，它是下拉菜单项
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
// 设置 DropdownMenuItem 组件的显示名称，以便在调试时识别
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// 定义 DropdownMenuCheckboxItem 组件，它是带有复选框的下拉菜单项
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
// 设置 DropdownMenuCheckboxItem 组件的显示名称，以便在调试时识别
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

// 定义 DropdownMenuRadioItem 组件，它是带有单选按钮的下拉菜单项
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
// 设置 DropdownMenuRadioItem 组件的显示名称，以便在调试时识别
DropdownMenuRadioItem.displayName =
  DropdownMenuPrimitive
