# RideShare — Java 9

## Çfarë ndërtova
Te faqja e udhëtimit shtova butonin "☆ Ruaj udhëtimin". Kur e klikon, ylli mbushet menjëherë dhe numri "Të preferuarat" rritet, pa pritur serverin. Derisa serveri përgjigjet, butoni nuk pranon klikime të tjera. Nëse serveri kthen gabim, ylli dhe numri kthehen si ishin dhe del "Provo përsëri".

Preferimet ruhen në Neon, në tabelën te_preferuarat me çelës (github_id, udhetimi_id), kështu që i njëjti përdorues s'mund ta ruajë dy herë të njëjtin udhëtim. Përdoruesin e marr nga sesioni GitHub. Për prova bëra faqen /java-09-test?id=2, ku mund ta detyroj serverin të kthejë 500 ose të vonohet 2 sekonda. Preferimi është vetëm për përdoruesin, nuk është rezervim dhe nuk prek vendet.

## Provat që bëra
### Prova 1: Ruajtja e suksesshme mbetet pas rifreskimit.
Hapat: I kyçur, hapa localhost:3000/java-09-test?id=2. Klikova "☆ Ruaj udhëtimin", prita mesazhin "U ruajt te të preferuarat." dhe rifreskova. Në Neon: SELECT * FROM te_preferuarat WHERE udhetimi_id = '2';
Pritshmeria: Menjëherë del "★ Po ruhet…", pastaj "★ I ruajtur". Pas rifreskimit mbetet "★ I ruajtur" dhe "Të preferuarat 1". Në Neon ka një rresht me github_id-në time.
Vezhgimi: PLOTËSO. Kaloi / Dështoi.

### Prova 2: Gabimi i serverit nuk lë sukses të rremë në ekran.
Hapat: E hoqa preferimin e udhëtimit 2. Ndeza "Refuzim prove para shkrimit (500)" dhe "Ngadalëso serverin (2 s)", pastaj klikova "☆ Ruaj udhëtimin". Pas gabimit e fika refuzimin dhe klikova "Provo përsëri".
Pritshmeria: Gjatë pritjes ylli mbushet dhe numri bëhet 1. Pas gabimit ylli zbrazet, numri kthehet 0 dhe del "Nuk u ruajt. Provo përsëri." Në Neon s'ka rresht. Pas "Provo përsëri" del "★ I ruajtur" dhe rreshti krijohet.
Vezhgimi: PLOTËSO. Kaloi / Dështoi.

### Prova 3: Klikimet e përsëritura nuk krijojnë kopje.
Hapat: Me ngadalësimin 2 s të ndezur, klikova 5 herë shpejt. Pastaj rifreskova dhe provova sërish. Në Neon: SELECT github_id, udhetimi_id, count(*) FROM te_preferuarat GROUP BY 1, 2;
Pritshmeria: Në DevTools → Network shkon vetëm një PUT. Numri "Klikime të bllokuara gjatë pritjes" rritet. Në Neon count = 1.
Vezhgimi: PLOTËSO. Kaloi / Dështoi.
Provë shtesë në databazë: me një profil fiktiv dërgova 10 INSERT njëkohësisht për udhëtimin 2 dhe mbeti vetëm 1 rresht. Një INSERT pa ON CONFLICT dha gabimin 23505, ndërsa udhëtimi 99 (që s'ekziston) dha 23503. Rreshtin fiktiv e fshiva pas provës.

### Prova me kolegun: udhëtim tjetër
Kolegu zgjodhi: PLOTËSO (p.sh. /java-09-test?id=1).
Parashikimi im: Ndryshon vetëm udhetimi_id. Preferimi për udhëtimin 2 mbetet, shtohet një rresht i ri për udhëtimin tjetër dhe "Të preferuarat" bëhet 2. Kjo funksionon falë çelësit (github_id, udhetimi_id) në schema-java09.sql dhe kontrollit udhetimiEkziston() te preferuarat.ts. Nëse ID-ja s'ekziston, API kthen 404.
Çfarë ndodhi realisht: PLOTËSO.

## Ku gjendet puna
aplikacioni/src/components/RuajTePreferuarat.tsx
aplikacioni/src/components/PreferimiServer.tsx
aplikacioni/src/app/api/te-preferuarat/[id]/route.ts
aplikacioni/src/lib/preferuarat.ts
aplikacioni/src/app/udhetimi/[id]/page.tsx
aplikacioni/src/app/java-09-test/page.tsx
aplikacioni/schema-java09.sql
mobile-week09.json

## Çfarë mbetet për përmirësim
Ende s'ka faqe "Të preferuarat e mia". Kolonat në schema.sql (mberritja, vende_lira) nuk përputhen me ato që përdor kodi (destinacioni, vende), por këtë javë s'e rregullova. Kontrollet e provës (x-simulo-gabim, x-vonese) duhet të hiqen para publikimit.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Po. Me Claude Code shkrova komponentin, API-në, skemën dhe provën në databazë. Provat në shfletues dhe me kolegun i bëra vetë dhe shënova atë që pashë.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
