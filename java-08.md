
# RideShare — Java 8

## Çfarë ndërtova

Këtë javë shtova funksionalitetin për vendtakimin. Përdoruesi mund ta shkruajë vetë vendtakimin dhe ta konfirmojë, ose mund të provojë ta marrë vendndodhjen përmes Geolocation API. Nëse e refuzon lejen, mund të vazhdojë ta shkruajë vendtakimin manualisht. Gjithashtu krijova një faqe të veçantë për testimin e këtij funksionaliteti.

## Provat që bëra

### Prova 1: Leja nuk kërkohet sapo hapet faqja.

- Hapat: E hapa faqen `/java-08-test` dhe prita pa klikuar butonin për vendndodhje.
- Rezultati i pritur: Shfletuesi nuk duhet të kërkojë leje automatikisht.
- Çfarë ndodhi: Faqja u hap normalisht dhe nuk u shfaq kërkesa për leje. Kërkesa u shfaq vetëm pasi klikova butonin "Përdor vendndodhjen time".

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.

- Hapat: Klikova butonin për vendndodhje dhe e refuzova lejen në shfletues.
- Rezultati i pritur: Të shfaqet mesazhi për refuzimin dhe përdoruesi të mund ta shkruajë vendtakimin manualisht.
- Çfarë ndodhi: U shfaq mesazhi që leja ishte refuzuar. Pastaj shkrova vendtakimin manualisht dhe e konfirmova pa problem.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.

- Hapat: Kontrollova skedarët dhe ndryshimet që përgatita për GitHub.
- Rezultati i pritur: Të mos publikohen adresa ose koordinata reale.
- Çfarë ndodhi: Në skedarët e projektit nuk vendosa adresën ose koordinatat e mia reale. Për testim përdora vetëm të dhëna fiktive.

## Ku gjendet puna

- `aplikacioni/src/components/Vendtakimi.tsx` – komponenti për vendtakimin dhe vendndodhjen.
- `aplikacioni/src/app/udhetimi/[id]/page.tsx` – integrimi në detajet e udhëtimit.
- `aplikacioni/src/app/java-08-test/page.tsx` – faqja e testimit.
- `mobile-week08.json` – konfigurimi i faqes së testimit.
- `java-08.md` – dokumentimi i punës.

Linku i demonstrimit: `http://localhost:3000/java-08-test` 

## Çfarë mbetet për përmirësim

Një përmirësim që mund të bëhet është ruajtja e vendtakimit në databazë, sepse aktualisht të dhënat ruhen vetëm gjatë kohës që faqja është e hapur. Në të ardhmen mund të bëhet që edhe shoferi ta shohë vendtakimin e konfirmuar.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Jo

## Prova me një hyrje të re

- Hyrja që provova: Shkrova një vendtakim të ri, por nuk klikova butonin Konfirmo.
- Parashikimi im para klikimit: Vendtakimi i ri nuk duhet të ruhet pa konfirmimin tim.
- Çfarë pashë realisht: Vendtakimi i mëparshëm mbeti i pandryshuar edhe pasi shkrova një vendtakim të ri pa e konfirmuar.
- Skedari dhe funksioni që e shpjegojnë: `aplikacioni/src/components/Vendtakimi.tsx`, funksioni `konfirmo()`.
- Çfarë kuptova ose korrigjova: Kuptova se vendtakimi ndryshon vetëm kur përdoruesi klikon Konfirmo. Kjo ndihmon që ndryshimet aksidentale të mos ruhen.
