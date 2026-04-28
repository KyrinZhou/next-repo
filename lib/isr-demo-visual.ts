/** 根据 requestId 稳定映射到色相，用于演示「每次再生成整块颜色都会变」 */
export function hueFromRequestId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}
