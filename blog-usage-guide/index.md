# 极简与极客的交汇：本博客定制主题使用与维护指南

去露营啦! :(fas fa-campground): 很快就回来.
真开心! :(far fa-grin-tears):
> 本文是经过深度定制化改造后的博客使用说明书。经过一系列的 CSS 注入与结构重构，本博客在保留 LoveIt 主题丰富特性的基础上，去除了冗余的动画与框架感，确立了 **“GitHub 极客风 / 极简专业风”** 的设计语言。

这篇指南将指导你如何在日常使用中维护这套高度定制化的系统。

<!--more-->
## 1.:pencil2: 日常写作：如何发布新文章

你的所有标准博客文章都存放在 `content/posts/` 目录下。

### 创建新文章
在终端（Terminal）中运行以下命令，会自动生成带有标准模板的 Markdown 文件：
```bash
hugo new posts/你的文章英文名.zh-cn.md
```

### 文章头部配置 (Front Matter)
打开新建的文件，你会看到类似下方的头部配置。请确保按照规范填写：
```yaml
---
title: "文章标题"
date: 2026-05-03T15:00:00+08:00
draft: false # 必须改为 false 才会公开发布
tags: ["标签1", "标签2"]
categories: ["分类名"] # 尽量保持单分类，如：技术分享、随笔
description: "一句简短的话描述文章内容，用于列表页展示和 SEO"
lightgallery: true # 如果文章内有大量图片，保留为 true 可开启图片放大灯箱效果
---
```

---

## 2.🎨 维护三大核心独立页面

本博客有三个经过深度结构重构的独立单页（Single Page），它们的维护方式与普通文章不同，采用的是**HTML 结构 + Markdown**混编的模式。

### 📌 项目页 (Projects)
- **文件位置**：`content/projects/index.zh-cn.md`
- **使用说明**：这里使用了我们深度重写的 `pc` 短代码（Shortcode）。要新增一个项目，只需在页面内的 `<div class="project-grid">` 容器中复制并修改以下代码：
```go
{{</* pc 
    title="你的项目名" 
    description="一句话极简描述。" 
    tech="React, Node.js" 
    color="#61dafb" // 左侧品牌色竖条的颜色
    status="Active" // 状态标签，支持 Active / WIP / Archived
    github="https://github.com/XD06/xxx" // 源码链接
    repo="XD06/xxx" // 核心！填入此项会自动拉取 Shields.io 的实况徽章 (Stars/Forks/License)
    link="https://demo.com" // 在线演示链接
*/>}}
```

### 💼 关于页 (About)
- **文件位置**：`content/about/index.zh-cn.md`
- **技术栈徽章维护**：在 `<div class="tech-badges">` 中，使用 Shields.io 生成徽章。只需更改 URL 中的技术名和 Logo 色即可。
- **履历时间轴维护**：不论是工作经历、教育背景还是证书，只需在对应的 `<div class="resume-timeline">` 中新增一个 `timeline-item`：
```html
<div class="timeline-item">
    <div class="timeline-date">YYYY.MM - YYYY.MM</div>
    <div class="timeline-title">你的职位 / 学位 / 证书名</div>
    <div class="timeline-subtitle">公司名 / 机构名</div>
    <div class="timeline-content">
        <p>这里写你的详细描述，支持 <strong>加粗</strong> 等标签。</p>
    </div>
</div>
```

### ☕ 杂谈页 (Thoughts)
- **文件位置**：`content/thoughts/index.zh-cn.md`
- **使用说明**：杂谈页不是一个松散的文章列表，而是一个**时间轴单页**。当你有只言片语、读书感悟或非技术类的复盘时，不需要新建文件，直接打开这个文件，在最上方插入一个新的 `timeline-item` 即可。这就像一个属于你个人的、按时间线排序的精美“朋友圈”。

---

## 3. ⚙️ 全局配置与社交图标

### 核心配置文件：`hugo.toml`
这是整个博客的中枢神经。我们在其中修复了 `noClasses` 导致的代码高亮报错，并关闭了暴露源码的 `linkToMarkdown`。日常使用中，你主要关注：
- `title` / `description`：站点的全局 SEO 描述。
- `[languages.zh-cn.params.home.profile]`：首页打字机效果的文字修改。

### 社交网络与自定义图标
- **文件位置**：`assets/data/social.yml`
- **特殊处理**：主题原生的社交图标不支持一些国内平台。我们通过在这个 YAML 文件中**注册新图标**（如掘金 `Juejin`），并赋予其权重（`Weight`），成功将其注入了主题的社交链。如果未来需要添加 Bilibili 或知乎，同样在此文件中按照已有格式增加即可。

---

## 4. 🚀 定制样式库

如果你未来想要修改页面的颜色、阴影或间距，请**不要**修改主题源码，而是前往我们建立的私人样式库：
- **文件位置**：`assets/css/_custom.scss`
- **内容包含**：
  1. 首页按钮的玻璃态拟物阴影。
  2. Taxonomy（分类）页面的极简悬停左对齐动画。
  3. Projects 卡片的 GitHub 极简风格（覆盖了原有的 48px 大图标与弹跳动画）。
  4. About/Thoughts 页面的纯 CSS 时间轴与 Shields.io 图片对齐规范。
  5. 完美的深色模式（Dark Mode）适配。

---

## 5. 💻 运行与发布

- **本地预览**：
  在写文章时，在终端运行以下命令开启热更新预览：
  ```bash
  hugo server -e production --disableFastRender
  ```
  *(注：如果某篇文章的日期设置在了未来时间，Hugo 默认不渲染。可以加上 `--buildFuture` 参数强制预览)*

- **构建发布**：
  写作完成后，在终端执行：
  ```bash
  hugo
  ```
  这会在 `public/` 目录下生成纯静态的 HTML/CSS/JS 文件，将该目录推送到 GitHub Pages / Vercel 即可完成上线。

---

> **写在最后**：真正的专业感往往来源于克制。这个博客的框架已经搭建到了足够“薄”的状态，剩下的，就交由你高质量的内容去填满了。Happy Coding, Happy Writing!

