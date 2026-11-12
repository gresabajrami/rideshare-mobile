import { profiliIm } from "@/lib/lejet";
import { hiq, lexoGjendjen, ruaj, udhetimiEkziston } from "@/lib/preferuarat";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };
const paCache = { "Cache-Control": "no-store" };

// Vetëm për provat e laboratorit. Kontrollohen PARA çdo shkrimi në databazë:
// x-vonese ngadalëson përgjigjen (max 3 s), x-simulo-gabim kthen 500 pa shkruar asgjë.
async function simulimi(req: Request) {
  const ms = Math.min(Number(req.headers.get("x-vonese")) || 0, 3000);
  if (ms > 0) await new Promise((r) => setTimeout(r, ms));
  return req.headers.get("x-simulo-gabim") === "1";
}

async function trajto(req: Request, { params }: Ctx, veprimi: "lexo" | "ruaj" | "hiq") {
  const { id } = await params;
  try {
    // Përdoruesi vjen nga sesioni, jo nga trupi i kërkesës.
    const p = await profiliIm();
    if (!p) return Response.json({ error: "Hyr në llogari." }, { status: 401 });
    if (!(await udhetimiEkziston(id))) {
      return Response.json({ error: "Udhëtimi nuk ekziston." }, { status: 404 });
    }
    if (veprimi !== "lexo") {
      if (await simulimi(req)) {
        return Response.json({ error: "Refuzim prove para shkrimit." }, { status: 500 });
      }
      if (veprimi === "ruaj") await ruaj(p.id, id);
      else await hiq(p.id, id);
    }
    return Response.json(await lexoGjendjen(p.id, id), { headers: paCache });
  } catch {
    return Response.json({ error: "Nuk u lidhëm me databazën." }, { status: 503 });
  }
}

export function GET(req: Request, ctx: Ctx) {
  return trajto(req, ctx, "lexo");
}

// PUT dhe DELETE janë idempotente: përsëritja e të njëjtit synim nuk krijon kopje.
export function PUT(req: Request, ctx: Ctx) {
  return trajto(req, ctx, "ruaj");
}

export function DELETE(req: Request, ctx: Ctx) {
  return trajto(req, ctx, "hiq");
}
