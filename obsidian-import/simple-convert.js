const fs = require('fs');
const path = require('path');

// 简化版 Obsidian 转换工具
function convertObsidianNotes(sourcePath, targetPath) {
  console.log('🚀 开始转换 Obsidian 笔记...');
  
  if (!fs.existsSync(sourcePath)) {
    console.error('❌ 源路径不存在:', sourcePath);
    return;
  }

  // 创建目标目录
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  const files = fs.readdirSync(sourcePath);
  let convertedCount = 0;

  files.forEach(file => {
    if (path.extname(file) === '.md') {
      try {
        let content = fs.readFileSync(path.join(sourcePath, file), 'utf-8');
        
        // 基本转换
        content = convertLinks(content);
        content = convertImages(content);
        content = addFrontMatter(content, file);
        
        // 生成新文件名
        const newFileName = file.replace(/[^\w\-\.]/g, '-').toLowerCase();
        fs.writeFileSync(path.join(targetPath, newFileName), content);
        
        console.log(`✓ 转换: ${file} → ${newFileName}`);
        convertedCount++;
      } catch (error) {
        console.error(`❌ 转换失败: ${file}`, error.message);
      }
    }
  });

  // 生成索引文件
  generateIndex(targetPath, convertedCount);
  console.log(`🎉 转换完成! 共转换 ${convertedCount} 个文件`);
}

function convertLinks(content) {
  // [[链接]] -> [链接](./链接.md)
  return content.replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (match, link, _, text) => {
    const fileName = link.replace(/[^\w\-]/g, '-').toLowerCase() + '.md';
    return `[${text || link}](./${fileName})`;
  });
}

function convertImages(content) {
  // ![[图片]] -> ![图片](../assets/图片)
  return content.replace(/!\[\[([^\]]+)\]\]/g, '![图片](../assets/$1)');
}

function addFrontMatter(content, filename) {
  const title = path.basename(filename, '.md');
  return `---
title: ${title}
description: 从 Obsidian 导入
date: ${new Date().toISOString().split('T')[0]}
---

${content}`;
}

function generateIndex(targetPath, fileCount) {
  const indexContent = `# 📚 我的笔记

欢迎来到我的个人笔记库！这里记录了我在学习和工作中的思考与总结。

## 📊 统计信息
- 📝 笔记数量: ${fileCount}
- 🔄 最后更新: ${new Date().toLocaleDateString()}
- 📂 导入来源: Obsidian

## 🗂️ 分类导航

### 技术相关
- 网络安全技术
- 编程学习笔记  
- 工具使用心得

### 学习记录
- 读书笔记
- 课程总结
- 实践经验

### 思考总结
- 个人思考
- 问题解决
- 心得体会

---

> 💡 **使用提示**: 使用左侧导航或顶部搜索功能快速找到您需要的内容。

> 📝 **说明**: 这些笔记从 Obsidian 自动导入，部分格式可能需要手动调整。
`;

  fs.writeFileSync(path.join(targetPath, 'index.md'), indexContent);
}

// 命令行使用
if (process.argv.length >= 4) {
  const sourcePath = process.argv[2];
  const targetPath = process.argv[3];
  convertObsidianNotes(sourcePath, targetPath);
} else {
  console.log(`
用法: node simple-convert.js <源路径> <目标路径>

示例:
  node simple-convert.js "C:/Users/用户名/Documents/ObsidianVault" "./notes"
  `);
}
