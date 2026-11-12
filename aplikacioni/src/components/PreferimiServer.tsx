import Link from "next/link";
import { profiliIm } from "@/lib/lejet";
import { lexoGjendjen } from "@/lib/preferuarat";
import RuajTePreferuarat from "./RuajTePreferuarat";

// Lexon nga serveri gjendjen e preferimit para se faqja të shfaqet,
// kështu pas rifreskimit ylli tregon atë që ka databaza.
export default async function PreferimiServer({
  udhetimiId,
  meKontrolleProve,
}: { udhetimiId: string; meKontrolleProve?: boolean }) {
  let p;
  let gjendja;
  try {
    p = await profiliIm();
    if (p) gjendja = await lexoGjendjen(p.id, udhetimiId);
  } catch {
    return <p role="alert">Të preferuarat nuk u lexuan nga serveri. Rifresko për të provuar përsëri.</p>;
  }

  if (!p || !gjendja) {
    return (
      <p>
        <Link href="/panel">Hyr në llogari</Link> për të ruajtur udhëtimin te të preferuarat.
      </p>
    );
  }

  return (
    <>
      <p className="preferimi-perdoruesi">{p.emri} · {p.roli === "shofer" ? "Shofer" : "Udhëtar"}</p>
      <RuajTePreferuarat
        key={`${p.id}-${udhetimiId}`}
        udhetimiId={udhetimiId}
        fillimisht={gjendja}
        meKontrolleProve={meKontrolleProve}
      />
    </>
  );
}
