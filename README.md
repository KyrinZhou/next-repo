# Next.js Rendering Playbook

教学向 Next.js 15（App Router）示例站：用表格与独立页面说明 CSR、SSR、SSG、ISR，并附带并行路由实验室与水合问题清单页。

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

## 部署到 Vercel（方式三：无交互 / CI）

适合在 GitHub Actions、GitLab CI 等流水线里自动部署，避免人工登录 CLI。

### 前置条件

1. 代码托管在 Git（GitHub / GitLab / Bitbucket 等）。
2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 中 **Import** 该仓库并完成首次部署（Framework Preset 选 **Next.js**，构建命令使用默认 `npm run build` 即可）。
3. 之后生产环境更新可完全由下面的 **Deploy Hook** 或 **Token + CLI** 驱动。

### 方案 A：Deploy Hook（推荐，最简单）

Deploy Hook 会按 Vercel 已绑定的 Git 分支拉取最新提交并触发一次生产构建，流水线里只需发一个 HTTP 请求，**不必**安装 Vercel CLI。

1. 打开 Vercel 项目 → **Settings** → **Git** → **Deploy Hooks**。
2. 新建 Hook，指定分支（例如 `main`），复制生成的 URL（请当作密钥保管）。
3. 在 CI 中执行：

```bash
curl -X POST "$VERCEL_DEPLOY_HOOK_URL"
```

将 `VERCEL_DEPLOY_HOOK_URL` 存为 CI 密钥（如 GitHub `Secrets`），不要写进仓库。

### 方案 B：`VERCEL_TOKEN` + Vercel CLI

适用于需要在 CI 里显式执行 `vercel deploy` 的场景。

1. 在 Vercel → **Account Settings** → **Tokens** 创建 **Token**，写入 CI 密钥（如 `VERCEL_TOKEN`）。
2. 在 Vercel 项目 → **Settings** → **General** 查看 **Project ID**；在团队/账号设置中查看 **Team ID**（部分界面显示为 *Team ID* / *Scope*）。分别写入 CI 环境变量，例如：
   - `VERCEL_ORG_ID`（对应 Team / Personal Account 的 ID）
   - `VERCEL_PROJECT_ID`
3. 在流水线中安装依赖并部署生产环境：

```bash
npm install
npx vercel@latest deploy --prod --token "$VERCEL_TOKEN"
```

CLI 会读取 `VERCEL_ORG_ID` 与 `VERCEL_PROJECT_ID`，无需交互式 `vercel link`。

**安全提示：** 勿将 Token、Deploy Hook URL、Team ID 以明文提交到仓库；一律使用 CI 平台的 Secret 功能。

### GitHub Actions（Deploy Hook）

本仓库已包含工作流 [`.github/workflows/deploy-vercel-hook.yml`](.github/workflows/deploy-vercel-hook.yml)：在 `main` 推送时用 Hook 触发生产部署。

在 GitHub 仓库 **Settings → Secrets and variables → Actions** 中新建 Secret，名称为 **`VERCEL_DEPLOY_HOOK_URL`**，值为 Vercel 项目里 Deploy Hooks 生成的完整 URL。

如需在合并前只做预览部署，可在 Vercel 另建指向预览分支的 Hook，并复制为第二份 workflow 或改用 `workflow_dispatch`；也可直接使用 Vercel 连接 Git 后的自动预览部署。

### GitHub Actions 示例（`VERCEL_TOKEN`）

在仓库 Secrets 中配置 `VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID`。

```yaml
name: Deploy Production (CLI)

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - run: npm ci
      - name: Deploy to Vercel
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: npx vercel@latest deploy --prod --token "${{ secrets.VERCEL_TOKEN }}"
```

说明：`npm ci` 会安装含 `next` 在内的依赖；Vercel 侧仍会执行云端构建。若你改为本地 `vercel build` 再 `vercel deploy --prebuilt`，需按 [Vercel 文档](https://vercel.com/docs/cli/deploy#prebuilt) 调整步骤。
