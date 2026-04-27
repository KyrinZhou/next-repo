import Link from "next/link";

import { labNotes } from "@/lib/rendering-data";

export default function LabPage() {
  return (
    <>
      <div className="detail-hero">
        <Link className="back-link" href="/">
          回到首页
        </Link>
        <div className="detail-hero-copy">
          <p className="eyebrow">Parallel Routes</p>
          <h1>并行路由实验室</h1>
          <p>
            这个页面故意把四个模式拆成四个插槽：布局层负责栅格和总标题，插槽层各自独立加载。
            对教学型官网来说，这比一个巨大页面更清晰，也更符合 App Router 的组织方式。
          </p>
        </div>
      </div>

      <div className="lab-note-grid">
        {labNotes.map((note) => (
          <article className="lab-note" key={note.title}>
            <h2>{note.title}</h2>
            <p>{note.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
