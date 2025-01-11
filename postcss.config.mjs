/**
 * @type {import('postcss-load-config').Config}
 * 定义一个配置对象，用于 PostCSS 加载配置
 */
const config = {
  // 配置 PostCSS 插件
  plugins: {
    // 使用 Tailwind CSS 插件
    tailwindcss: {},
  },
};

// 导出默认的配置对象
export default config;
