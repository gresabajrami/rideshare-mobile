# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Shtova hyrjen me GitHub dhe faqen `/panel`. Në aplikacion i ndava tri gjëra:

- **Identiteti** tregon kush je. Këtë e verifikon GitHub kur hyn, dhe aplikacioni e merr ID-në tënde nga sesioni.
- **Roli** tregon çfarë lloj përdoruesi je (`udhetar` ose `shofer`). Ai ruhet në tabelën `profilet` në Neon. Çdo hyrje e re fillon si udhëtar, dhe formulari nuk mund ta zgjedhë rolin.
- **Pronësia** tregon cili udhëtim është i yti. Kolona `shofer_id` te `udhetimet` lidh udhëtimin me shoferin. Serveri e ndryshon orën vetëm kur `shofer_id` është i njëjtë me ID-në nga sesioni, pra jo me një vlerë që vjen nga formulari.

Prandaj nuk mjafton që të jesh i kyçur. Duhet të jesh shofer dhe ky udhëtim duhet të jetë i yti.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

Hapa `/panel` pa hyrë. U shfaq “Lista është publike. Për panelin hyr me llogarinë tënde GitHub.” bashkë me butonin **Hyr me GitHub**. Hyra me GitHub dhe paneli tregoi përshëndetjen me emrin tim dhe rolin. Pas rifreskimit mbeta i kyçur dhe u shfaq i njëjti panel. Kur klikova **Dil**, paneli u kthye te mesazhi për hyrje dhe butoni **Hyr me GitHub** u shfaq përsëri.

### Prova 2: Shoferi ndryshon udhëtimin e vet

Në Neon e bëra profilin tim `shofer` dhe i caktova vetes udhëtimin me ID 2. Në panel e ndryshova orën në 08:25 dhe klikova **Ruaj orën**. U shfaq “Ora u ruajt me sukses. Kontrollo listën dhe detajet.” Lista dhe faqja `/udhetimi/2` treguan 08:25. Në SQL Editor, `SELECT id, ora, shofer_id FROM udhetimet ORDER BY id;` tregoi 08:25 për ID 2. Pastaj e ktheva orën në 08:15 dhe kontrollova që u shfaq përsëri 08:15.

### Prova 3: Veprimi pa leje refuzohet

Me formularin e hapur, në DevTools e ndryshova fushën e fshehur `id` nga 2 në 1, pra në udhëtimin e shoferit demo, dhe klikova **Ruaj orën**. U shfaq “Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.” Në SQL Editor ekzekutova përsëri të njëjtin `SELECT`, dhe ID 1 kishte ende orën 08:00 dhe `shofer_id` mbeti shoferi demo.

## Ku gjendet puna

Repository: https://github.com/gresabajrami/rideshare-mobile

Skedarët e rinj janë këta:

- `aplikacioni/schema-java05.sql`: tabela `profilet` dhe kolona `shofer_id`
- `aplikacioni/src/lib/auth.ts`: konfigurimi i hyrjes me GitHub
- `aplikacioni/src/lib/lejet.ts`: leximi i profilit dhe kontrolli i rolit dhe i pronësisë
- `aplikacioni/src/app/api/auth/[...nextauth]/route.ts`
- `aplikacioni/src/app/panel/page.tsx` dhe `actions.ts`
- `aplikacioni/src/components/Hyrja.tsx`: butonat **Hyr me GitHub** dhe **Dil**

Ndryshova edhe `src/app/page.tsx`, ku shtova lidhjen “Hyr / Paneli im”.

## Çfarë mbetet për përmirësim

Kërkesa për vend ende është vetëm simulim dhe nuk ruhet në databazë. Hapi tjetër është një tabelë `kerkesat`, ku udhëtari i kyçur ruan kërkesën dhe vetëm shoferi i atij udhëtimi mund ta pranojë ose ta refuzojë. Për këtë do të përdorja të njëjtin kontroll të pronësisë që përdora këtë javë.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

AI më ndihmoi të kuptoja dallimin mes identitetit, rolit dhe pronësisë dhe të shkruaja këtë raport. Hyrjen, ndryshimin e orës dhe refuzimin për ID 1 i provova vetë, dhe rezultatet i kontrollova në aplikacion dhe në SQL Editor në Neon.
