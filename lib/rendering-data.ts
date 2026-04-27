export type RenderModeKey = "CSR" | "SSR" | "SSG" | "ISR";

export type ModeDefinition = {
  key: RenderModeKey;
  name: string;
  subtitle: string;
  marker: string;
  summary: string;
  dataPhase: string;
  firstScreen: string;
  freshness: string;
  seo: string;
  fitFor: string;
  route: string;
  code: string;
};

export type ModeSnapshot = {
  mode: RenderModeKey;
  label: string;
  renderedAt: string;
  requestId: string;
  message: string;
};

export const renderModes: ModeDefinition[] = [
  {
    key: "CSR",
    name: "Client-Side Rendering",
    subtitle: "浏览器接管后再取数",
    marker: '文件顶部写 "use client"，再用 useEffect 或第三方库拉数据',
    summary: "先把页面壳子送到浏览器，再由客户端请求数据并补齐内容。",
    dataPhase: "Hydration 之后，由浏览器发请求",
    firstScreen: "首屏通常先看到骨架或 Loading",
    freshness: "天然偏新，每次进入都能重新取数",
    seo: "弱，搜索引擎拿到的首屏数据有限",
    fitFor: "后台控制台、用户强交互面板、个性化区域",
    route: "/rendering/csr",
    code: `"use client";

useEffect(() => {
  fetch("/api/live-snapshot?mode=csr");
}, []);`,
  },
  {
    key: "SSR",
    name: "Server-Side Rendering",
    subtitle: "每次请求都现算",
    marker: "Server Component 中使用 fetch(..., { cache: 'no-store' })",
    summary: "请求到了服务器才生成 HTML，所以每次访问都能拿到新的服务端结果。",
    dataPhase: "请求时在服务端取数",
    firstScreen: "HTML 已带数据，首屏完整",
    freshness: "最高，每次请求都实时生成",
    seo: "强，首屏就是完整 HTML",
    fitFor: "行情、库存、订单、权限相关的实时页面",
    route: "/rendering/ssr",
    code: `const data = await fetch(source, {
  cache: "no-store",
}).then((res) => res.json());`,
  },
  {
    key: "SSG",
    name: "Static Site Generation",
    subtitle: "构建时一次性产出",
    marker: "默认行为，或显式使用 fetch(..., { cache: 'force-cache' })",
    summary: "页面在构建时就完成，访问时直接返回静态产物，速度最稳。",
    dataPhase: "构建阶段在服务端取数",
    firstScreen: "HTML 已完成，响应最快",
    freshness: "最低，重新部署前基本不变",
    seo: "强，天然适合内容型页面",
    fitFor: "官网、文档、博客、产品介绍页",
    route: "/rendering/ssg",
    code: `const data = await fetch(source, {
  cache: "force-cache",
}).then((res) => res.json());`,
  },
  {
    key: "ISR",
    name: "Incremental Static Regeneration",
    subtitle: "静态为主，定时换新",
    marker: "Server Component 中使用 fetch(..., { next: { revalidate: 60 } })",
    summary: "先享受静态站的快，再按时间窗口增量刷新内容，兼顾性能和新鲜度。",
    dataPhase: "首次构建静态化，过期后后台重建",
    firstScreen: "通常仍是静态速度，过期后异步更新",
    freshness: "中高，可控的时间粒度",
    seo: "强，且内容能周期更新",
    fitFor: "资讯页、活动页、商品详情、榜单页",
    route: "/rendering/isr",
    code: `const data = await fetch(source, {
  next: { revalidate: 60 },
}).then((res) => res.json());`,
  },
];

export const differenceRows = [
  {
    label: "数据什么时候拿",
    values: {
      CSR: "浏览器加载后",
      SSR: "每次请求到达服务器时",
      SSG: "构建时",
      ISR: "构建时 + 定时后台更新",
    },
  },
  {
    label: "首屏 HTML 是否自带数据",
    values: {
      CSR: "通常不带完整数据",
      SSR: "带",
      SSG: "带",
      ISR: "带",
    },
  },
  {
    label: "内容新鲜度",
    values: {
      CSR: "高",
      SSR: "最高",
      SSG: "低",
      ISR: "中高",
    },
  },
  {
    label: "SEO 友好度",
    values: {
      CSR: "弱",
      SSR: "强",
      SSG: "强",
      ISR: "强",
    },
  },
  {
    label: "服务器压力",
    values: {
      CSR: "低",
      SSR: "高",
      SSG: "最低",
      ISR: "中",
    },
  },
];

export const labNotes = [
  {
    title: "为什么这里要用并行路由",
    body: "平行插槽把四张模式卡拆成独立段落，布局层统一排版，内容层各自异步加载，正好适合做“同一主题、四种实现”的教学型看板。",
  },
  {
    title: "为什么示例页和实验室分开",
    body: "同一路由里混放 no-store、force-cache、revalidate，会让整条响应链路更偏动态；独立到单页后，CSR / SSR / SSG / ISR 的语义更纯，也更便于验证。",
  },
];

export function getMode(mode: RenderModeKey): ModeDefinition {
  const item = renderModes.find((entry) => entry.key === mode);

  if (!item) {
    throw new Error(`Unknown mode: ${mode}`);
  }

  return item;
}

export function createSnapshot(mode: RenderModeKey): ModeSnapshot {
  const entry = getMode(mode);

  return {
    mode,
    label: entry.name,
    renderedAt: new Date().toISOString(),
    requestId: crypto.randomUUID().slice(0, 8),
    message: entry.summary,
  };
}

export async function fetchInlineSnapshot(
  mode: RenderModeKey,
  init?: RequestInit,
): Promise<ModeSnapshot> {
  const payload = createSnapshot(mode);
  const source = `data:application/json,${encodeURIComponent(
    JSON.stringify(payload),
  )}`;
  const response = await fetch(source, init);

  return (await response.json()) as ModeSnapshot;
}

export function formatSnapshotTime(iso: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(iso));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
