import { C, TEX, fillShape, pathShape, px, redBorder, text } from "./draw";
import type { SignShape } from "./shapes";

/**
 * Skiltregister. Skiltnumre og navn følger skiltforskriften / Statens vegvesens
 * skilthåndbok (N300). Alle forklaringer og regelhenvisninger er listet i
 * CONTENT_REVIEW.md for kvalitetssikring.
 */

export type SignCategory =
  | "fareskilt"
  | "vikepliktskilt"
  | "forbudsskilt"
  | "pabudsskilt"
  | "opplysningsskilt"
  | "underskilt";

export const CATEGORY_LABEL: Record<SignCategory, string> = {
  fareskilt: "Fareskilt",
  vikepliktskilt: "Vikeplikt- og forkjørsskilt",
  forbudsskilt: "Forbudsskilt",
  pabudsskilt: "Påbudsskilt",
  opplysningsskilt: "Opplysningsskilt",
  underskilt: "Underskilt",
};

export type SignDef = {
  code: string;
  name: string;
  category: SignCategory;
  shape: SignShape;
  /** Kort, konkret forklaring av hva skiltet betyr. */
  explanation: string;
  /** Regelhenvisning (skiltforskriften / trafikkreglene). */
  rule: string;
  /** Tegner forsiden på et TEX×TEX-canvas. `value` brukes f.eks. for fartsgrense. */
  draw: (ctx: CanvasRenderingContext2D, value?: number) => void;
};

/** Bil sett bakfra (til skilt 334). cx i normaliserte enheter. */
function carFromBehind(ctx: CanvasRenderingContext2D, cx: number, color: string) {
  const w = 0.3 * TEX;
  const [x, y] = px(cx - 0.15, 0.02);
  ctx.fillStyle = color;
  // Tak og vinduparti
  ctx.beginPath();
  ctx.roundRect(x + w * 0.16, y - 0.1 * TEX, w * 0.68, 0.12 * TEX, [0.035 * TEX, 0.035 * TEX, 0, 0]);
  ctx.fill();
  // Karosseri
  ctx.beginPath();
  ctx.roundRect(x, y, w, 0.11 * TEX, 0.025 * TEX);
  ctx.fill();
  // Hjul
  ctx.fillRect(x + w * 0.06, y + 0.1 * TEX, w * 0.2, 0.06 * TEX);
  ctx.fillRect(x + w * 0.74, y + 0.1 * TEX, w * 0.2, 0.06 * TEX);
  // Bakrute
  ctx.fillStyle = C.white;
  ctx.fillRect(x + w * 0.26, y - 0.07 * TEX, w * 0.48, 0.05 * TEX);
}

/** Tykk pil langs en bue (til skilt 406). Vinkler i canvas-radianer. */
function arcArrow(ctx: CanvasRenderingContext2D, r: number, a0: number, a1: number) {
  const c = TEX / 2;
  ctx.lineWidth = 0.075 * TEX;
  ctx.lineCap = "butt";
  ctx.beginPath();
  ctx.arc(c, c, r * TEX, a0, a1, true);
  ctx.stroke();
  // Pilhode i enden, pekende mot klokka (avtagende vinkel).
  const tip = a1 - 0.35;
  const out = (rr: number, a: number) => [c + rr * TEX * Math.cos(a), c + rr * TEX * Math.sin(a)] as const;
  ctx.beginPath();
  ctx.moveTo(...out(r + 0.08, a1));
  ctx.lineTo(...out(r, tip));
  ctx.lineTo(...out(r - 0.08, a1));
  ctx.closePath();
  ctx.fill();
}

