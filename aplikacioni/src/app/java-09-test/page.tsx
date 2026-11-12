import Link from "next/link";
import PreferimiServer from "@/components/PreferimiServer";
import { gjejUdhetimin, lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

// /java-09-test?id=2 · kolegu mund të zgjedhë një udhëtim tjetër me ?id=
export default async function Java09Test({
  searchParams,
}: { searchParams: Promise<{ id?: string }> }) {
  const { id = "2" } = await searchParams;

  let udhetim: Udhetim | undefined;
  let te_gjitha: Udhetim[] = [];
  try {
    [udhetim, te_gjitha] = await Promise.all([gjejUdhetimin(id), lexoUdhetimet()]);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link className="action" href={`/java-09-test?id=${id}`}>Provo përsëri</Link>
      </main>
    );
  }

  return (
    <main>
      <p>Faqe prove · të dhëna fiktive</p>
      <p>
        Zgjidh udhëtimin:{" "}
        {te_gjitha.map((u) => (
          <span key={u.id}>
            <Link href={`/java-09-test?id=${u.id}`} aria-current={u.id === id ? "page" : undefined}>
              {u.id}
            </Link>{" "}
          </span>
        ))}
      </p>

      {!udhetim ? (
        <p role="alert">Udhëtimi {id} nuk ekziston.</p>
      ) : (
        <>
          <article className="trip-card">
            <p>Udhëtimi {udhetim.id}</p>
            <h1>{udhetim.nisja} → {udhetim.destinacioni}</h1>
            <p>Nisja: {udhetim.ora} · Vende: {udhetim.vende}</p>
          </article>
          <PreferimiServer udhetimiId={udhetim.id} meKontrolleProve />
          <p>Preferimi nuk ndryshon vendet dhe nuk i dërgon kërkesë shoferit.</p>
        </>
      )}
    </main>
  );
}
