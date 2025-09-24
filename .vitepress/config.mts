import { defineConfig } from "vitepress";

export default defineConfig({
  title: "阿杰sec - 网络安全技术博客",
  description: "专注于网络安全技术分享，渗透测试，漏洞挖掘，安全工具使用等内容",
  base: "/-sec/",
  appearance: 'dark', // 默认使用深色主题
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
      message: "专注网络安全技术分享 | 让安全技术更易懂",
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
      { text: "漏洞挖掘", link: "/vulnerability/" },
      { text: "安全工具", link: "/tools/" },
      { text: "学习笔记", link: "/notes/" },
      { text: "关于", link: "/about" },
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
      '/vulnerability/': [
        {
          text: "漏洞挖掘",
          items: [
            { text: "SQL注入", link: "/vulnerability/sql-injection" },
            { text: "XSS攻击", link: "/vulnerability/xss" },
            { text: "CSRF漏洞", link: "/vulnerability/csrf" },
          ],
        },
      ],
      '/tools/': [
        {
          text: "安全工具",
          items: [
            { text: "Burp Suite", link: "/tools/burp-suite" },
            { text: "Nmap扫描", link: "/tools/nmap" },
            { text: "Metasploit", link: "/tools/metasploit" },
          ],
        },
      ],
      '/notes/': [
        {
          text: "学习笔记",
          items: [
            { text: "CTF题解", link: "/notes/ctf-writeups" },
            { text: "安全资讯", link: "/notes/security-news" },
            { text: "技术总结", link: "/notes/tech-summary" },
          ],
        },
      ],
    },
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/ChinaCarlos" }],
  },
});

