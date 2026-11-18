export const site = {
  name: "No-518’s self factory",
  description: '王昱邦（Yubang Wang）的个人博客，记录具身智能、Agent 研究、工程实践与日常思考。',
  author: 'Yubang Wang / 王昱邦',
  ownerName: 'Yubang Wang',
  ownerNameCn: '王昱邦',
  homepage: 'https://no-518.github.io/',
  language: 'zh-CN',
};

export const navigation = [
  { label: 'About', href: `${site.homepage}#about` },
  { label: 'Blog', href: '/' },
  { label: 'Publications', href: `${site.homepage}#publications` },
  { label: 'Updates', href: `${site.homepage}#updates` },
  { label: 'Education', href: `${site.homepage}#education` },
  { label: 'Contact', href: `${site.homepage}#contact` },
];

export const blogNavigation = [
  { label: '文章', href: '/blog' },
  { label: '标签', href: '/tags' },
  { label: '关于', href: '/about' },
  { label: '搜索', href: '/search' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/No-518' },
  { label: 'RSS', href: '/rss.xml' },
];

export const newsletter = {
  description:
    '这里不做邮件列表，也不做平台推送。更新都会进入 RSS feed，适合用阅读器慢慢看研究笔记、工程复盘和方法论文章。',
};

export const siteCredits =
  '设计与信息架构借鉴 Axi404 博客（axi404.top）。';
