# Java 7 – Testimi, korrigjimi dhe shpjegimi i RideShare

## Rasti i zgjedhur
Rasti 2 – Udhëtimi pa vende të lira.

## Parashikimi im
Nëse një udhëtim nuk ka më vende të lira (0 vende), përdoruesi nuk duhet të ketë mundësi të kërkojë një vend. Në këtë rast, aplikacioni duhet të shfaqë një njoftim që tregon se nuk ka vende të disponueshme dhe të mos lejojë vazhdimin e kërkesës.

## Problemet e identifikuara

1. Gjatë kontrollimit të skedarit `schema.sql`, vura re se disa emra kolonash nuk ishin të njëjtë me ata që përdoren në databazën Neon. Në skedar ishin `destinacioni` dhe `vende`, ndërsa në databazë përdoren `mberritja` dhe `vende_lira`.
2. Gjithashtu, në strukturën e `schema.sql` mungonte kolona `shofer_id`, e cila gjendet në tabelën përkatëse në databazën aktuale.

## Korrigjimi i realizuar

Ndryshova skedarin `schema.sql` për ta përshtatur strukturën e tij me atë që përdoret aktualisht në Neon. Për këtë arsye, përditësova emrat e kolonave që nuk përputheshin dhe shtova kolonën e munguar `shofer_id`.

Me këtë korrigjim, struktura e përshkruar në skedar është më e harmonizuar me strukturën aktuale të databazës.

## Testimi

### Testi 1 – Udhëtim pa vende të lira
- **Hapat:** Hapa udhëtimin Lipjan – AAB.
- **Pritshmëria:** Përdoruesi nuk duhet të ketë mundësi të kërkojë një vend.
- **Vëzhgimi:** Aplikacioni shfaq 0 vende të lira dhe njoftimin "Nuk ka vende të lira".

### Testi 2 – Udhëtim me vende të disponueshme
- **Hapat:** Zgjodha udhëtimin Prishtinë – AAB.
- **Pritshmëria:** Kur ka vende të lira, duhet të jetë e mundur të vazhdohet te kërkesa për vend.
- **Vëzhgimi:** Shfaqen 2 vende të lira dhe lidhja "Kërko vend".

### Testi 3 – Kontrollimi i kërkesës për vend
- **Hapat:** Klikova në lidhjen "Kërko vend".
- **Pritshmëria:** Aplikacioni duhet të tregojë se në çfarë gjendjeje është kërkesa.
- **Vëzhgimi:** Shfaqet statusi "Simulim: Në pritje", së bashku me njoftimin se kërkesa nuk i është dërguar shoferit.

## Ndryshimi i inputit
Gjatë këtij procesi nuk bëra ndryshime në të dhënat e udhëtimeve në databazë. Ndryshimi u realizua vetëm në skedarin `schema.sql`, duke përmirësuar përputhjen e strukturës së tij me databazën ekzistuese.

## Përdorimi i AI
Gjatë punës përdora AI për të kontrolluar strukturën e skedarit `schema.sql`, për të identifikuar dallimet me databazën Neon dhe për të marrë ndihmë në realizimin e korrigjimit.

## Commit-et

- **Para korrigjimit:** https://github.com/gresabajrami/rideshare-mobile/commit/454c8fa0b47cabe43d6e8fabcd4fd95c47f1d2fb
- **Pas korrigjimit:** https://github.com/gresabajrami/rideshare-mobile