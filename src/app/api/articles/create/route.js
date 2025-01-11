import { NextResponse } from 'next/server'; // 导入Next.js的NextResponse模块，用于创建响应
import { Octokit } from '@octokit/rest'; // 导入Octokit库，用于与GitHub API交互
import matter from 'gray-matter'; // 导入matter库，用于解析Markdown文件的元数据

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN // 创建一个Octokit实例，使用环境变量中的GitHub令牌进行认证
});

const owner = process.env.GITHUB_OWNER; // 从环境变量中获取GitHub仓库的所有者
const repo = process.env.GITHUB_REPO; // 从环境变量中获取GitHub仓库的名称
const articlesJsonPath = 'data/json/articles.json'; // 定义存储文章列表的JSON文件路径
const mdFolderPath = 'data/md'; // 定义存储Markdown文件的文件夹路径

/**
 * 创建新文章的API路由处理函数
 * @param {Request} request - 包含文章数据的请求对象
 * @returns {NextResponse} - 创建成功或失败的响应
 */
export async function POST(request) {
  // 从请求中提取文章的标题、描述、内容和slug
  const { title, description, content, slug } = await request.json();

  // 验证slug是否符合规范
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    // 如果slug格式无效，返回400错误响应
    return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 });
  }

  // 根据slug生成Markdown文件的路径
  const path = `data/md/${slug}.md`;

  try {
    // 检查文件是否已存在
    try {
      // 尝试获取仓库中指定路径的内容
      await octokit.repos.getContent({
        owner,
        repo,
        path,
      });
      // 如果文件已存在，返回400错误响应
      return NextResponse.json({ error: 'Article with this slug already exists' }, { status: 400 });
    } catch (error) {
      // 如果获取内容时发生错误，并且错误状态不是404（未找到）
      if (error.status !== 404) {
        // 抛出错误，以便进一步处理
        throw error;
      }
    }

    // 创建新文件
    const fileContent = matter.stringify(content, {
      title,
      description,
      date: new Date().toISOString(),
    });

    // 将新文件内容提交到GitHub仓库
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Create new article: ${title}`,
      content: Buffer.from(fileContent).toString('base64'),
    });

    // 同步文章
    await syncArticles();

    // 返回创建成功的响应
    return NextResponse.json({ message: 'Article created successfully' });
  } catch (error) {
    // 记录错误信息
    console.error('Error creating article:', error);
    // 返回创建文章失败的响应
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

/**
 * 同步文章列表的函数
 * @throws {Error} 如果同步过程中发生错误
 */
async function syncArticles() {
  try {
    // 通过 GitHub API 获取指定仓库中的所有文件
    const { data: files } = await octokit.repos.getContent({
      owner,
      repo,
      path: mdFolderPath,
    });

    // 过滤出所有以 .md 结尾的文件
    const mdFiles = files.filter(file => file.name.endsWith('.md'));

    // 遍历所有 Markdown 文件，提取文章信息
    const articles = await Promise.all(mdFiles.map(async file => {
      // 获取每个 Markdown 文件的内容
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: file.path,
      });

      // 将文件内容从 base64 解码为 UTF-8 字符串
      const content = Buffer.from(data.content, 'base64').toString('utf8');

      // 使用 matter.js 解析 Markdown 文件的 front matter 和内容
      const { data: frontMatter, content: articleContent } = matter(content);

      // 获取该文件的最后一次提交信息
      const { data: commits } = await octokit.repos.listCommits({
        owner,
        repo,
        path: file.path,
        per_page: 1
      });

      // 获取最后一次提交的日期，如果没有提交则使用文件的 SHA 值
      const lastModified = commits[0]?.commit.committer.date || data.sha;

      // 返回文章的相关信息
      return {
        title: frontMatter.title,
        description: frontMatter.description,
        date: frontMatter.date,
        lastModified: lastModified,
        path: file.path,
      };
    }));

    // 获取当前的 articles.json 文件内容
    const { data: currentFile } = await octokit.repos.getContent({
      owner,
      repo,
      path: articlesJsonPath,
    });

    // 更新 articles.json 文件，将新的文章列表写入
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: articlesJsonPath,
      message: 'Sync articles',
      content: Buffer.from(JSON.stringify(articles, null, 2)).toString('base64'),
      sha: currentFile.sha,
    });

  } catch (error) {
    // 捕获并打印错误信息
    console.error('Error syncing articles:', error);
    // 重新抛出错误，以便调用者处理
    throw error;
  }
}