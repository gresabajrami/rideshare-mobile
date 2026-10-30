# Java 7 – Testimi, korrigjimi dhe shpjegimi i RideShare

## Rasti im

P7-646

GitHub: gresabajrami

Rasti 2 – Pa vende

## Parashikimi

Kur një udhëtim ka 0 vende të lira, përdoruesi nuk duhet të mund të kërkojë vend. Aplikacioni duhet të tregojë qartë se nuk ka vende të lira. Kur ka vende, mund të shfaqet kërkesa demonstrative, por aplikacioni nuk duhet ta paraqesë si rezervim real.

## Ndryshimi i ri

Përditësova `aplikacioni/schema.sql` që emrat e kolonave të përputhen me strukturën e dokumentuar të databazës: `mberritja` dhe `vende_lira` në vend të `destinacioni` dhe `vende`. Shtova gjithashtu kolonën `shofer_id`. Ky ndryshim përditësoi skemën në repository; nuk ekzekutova SQL dhe nuk ndryshova databazën.

Udhëzimi për kodin tim P7-646 jep Gjakovë, orën 10:20, 2 vende dhe orën e re 10:25. Në aplikacionin që testova, lista aktuale kishte Prishtinë (08:00, 2 vende), Fushë Kosovë (08:15, 1 vend) dhe Lipjan (07:45, 0 vende). Nuk i ndryshova këto të dhëna; provat më poshtë dokumentojnë vlerat që pashë realisht.

## Dy probleme

1. Në `schema.sql`, kolonat `destinacioni` dhe `vende` nuk përputheshin me emrat e dokumentuar `mberritja` dhe `vende_lira`.
2. Në `schema.sql` mungonte kolona `shofer_id`, e cila ishte pjesë e strukturës së dokumentuar të databazës.

## Korrigjimi

Skedari: aplikacioni/src/app/udhetimi/[id]/page.tsx

Arsyeja: Faqja e detajeve kontrollon numrin e vendeve të lira. Kur numri është 0, shfaq butonin e çaktivizuar “Nuk ka vende të lira” dhe nuk ofron lidhjen “Kërko vend”. Kur ka vende, shfaq lidhjen për kërkesën demonstrative. Korrigjimi i skemës u bë në `aplikacioni/schema.sql`: u përditësuan emrat e kolonave dhe u shtua `shofer_id`. Nuk pretendova se ndryshova të dhëna në databazë.

### Prova 1

Hapat: Hapa listën në `localhost:3003`, zgjodha udhëtimin ID 1 dhe hapa detajet.

Pritshmëria: Detajet duhet t’i përkasin të njëjtit udhëtim dhe, me vende të lira, të ofrojnë vazhdimin te kërkesa.

Vëzhgimi: Lista dhe faqja e detajeve treguan Prishtinë – AAB, orën 08:00 dhe 2 vende të lira. Në detaje u shfaq lidhja “Kërko vend”.

### Prova 2

Hapat: Hapa detajet e udhëtimit ID 3, Lipjan – AAB, që në listë shfaqej me 0 vende.

Pritshmëria: Duhet të tregohet se nuk ka vende të lira dhe të mos ofrohet kërkesa për vend.

Vëzhgimi: Faqja tregoi Lipjan – AAB, orën 07:45 dhe “Vende të lira: 0”. U shfaq butoni i çaktivizuar “Nuk ka vende të lira”; lidhja “Kërko vend” nuk u shfaq.

### Prova 3

Hapat: Hapa udhëtimin ID 2, Fushë Kosovë – AAB, me 1 vend të lirë, dhe vazhdova te faqja e kërkesës.

Pritshmëria: Me një vend të lirë duhet të shfaqet kërkesa demonstrative dhe të sqarohet se nuk dërgohet ose konfirmohet rezervim real.

Vëzhgimi: Faqja tregoi “Simulim: Në pritje”, “Kërkesa për Fushë Kosovë nuk është dërguar te shoferi” dhe se ruajtja e konfirmimi real do të shtohen më vonë.

## Ndihma nga AI

Përdora AI për të kuptuar dallimet mes skemës SQL dhe strukturës së databazës, si dhe për ta organizuar raportin. Hapat dhe vëzhgimet e provave i kontrollova në aplikacion; vlerat e raportuara janë ato që shfaqi aplikacioni.

## Versionet

Para:
https://github.com/gresabajrami/rideshare-mobile/commit/454c8fa0b47cabe43d6e8fabcd4fd95c47f1d2fb

Pas:
https://github.com/gresabajrami/rideshare-mobile/commit/b55b1e8c1e18cc902f1a6e09e9155df64feed1f7
