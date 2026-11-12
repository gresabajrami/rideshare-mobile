import "server-only";
import { getSql } from "./db";

export type GjendjaPreferimit = {
  ruajtur: boolean;   // a e ka ky përdorues këtë udhëtim te të preferuarat
  rreshta: number;    // rreshta në databazë për çiftin (përdorues, udhëtim): 0 ose 1
  gjithsej: number;   // të gjitha preferimet e përdoruesit
};

export async function udhetimiEkziston(id: string) {
  if (!/^[A-Za-z0-9-]{1,40}$/.test(id)) return false;
  const sql = getSql();
  const rows = await sql`SELECT 1 FROM udhetimet WHERE id = ${id}`;
  return rows.length === 1;
}

export async function lexoGjendjen(githubId: string, udhetimiId: string): Promise<GjendjaPreferimit> {
  const sql = getSql();
  const rows = await sql`SELECT
      (SELECT count(*)::int FROM te_preferuarat
        WHERE github_id = ${githubId} AND udhetimi_id = ${udhetimiId}) AS rreshta,
      (SELECT count(*)::int FROM te_preferuarat WHERE github_id = ${githubId}) AS gjithsej`;
  const { rreshta, gjithsej } = rows[0] as { rreshta: number; gjithsej: number };
  return { ruajtur: rreshta > 0, rreshta, gjithsej };
}

// Idempotente: sa herë të thirret, për çiftin mbetet një rresht.
export async function ruaj(githubId: string, udhetimiId: string) {
  const sql = getSql();
  await sql`INSERT INTO te_preferuarat (github_id, udhetimi_id)
    VALUES (${githubId}, ${udhetimiId})
    ON CONFLICT (github_id, udhetimi_id) DO NOTHING`;
}

export async function hiq(githubId: string, udhetimiId: string) {
  const sql = getSql();
  await sql`DELETE FROM te_preferuarat
    WHERE github_id = ${githubId} AND udhetimi_id = ${udhetimiId}`;
}
