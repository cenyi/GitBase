# GitBase 开源无数据库CMS

[![GitHub license](https://img.shields.io/github/license/yourusername/gitbase)](https://github.com/yourusername/gitbase/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/gitbase)](https://github.com/yourusername/gitbase/stargazers)

GitBase 是一个基于 Next.js 构建的开源无数据库内容管理系统(CMS)，使用 GitHub API 作为内容存储后端。

## 功能特性

- 🚀 无数据库架构 - 使用 GitHub 仓库作为内容存储
- 🔄 实时同步 - 内容变更自动同步到 GitHub
- 📝 Markdown 支持 - 原生支持 Markdown 内容编辑
- 🔒 权限管理 - 基于 GitHub 账号的权限系统
- 🌍 多语言支持 - 内置国际化支持
- 📱 响应式设计 - 完美适配各种设备

## 技术栈

- Next.js 14 (App Router)
- Tailwind CSS
- Shadcn/UI
- GitHub API
- React Hook Form

## 快速开始

### 环境要求

- Node.js 18+
- GitHub 账号
- GitHub Personal Access Token (需要 `repo` 权限)

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/yourusername/gitbase.git
cd gitbase
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
复制 `.env.local.md` 为 `.env.local` 并填写你的配置

4. 运行开发服务器
```bash
npm run dev
```

5. 访问应用
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 配置说明

### 必需环境变量

```env
GITHUB_TOKEN=你的GitHub个人访问令牌
GITHUB_REPO=你的GitHub仓库名 (格式: 用户名/仓库名)
NEXTAUTH_SECRET=随机字符串 (用于加密会话)
NEXTAUTH_URL=http://localhost:3000
```

### 可选配置

```env
# 管理员GitHub用户名 (多个用逗号分隔)
ADMIN_USERS=user1,user2

# 站点基础URL
BASE_URL=https://yourdomain.com
```

## 使用指南

### 内容管理

1. **文章管理**
   - 在 `/admin` 页面创建、编辑文章
   - 支持 Markdown 格式
   - 自动保存到 GitHub 仓库

2. **资源管理**
   - 上传图片/文件到 `/resources`
   - 自动提交到 GitHub

### 权限控制

- 只有配置的 ADMIN_USERS 可以访问管理后台
- 普通用户只能查看公开内容

## 自定义业务网站指南

### 1. 品牌标识修改
1. **网站标题与描述**
   - 修改 `src/app/page.tsx` 中的 `metadata.title` 和 `metadata.description`
   - 更新所有页面的 OpenGraph 和 Twitter 卡片元数据

2. **Logo与品牌图片**
   - 替换 `public/` 目录下的品牌图片 (vercel.svg, next.svg 等)
   - 更新 `metadata.images` 中的图片路径

### 2. SEO元数据优化
1. **基础SEO设置**
   - 修改 `src/app/page.tsx` 中的结构化数据 (JSON-LD)
   - 更新 `url` 字段为您的域名

2. **页面专属SEO**
   - 为每个页面单独设置标题、描述和关键词
   - 示例文件：`about/page.tsx`, `privacy/page.tsx`

### 3. 页面内容定制
1. **首页内容**
   - 修改 `src/app/page.tsx` 中的欢迎语和核心功能描述
   - 更新合作伙伴 Logo 和链接

2. **关于页面**
   - 在 `about/page.tsx` 中更新团队信息和公司介绍
   - 修改结构化数据中的联系方式

3. **条款与隐私政策**
   - 根据业务需求修改 `terms/page.tsx` 和 `privacy/page.tsx`
   - 更新最后修改日期

### 4. 功能模块调整
1. **导航菜单**
   - 修改 `src/app/layout.tsx` 中的导航链接
   - 添加/删除页面路由

2. **样式主题**
   - 在 `tailwind.config.js` 中修改品牌色
   - 调整 `globals.css` 中的全局样式

## 注意事项
1. 修改后请清除浏览器缓存测试效果
2. 建议使用 Lighthouse 工具检查SEO优化效果
3. 部署前请确保所有测试链接有效

## 部署指南

### Vercel 部署

1. Fork 本仓库
2. 在 Vercel 导入你的仓库
3. 配置环境变量
4. 部署!

### 自托管部署

1. 服务器要求:
   - Node.js 18+
   - 持久化存储 (用于缓存)

2. 生产环境启动:
```bash
npm run build
npm run start
```

## 常见问题

### Q: 如何获取 GitHub Personal Access Token?
A: 访问 GitHub Settings > Developer settings > Personal access tokens 创建新令牌，勾选 `repo` 权限。

### Q: 内容变更没有实时更新?
A: GitHub API 有缓存，最多延迟1分钟。可以手动刷新页面。

### Q: 如何贡献代码?
A: Fork 仓库后提交 Pull Request。详见 `CONTRIBUTING.md`。

## 联系我们

- GitHub Issues: [问题反馈](https://github.com/yourusername/gitbase/issues)
- 邮箱: contact@yourdomain.com

---

© 2023 GitBase 开源项目 | [使用条款](/terms) | [隐私政策](/privacy)