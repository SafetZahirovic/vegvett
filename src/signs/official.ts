import { OFFICIAL_SIGN_IDS } from "./official-ids";
import { getSignDataUrl } from "./textures";

/**
 * Offisielle skiltbilder fra Statens vegvesen (via Geonorge). Filene heter f.eks. 202_0,
 * 146_1 og 362_50. Skilt uten offisiell fil tegnes i kode (se registry.ts).
 */

const AVAILABLE = new Set(OFFICIAL_SIGN_IDS);

/** Varianter der pakken bare har én retning (H = høyre, V = venstre). */
const VARIANT: Record<string, string> = { "516": "516_H" };

/** Filnavn (uten .svg) for et skilt i registeret, eller null hvis det ikke finnes i pakken. */
export function officialId(code: string, value?: number): string | null {
  const [main, sub] = code.split(".");
  const candidates = [
    value !== undefined ? `${main}_${value}` : null,
    VARIANT[code] ?? null,
    sub ? `${main}_${sub}` : `${main}_0`,
    main,
  ];
  return candidates.find((c): c is string => !!c && AVAILABLE.has(c)) ?? null;
}

export const officialUrl = (id: string) => `${import.meta.env.BASE_URL}skilt/${id}.svg`;

/** Bilde-URL for et skilt: offisielt bilde hvis det finnes, ellers egen tegning. */
export function signImage(code: string, value?: number): { url: string; official: boolean } {
  const id = officialId(code, value);
  return id ? { url: officialUrl(id), official: true } : { url: getSignDataUrl(code, value), official: false };
}
