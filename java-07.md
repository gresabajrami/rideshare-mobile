# Java 7 – Testimi, korrigjimi dhe shpjegimi i RideShare

## Rasti im

**P7-646**

**GitHub:** gresabajrami
**Rasti:** Rasti 2 – Pa vende

## Parashikimi

Nëse një udhëtim ka 0 vende të lira, përdoruesi nuk duhet të ketë mundësi të kërkojë vend. Aplikacioni duhet të tregojë se nuk ka vende të lira dhe të mos premtojë rezervim.

## Ndryshimi i ri

Përditësova `aplikacioni/schema.sql` që emrat e kolonave të përputhen me strukturën e përdorur në databazën Neon: `mberritja` dhe `vende_lira` në vend të `destinacioni` dhe `vende`. Shtova gjithashtu kolonën `shofer_id`. Ky ndryshim përditësoi skemën e dokumentuar; nuk ndryshova të dhëna reale në databazë.

## Dy probleme

1. Në `schema.sql`, emrat e kolonave `destinacioni` dhe `vende` nuk përputheshin me strukturën e databazës, ku përdoren `mberritja` dhe `vende_lira`.
2. Në `schema.sql` mungonte kolona `shofer_id`, e cila ekziston në strukturën aktuale të databazës.

## Korrigjimi

**Skedari:** `aplikacioni/src/app/udhetimi/[id]/page.tsx`

**Arsyeja:** Faqja e detajeve kontrollon numrin e vendeve të lira. Kur vlera është 0, shfaq butonin e çaktivizuar “Nuk ka vende të lira” dhe nuk ofron lidhjen “Kërko vend”. Kur ka vende të lira, shfaq lidhjen për të vazhduar te kërkesa. Kështu përdoruesit nuk i premtohet rezervim kur udhëtimi është plot.

Për korrigjimin e skemës, ndryshova gjithashtu `aplikacioni/schema.sql`: zëvendësova emrat e kolonave që nuk përputheshin dhe shtova `shofer_id`.

## Prova 1

**Hapat:** Hapa udhëtimin Lipjan – AAB me 0 vende të lira.

**Pritshmëria:** Përdoruesi nuk duhet të ketë mundësi të kërkojë vend.

**Vëzhgimi:** Aplikacioni shfaqi 0 vende të lira dhe mesazhin “Nuk ka vende të lira”.

## Prova 2

**Hapat:** Zgjodha një udhëtim tjetër me vende të lira.

**Pritshmëria:** Kur ka vende të lira, duhet të shfaqet mundësia për të vazhduar me kërkesën për vend.

**Vëzhgimi:** U shfaqën 2 vende të lira dhe lidhja “Kërko vend”.

## Prova 3

**Hapat:** Klikova te “Kërko vend” në një udhëtim me vende të lira.

**Pritshmëria:** Duhet të shfaqet statusi i kërkesës dhe të jetë e qartë që bëhet fjalë vetëm për demonstrim.

**Vëzhgimi:** U shfaq statusi “Simulim: Në pritje” dhe njoftimi që kërkesa nuk i është dërguar shoferit.

## Ndihma nga AI

Përdora AI për të identifikuar dallimet mes `schema.sql` dhe strukturës së databazës Neon, për të kuptuar problemet dhe për të dokumentuar korrigjimin në raport.

## Commit-et

**Para:**

https://github.com/gresabajrami/rideshare-mobile/commit/454c8fa0b47cabe43d6e8fabcd4fd95c47f1d2fb

**Pas:**

https://github.com/gresabajrami/rideshare-mobile/commit/4e2e9e4cc3ee26937bdf43caf750713dde3000b9
