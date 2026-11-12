"use client";

import { useRef, useState } from "react";

export type GjendjaPreferimit = { ruajtur: boolean; rreshta: number; gjithsej: number };

type Props = {
  udhetimiId: string;
  fillimisht: GjendjaPreferimit; // e lexuar nga serveri para shfaqjes
  meKontrolleProve?: boolean;
};

export default function RuajTePreferuarat({ udhetimiId, fillimisht, meKontrolleProve }: Props) {
  // Gjendja e konfirmuar nga serveri.
  const [server, setServer] = useState(fillimisht);
  const [nga, setNga] = useState<"server-ne-hapje" | "pergjigje">("server-ne-hapje");
  // Synimi optimist gjatë pritjes; null kur nuk pret asgjë.
  const [synimi, setSynimi] = useState<boolean | null>(null);
  // Synimi që dështoi, për "Provo përsëri".
  const [deshtoi, setDeshtoi] = useState<boolean | null>(null);
  // Sa klikime u bllokuan gjatë pritjes (për Rastin 3).
  const [bllokuar, setBllokuar] = useState(0);

  const [refuzimProve, setRefuzimProve] = useState(false);
  const [ngadale, setNgadale] = useState(false);

  // useRef ndalon klikimin e dytë edhe para se React të rifreskojë butonin.
  const nePritje = useRef(false);

  const duke = synimi !== null;
  const shfaqet = synimi ?? server.ruajtur;
  // Numri ndryshon menjëherë me synimin, por kthehet nëse serveri refuzon.
  const gjithsej =
    server.gjithsej + (duke && synimi !== server.ruajtur ? (synimi ? 1 : -1) : 0);

  async function dergo(qellimi: boolean) {
    if (nePritje.current) {
      setBllokuar((n) => n + 1);
      return;
    }
    nePritje.current = true;
    setDeshtoi(null);
    setSynimi(qellimi); // përditëso pamjen menjëherë

    try {
      const headers: Record<string, string> = {};
      if (refuzimProve) headers["x-simulo-gabim"] = "1";
      if (ngadale) headers["x-vonese"] = "2000";
      const res = await fetch(`/api/te-preferuarat/${encodeURIComponent(udhetimiId)}`, {
        method: qellimi ? "PUT" : "DELETE",
        headers,
      });
      if (!res.ok) throw new Error(String(res.status));
      setServer((await res.json()) as GjendjaPreferimit);
      setNga("pergjigje");
    } catch {
      // Rikthim: ekrani tregon sërish gjendjen e fundit të konfirmuar nga serveri.
      setDeshtoi(qellimi);
    } finally {
      setSynimi(null);
      nePritje.current = false;
    }
  }

  let statusi: string;
  let tipi = "neutral";
  if (duke) {
    statusi = "Po presim konfirmimin e serverit.";
    tipi = "pritje";
  } else if (deshtoi !== null) {
    statusi = deshtoi ? "Nuk u ruajt. Provo përsëri." : "Nuk u hoq. Provo përsëri.";
    tipi = "gabim";
  } else if (bllokuar > 0 && server.ruajtur) {
    statusi = "Vetëm një preferim për këtë udhëtim.";
    tipi = "sukses";
  } else if (nga === "pergjigje") {
    statusi = server.ruajtur ? "U ruajt te të preferuarat." : "U hoq nga të preferuarat.";
    tipi = "sukses";
  } else if (server.ruajtur) {
    statusi = "Preferimet u lexuan nga serveri.";
    tipi = "sukses";
  } else {
    statusi = "Nuk është te të preferuarat.";
  }

  let etiketa: string;
  if (duke) etiketa = synimi ? "★ Po ruhet…" : "☆ Po hiqet…";
  else if (deshtoi !== null) etiketa = (shfaqet ? "★" : "☆") + " Provo përsëri";
  else etiketa = shfaqet ? "★ I ruajtur" : "☆ Ruaj udhëtimin";

  return (
    <section className="preferimi">
      <button
        type="button"
        className="action preferimi-buton"
        data-testid="favorite-button"
        data-state={duke ? "saving" : deshtoi !== null ? "error" : shfaqet ? "saved" : "idle"}
        aria-pressed={shfaqet}
        aria-busy={duke}
        aria-disabled={duke}
        onClick={() => dergo(deshtoi ?? !shfaqet)}
      >
        {etiketa}
      </button>

      <p data-testid="favorite-status" data-tipi={tipi} role="status" aria-live="polite">
        {statusi}
      </p>

      <p className="preferimi-numri">
        <span>Të preferuarat</span>
        <strong data-testid="favorite-count">{gjithsej}</strong>
      </p>
      <p className="preferimi-shenim">Preferim personal · jo rezervim</p>

      {server.ruajtur && !duke && deshtoi === null && (
        <button type="button" className="link-buton" onClick={() => dergo(false)}>
          Hiq nga të preferuarat
        </button>
      )}

      {meKontrolleProve && (
        <fieldset>
          <legend>Kontrollet e provës</legend>
          <label>
            <input
              type="checkbox"
              data-testid="simulate-error"
              checked={refuzimProve}
              onChange={(e) => setRefuzimProve(e.target.checked)}
            />{" "}
            Refuzim prove para shkrimit (500)
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              data-testid="simulate-slow"
              checked={ngadale}
              onChange={(e) => setNgadale(e.target.checked)}
            />{" "}
            Ngadalëso serverin (2 s)
          </label>
          <p data-testid="favorite-rows">
            Rreshta në databazë për çiftin (unë, udhëtimi {udhetimiId}): {server.rreshta}
          </p>
          <p data-testid="favorite-blocked">Klikime të bllokuara gjatë pritjes: {bllokuar}</p>
        </fieldset>
      )}
    </section>
  );
}
