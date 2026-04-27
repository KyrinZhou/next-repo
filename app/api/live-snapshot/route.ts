import { NextResponse } from "next/server";

import { createSnapshot, type RenderModeKey } from "@/lib/rendering-data";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modeParam = searchParams.get("mode")?.toUpperCase();
  const mode = (modeParam === "CSR" ? modeParam : "CSR") as RenderModeKey;

  return NextResponse.json(createSnapshot(mode), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
