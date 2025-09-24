import { defineConfig } from "vitepress";

export default defineConfig({
  title: "阿杰sec - 渗透测试技术博客",
  description: "深度覆盖渗透测试、攻防演练、内网渗透、Java安全、免杀技术五大安全领域的专业技术博客",
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
      { text: "0x1 渗透测试", link: "/pentest/" },
      { text: "0x2 攻防演练", link: "/redteam/" },
      { text: "0x3 内网渗透", link: "/internal/" },
      { text: "0x4 Java安全", link: "/java/" },
      { text: "0x5 免杀", link: "/bypass/" },
      { text: "📚 笔记", link: "/notes/" },
    ],

    sidebar: {
      '/pentest/': [
        {
          text: "0x1 渗透测试",
          items: [
            { text: "渗透测试流程", link: "/pentest/process" },
            { text: "CDN绕过技巧", link: "/pentest/cdn-bypass" },
            { text: "SQL注入技术", link: "/pentest/sql-injection" },
            { text: "SSRF漏洞利用", link: "/pentest/ssrf" },
            { text: "文件上传绕过", link: "/pentest/file-upload" },
            { text: "未授权访问", link: "/pentest/unauthorized" },
            { text: "越权测试", link: "/pentest/privilege-escalation" },
          ],
        },
      ],
      '/redteam/': [
        {
          text: "0x2 攻防演练",
          items: [
            { text: "攻防流程", link: "/redteam/process" },
            { text: "资产收集", link: "/redteam/asset-discovery" },
            { text: "C2框架", link: "/redteam/c2-framework" },
            { text: "流量代理", link: "/redteam/proxy" },
            { text: "钓鱼攻击", link: "/redteam/phishing" },
            { text: "权限维持", link: "/redteam/persistence" },
            { text: "OPSEC安全", link: "/redteam/opsec" },
          ],
        },
      ],
      '/internal/': [
        {
          text: "0x3 内网渗透",
          items: [
            { text: "域环境基础", link: "/internal/domain-basics" },
            { text: "Kerberos认证", link: "/internal/kerberos" },
            { text: "NTLM中继", link: "/internal/ntlm-relay" },
            { text: "票据攻击", link: "/internal/ticket-attack" },
            { text: "委派攻击", link: "/internal/delegation" },
            { text: "提权技术", link: "/internal/privilege-escalation" },
            { text: "域信任", link: "/internal/domain-trust" },
          ],
        },
      ],
      '/java/': [
        {
          text: "0x4 Java安全",
          items: [
            { text: "Java反射", link: "/java/reflection" },
            { text: "反序列化", link: "/java/deserialization" },
            { text: "JNDI注入", link: "/java/jndi" },
            { text: "Shiro漏洞", link: "/java/shiro" },
            { text: "Log4j漏洞", link: "/java/log4j" },
            { text: "Fastjson漏洞", link: "/java/fastjson" },
            { text: "内存马", link: "/java/memshell" },
          ],
        },
      ],
      '/bypass/': [
        {
          text: "0x5 免杀",
          items: [
            { text: "免杀基础", link: "/bypass/basics" },
            { text: "反沙箱技术", link: "/bypass/anti-sandbox" },
            { text: "Shellcode加载", link: "/bypass/shellcode" },
            { text: "进程注入", link: "/bypass/process-injection" },
            { text: "DLL劫持", link: "/bypass/dll-hijacking" },
            { text: "EDR对抗", link: "/bypass/edr-bypass" },
            { text: "AMSI绕过", link: "/bypass/amsi" },
            { text: "自删除技术", link: "/bypass/SelfDelete" },
          ],
        },
      ],
    },
  },
});
