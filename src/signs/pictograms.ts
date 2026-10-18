import { C, TEX, px } from "./draw";

/**
 * Forenklede svarte piktogrammer til fareskilt. Koordinater er normaliserte
 * ([-0.5, 0.5], y opp) og plassert slik at de passer i den hvite flaten på en
 * trekant med spissen opp (sentrum omtrent i y = -0.07).
 */

type Pt = [number, number];
type Ctx = CanvasRenderingContext2D;

function poly(ctx: Ctx, pts: Pt[], color = C.black) {
  ctx.fillStyle = color;
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(...px(x, y)) : ctx.moveTo(...px(x, y))));
  ctx.closePath();
  ctx.fill();
}

function line(ctx: Ctx, pts: Pt[], width: number, color = C.black) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width * TEX;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(...px(x, y)) : ctx.moveTo(...px(x, y))));
  ctx.stroke();
}

function ellipse(ctx: Ctx, x: number, y: number, rx: number, ry: number, rot = 0, color = C.black) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(...px(x, y), rx * TEX, ry * TEX, rot, 0, Math.PI * 2);
  ctx.fill();
}

const circle = (ctx: Ctx, x: number, y: number, r: number, color = C.black) => ellipse(ctx, x, y, r, r, 0, color);

/** Firbeint dyr sett fra siden, med hodet mot høyre. */
function quadruped(
  ctx: Ctx,
  o: { bodyW: number; bodyH: number; legH: number; neck: Pt; head: Pt; headR: [number, number] },
) {
  const base = -0.24;
  const bodyY = base + o.legH + o.bodyH / 2;
  ellipse(ctx, -0.02, bodyY, o.bodyW / 2, o.bodyH / 2);
  const legX = [-0.02 - o.bodyW * 0.38, -0.02 - o.bodyW * 0.22, -0.02 + o.bodyW * 0.24, -0.02 + o.bodyW * 0.38];
  legX.forEach((x) => line(ctx, [[x, bodyY - o.bodyH * 0.2], [x, base]], 0.022));
  line(ctx, [[-0.02 + o.bodyW * 0.38, bodyY + o.bodyH * 0.1], o.neck], 0.05);
  ellipse(ctx, o.head[0], o.head[1], o.headR[0], o.headR[1], -0.4);
}

