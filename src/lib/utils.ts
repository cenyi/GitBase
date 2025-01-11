// 导入 clsx 库，用于条件性地加入 CSS 类名
import { type ClassValue, clsx } from "clsx";
// 导入 tailwind-merge 库，用于合并多个 CSS 类名
import { twMerge } from "tailwind-merge";

/**
 * 合并并返回传入的 CSS 类名。
 * @param inputs - 要合并的 CSS 类名数组。
 * @returns 合并后的 CSS 类名字符串。
 */
export function cn(...inputs: ClassValue[]) {
  // 使用 twMerge 函数合并 clsx 函数处理后的类名
  return twMerge(clsx(inputs));
}