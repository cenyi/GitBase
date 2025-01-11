/**
 * PostCSS 配置文件
 * 该文件用于配置 PostCSS 插件，以处理 CSS 代码
 * 这里配置了两个插件：Tailwind CSS 和 Autoprefixer
 * Tailwind CSS 用于生成实用工具类，Autoprefixer 用于自动添加浏览器前缀
 */
module.exports = {
  plugins: {
    // 引入 Tailwind CSS 插件，用于生成实用工具类
    tailwindcss: {},
    // 引入 Autoprefixer 插件，用于自动添加浏览器前缀
    autoprefixer: {},
  },
}