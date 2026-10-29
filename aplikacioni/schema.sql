
-- Skedari: schema.sql (brenda aplikacionit, pranë package.json)
-- Të dhëna fiktive për laboratorin; ekzekutohet në Neon SQL Editor.

CREATE TABLE IF NOT EXISTS udhetimet (
  id TEXT PRIMARY KEY,
  nisja TEXT NOT NULL,
  mberritja TEXT NOT NULL,
  ora TEXT NOT NULL CHECK (ora ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  vendtakimi TEXT NOT NULL,
  vende_lira INTEGER NOT NULL CHECK (vende_lira >= 0),
  shofer_id TEXT
);

INSERT INTO udhetimet (id, nisja, mberritja, ora, vendtakimi, vende_lira)
VALUES
  ('1', 'Prishtinë', 'AAB', '08:00', 'Stacioni i autobusëve', 2),
  ('2', 'Fushë Kosovë', 'AAB', '08:15', 'Te stacioni kryesor', 1),
  ('3', 'Lipjan', 'AAB', '07:45', 'Qendra e qytetit', 0)
ON CONFLICT (id) DO NOTHING;

SELECT * FROM udhetimet ORDER BY id;