export const pictograms = {
  elg(ctx: Ctx) {
    quadruped(ctx, { bodyW: 0.3, bodyH: 0.12, legH: 0.13, neck: [0.17, 0.09], head: [0.2, 0.06], headR: [0.05, 0.028] });
    // Skuffeformet gevir
    poly(ctx, [[0.14, 0.11], [0.08, 0.17], [0.11, 0.18], [0.14, 0.14], [0.17, 0.19], [0.19, 0.12]]);
    line(ctx, [[-0.12, 0.0], [-0.04, 0.01]], 0.02); // pukkel
  },
  rein(ctx: Ctx) {
    quadruped(ctx, { bodyW: 0.26, bodyH: 0.1, legH: 0.13, neck: [0.15, 0.06], head: [0.18, 0.04], headR: [0.045, 0.025] });
    line(ctx, [[0.15, 0.08], [0.1, 0.18], [0.04, 0.2]], 0.015);
    line(ctx, [[0.12, 0.13], [0.16, 0.18]], 0.015);
    line(ctx, [[0.17, 0.08], [0.2, 0.17]], 0.015);
  },
  hjort(ctx: Ctx) {
    quadruped(ctx, { bodyW: 0.26, bodyH: 0.1, legH: 0.15, neck: [0.15, 0.08], head: [0.18, 0.06], headR: [0.045, 0.024] });
    line(ctx, [[0.16, 0.1], [0.12, 0.2]], 0.014);
    line(ctx, [[0.14, 0.15], [0.09, 0.17]], 0.014);
    line(ctx, [[0.17, 0.1], [0.21, 0.19]], 0.014);
  },
  ku(ctx: Ctx) {
    quadruped(ctx, { bodyW: 0.32, bodyH: 0.14, legH: 0.1, neck: [0.16, 0.02], head: [0.19, 0.0], headR: [0.05, 0.035] });
    line(ctx, [[0.17, 0.04], [0.15, 0.08]], 0.014);
    line(ctx, [[0.21, 0.04], [0.23, 0.08]], 0.014);
  },
  sau(ctx: Ctx) {
    quadruped(ctx, { bodyW: 0.28, bodyH: 0.15, legH: 0.08, neck: [0.14, 0.0], head: [0.17, -0.02], headR: [0.045, 0.03] });
  },
  barn(ctx: Ctx) {
    // Voksen og barn som går
    circle(ctx, -0.08, 0.1, 0.035);
    line(ctx, [[-0.08, 0.06], [-0.09, -0.08]], 0.045);
    line(ctx, [[-0.09, -0.08], [-0.13, -0.23]], 0.035);
    line(ctx, [[-0.09, -0.08], [-0.04, -0.23]], 0.035);
    line(ctx, [[-0.08, 0.03], [0.0, -0.04]], 0.03);
    circle(ctx, 0.07, 0.0, 0.03);
    line(ctx, [[0.07, -0.03], [0.07, -0.13]], 0.04);
    line(ctx, [[0.07, -0.13], [0.04, -0.23]], 0.03);
    line(ctx, [[0.07, -0.13], [0.11, -0.23]], 0.03);
    line(ctx, [[0.07, -0.06], [0.0, -0.04]], 0.025);
  },
  syklende(ctx: Ctx) {
    ctx.lineWidth = 0.022 * TEX;
    ctx.strokeStyle = C.black;
    for (const x of [-0.12, 0.12]) {
      ctx.beginPath();
      ctx.arc(...px(x, -0.17), 0.075 * TEX, 0, Math.PI * 2);
      ctx.stroke();
    }
    line(ctx, [[-0.12, -0.17], [-0.03, -0.17], [0.07, -0.06], [-0.06, -0.06], [-0.03, -0.17]], 0.02);
    line(ctx, [[0.12, -0.17], [0.07, -0.06], [0.08, -0.02]], 0.02);
    circle(ctx, 0.01, 0.12, 0.032);
    line(ctx, [[0.0, 0.08], [-0.04, -0.03], [0.0, -0.11]], 0.035);
    line(ctx, [[-0.01, 0.05], [0.07, -0.02]], 0.025);
  },
  vegarbeid(ctx: Ctx) {
    // Person med spade og jordhaug
    circle(ctx, 0.0, 0.11, 0.035);
    line(ctx, [[-0.01, 0.07], [-0.04, -0.06]], 0.045);
    line(ctx, [[-0.04, -0.06], [-0.1, -0.2]], 0.035);
    line(ctx, [[-0.04, -0.06], [0.03, -0.2]], 0.035);
    line(ctx, [[-0.02, 0.04], [0.09, -0.02]], 0.028);
    line(ctx, [[0.06, 0.06], [0.14, -0.14]], 0.02);
    poly(ctx, [[0.06, -0.24], [0.14, -0.15], [0.22, -0.24]]);
  },
  glatt(ctx: Ctx) {
    // Bil sett bakfra og to slingrende spor
    poly(ctx, [[-0.12, 0.02], [0.12, 0.02], [0.1, 0.1], [-0.1, 0.1]]);
    ctx.fillStyle = C.black;
    ctx.beginPath();
    ctx.roundRect(...px(-0.15, 0.03), 0.3 * TEX, 0.08 * TEX, 0.02 * TEX);
    ctx.fill();
    for (const x of [-0.07, 0.07]) {
      line(ctx, [[x, -0.03], [x + 0.05, -0.09], [x - 0.04, -0.15], [x + 0.04, -0.22]], 0.022);
    }
  },
  smalereVeg(ctx: Ctx) {
    line(ctx, [[-0.13, -0.24], [-0.13, -0.08], [-0.06, 0.02], [-0.06, 0.15]], 0.035);
    line(ctx, [[0.13, -0.24], [0.13, -0.08], [0.06, 0.02], [0.06, 0.15]], 0.035);
  },
  ujevnVeg(ctx: Ctx) {
    poly(ctx, [
      [-0.24, -0.24],
      [-0.24, -0.12],
      [-0.14, -0.05],
      [-0.04, -0.12],
      [0.04, -0.12],
      [0.14, -0.05],
      [0.24, -0.12],
      [0.24, -0.24],
    ]);
  },
  brattBakke(ctx: Ctx) {
    // Skrå flate nedover mot høyre med prosenttekst
    poly(ctx, [[-0.22, -0.02], [0.22, -0.24], [-0.22, -0.24]]);
    ctx.fillStyle = C.black;
    ctx.font = `bold ${0.1 * TEX}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("10%", ...px(0.04, 0.07));
  },
  farligeSvinger(ctx: Ctx) {
    ctx.strokeStyle = C.black;
    ctx.lineWidth = 0.045 * TEX;
    ctx.beginPath();
    ctx.moveTo(...px(-0.02, -0.25));
    ctx.bezierCurveTo(...px(-0.02, -0.12), ...px(0.1, -0.12), ...px(0.06, -0.03));
    ctx.bezierCurveTo(...px(0.0, 0.06), ...px(-0.1, 0.03), ...px(-0.06, 0.12));
    ctx.stroke();
    poly(ctx, [[-0.12, 0.1], [-0.03, 0.2], [0.0, 0.08]]);
  },
  kryssHoyre(ctx: Ctx) {
    // Farlig vegkryss (124): likeverdige veger, et jevnt kors
    poly(ctx, [[-0.035, -0.25], [0.035, -0.25], [0.035, 0.15], [-0.035, 0.15]]);
    poly(ctx, [[-0.2, -0.09], [0.2, -0.09], [0.2, -0.02], [-0.2, -0.02]]);
  },
  kryssSideveg(ctx: Ctx) {
    // Forkjørskryss (210): tykk gjennomgående veg, tynne sideveger
    poly(ctx, [[-0.055, -0.25], [0.055, -0.25], [0.055, 0.15], [-0.055, 0.15]]);
    poly(ctx, [[-0.19, -0.065], [0.19, -0.065], [0.19, -0.04], [-0.19, -0.04]]);
  },
  trafikklys(ctx: Ctx) {
    ctx.fillStyle = C.black;
    ctx.beginPath();
    ctx.roundRect(...px(-0.08, 0.17), 0.16 * TEX, 0.42 * TEX, 0.04 * TEX);
    ctx.fill();
    circle(ctx, 0, 0.1, 0.045, C.red);
    circle(ctx, 0, -0.04, 0.045, C.yellow);
    circle(ctx, 0, -0.18, 0.045, "#1f9d55");
  },
  motendeTrafikk(ctx: Ctx) {
    // Egen retning opp til høyre, møtende ned til venstre
    line(ctx, [[0.07, -0.24], [0.07, 0.1]], 0.04);
    poly(ctx, [[0.01, 0.06], [0.07, 0.16], [0.13, 0.06]]);
    line(ctx, [[-0.07, 0.14], [-0.07, -0.2]], 0.04);
    poly(ctx, [[-0.13, -0.16], [-0.07, -0.26], [-0.01, -0.16]]);
  },
  ko(ctx: Ctx) {
    // To biler bak hverandre, sett forfra
    for (const [y, s] of [
      [-0.06, 1],
      [-0.2, 1.2],
    ] as const) {
      ctx.fillStyle = C.black;
      ctx.beginPath();
      ctx.roundRect(...px(-0.12 * s, y + 0.08 * s), 0.24 * s * TEX, 0.08 * s * TEX, 0.02 * TEX);
      ctx.fill();
      poly(ctx, [
        [-0.08 * s, y + 0.08 * s],
        [0.08 * s, y + 0.08 * s],
        [0.06 * s, y + 0.13 * s],
        [-0.06 * s, y + 0.13 * s],
      ]);
    }
  },
  gangfelt(ctx: Ctx) {
    circle(ctx, 0.0, 0.12, 0.035);
    line(ctx, [[0.0, 0.08], [-0.02, -0.06]], 0.045);
    line(ctx, [[-0.02, -0.06], [-0.08, -0.17]], 0.035);
    line(ctx, [[-0.02, -0.06], [0.05, -0.17]], 0.035);
    line(ctx, [[-0.08, 0.02], [0.0, 0.05], [0.07, -0.02]], 0.028);
    for (let i = -2; i <= 2; i++) poly(ctx, [
      [i * 0.07 - 0.025, -0.24],
      [i * 0.07 + 0.025, -0.24],
      [i * 0.07 + 0.025, -0.2],
      [i * 0.07 - 0.025, -0.2],
    ]);
  },
  utropstegn(ctx: Ctx) {
    poly(ctx, [[-0.035, 0.14], [0.035, 0.14], [0.025, -0.11], [-0.025, -0.11]]);
    circle(ctx, 0, -0.19, 0.04);
  },
  rundkjoring(ctx: Ctx) {
    // Tre piler i sirkel, mot klokka
    ctx.strokeStyle = ctx.fillStyle = C.black;
    const c = px(0, -0.06);
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      ctx.lineWidth = 0.035 * TEX;
      ctx.beginPath();
      ctx.arc(c[0], c[1], 0.12 * TEX, a, a - 1.3, true);
      ctx.stroke();
      const e = a - 1.3;
      const tip = e - 0.35;
      const out = (rr: number, ang: number) => [c[0] + rr * TEX * Math.cos(ang), c[1] + rr * TEX * Math.sin(ang)] as const;
      ctx.beginPath();
      ctx.moveTo(...out(0.17, e));
      ctx.lineTo(...out(0.12, tip));
      ctx.lineTo(...out(0.07, e));
      ctx.closePath();
      ctx.fill();
    }
  },
};
