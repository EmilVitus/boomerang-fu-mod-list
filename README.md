# Boomerang Fu-mods til Windows

Et katalog over de offentlige mods til pc-udgaven af *Boomerang Fu* (Steam, Windows). Listen kan filtreres på type og status, og hvert kort har version, installation, kompatibilitet og links. Stamtræet viser, hvilken mod der er bygget oven på hvilken: Chaos-familien, de to online-prototyper, og de to mods med egen kodebase. En tabel sammenligner Chaos-familiens funktioner på tværs af Discord-modden, Slaughter House, Chaos Mod, stack-forken og Remix. En tabel under den skiller ekstra mennesker, bots og spil over nettet ad. Remix blev opdateret 13. november 2026, og samme dag kom kildepakken Boomerang Mods med Gravity Well.

Kataloget er uafhængigt af Cranky Watermelon og indeholder ingen filer fra spillet.

## Kør det lokalt

Kræver Node.js 22.

```bash
npm install
npm run dev
```

Udviklingsserveren lytter på port 3847. Åbn [http://localhost:3847](http://localhost:3847).

```bash
npm run lint
npm run build
```

## Hvad listen dækker

Kilderne er tjekket 18. november 2026. Hvert kort viser, hvornår modden sidst blev opdateret offentligt. Spillet var da på version 1.4.0 (3. november 2026). Ingen af modsene er bekræftet på den version. BepInEx 5.4.23.6, som modsene i 5.x-linjen bruger, blev udgivet 24. oktober 2026.

Data ligger i `data/mods.ts`.
