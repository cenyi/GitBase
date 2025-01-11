import fs from 'fs' // 导入文件系统模块
import path from 'path' // 导入路径处理模块
import matter from 'gray-matter' // 导入 gray-matter 模块，用于解析 Markdown 文件的元数据
import { remark } from 'remark' // 导入 remark 模块，用于将 Markdown 转换为 HTML
import html from 'remark-html' // 导入 remark-html 模块，用于将 Markdown 转换为 HTML

const postsDirectory = path.join(process.cwd(), 'data', 'md') // 定义存储 Markdown 文件的目录路径

/**
 * 获取按日期排序的所有文章数据。
 *
 * @returns {Array} 包含所有文章数据的数组，按日期降序排列。
 */
export function getSortedPostsData() {
  // 获取 /data/md 目录下的所有文件名
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // 从文件名中去除 .md 后缀以获取 id
    const id = fileName.replace(/\.md$/, '')

    // 读取 Markdown 文件内容
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 使用 gray-matter 解析文章元数据
    const matterResult = matter(fileContents)

    // 将数据与 id 组合
    return {
      id,
      title: matterResult.data.title,
      description: matterResult.data.description,
      date: matterResult.data.date,
    }
  })
  // 按日期对文章进行排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * 根据 slug 获取文章数据。
 *
 * @param {string} slug - 文章的唯一标识符。
 * @returns {Object} 包含文章数据的对象，包括 HTML 内容、元数据和 slug。
 */
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 使用 gray-matter 解析文章元数据
  const matterResult = matter(fileContents);

  // 使用 remark 将 Markdown 转换为 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 组合数据与 id 和 contentHtml
  return {
    slug,
    contentHtml,
    title: matterResult.data.title,
    description: matterResult.data.description,
    date: matterResult.data.date,
    // ... 任何其他你想要包含的字段
  };
}

/**
 * 根据 id 获取文章数据。
 *
 * @param {string} id - 文章的唯一标识符。
 * @returns {Object} 包含文章数据的对象，包括 HTML 内容、元数据和 id。
 */
export async function getPostData2(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用 gray-matter 解析文章元数据
  const matterResult = matter(fileContents)

  // 使用 remark 将 Markdown 转换为 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // 组合数据与 id 和 contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}