// 导入 NextResponse 模块，用于创建响应
import { NextResponse } from 'next/server';
// 导入 fs 模块，用于文件系统操作
import fs from 'fs';
// 导入 path 模块，用于处理路径
import path from 'path';
// 导入 Octokit 模块，用于与 GitHub API 交互
import { Octokit } from '@octokit/rest';

// 使用 GitHub API 的令牌初始化 Octokit 实例
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// 从环境变量中获取 GitHub 仓库的所有者
const owner = process.env.GITHUB_OWNER;
// 从环境变量中获取 GitHub 仓库的名称
const repo = process.env.GITHUB_REPO;
// 定义 GitHub 仓库中的文件路径
const githubPath = 'data/json/resources.json';
// 定义本地文件的路径
const localPath = path.join(process.cwd(), 'data', 'json', 'resources.json');

// 异步函数，用于从 GitHub 获取资源
async function getResourcesFromGitHub() {
  try {
    // 使用 Octokit 获取 GitHub 仓库中的内容
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: githubPath,
    });

    // 将 Base64 编码的内容解码为 UTF-8 字符串
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    // 将 JSON 字符串解析为 JavaScript 对象并返回
    return JSON.parse(content);
  } catch (error) {
    // 记录错误并重新抛出
    console.error('Error fetching resources from GitHub:', error);
    throw error;
  }
}

// 函数，用于从本地文件系统获取资源
function getLocalResources() {
  // 读取本地文件并解析 JSON
  return JSON.parse(fs.readFileSync(localPath, 'utf8'));
}

// 处理 GET 请求的函数
export async function GET(req) {
  // 从请求 URL 中获取查询参数
  const { searchParams } = new URL(req.url);
  // 获取 source 参数的值，用于确定资源的来源
  const source = searchParams.get('source');

  // 如果 source 是 github，则从 GitHub 获取资源
  if (source === 'github') {
    try {
      // 调用 getResourcesFromGitHub 函数获取资源
      const resources = await getResourcesFromGitHub();
      // 返回 JSON 响应
      return NextResponse.json(resources);
    } catch (error) {
      // 如果获取资源失败，返回错误响应
      return NextResponse.json({ error: 'Failed to fetch resources from GitHub' }, { status: 500 });
    }
  } else {
    // 如果 source 不是 github，则从本地文件获取资源
    const resources = getLocalResources();
    // 返回 JSON 响应
    return NextResponse.json(resources);
  }
}

// 处理 POST 请求的函数
export async function POST(req) {
  // 从请求中获取更新的资源数据
  const updatedResources = await req.json();

  try {
    // 获取 GitHub 仓库中当前文件的内容
    const { data: currentFile } = await octokit.repos.getContent({
      owner,
      repo,
      path: githubPath,
    });

    // 更新 GitHub 仓库中的文件内容
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: githubPath,
      message: 'Update resources',
      content: Buffer.from(JSON.stringify(updatedResources, null, 2)).toString('base64'),
      sha: currentFile.sha,
    });

    // 更新本地文件
    //fs.writeFileSync(localPath, JSON.stringify(updatedResources, null, 2));

    // 返回更新后的资源数据
    return NextResponse.json(updatedResources);
  } catch (error) {
    // 如果更新资源失败，记录错误并返回错误响应
    console.error('Error updating resources:', error);
    return NextResponse.json({ error: 'Failed to update resources' }, { status: 500 });
  }
}