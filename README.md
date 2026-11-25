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

GitHub Pages 示例：

```bash
DEPLOYMENT_PLATFORM=github
SITE_URL=https://<username>.github.io
GH_REPO=<repo>
```

文章页不提供评论，不加载第三方评论脚本。

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

## 阅读与媒体

- 文章页复用站点品牌和链接，使用紧凑页眉、标题导语、可折叠目录；正文与图表内容不因排版调整而改写。
- 演示视频默认静音循环，可见面积至少 25% 时自动播放，离屏或标签页进入后台时暂停。手动暂停后不会因滚动自动恢复。
- 系统开启减少动态效果时不自动播放；仍可手动播放。播放受浏览器限制时显示点击播放提示。
- 视频保留原生控制条，另提供播放/暂停与重播按钮；静态封面及宽高预留避免黑屏和加载跳动。
- 手机宽图表支持横向滚动与键盘聚焦，并显示滑动提示。

## 访客地图

- `src/components/VisitorMap.astro` 在所有博客页面的页脚加载 MapMyVisitors 官方地图，与个人主页共用同一个公开 widget ID；更新编号时同步个人主页 `index.html`。
- 使用真实访问计数和 IP 大致位置，保留服务显示的统计时间范围；不把 Pageviews 当成独立人数，不展示虚构的访客数或国家数。历史访问不会补录。
- 地图异步加载，不等访客滚动到页脚才加载；无 JavaScript 时使用官方图片版本。地图与“合并统计”链接指向同一个公开统计页面。
- 外观样式限定在 `.visitor-map`，适配窄屏和博客暗色模式；不修改文章内容，统计区不进入 Pagefind 搜索索引。
- 页脚附有服务的隐私政策链接。第三方脚本可能被拦截，计数是近似统计，并非精确的独立读者人数。
