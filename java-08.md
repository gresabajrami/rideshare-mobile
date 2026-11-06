# RideShare — Java 8

## Çfarë ndërtova
Te detajet e udhetimit shtova komponentin e klientit Vendtakimi. Ka nje fushe "Shkruaj vendtakimin" me butonin "Konfirmo ne telefon" (dy vlera me useState dhe trim() per tekstin bosh) dhe butonin "Perdor vendndodhjen time", qe e kerkon lejen vetem pas klikimit. Cdo rezultat (sukses, refuzim, pozicion i padisponueshem, timeout) e mbyll pritjen dhe fusha manuale mbetet aktive. Te faqja /java-08-test perdora te njejtin komponent me udhetimin fiktiv te Dritonit.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: Te DevTools → Sensors zgjodha Berlin. Rifreskova localhost:3000/java-08-test pa klikuar, pastaj klikova "Perdor vendndodhjen time".
Pritshmeria: Faqja nuk kerkon leje ne hapje; pas klikimit merret pozicioni.
Vezhgimi: Nuk doli kerkese per leje ne hapje. Pas klikimit u shfaq "Pozicioni u mor." dhe "Saktesia rreth 150 m". Kaloi.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: Te ikona prane adreses e fika Location, rifreskova dhe klikova butonin. Pastaj shkruajta Biblioteka dhe konfirmova. Me Location te lejuar, te Sensors zgjodha "Location unavailable" dhe klikova serish.
Pritshmeria: Del mesazh, pritja mbaron dhe vendtakimi manual konfirmohet.
Vezhgimi: U shfaq "Leja u refuzua. Shkruaj vendtakimin vete." dhe u konfirmua "Biblioteka". Me "Location unavailable" u shfaq "Pozicioni nuk eshte i disponueshem..." dhe butoni u be serish aktiv. Kaloi.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: Kontrollova fotot dhe skedaret qe publikoj.
Pritshmeria: Nuk ka koordinata reale, adresa ose sekrete.
Vezhgimi: Fotot jane me vendndodhjen fiktive te Berlinit (150 m). Ekrani tregon vetem saktesine, jo koordinatat. .env.local nuk ngarkohet ne GitHub. Kaloi.

## Ku gjendet puna
aplikacioni/src/components/Vendtakimi.tsx
aplikacioni/src/app/udhetimi/[id]/page.tsx
aplikacioni/src/app/java-08-test/page.tsx
mobile-week08.json
Demonstrimi nuk eshte publikuar ne Vercel.

## Çfarë mbetet për përmirësim
Pas rifreskimit vendtakimi i konfirmuar humbet, sepse ruhet vetem ne gjendjen lokale. Dritoni ende nuk e sheh. Hapi i ardhshem: ta ruaj ne Neon dhe t'ia dergoj shoferit.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Jo

## Prova me një hyrje të re
- Hyrja që provova: vetem hapesira, pasi kisha konfirmuar Biblioteka
- Parashikimi im para klikimit: Pritja qe vendtakimi te mos ndryshoje, sepse trim() i heq hapesirat dhe teksti behet bosh, prandaj duhet te dale nje mesazh gabimi.
- Çfarë pashë realisht: U shfaq "Shkruaj vendtakimin para se ta konfirmosh." dhe vendtakimi i konfirmuar mbeti "Biblioteka".
- Skedari dhe funksioni që e shpjegojnë: aplikacioni/src/components/Vendtakimi.tsx, funksioni konfirmo() me trim()
- Çfarë kuptova ose korrigjova: Shkrimi dhe konfirmimi jane dy vlera te ndara. trim() e kthen tekstin me hapesira ne bosh, keshtu konfirmo() del me return para se te ndryshoje vendtakimin, dhe zgjedhja e meparshme ruhet.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.