# RideShare — Java 6 · PWA dhe puna offline

## Çfarë ndërtova

Shtova një lexues offline për listën publike të udhëtimeve. Ai ka tri pjesë:

- **Manifesti** (`src/app/manifest.ts`) i jep aplikacionit emrin "RideShare AAB", ngjyrat, ikonat dhe pamjen `standalone`. Next.js e kthen në `/manifest.webmanifest`. Ai nuk ruan udhëtime dhe nuk lidhet me databazën.
- **Service worker** (`public/sw.js`) punon në shfletues, mes faqes dhe serverit. Kur instalohet, ruan `offline.html` dhe dy ikonat. Për `/api/udhetimet` provon fillimisht serverin dhe, nëse përgjigjja është e mirë, ruan një kopje me kohën e ruajtjes. Nëse serveri nuk arrihet, kthen kopjen e ruajtur. POST, `/panel` dhe `/api/auth` nuk ruhen kurrë.
- **Kopja publike në pajisje** është vetëm përgjigjja e `/api/udhetimet`. Ajo ka gjashtë fusha publike (`id`, `nisja`, `destinacioni`, `ora`, `vendtakimi`, `vende`), pa profile, email ose sesione. Faqja `public/offline.html` e lexon këtë kopje dhe tregon kartat, burimin (server ose kopje) dhe kohën e ruajtjes.

Komponenti `src/components/Pwa.tsx` regjistron worker-in dhe e kërkon listën një herë, që kopja të ruhet që në vizitën e parë. E vendosa te `layout.tsx` para përmbajtjes, pa i fshirë fontet ekzistuese.

## Provat që bëra

### Prova 1: Manifesti dhe vizita online

Hapa `http://localhost:3000`. Te DevTools → Application → Manifest pashë emrin **RideShare AAB** dhe dy ikonat **RS**: 192×192 dhe 512×512, të dyja `image/png`. Chrome ofroi edhe ikonën e instalimit në shiritin e adresës.

Fillimisht e hapa aplikacionin me `http://100.77.107.29:3000`. Atje ikonat nuk u përdorën dhe worker-i nuk u regjistrua, sepse një adresë HTTP me IP nuk është e sigurt dhe Chrome nuk lejon service worker. Me `localhost` funksionoi.

Service worker aktiv: [SHËNO po/jo]. Te Cache Storage → `rideshare-public-v1` u ruajt `/api/udhetimet`: [SHËNO po/jo].

### Prova 2: Pa internet dhe pas rifreskimit

[SHËNO çfarë pe] Ndërprerjen e simulova te DevTools → Network → **Offline**, vetëm në tab-in e RideShare. Hapa `/` dhe e rifreskova faqen. Tri kartat u shfaqën: [po/jo]. Koha e ruajtjes që pashë: [shkruaje]. Mesazhi: [shkruaje].

Kjo nuk ishte konfirmim rezervimi, sepse faqja offline vetëm lexon një kopje të vjetër. Butoni **Kërko vend** është i çaktivizuar dhe vendet ose ora mund të kenë ndryshuar në server.

### Prova 3: Lidhja rikthehet

[SHËNO çfarë pe] Me tab-in offline, në Neon → SQL Editor ekzekutova:

```sql
UPDATE udhetimet SET ora = '08:25' WHERE id = '2';
```

Ora e vjetër e ID 2 ishte 08:15, e reja 08:25. Offline shfaqej ende: [shkruaje]. Pastaj zgjodha **No throttling** dhe klikova **Rifresko listën**. ID 2 tregoi: [shkruaje], burimi: [shkruaje], koha e re: [shkruaje]. Në fund e ktheva orën në 08:15 dhe e rifreskova sërish.

## Ku gjendet puna

Repository: https://github.com/gresabajrami/rideshare-mobile

Skedarët e rinj:

- `aplikacioni/src/app/manifest.ts`: manifesti
- `aplikacioni/public/icons/icon-192.png` dhe `icon-512.png`: ikonat e aplikacionit
- `aplikacioni/src/app/icon.png` dhe `apple-icon.png`: ikona në tab dhe në iPhone (hoqa `favicon.ico` standard)
- `aplikacioni/src/app/api/udhetimet/route.ts`: lista publike në JSON
- `aplikacioni/public/sw.js`: service worker
- `aplikacioni/public/offline.html`: lexuesi offline
- `aplikacioni/src/components/Pwa.tsx`: regjistrimi i worker-it

Ndryshova `aplikacioni/src/app/layout.tsx`, ku shtova `<Pwa />`.

Demo në Vercel: [SHËNO linkun ose "nuk e kam publikuar ende"]

## Çfarë mbetet për përmirësim

Në vizitën e parë pa internet nuk ka kopje, prandaj faqja offline tregon vetëm "Ende nuk ka listë të ruajtur". Aplikacioni duhet të hapet të paktën një herë me internet.

Leximi offline ka kufizime. Kopja mund të jetë e vjetër dhe nuk përditësohet vetë kur rikthehet lidhja, por duhet klikuar **Rifresko listën**. Ruhet vetëm lista publike, jo detajet e udhëtimit, paneli ose kërkesat për vend. Asnjë veprim nuk mund të bëhet offline.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

nuk perdora AI
