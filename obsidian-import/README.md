# Obsidian 到 VitePress 转换工具

这个工具可以帮您将 Obsidian 笔记转换为 VitePress 兼容格式，并集成到您的博客中。

## 🚀 快速开始

### 1. 准备工作

确保您有以下内容：
- Obsidian 笔记库（.md 文件）
- 当前的 VitePress 项目

### 2. 使用方法

#### 方法一：使用转换脚本（推荐）

```bash
# 运行转换工具
node convert-obsidian.js "您的Obsidian笔记路径" "./notes"

# 示例（Windows）：
node convert-obsidian.js "C:/Users/YourName/Documents/MyVault" "./notes"

# 示例（macOS/Linux）：
node convert-obsidian.js "/Users/yourname/Documents/MyVault" "./notes"
```

#### 方法二：手动迁移

1. 将 Obsidian 的 `.md` 文件复制到 `notes/` 目录
2. 手动调整内部链接格式
3. 复制图片到 `public/assets/` 目录
4. 更新配置文件

### 3. 转换功能

✅ **支持的转换**：
- `[[内部链接]]` → `[内部链接](./internal-link.md)`
- `[[文件名|显示名]]` → `[显示名](./filename.md)`
- `![[图片.png]]` → `![图片](../assets/图片.png)`
- `==高亮文本==` → `<mark>高亮文本</mark>`
- `#标签` → \`#标签\`
- 自动生成 front matter
- 文件名转 URL 友好格式

⚠️ **注意事项**：
- 不支持 Obsidian 插件语法
- 复杂的嵌入块可能需要手动调整
- 数学公式需要检查兼容性

### 4. 配置 VitePress

转换完成后，您需要更新 `.vitepress/config.mts`：

```typescript
// 在导航栏添加
nav: [
  // ... 现有配置
  { text: "📚 笔记", link: "/notes/" },
],

// 在侧边栏添加
sidebar: {
  // ... 现有配置
  '/notes/': [
    {
      text: "📚 我的笔记",
      items: [
        { text: "笔记首页", link: "/notes/" },
        // 工具会自动生成更多配置建议
      ],
    },
  ],
}
```

### 5. 目录结构

转换后的目录结构：
```
your-blog/
├── notes/                 # 笔记主目录
│   ├── index.md          # 笔记首页
│   ├── topic1/           # 按主题分类
│   │   ├── index.md
│   │   ├── note1.md
│   │   └── note2.md
│   └── topic2/
├── public/
│   └── assets/           # 图片资源
└── .vitepress/
    └── config.mts        # 需要手动更新
```

## 🛠️ 高级用法

### 自定义转换规则

您可以修改 `convert-obsidian.js` 中的转换规则：

```javascript
// 自定义链接转换
convertInternalLinks(content) {
  // 添加您的自定义逻辑
}

// 自定义文件名转换
toUrlFriendly(filename) {
  // 修改 URL 生成规则
}
```

### 批量处理

```bash
# 转换多个文件夹
node convert-obsidian.js "./obsidian/技术笔记" "./notes/tech"
node convert-obsidian.js "./obsidian/生活记录" "./notes/life"
```

## 📝 最佳实践

1. **备份原始笔记** - 转换前请备份 Obsidian 笔记
2. **测试转换结果** - 先用少量文件测试转换效果
3. **检查链接** - 转换后检查内部链接是否正确
4. **调整格式** - 根据需要手动调整特殊格式
5. **更新配置** - 及时更新 VitePress 导航配置

## 🔧 故障排除

### 常见问题

**Q: 图片无法显示**
A: 检查图片路径是否正确，确保图片已复制到 `public/assets/` 目录

**Q: 内部链接失效**
A: 检查目标文件是否存在，文件名是否正确转换

**Q: 中文文件名问题**
A: 工具会自动转换中文文件名为 URL 友好格式

**Q: 特殊语法不支持**
A: 可能需要手动调整，或修改转换规则

## 🎯 使用技巧

1. **分类组织** - 将笔记按主题分类到不同文件夹
2. **标签利用** - 使用标签来组织和检索内容
3. **搜索优化** - 为重要笔记添加关键词
4. **定期同步** - 定期从 Obsidian 同步更新的笔记

---

> 💡 **提示**: 这个工具是为了方便迁移而设计的，如果您有特殊需求，可以根据实际情况调整转换脚本。
