import { TEX } from "./draw";
import { getSign } from "./registry";

const cache = new Map<string, string>();

/** Bilde-URL (PNG) for skiltets forside. Gjenbrukes mellom skilt med samme kode/verdi. */
export function getSignDataUrl(code: string, value?: number): string {
  const key = `${code}:${value ?? ""}`;
  let url = cache.get(key);
  if (!url) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = TEX;
    getSign(code).draw(canvas.getContext("2d")!, value);
    url = canvas.toDataURL("image/png");
    cache.set(key, url);
  }
  return url;
}
