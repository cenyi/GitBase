// 导入 React 库
import * as React from "react";
// 导入 cn 工具函数，用于处理 CSS 类名
import { cn } from "@/lib/utils";

/**
 * 表格组件，用于渲染表格。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableElement>} [props.ref] - 表格的引用。
 * @returns {JSX.Element} - 渲染的表格组件。
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
// 定义组件的显示名称
Table.displayName = "Table";

/**
 * 表格头部组件，用于渲染表格的头部。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableSectionElement>} [props.ref] - 表格头部的引用。
 * @returns {JSX.Element} - 渲染的表格头部组件。
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
// 定义组件的显示名称
TableHeader.displayName = "TableHeader";

/**
 * 表格主体组件，用于渲染表格的主体部分。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableSectionElement>} [props.ref] - 表格主体的引用。
 * @returns {JSX.Element} - 渲染的表格主体组件。
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
// 定义组件的显示名称
TableBody.displayName = "TableBody";

/**
 * 表格页脚组件，用于渲染表格的页脚部分。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableSectionElement>} [props.ref] - 表格页脚的引用。
 * @returns {JSX.Element} - 渲染的表格页脚组件。
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
// 定义组件的显示名称
TableFooter.displayName = "TableFooter";

/**
 * 表格行组件，用于渲染表格的行。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableRowElement>} [props.ref] - 表格行的引用。
 * @returns {JSX.Element} - 渲染的表格行组件。
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
// 定义组件的显示名称
TableRow.displayName = "TableRow";

/**
 * 表格头部单元格组件，用于渲染表格的头部单元格。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableCellElement>} [props.ref] - 表格头部单元格的引用。
 * @returns {JSX.Element} - 渲染的表格头部单元格组件。
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
// 定义组件的显示名称
TableHead.displayName = "TableHead";

/**
 * 表格单元格组件，用于渲染表格的单元格。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableCellElement>} [props.ref] - 表格单元格的引用。
 * @returns {JSX.Element} - 渲染的表格单元格组件。
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
// 定义组件的显示名称
TableCell.displayName = "TableCell";

/**
 * 表格标题组件，用于渲染表格的标题。
 * @param {Object} props - 组件的属性。
 * @param {string} [props.className] - 额外的 CSS 类名。
 * @param {React.Ref<HTMLTableCaptionElement>} [props.ref] - 表格标题的引用。
 * @returns {JSX.Element} - 渲染的表格标题组件。
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
// 定义组件的显示名称
TableCaption.displayName = "TableCaption";

// 导出所有的表格组件
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
