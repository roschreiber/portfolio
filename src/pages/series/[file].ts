import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const prerender = false;

const OUT = path.resolve("./photo-cache");

export const GET: APIRoute = ({ params }) => {
  const fileName = params.file;

  if (!fileName) {
    return new Response(null, { status: 404 });
  }

  const filePath = path.join(OUT, fileName);

  if (!filePath.startsWith(OUT) || !fs.existsSync(filePath)) {
    return new Response(null, { status: 404 });
  }

  if (!fs.existsSync(filePath)) {
    return new Response(null, { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const extension = path.extname(filePath).toLowerCase();

  const contentType =
    extension === ".png"
      ? "image/png"
      : extension === ".webp"
        ? "image/webp"
        : "image/jpeg";

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
};