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
- 页面内的订阅入口统一跳转到 RSS feed
- 不收集邮箱，也不依赖外部邮件服务
