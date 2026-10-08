# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

Lista dhe detajet e udhëtimeve tani i marrin të dhënat direkt nga databaza Neon. Kur ndryshoj një të dhënë në databazë, ajo ndryshon edhe në aplikacion pas rifreskimit.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor. Pas rifreskimit, lista dhe detajet treguan orën 08:25. Pastaj e ktheva përsëri në 08:15 dhe pas rifreskimit u shfaq përsëri 08:15.

### Prova 2: Lista bosh dhe rikthimi

Shtova `WHERE false` vetëm te pyetja `lexoUdhetimet` dhe lista tregoi mesazhin që nuk ka udhëtime. Pasi e hoqa `WHERE false`, tri kartat e udhëtimeve u kthyen përsëri.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Ndryshova përkohësisht emrin e `DATABASE_URL` në `.env.local` dhe pas rinisjes serveri nuk mundi të lidhej me databazën. Pasi e ktheva emrin siç ishte dhe rinisa serverin, aplikacioni punoi përsëri. Skedari `.env.local` nuk ishte në listën e GitHub Desktop sepse nuk duhet të dërgohet në GitHub.

## Ku gjendet puna

`schema.sql` dhe skedarët e aplikacionit që ndryshova janë në repository. Puna është e ruajtur në repository-n e RideShare në GitHub.

## Çfarë mbetet për përmirësim

Një kufizim është se kërkesa “Në pritje” ende është vetëm simulim dhe nuk ruhet si rezervim real në databazë. Hapi tjetër është që kërkesat të ruhen në databazë dhe të menaxhohen nga aplikacioni.

## Ndihma nga AI

AI më ndihmoi me disa ide për lidhjen e aplikacionit me Neon dhe me testet që mund ti bëja. Pastaj i provova vetë ndryshimet në databazë dhe kontrollova nëse aplikacioni po i shfaqte të dhënat si duhet. 
