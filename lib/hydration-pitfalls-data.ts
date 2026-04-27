export type HydrationPitfall = {
  title: string;
  summary: string;
  badExample: string;
  fix: string;
};

export const hydrationPitfalls: HydrationPitfall[] = [
  {
    title: "在首次渲染中读取「当前时间」",
    summary:
      "含 use client 的组件仍会在服务端预渲染一次。若在 render 或 useState 初始函数里使用 Date.now()、new Date()，服务端时刻与浏览器 hydration 时刻不同，文本或数值可能不一致。",
    badExample: `const [n, setN] = useState(() =>
  Math.ceil((deadline - Date.now()) / 1000),
);`,
    fix: "首屏用固定占位或与 SSR 无关的数据；真实时间在 useEffect 里写入 state，或把时间格式化为字符串由 Server Component 传入。",
  },
  {
    title: "在渲染阶段访问仅浏览器存在的 API",
    summary:
      "window、document、localStorage、navigator 等在 Node 中不存在或行为不同。若在组件函数体顶层直接读取并参与 JSX，极易与服务端输出不一致。",
    badExample: `export function Bad() {
  const w = window.innerWidth;
  return <span>{w}px</span>;
}`,
    fix: "用 useEffect 在挂载后读写；或 dynamic(..., { ssr: false }) 整段跳过 SSR；需要首屏宽度可用 CSS 或默认假设。",
  },
  {
    title: "渲染路径里使用非确定性值",
    summary:
      "Math.random()、未稳定排序、依赖 Map 遍历顺序等，在服务端与客户端各算一次可能得到不同结果。",
    badExample: `return <span id={Math.random()} />;`,
    fix: "随机 ID、洗牌列表等在 useEffect 中生成并 setState，或由服务端生成后通过 props 下发。",
  },
  {
    title: "日期/数字的本地化格式不一致",
    summary:
      "Intl.DateTimeFormat、toLocaleString、toLocaleDateString 依赖运行环境的 ICU 与默认时区。Node 与浏览器、甚至不同机器之间可能产生不同字符串。",
    badExample: `new Intl.DateTimeFormat("zh-CN", {
  timeStyle: "medium",
}).format(new Date(iso)); // 服务端与客户端各执行一次`,
    fix: "在 Server Component 中格式化一次并作为纯文本传递；或客户端仅在 mount 后用同一 locale 格式化；需要严格一致可用固定时区（如 UTC）与手动拼接。",
  },
  {
    title: "非法 HTML 嵌套或浏览器自动纠错",
    summary:
      "例如 <p> 里再包 <p>、在 <table> 里直接塞非表格元素等。React 与浏览器对 DOM 纠错可能不一致，触发水合告警。",
    badExample: `<p>
  外层段落
  <p>内层又一段</p>
</p>`,
    fix: "遵循 HTML 内容模型；用 div/section 等合法容器，或拆成兄弟节点。",
  },
  {
    title: "浏览器扩展或第三方脚本改动 DOM",
    summary:
      "翻译插件、密码管理器、广告拦截等可能在 hydration 前修改属性或插入节点，导致 React 对比失败。",
    badExample: "// 无特定代码：表现为本地有报错、无痕模式正常。",
    fix: "开发时用无痕窗口排查；生产环境尽量减少对关键节点的第三方注入；必要时对局部使用 suppressHydrationWarning（应谨慎、少范围使用）。",
  },
  {
    title: "错误使用 typeof window 做分支渲染",
    summary:
      "若在首帧就因 typeof window !== \"undefined\" 而走不同分支，服务端没有 window，客户端有，会直接 mismatch。",
    badExample: `return typeof window === "undefined"
  ? <span>SSR</span>
  : <span>CSR</span>;`,
    fix: "用 mounted 状态：const [ok, setOk] = useState(false); useEffect(() => setOk(true), [])；首屏两端都渲染相同占位，ok 为 true 再切换。",
  },
  {
    title: "富文本 / HTML 字符串与转义差异",
    summary:
      "dangerouslySetInnerHTML、Markdown 渲染若服务端与客户端换行、引号转义或 sanitize 规则不同，会得到不同 HTML。",
    badExample: `dangerouslySetInnerHTML={{
  __html: markdownProcessedOnServerAndClientDifferently,
}}`,
    fix: "统一在一端生成最终 HTML（通常服务端）；客户端避免重复跑另一套解析；保证 sanitize 配置一致。",
  },
];
