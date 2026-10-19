import { C, TEX, carFromBehind, fillShape, pathShape, px, redBorder, text } from "./draw";
import { pictograms } from "./pictograms";
import type { SignDef } from "./registry";

/**
 * Flere skilt: fareskilt med piktogrammer, forbuds-, påbuds- og opplysningsskilt.
 * Numre og navn er kontrollert mot skiltforskriften (se CONTENT_REVIEW.md).
 */

type Ctx = CanvasRenderingContext2D;
type Draw = (ctx: Ctx) => void;

const GREY = "#8a8a8a";

/** Tegner et piktogram i valgfri farge og eventuelt speilvendt, via et midlertidig lerret. */
function tinted(ctx: Ctx, draw: Draw, color: string, flip = false) {
  const tmp = document.createElement("canvas");
  tmp.width = tmp.height = TEX;
  const t = tmp.getContext("2d")!;
  if (flip) {
    t.translate(TEX, 0);
    t.scale(-1, 1);
  }
  draw(t);
  t.setTransform(1, 0, 0, 1, 0, 0);
  t.globalCompositeOperation = "source-in";
  t.fillStyle = color;
  t.fillRect(0, 0, TEX, TEX);
  ctx.drawImage(tmp, 0, 0);
}

/** Fareskilt: rød trekant med svart piktogram. */
function warning(
  code: string,
  name: string,
  picto: Draw,
  explanation: string,
  flip = false,
  /** Tegn piktogrammet i egne farger (f.eks. trafikklys). */
  raw = false,
): SignDef {
  return {
    code,
    name,
    category: "fareskilt",
    shape: "triangle-up",
    explanation,
    rule: `Skiltforskriften § 4 (skilt ${code.split(".")[0]})`,
    draw: (ctx) => {
      redBorder(ctx, "triangle-up", 0.66);
      if (raw) picto(ctx);
      else tinted(ctx, picto, C.black, flip);
    },
  };
}

/** Forbudsskilt: hvit sirkel med rød ring og svart symbol. */
function prohibition(code: string, name: string, picto: Draw, explanation: string, rule?: string): SignDef {
  return {
    code,
    name,
    category: "forbudsskilt",
    shape: "circle",
    explanation,
    rule: rule ?? `Skiltforskriften § 8 (skilt ${code})`,
    draw: (ctx) => {
      redBorder(ctx, "circle", 0.8);
      picto(ctx);
    },
  };
}

/** Rød skråstrek over et forbudsskilt (svingeforbud, vendingsforbud). */
function redBar(ctx: Ctx) {
  ctx.save();
  pathShape(ctx, "circle", 0.8);
  ctx.clip();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 0.09 * TEX;
  ctx.beginPath();
  ctx.moveTo(...px(-0.4, 0.4));
  ctx.lineTo(...px(0.4, -0.4));
  ctx.stroke();
  ctx.restore();
}

/** «Slutt på …»: hvit skive, grått symbol og svarte skråstriper. */
function endOf(ctx: Ctx, content: Draw) {
  fillShape(ctx, "circle", 1, "#b8b8b8");
  fillShape(ctx, "circle", 0.96, C.white);
  tinted(ctx, content, GREY);
  ctx.save();
  pathShape(ctx, "circle", 0.96);
  ctx.clip();
  ctx.strokeStyle = C.black;
  ctx.lineWidth = 0.025 * TEX;
  for (let i = -2; i <= 2; i++) {
    const o = i * 0.07;
    ctx.beginPath();
    ctx.moveTo(...px(0.5 + o, 0.5 + o));
    ctx.lineTo(...px(-0.5 + o, -0.5 + o));
    ctx.stroke();
  }
  ctx.restore();
}