const defs: SignDef[] = [
  {
    code: "202",
    name: "Vikeplikt",
    category: "vikepliktskilt",
    shape: "triangle-down",
    explanation:
      "Du har vikeplikt overfor kjørende på vegen du skal inn på eller krysse. Skiltet står normalt ved en vikelinje (haitenner).",
    rule: "Skiltforskriften § 6 (skilt 202), trafikkreglene § 7 nr. 1",
    draw: (ctx) => redBorder(ctx, "triangle-down", 0.62),
  },
  {
    code: "204",
    name: "Stopp",
    category: "vikepliktskilt",
    shape: "octagon",
    explanation:
      "Du skal stanse helt ved stopplinjen, eller der du har oversikt hvis stopplinje mangler, og har vikeplikt overfor kryssende trafikk.",
    rule: "Skiltforskriften § 6 (skilt 204), trafikkreglene § 7 nr. 1",
    draw: (ctx) => {
      fillShape(ctx, "octagon", 1, C.white);
      fillShape(ctx, "octagon", 0.93, C.red);
      text(ctx, "STOPP", 0, 0, 150, C.white);
    },
  },
  {
    code: "206",
    name: "Forkjørsveg",
    category: "vikepliktskilt",
    shape: "diamond",
    explanation:
      "Du kjører på forkjørsveg. Kjørende fra tilstøtende veger har vikeplikt overfor deg. Gjelder til skilt 208 Slutt på forkjørsveg.",
    rule: "Skiltforskriften § 6 (skilt 206)",
    draw: (ctx) => {
      fillShape(ctx, "diamond", 1, C.black);
      fillShape(ctx, "diamond", 0.96, C.white);
      fillShape(ctx, "diamond", 0.62, C.yellow);
    },
  },
  {
    code: "208",
    name: "Slutt på forkjørsveg",
    category: "vikepliktskilt",
    shape: "diamond",
    explanation:
      "Forkjørsvegen slutter. Etter skiltet gjelder de vanlige vikepliktreglene, for eksempel høyreregelen, hvis ikke annet er skiltet.",
    rule: "Skiltforskriften § 6 (skilt 208), trafikkreglene § 7 nr. 2",
    draw: (ctx) => {
      fillShape(ctx, "diamond", 1, C.black);
      fillShape(ctx, "diamond", 0.96, C.white);
      fillShape(ctx, "diamond", 0.62, C.yellow);
      // Svarte skråstreker over hele skiltflaten
      ctx.save();
      pathShape(ctx, "diamond", 0.96);
      ctx.clip();
      ctx.strokeStyle = C.black;
      ctx.lineWidth = 9;
      for (let i = -3; i <= 3; i++) {
        const o = i * 26;
        const [x1, y1] = px(-0.5 + o / TEX, -0.5 - o / TEX);
        const [x2, y2] = px(0.5 + o / TEX, 0.5 - o / TEX);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();
    },
  },
  {
    code: "302",
    name: "Innkjøring forbudt",
    category: "forbudsskilt",
    shape: "circle",
    explanation:
      "Forbud mot å kjøre inn på vegen fra den siden skiltet står. Gjelder alle kjøretøy, også sykkel, hvis ikke underskilt gjør unntak.",
    rule: "Skiltforskriften § 8 (skilt 302)",
    draw: (ctx) => {
      fillShape(ctx, "circle", 1, C.red);
      ctx.fillStyle = C.white;
      const [x, y] = px(-0.36, 0.09);
      ctx.fillRect(x, y, 0.72 * TEX, 0.18 * TEX);
    },
  },
  {
    code: "334",
    name: "Forbikjøringsforbud",
    category: "forbudsskilt",
    shape: "circle",
    explanation:
      "Forbud mot å kjøre forbi motorvogn med mer enn to hjul. Gjelder fram til skilt 336 Slutt på forbikjøringsforbud, eller så langt underskilt angir.",
    rule: "Skiltforskriften § 8 (skilt 334)",
    draw: (ctx) => {
      redBorder(ctx, "circle", 0.8);
      carFromBehind(ctx, -0.165, C.red);
      carFromBehind(ctx, 0.165, C.black);
    },
  },
  {
    code: "362",
    name: "Fartsgrense",
    category: "forbudsskilt",
    shape: "circle",
    explanation:
      "Høyeste tillatte fart i km/t for vegen fra skiltet og videre, til ny fartsgrense er skiltet eller den særskilte fartsgrensen oppheves.",
    rule: "Skiltforskriften § 8 (skilt 362)",
    draw: (ctx, value = 80) => {
      redBorder(ctx, "circle", 0.8);
      text(ctx, String(value), 0, -0.01, value >= 100 ? 190 : 230);
    },
  },
  {
    code: "406",
    name: "Påbudt rundkjøring",
    category: "pabudsskilt",
    shape: "circle",
    explanation:
      "Påbud om å kjøre i pilenes retning, altså mot klokka rundt midtøya. Skiltet står foran eller i rundkjøringen.",
    rule: "Skiltforskriften § 10 (skilt 406)",
    draw: (ctx) => {
      fillShape(ctx, "circle", 1, C.white);
      fillShape(ctx, "circle", 0.94, C.blue);
      ctx.strokeStyle = ctx.fillStyle = C.white;
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
        arcArrow(ctx, 0.25, a, a - 1.3);
      }
    },
  },
  {
    code: "516",
    name: "Gangfelt",
    category: "opplysningsskilt",
    shape: "square",
    explanation:
      "Viser hvor det er gangfelt. Du har vikeplikt for gående som er ute i gangfeltet eller på vei ut i det.",
    rule: "Skiltforskriften § 12 (skilt 516), trafikkreglene § 9 nr. 2",
    draw: (ctx) => {
      fillShape(ctx, "square", 1, C.white);
      fillShape(ctx, "square", 0.94, C.blue);
      fillShape(ctx, "triangle-up", 0.82, C.white);
      // Gående figur
      ctx.strokeStyle = ctx.fillStyle = C.black;
      ctx.lineCap = "round";
      ctx.lineWidth = 0.045 * TEX;
      const line = (pts: [number, number][]) => {
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(...px(x, y)) : ctx.moveTo(...px(x, y))));
        ctx.stroke();
      };
      ctx.beginPath();
      ctx.arc(...px(0.02, 0.12), 0.04 * TEX, 0, Math.PI * 2);
      ctx.fill();
      line([[0, 0.06], [-0.03, -0.08]]);
      line([[-0.03, -0.08], [-0.1, -0.2]]);
      line([[-0.03, -0.08], [0.06, -0.2]]);
      line([[-0.09, 0.0], [0.0, 0.04], [0.08, -0.03]]);
      // Striper
      ctx.fillStyle = C.black;
      for (let i = -2; i <= 2; i++) {
        const [x, y] = px(i * 0.07 - 0.02, -0.23);
        ctx.fillRect(x, y, 0.04 * TEX, 0.04 * TEX);
      }
    },
  },
  {
    code: "100.1",
    name: "Farlig sving (til høyre)",
    category: "fareskilt",
    shape: "triangle-up",
    explanation: "Varsler en farlig sving til høyre. Senk farten og hold deg i eget felt.",
    rule: "Skiltforskriften § 4 (skilt 100)",
    draw: (ctx) => {
      redBorder(ctx, "triangle-up", 0.66);
      ctx.strokeStyle = ctx.fillStyle = C.black;
      ctx.lineWidth = 0.05 * TEX;
      ctx.beginPath();
      ctx.moveTo(...px(-0.06, -0.24));
      ctx.lineTo(...px(-0.06, -0.02));
      ctx.quadraticCurveTo(...px(-0.06, 0.08), ...px(0.04, 0.08));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(...px(0.12, 0.08));
      ctx.lineTo(...px(0.03, 0.15));
      ctx.lineTo(...px(0.03, 0.01));
      ctx.closePath();
      ctx.fill();
    },
  },
];

export const SIGNS: Record<string, SignDef> = Object.fromEntries(defs.map((d) => [d.code, d]));

export function getSign(code: string): SignDef {
  const def = SIGNS[code];
  if (!def) throw new Error(`Ukjent skiltkode: ${code}`);
  return def;
}

/** Visningsnavn, inkludert verdi der det er relevant (f.eks. «Fartsgrense 80»). */
export function signTitle(code: string, value?: number): string {
  const def = getSign(code);
  return value !== undefined ? `${def.name} ${value}` : def.name;
}
