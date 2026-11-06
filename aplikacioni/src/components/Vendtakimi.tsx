
"use client";

import { useState } from "react";

export default function Vendtakimi() {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [gabimi, setGabimi] = useState("");

  const [gjendja, setGjendja] = useState("idle");
  const [mesazhi, setMesazhi] = useState("");
  const [saktesia, setSaktesia] = useState<number | null>(null);

  function konfirmo() {
    const pastruar = teksti.trim();

    if (pastruar === "") {
      setGabimi("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }

    setVendtakimi(pastruar);
    setGabimi("");
  }

  function kurMerretPozicioni(position: GeolocationPosition) {
    setSaktesia(Math.round(position.coords.accuracy));
    setGjendja("success");
    setMesazhi("Pozicioni u mor.");
  }

  function kurDeshtonLeximi(error: GeolocationPositionError) {
    setSaktesia(null);

    if (error.code === 1) {
      setGjendja("denied");
      setMesazhi("Leja u refuzua. Shkruaj vendtakimin vetë.");
    } else if (error.code === 3) {
      setGjendja("timeout");
      setMesazhi("Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.");
    } else {
      setGjendja("unavailable");
      setMesazhi("Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.");
    }
  }

  function perdorVendndodhjen() {
    if (!navigator.geolocation) {
      setGjendja("unavailable");
      setMesazhi("Ky shfletues nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.");
      return;
    }

    setSaktesia(null);
    setGjendja("loading");
    setMesazhi("Po kërkojmë vendndodhjen…");

    navigator.geolocation.getCurrentPosition(
      kurMerretPozicioni,
      kurDeshtonLeximi,
      { timeout: 10000 }
    );
  }

  return (
    <section>
      <h2>Vendtakimi yt</h2>

      <button
        type="button"
        className="action"
        data-testid="locate-me"
        onClick={perdorVendndodhjen}
        disabled={gjendja === "loading"}
      >
        Përdor vendndodhjen time
      </button>

      <p data-testid="location-status" data-state={gjendja}>
        {mesazhi}
      </p>

      <p data-testid="location-accuracy">
        {saktesia !== null ? `Saktësia rreth ${saktesia} m` : ""}
      </p>

      <label htmlFor="vt">Shkruaj vendtakimin</label>

      <input
        id="vt"
        data-testid="meeting-input"
        value={teksti}
        onChange={(e) => setTeksti(e.target.value)}
      />

      <button
        type="button"
        className="action"
        data-testid="confirm-meeting"
        onClick={konfirmo}
      >
        Konfirmo në telefon
      </button>

      <p data-testid="meeting-error">{gabimi}</p>

      <p>
        Vendtakimi i konfirmuar:{" "}
        <strong data-testid="confirmed-meeting">{vendtakimi}</strong>
      </p>
    </section>
  );
}