/** Hvit pil på blått, pekende i retning (grader, 0 = opp, 90 = høyre). */
function arrow(ctx: Ctx, deg: number, color: string = C.white, scale = 1, cx = 0, cy = 0) {
  ctx.save();
  const [x, y] = px(cx, cy);
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  const u = TEX;
  ctx.fillRect(-0.05 * u, -0.08 * u, 0.1 * u, 0.32 * u);
  ctx.beginPath();
  ctx.moveTo(-0.16 * u, -0.06 * u);
  ctx.lineTo(0, -0.27 * u);
  ctx.lineTo(0.16 * u, -0.06 * u);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Påbudsskilt: blå sirkel med hvit kant. */
function mandatory(code: string, name: string, picto: Draw, explanation: string): SignDef {
  return {
    code,
    name,
    category: "pabudsskilt",
    shape: "circle",
    explanation,
    rule: `Skiltforskriften § 10 (skilt ${code.split(".")[0]})`,
    draw: (ctx) => {
      fillShape(ctx, "circle", 1, C.white);
      fillShape(ctx, "circle", 0.94, C.blue);
      picto(ctx);
    },
  };
}

/** Opplysningsskilt: blått kvadrat med hvit kant og hvitt symbol. */
function info(code: string, name: string, picto: Draw, explanation: string, rule?: string): SignDef {
  return {
    code,
    name,
    category: "opplysningsskilt",
    shape: "square",
    explanation,
    rule: rule ?? `Skiltforskriften § 12 (skilt ${code.split(".")[0]})`,
    draw: (ctx) => {
      fillShape(ctx, "square", 1, C.white);
      fillShape(ctx, "square", 0.94, C.blue);
      picto(ctx);
    },
  };
}

/** Flytter et piktogram laget for trekant (sentrum y ≈ -0.07) opp til midten og skalerer det. */
const centered =
  (draw: Draw, scale = 1.25, dy = 0.07): Draw =>
  (ctx) => {
    ctx.save();
    ctx.translate(TEX / 2, TEX / 2);
    ctx.scale(scale, scale);
    ctx.translate(-TEX / 2, -TEX / 2 - dy * TEX);
    draw(ctx);
    ctx.restore();
  };

const ANIMAL_TEXT =
  "dyr ofte krysser eller går langs vegen. Senk farten og vær ekstra oppmerksom, særlig i skumring og mørke.";

/** Bøyd pil for sving (til forbudsskilt 330). k = 1 høyre, -1 venstre. */
function turnArrow(k: number, color: string = C.black): Draw {
  return (ctx) => {
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = 0.07 * TEX;
    ctx.beginPath();
    ctx.moveTo(...px(-0.08 * k, -0.25));
    ctx.lineTo(...px(-0.08 * k, 0.0));
    ctx.quadraticCurveTo(...px(-0.08 * k, 0.1), ...px(0.04 * k, 0.1));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(...px(0.2 * k, 0.1));
    ctx.lineTo(...px(0.04 * k, 0.22));
    ctx.lineTo(...px(0.04 * k, -0.02));
    ctx.closePath();
    ctx.fill();
  };
}

export const moreSigns: SignDef[] = [
  // ---------- Fareskilt (§ 4) ----------
  warning("100.2", "Farlig sving (til venstre)", (ctx) => turnArrow(-1)(ctx), "Varsler en farlig sving til venstre. Senk farten og hold deg i eget felt."),
  warning("102.1", "Farlige svinger", pictograms.farligeSvinger, "Varsler flere farlige svinger etter hverandre. Den første svingen går til høyre."),
  warning("104.2", "Bratt bakke (fall)", pictograms.brattBakke, "Varsler bratt bakke nedover. Hold god avstand og bruk motoren til å bremse."),
  warning("106.1", "Smalere veg", pictograms.smalereVeg, "Varsler at vegen blir smalere på begge sider."),
  warning("108", "Ujevn veg", pictograms.ujevnVeg, "Varsler ujevn vegbane. Senk farten."),
  warning("109", "Fartshump", pictograms.ujevnVeg, "Varsler fartshump. Senk farten før humpen."),
  warning("110", "Vegarbeid", pictograms.vegarbeid, "Varsler arbeid på eller ved vegen. Senk farten og følg skilting og anvisninger."),
  warning("116", "Glatt kjørebane", pictograms.glatt, "Varsler at kjørebanen kan være spesielt glatt."),
  warning("122", "Tunnel", pictograms.utropstegn, "Varsler tunnel foran."),
  warning("124", "Farlig vegkryss", pictograms.kryssHoyre, "Varsler et farlig kryss der den vanlige høyreregelen gjelder."),
  warning("126", "Rundkjøring", pictograms.rundkjoring, "Varsler rundkjøring foran."),
  warning("132", "Trafikklyssignal", pictograms.trafikklys, "Varsler trafikklys foran.", false, true),
  warning("134", "Planovergang med bom", pictograms.utropstegn, "Varsler planovergang med bom. Hold lav fart og vær klar til å stanse."),
  warning("135", "Planovergang uten bom", pictograms.utropstegn, "Varsler planovergang uten bom. Se etter tog og hold lav fart."),
  warning("140", "Avstand til gangfelt", pictograms.gangfelt, "Varsler gangfelt foran."),
  warning("142", "Barn", pictograms.barn, "Varsler sted der barn ofte ferdes, for eksempel ved skole eller lekeplass."),
  warning("144", "Syklende", pictograms.syklende, "Varsler at syklende ofte krysser eller kjører ut i vegen."),
  warning("146.1", "Elg", pictograms.elg, `Varsler at elg og andre ${ANIMAL_TEXT}`, true),
  warning("146.2", "Rein", pictograms.rein, `Varsler at rein og andre ${ANIMAL_TEXT}`, true),
  warning("146.3", "Hjort", pictograms.hjort, `Varsler at hjort og andre ${ANIMAL_TEXT}`, true),
  warning("146.4", "Ku", pictograms.ku, `Varsler at storfe og andre ${ANIMAL_TEXT}`, true),
  warning("146.5", "Sau", pictograms.sau, `Varsler at sau og andre ${ANIMAL_TEXT}`, true),
  warning("148", "Møtende trafikk", pictograms.motendeTrafikk, "Varsler at det kommer trafikk i begge retninger."),
  warning("149", "Kø", pictograms.ko, "Varsler kø. Vær klar til å stanse."),
  warning("156", "Annen fare", pictograms.utropstegn, "Varsler en fare som ikke har eget skilt. Underskilt forteller ofte hva faren er."),

  // ---------- Vikeplikt- og forkjørsskilt (§ 6) ----------
  {
    code: "210",
    name: "Forkjørskryss",
    category: "vikepliktskilt",
    shape: "triangle-up",
    explanation: "Varsler et kryss der trafikk fra sidevegene har vikeplikt for deg.",
    rule: "Skiltforskriften § 6 (skilt 210)",
    draw: (ctx) => {
      redBorder(ctx, "triangle-up", 0.66);
      tinted(ctx, pictograms.kryssSideveg, C.black);
    },
  },
  {
    code: "212",
    name: "Vikeplikt overfor møtende kjørende",
    category: "vikepliktskilt",
    shape: "circle",
    explanation:
      "Du må ikke kjøre inn på det smale vegpartiet hvis du dermed hindrer møtende. Vent til de har passert.",
    rule: "Skiltforskriften § 6 (skilt 212)",
    draw: (ctx) => {
      redBorder(ctx, "circle", 0.8);
      arrow(ctx, 0, C.red, 0.7, -0.11, 0.0);
      arrow(ctx, 180, C.black, 0.7, 0.11, 0.0);
    },
  },
  {
    code: "214",
    name: "Møtende kjørende har vikeplikt",
    category: "vikepliktskilt",
    shape: "square",
    explanation: "Møtende kjørende har vikeplikt for deg på det smale vegpartiet foran.",
    rule: "Skiltforskriften § 6 (skilt 214)",
    draw: (ctx) => {
      fillShape(ctx, "square", 1, C.white);
      fillShape(ctx, "square", 0.94, C.blue);
      arrow(ctx, 0, C.white, 0.7, 0.11, 0.0);
      arrow(ctx, 180, C.red, 0.7, -0.11, 0.0);
    },
  },

  // ---------- Forbudsskilt (§ 8) ----------
  prohibition(
    "306.1",
    "Forbudt for motorvogn",
    (ctx) => carFromBehind(ctx, 0, C.black),
    "Forbud mot å kjøre med motorvogn (unntatt liten elektrisk motorvogn).",
  ),
  prohibition(
    "306.6",
    "Forbudt for syklende",
    (ctx) => tinted(ctx, centered(pictograms.syklende, 1.15), C.black),
    "Forbud mot å sykle (og kjøre liten elektrisk motorvogn) på vegen.",
  ),
  prohibition(
    "330.1",
    "Svingeforbud (høyre)",
    (ctx) => {
      turnArrow(1)(ctx);
      redBar(ctx);
    },
    "Forbud mot å svinge til høyre i krysset der skiltet står, eller i første kryss etter skiltet.",
  ),
  prohibition(
    "330.2",
    "Svingeforbud (venstre)",
    (ctx) => {
      turnArrow(-1)(ctx);
      redBar(ctx);
    },
    "Forbud mot å svinge til venstre i krysset der skiltet står, eller i første kryss etter skiltet.",
  ),
  prohibition(
    "332",
    "Vendingsforbud",
    (ctx) => {
      ctx.strokeStyle = ctx.fillStyle = C.black;
      ctx.lineWidth = 0.065 * TEX;
      ctx.beginPath();
      ctx.moveTo(...px(0.1, -0.24));
      ctx.lineTo(...px(0.1, 0.06));
      ctx.arc(...px(0.0, 0.06), 0.1 * TEX, 0, Math.PI, true);
      ctx.lineTo(...px(-0.1, -0.08));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(...px(-0.21, -0.06));
      ctx.lineTo(...px(-0.1, -0.22));
      ctx.lineTo(...px(0.01, -0.06));
      ctx.closePath();
      ctx.fill();
      redBar(ctx);
    },
    "Forbud mot å vende (snu) på vegen.",
  ),
  {
    code: "336",
    name: "Slutt på forbikjøringsforbud",
    category: "forbudsskilt",
    shape: "circle",
    explanation: "Forbikjøringsforbudet (skilt 334) slutter her.",
    rule: "Skiltforskriften § 8 (skilt 336)",
    draw: (ctx) =>
      endOf(ctx, (c) => {
        carFromBehind(c, -0.165, C.black);
        carFromBehind(c, 0.165, C.black);
      }),
  },
  {
    code: "364",
    name: "Slutt på særskilt fartsgrense",
    category: "forbudsskilt",
    shape: "circle",
    explanation:
      "Den skiltede fartsgrensen slutter. Da gjelder den generelle grensen: 50 km/t i tettbygd strøk og 80 km/t utenfor, hvis ikke annet er skiltet.",
    rule: "Skiltforskriften § 8 (skilt 364), vegtrafikkloven § 6 annet ledd",
    draw: (ctx, value = 60) => endOf(ctx, (c) => text(c, String(value), 0, -0.01, 220)),
  },
  {
    code: "366",
    name: "Fartsgrensesone",
    category: "forbudsskilt",
    shape: "square",
    explanation:
      "Fartsgrensen gjelder i hele sonen, også i sidegatene, fram til skilt for slutt på sonen.",
    rule: "Skiltforskriften § 8 (skilt 366)",
    draw: (ctx, value = 30) => {
      fillShape(ctx, "square", 1, C.white);
      fillShape(ctx, "circle", 0.62, C.red);
      fillShape(ctx, "circle", 0.5, C.white);
      text(ctx, String(value), 0, 0.06, 130);
      text(ctx, "SONE", 0, -0.36, 90);
    },
  },
  {
    code: "370",
    name: "Stans forbudt",
    category: "forbudsskilt",
    shape: "circle",
    explanation:
      "Forbud mot å stanse på den siden av vegen skiltet står, fram til neste kryss eller nytt skilt. Heller ikke kort stans for av- og påstigning er lov.",
    rule: "Skiltforskriften § 8 (skilt 370)",
    draw: (ctx) => {
      fillShape(ctx, "circle", 1, C.red);
      fillShape(ctx, "circle", 0.8, C.blue);
      ctx.save();
      pathShape(ctx, "circle", 0.8);
      ctx.clip();
      ctx.strokeStyle = C.red;
      ctx.lineWidth = 0.08 * TEX;
      for (const k of [1, -1]) {
        ctx.beginPath();
        ctx.moveTo(...px(-0.4, 0.4 * k));
        ctx.lineTo(...px(0.4, -0.4 * k));
        ctx.stroke();
      }
      ctx.restore();
    },
  },
  {
    code: "372",
    name: "Parkering forbudt",
    category: "forbudsskilt",
    shape: "circle",
    explanation:
      "Forbud mot å parkere på den siden av vegen skiltet står. Kort stans for av- og påstigning eller av- og pålessing er likevel tillatt.",
    rule: "Skiltforskriften § 8 (skilt 372), trafikkreglene § 1 nr. 1 k",
    draw: (ctx) => {
      fillShape(ctx, "circle", 1, C.red);
      fillShape(ctx, "circle", 0.8, C.blue);
      ctx.save();
      pathShape(ctx, "circle", 0.8);
      ctx.clip();
      ctx.strokeStyle = C.red;
      ctx.lineWidth = 0.08 * TEX;
      ctx.beginPath();
      ctx.moveTo(...px(-0.4, 0.4));
      ctx.lineTo(...px(0.4, -0.4));
      ctx.stroke();
      ctx.restore();
    },
  },

  // ---------- Påbudsskilt (§ 10) ----------
  mandatory("402.1", "Påbudt kjøreretning (høyre)", (ctx) => arrow(ctx, 90), "Du må kjøre til høyre i krysset."),
  mandatory("402.2", "Påbudt kjøreretning (venstre)", (ctx) => arrow(ctx, -90), "Du må kjøre til venstre i krysset."),
  mandatory("402.3", "Påbudt kjøreretning (rett fram)", (ctx) => arrow(ctx, 0), "Du må kjøre rett fram i krysset."),
  mandatory(
    "404.1",
    "Påbudt kjørefelt (høyre)",
    (ctx) => arrow(ctx, 135),
    "Du må passere skiltet på høyre side, for eksempel ved en trafikkøy.",
  ),

  // ---------- Opplysningsskilt (§ 12) ----------
  info(
    "502",
    "Motorveg",
    (ctx) => {
      ctx.fillStyle = C.white;
      // Bru over to kjørebaner
      ctx.fillRect(...px(-0.36, 0.2), 0.72 * TEX, 0.07 * TEX);
      for (const k of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(...px(k * 0.04, 0.1));
        ctx.lineTo(...px(k * 0.1, 0.1));
        ctx.lineTo(...px(k * 0.33, -0.33));
        ctx.lineTo(...px(k * 0.12, -0.33));
        ctx.closePath();
        ctx.fill();
      }
    },
    "Motorveg begynner. Bare motorvogner som lovlig kan kjøre minst 40 km/t på flat veg, er tillatt. Det er forbudt å rygge, vende og stanse.",
    "Skiltforskriften § 12 (skilt 502), trafikkreglene § 4 nr. 2, § 11 nr. 2 og § 17 nr. 1 e",
  ),
  info(
    "503",
    "Motortrafikkveg",
    (ctx) => carFromBehind(ctx, 0, C.white),
    "Motortrafikkveg begynner. Som på motorveg er bare motorvogner som lovlig kan kjøre minst 40 km/t, tillatt.",
    "Skiltforskriften § 12 (skilt 503), trafikkreglene § 4 nr. 2",
  ),
  info(
    "508.1",
    "Kollektivfelt for buss",
    (ctx) => text(ctx, "BUSS", 0, -0.02, 120, C.white),
    "Feltet er reservert for buss. Blant annet tohjuls motorsykkel uten sidevogn og utrykningskjøretøy kan også bruke det, med mindre skilt sier noe annet.",
    "Skiltforskriften § 12 (skilt 508), trafikkreglene § 5 nr. 2",
  ),
  info(
    "518",
    "Gangveg",
    (ctx) => tinted(ctx, centered(pictograms.gangfelt), C.white),
    "Veg for gående. Det er ikke lov å kjøre her.",
    "Skiltforskriften § 12 (skilt 518), trafikkreglene § 4 nr. 1",
  ),
  info(
    "520",
    "Sykkelveg",
    (ctx) => tinted(ctx, centered(pictograms.syklende), C.white),
    "Veg for syklende. Motorvogn kan ikke kjøre her.",
    "Skiltforskriften § 12 (skilt 520), trafikkreglene § 4 nr. 1",
  ),
  info(
    "522",
    "Gang- og sykkelveg",
    (ctx) => {
      tinted(ctx, centered(pictograms.syklende, 0.85, 0.0), C.white);
      tinted(ctx, (c) => {
        c.translate(-0.2 * TEX, 0.18 * TEX);
        c.scale(0.7, 0.7);
        c.translate(0.21 * TEX, 0.21 * TEX);
        pictograms.gangfelt(c);
      }, C.white);
    },
    "Veg for gående og syklende. Det er ikke lov å kjøre bil her. Syklende som skal ut på eller krysse kjørevegen, har vikeplikt.",
    "Skiltforskriften § 12 (skilt 522), trafikkreglene § 4 nr. 1 og § 7 nr. 4",
  ),
  info(
    "527.1",
    "Blindveg",
    (ctx) => {
      ctx.fillStyle = C.white;
      ctx.fillRect(...px(-0.07, 0.15), 0.14 * TEX, 0.45 * TEX);
      ctx.fillStyle = C.red;
      ctx.fillRect(...px(-0.25, 0.25), 0.5 * TEX, 0.1 * TEX);
    },
    "Vegen er en blindveg uten gjennomkjøring.",
  ),
  info(
    "552",
    "Parkering",
    (ctx) => text(ctx, "P", 0, -0.01, 340, C.white),
    "Viser parkeringsplass. Underskilt kan begrense hvem som kan parkere og hvor lenge.",
  ),
];
