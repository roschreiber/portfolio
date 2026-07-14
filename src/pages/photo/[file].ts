import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const prerender = false;

const OUT = path.resolve('./photo-cache')

export const GET: APIRoute = async ({ params }) => {
  const fileName = params.file;
  const filePath = path.join(OUT, fileName);

  if (!filePath.startsWith(OUT) || !fs.existsSync(filePath)) {
    return new Response(null, { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  let type = "image/jpeg"
  if (ext === ".png") type = "image/png";
  if (ext === ".webp") type = "image/webp";

  return new Response(file, { status: 200, headers: { "Content-Type": type, "Cache-Control": "public, max-age=86400" } });
};
