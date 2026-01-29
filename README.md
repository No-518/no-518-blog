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
- `PUBLIC_WALINE_SERVER_URL`: Waline 服务地址

GitHub Pages 示例：

```bash
DEPLOYMENT_PLATFORM=github
SITE_URL=https://<username>.github.io
GH_REPO=<repo>
```
