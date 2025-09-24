import { defineConfig } from "vitepress";

export default defineConfig({
  title: "阿杰sec - 渗透测试技术博客",
  description: "专注于渗透测试技术分享，Web安全测试，内网渗透，移动端安全等实战内容",
  base: "/-sec/",
  appearance: 'dark', // 默认使用深色主题
  ignoreDeadLinks: true, // 忽略死链接检查，便于逐步添加内容
  // header标签里面插入的内容
  head: [["link", { rel: "icon", href: "/-sec/favicon.ico" }]],
  themeConfig: {
    // 网站的logo
    logo: "/logo.svg",
    // 文章右侧大纲目录
    outline: {
      level: [2, 6],
      label: "目录",
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    // 主题
    darkModeSwitchLabel: "深浅模式",
    // 返回顶部label
    returnToTopLabel: "返回顶部",
    // 搜索
    search: {
      provider: "local",
    },
    // 页脚
    footer: {
      message: "专注渗透测试技术分享 | 从基础到实战的完整学习路径",
      copyright: "Copyright © 2023-present 阿杰sec",
    },
    // 文档的最后更新时间
    lastUpdated: {
    text: "Updated at",
    formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "渗透测试", link: "/pentest/" },
    ],

    sidebar: {
      '/pentest/': [
        {
          text: "渗透测试",
          items: [
            { text: "Web渗透基础", link: "/pentest/web-basics" },
            { text: "内网渗透", link: "/pentest/internal-network" },
            { text: "移动端安全", link: "/pentest/mobile-security" },
          ],
        },
      ],
    },
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/ChinaCarlos" }],
  },
});

