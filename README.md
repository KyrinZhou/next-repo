# Next.js Rendering Playbook

教学向 Next.js 15（App Router）示例站：用表格与独立页面说明 CSR、SSR、SSG、ISR，并附带并行路由实验室与水合问题清单页。

## 首次推送到 GitHub

本地已初始化 Git 并完成首条提交时，按下面做即可（将 `YOUR_USER` / `YOUR_REPO` 换成你的账号与仓库名）。

1. 在 GitHub 新建仓库：**https://github.com/new** → 不要勾选 “Add a README”（避免与本地历史冲突）→ Create repository。
2. 在项目目录执行：

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

若使用 SSH：

```bash
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git push -u origin main
```

推送完成后，在 Vercel **Import** 该仓库并连接 Git；**push 到生产分支即可由 Vercel 自动部署**，无需再配一条会重复触发的 Hook 工作流。

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

## 构建

```bash
npm run build
npm start
```

## 部署到 Vercel（推荐：连接 Git）

本仓库**不**包含在 `push` 时再次调用 Deploy Hook 的 workflow，避免与 Vercel 自带的 **Git 集成**重复触发生产部署。

1. 在 [Vercel Dashboard](https://vercel.com/dashboard) **Import** 仓库（Framework：**Next.js**，构建命令默认 `npm run build`）。
2. 将 **Production Branch** 设为 `main`（或你的主分支）。
3. 之后每次 **push 到该分支** 即由 Vercel 拉代码并部署；PR 通常对应 **Preview** 部署。

### 可选：仅用 Deploy Hook / CLI（高级）

若你已连接 Git 自动部署，**不要再**让 GitHub Actions 在「每次 push」里 `curl` Deploy Hook 或执行 `vercel deploy`，否则同一提交会触发**两次**生产构建。

仅在需要「非 Git 事件触发部署」（例如外部系统回调、定时任务）时，再在 Vercel → **Settings** → **Git** → **Deploy Hooks** 创建 Hook，并在**不会与 push 重复的**流水线里调用：

```bash
curl -fsS -X POST "$VERCEL_DEPLOY_HOOK_URL"
```

若要在 CI 里用 `vercel deploy --prod`，需配置 `VERCEL_TOKEN` 以及 `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`；同样避免与 Git 自动部署叠在同一条 push 链路上。详见 [Vercel CLI deploy](https://vercel.com/docs/cli/deploy) 与 [Deploy Hooks](https://vercel.com/docs/deploy-hooks)。
