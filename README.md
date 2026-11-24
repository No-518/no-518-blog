# No-518’s self factory

个人博客项目，聚焦深度学习、数学推导、工程化落地与架构评审。

## 灵感说明

本项目在信息架构与交互细节上借鉴了 Axi404 的博客风格，但未复制其源码或设计资源：

- https://axi404.top/blog/website-vercel
- https://axi404.top/blog/astro-multi-pages
- https://axi404.top/blog/github-actions-and-pages-tutorials

## 开发与构建

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## 多平台部署配置

通过环境变量控制：

- `DEPLOYMENT_PLATFORM`: `vercel` / `github` / `cloudflare`
- `SITE_URL`: 站点 canonical 域名（用于 RSS/Sitemap）
- `GH_REPO`: GitHub Pages 仓库名（用于 `base`）
- `PUBLIC_ANALYTICS_ID`: 前端统计 ID
- `PUBLIC_GISCUS_REPO`: Giscus 绑定仓库，例如 `No-518/no-518-blog`
- `PUBLIC_GISCUS_REPO_ID`: Giscus 仓库 ID
- `PUBLIC_GISCUS_CATEGORY`: GitHub Discussions 分类名
- `PUBLIC_GISCUS_CATEGORY_ID`: GitHub Discussions 分类 ID

GitHub Pages 示例：

```bash
DEPLOYMENT_PLATFORM=github
SITE_URL=https://<username>.github.io
GH_REPO=<repo>
```

## 评论功能

文章页评论通过 Giscus 挂载到 GitHub Discussions。

接入步骤：

1. 在博客仓库开启 GitHub Discussions
2. 创建一个专门用于评论的 Discussion category
3. 安装 https://giscus.app 对应的 GitHub App
4. 把仓库、分类和 ID 填入上述 `PUBLIC_GISCUS_*` 环境变量

如果这些变量未配置，评论区会自动隐藏，不影响构建。

## RSS 订阅

站点内置 RSS：

- 订阅地址：`/rss.xml`
- 首页首屏提供订阅按钮，点击后弹出 RSS 使用说明
- 不收集邮箱，也不依赖外部邮件服务

## 双语文章

- 每种语言使用独立的 `src/content/blog/*.mdx`，通过相同的 `translationKey` 关联，并设置 `lang: zh-CN` 或 `lang: en`。
- 文章页显示语言切换和 `hreflang`；首页、分类、标签、RSS 按文章合并，两种语言共用一条入口。RSS 的 Atom alternate links 也供个人主页显示双语入口。
- `/search` 检索中文，`/search-en` 检索英文；Pagefind 的 bundlePath 和结果地址均保留部署子路径。
- VLA 权重编辑长文正文在 `src/articles/vla-weight-space/{zh,en}.html`，共用 `public/media/vla-weight-space/`。中文保留原稿，标题交给标准博客模板；更新章节标题时同步 MDX 的 `toc`。
- 长文专属样式仅作用于 `.weight-space-note`；样式和视频脚本从 `PostLayout.astro` 加载，避免旧版 MDX 渲染遗漏嵌套组件资源。
