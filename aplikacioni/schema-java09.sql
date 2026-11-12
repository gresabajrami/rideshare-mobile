-- Java 9: të preferuarat. Ekzekuto vetëm në databazën tënde të laboratorit.
-- Një rresht = një çift (përdorues, udhëtim). Çelësi primar nuk lejon kopje,
-- edhe nëse butoni shtypet shumë herë ose kërkesa përsëritet.
-- Preferim personal, jo rezervim: nuk ndryshon vende_lira dhe nuk i shkon shoferit.
CREATE TABLE IF NOT EXISTS te_preferuarat (
  github_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetimi_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  krijuar TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (github_id, udhetimi_id)
);

-- Kontrolli i Rastit 3: çdo çift duhet të ketë kopje = 1.
SELECT github_id, udhetimi_id, count(*) AS kopje
FROM te_preferuarat GROUP BY github_id, udhetimi_id ORDER BY udhetimi_id;
