Java 7 – Testimi, korrigjimi dhe shpjegimi i RideShare
Rasti im
P7-646

GitHub: gresabajrami

Rasti 2 – Pa vende

Parashikimi
Nëse një udhëtim ka 0 vende të lira, përdoruesi nuk duhet të ketë mundësi të kërkojë vend. Aplikacioni duhet të shfaqë një mesazh që tregon se nuk ka vende të lira dhe të mos premtojë rezervim.

Dy probleme
Në skedarin schema.sql disa emra kolonash nuk përputheshin me strukturën aktuale të databazës Neon. Në skedar përdorej destinacioni dhe vende, ndërsa në databazë përdoren mberritja dhe vende_lira.

Në skedarin schema.sql mungonte kolona shofer_id që ekziston në databazën aktuale.

Korrigjimi
Skedari: schema.sql

Arsyeja:

Përditësova schema.sql që të përputhet me strukturën aktuale të databazës Neon. Ndryshova emrat e kolonave që nuk përputheshin dhe shtova kolonën shofer_id që mungonte.

Ndryshimi i ri
Ndryshimi u realizua vetëm në skedarin schema.sql. Nuk ndryshova të dhëna reale në databazë. Qëllimi ishte përputhja e strukturës së dokumentuar me strukturën aktuale të databazës.

Prova 1
Hapat:

Hapa udhëtimin Lipjan – AAB me 0 vende të lira.

Pritshmëria:

Përdoruesi nuk duhet të ketë mundësi të kërkojë vend.

Vëzhgimi:

Aplikacioni shfaqi 0 vende të lira dhe mesazhin "Nuk ka vende të lira".

Prova 2
Hapat:

Zgjodha një udhëtim tjetër me vende të lira.

Pritshmëria:

Kur ka vende të lira duhet të shfaqet mundësia për të vazhduar me kërkesën për vend.

Vëzhgimi:

U shfaqën 2 vende të lira dhe lidhja "Kërko vend".

Prova 3
Hapat:

Klikova te "Kërko vend" në një udhëtim me vende të lira.

Pritshmëria:

Duhet të shfaqet statusi i kërkesës dhe të kuptohet që bëhet fjalë vetëm për demonstrim.

Vëzhgimi:

U shfaq statusi "Simulim: Në pritje" dhe njoftimi që kërkesa nuk i është dërguar shoferit.

Ndihma nga AI
Përdora AI për të identifikuar dallimet mes schema.sql dhe strukturës së databazës Neon, për të kuptuar problemet dhe për të dokumentuar korrigjimin në raport.

Commit-et
Para:

https://github.com/gresabajrami/rideshare-mobile/commit/454c8fa0b47cabe43d6e8fabcd4fd95c47f1d2fb

Pas:

