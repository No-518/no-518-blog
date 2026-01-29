export const normalizeBase = (base: string) =>
  base.endsWith('/') ? base : `${base}/`;

export const withBase = (path: string, base = import.meta.env.BASE_URL) => {
  const normalized = normalizeBase(base);
  return `${normalized}${path.replace(/^\//, '')}`;
};
