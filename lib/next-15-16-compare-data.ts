export type NextVersionCompareRow = {
  topic: string;
  next15: string;
  next16: string;
};

/** 教学用对照表：概括 Next.js 16 相对 15 的常见差异，升级请以官方文档为准。 */
export const nextVersionCompareRows: NextVersionCompareRow[] = [
  {
    topic: "生产构建默认打包器",
    next15:
      "默认仍以 Webpack 构建生产产物；`next dev --turbopack` 可在开发环境启用 Turbopack。",
    next16:
      "Turbopack 成为默认构建路径之一（依官方发布说明持续演进），生产与开发链路更统一，构建与热更新通常更快。",
  },
  {
    topic: "动态路由与请求 API 的异步形态",
    next15:
      "`page` 的 `params` / `searchParams`、`cookies()`、`headers()`、`draftMode()` 等逐步改为异步；不少场景仍会看到同步写法或兼容期行为。",
    next16:
      "上述 API **必须**按异步使用（如 `await cookies()`、`await params`）。升级后遗留同步访问会在运行时报错，需按官方迁移指南改写。",
  },
  {
    topic: "缓存与 PPR 相关配置",
    next15:
      "以 `fetch` 缓存、`revalidate`、Route Segment Config 等为主；部分能力仍在 `experimental` 下迭代。",
    next16:
      "引入并整合 **Cache Components**（如 `cacheComponents` 等配置）；`cacheLife`、`cacheTag` 等走向稳定用法，缓存语义更偏「显式、可组合」。具体 API 以当前文档为准。",
  },
  {
    topic: "Middleware 文件约定",
    next15:
      "根目录使用 `middleware.ts`（或 `.js`），导出 `middleware` 函数。",
    next16:
      "约定重命名为 **`proxy.ts`**，导出 **`proxy`**；语义强调网络边界上的请求拦截，避免与通用「中间件」概念混淆。可使用官方 codemod 迁移。",
  },
  {
    topic: "AMP 与 Runtime Config",
    next15:
      "仍可使用 `next/amp` 与 `serverRuntimeConfig` / `publicRuntimeConfig`（若项目历史依赖）。",
    next16:
      "**移除** AMP 支持；**移除** `serverRuntimeConfig` / `publicRuntimeConfig`，改用环境变量与标准配置方式。",
  },
  {
    topic: "`next lint` 命令",
    next15:
      "`next lint` 作为封装入口调用 ESLint（具体行为随版本略有调整）。",
    next16:
      "不再提供 `next lint`，在脚本中直接使用 **`eslint`**（如 `eslint .`），与社区工具链对齐。",
  },
  {
    topic: "React 与运行时要求",
    next15:
      "React 19 已在 App Router 路线中广泛搭配；Node 版本需满足该 Next 小版本的要求。",
    next16:
      "持续跟进 React 19.x 新能力；**Node.js 最低版本**随大版本上调（以 [Version 16 升级指南](https://nextjs.org/docs/app/guides/upgrading/version-16) 为准）。",
  },
];

export const nextVersionCompareResources: { label: string; href: string }[] = [
  {
    label: "官方：升级到 Version 16",
    href: "https://nextjs.org/docs/app/guides/upgrading/version-16",
  },
  {
    label: "官方：Middleware 更名为 Proxy",
    href: "https://nextjs.org/docs/messages/middleware-to-proxy",
  },
  {
    label: "官方：proxy 文件约定",
    href: "https://nextjs.org/docs/app/api-reference/file-conventions/proxy",
  },
];
