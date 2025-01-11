import { NextResponse } from 'next/server'; // 导入Next.js的NextResponse类，用于构建HTTP响应
import { Octokit } from '@octokit/rest'; // 导入Octokit库，用于与GitHub API进行交互
import matter from 'gray-matter'; // 导入matter库，用于解析Markdown文件的元数据和内容

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN // 创建一个Octokit实例，并使用环境变量中的GitHub令牌进行身份验证
});

const owner = process.env.GITHUB_OWNER; // 从环境变量中获取GitHub仓库的所有者
const repo = process.env.GITHUB_REPO; // 从环境变量中获取GitHub仓库的名称
const articlesJsonPath = 'data/json/articles.json'; // 定义存储文章列表的JSON文件路径
const mdFolderPath = 'data/md'; // 定义存储Markdown文件的文件夹路径

/**
 * 处理GET请求，用于获取文章列表或单个文章。
 * 如果提供了`path`参数，则返回指定路径的文章内容。
 * 如果`sync`参数为`true`，则同步更新文章列表。
 * @param {Request} request - 请求对象。
 * @returns {NextResponse} - 包含文章数据或错误信息的响应。
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url); // 解析请求URL中的查询参数
  const sync = searchParams.get('sync'); // 获取`sync`参数的值
  const path = searchParams.get('path'); // 获取`path`参数的值

  try {
    if (path) {
      // Fetch single article
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path: decodeURIComponent(path), // 解码路径参数，因为URL中的路径是经过编码的
        });

        const content = Buffer.from(data.content, 'base64').toString('utf8'); // 将Base64编码的内容解码为UTF-8字符串
        const { data: frontMatter, content: articleContent } = matter(content); // 使用matter解析Markdown文件的元数据和内容

        return NextResponse.json({
          ...frontMatter,
          content: articleContent,
          path: data.path,
        });
      } catch (error) {
        console.error('Error fetching article:', error); // 记录错误信息
        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 }); // 返回错误响应
      }
    } else if (sync === 'true') {
      await syncArticles(); // 如果`sync`参数为`true`，则同步更新文章列表
    }

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: articlesJsonPath,
    });

    const content = Buffer.from(data.content, 'base64').toString('utf8');
    const articles = JSON.parse(content);

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

/**
 * 处理POST请求，用于更新文章。
 * @param {Request} request - 请求对象。
 * @returns {NextResponse} - 包含更新结果的响应。
 */
export async function POST(request) {
  const { article } = await request.json(); // 从请求体中获取文章数据

  try {
    // Update the MD file
    await updateMdFile(article); // 更新Markdown文件

    // Sync articles
    await syncArticles(); // 同步更新文章列表

    return NextResponse.json({ message: 'Article updated successfully' }); // 返回成功响应
  } catch (error) {
    console.error('Error updating article:', error); // 记录错误信息
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 }); // 返回错误响应
  }
}

/**
 * 同步更新文章列表。
 * @throws {Error} - 如果同步过程中发生错误。
 */
async function syncArticles() {
  try {
    // Fetch all MD files
    const { data: files } = await octokit.repos.getContent({
      owner,
      repo,
      path: mdFolderPath,
    });

    const mdFiles = files.filter(file => file.name.endsWith('.md')); // 筛选出Markdown文件

    const articles = await Promise.all(mdFiles.map(async file => {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: file.path,
      });

      const content = Buffer.from(data.content, 'base64').toString('utf8');
      const { data: frontMatter, content: articleContent } = matter(content);

      // Fetch the last commit for this file
      const { data: commits } = await octokit.repos.listCommits({
        owner,
        repo,
        path: file.path,
        per_page: 1
      });

      const lastModified = commits[0]?.commit.committer.date || data.sha; // 获取文件的最后修改时间

      return {
        title: frontMatter.title,
        description: frontMatter.description,
        date: frontMatter.date,
        lastModified: lastModified,
        path: file.path,
      };
    }));

    // Update articles.json
    const { data: currentFile } = await octokit.repos.getContent({
      owner,
      repo,
      path: articlesJsonPath,
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: articlesJsonPath,
      message: 'Sync articles',
      content: Buffer.from(JSON.stringify(articles, null, 2)).toString('base64'),
      sha: currentFile.sha,
    });

  } catch (error) {
    console.error('Error syncing articles:', error);
    throw error;
  }
}

/**
 * 更新Markdown文件的内容和元数据。
 * @param {Object} article - 包含文章标题、描述、内容和路径的对象。
 * @throws {Error} - 如果更新过程中发生错误。
 */
async function updateMdFile(article) {
  try {
    const { data: currentFile } = await octokit.repos.getContent({
      owner,
      repo,
      path: article.path,
    });

    const currentContent = Buffer.from(currentFile.content, 'base64').toString('utf8');
    const { data: frontMatter, content: articleContent } = matter(currentContent);

    const updatedFrontMatter = {
      ...frontMatter,
      title: article.title,
      description: article.description,
      lastModified: new Date().toISOString(),
    };

    const updatedContent = matter.stringify(article.content, updatedFrontMatter);

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: article.path,
      message: `Update article: ${article.title}`,
      content: Buffer.from(updatedContent).toString('base64'),
      sha: currentFile.sha,
    });

  } catch (error) {
    console.error('Error updating MD file:', error);
    throw error;
  }
}