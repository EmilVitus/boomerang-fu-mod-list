export const CHECKED_LABEL = "18. november 2026";

export const BEPINEX_RELEASE = "5.4.23.6, udgivet 24. oktober 2026";

export const categories = [
  { id: "spiltilstand", label: "Spiltilstande" },
  { id: "indstillinger", label: "Indstillinger" },
  { id: "powerups", label: "Powerups" },
  { id: "spillere", label: "Flere spillere" },
  { id: "online", label: "Online" },
  { id: "kosmetik", label: "Kosmetik" },
] as const;

export const statuses = [
  { id: "udgivet", label: "Udgivet" },
  { id: "beta", label: "Beta" },
  { id: "prototype", label: "Prototype" },
  { id: "kildekode", label: "Kun kildekode" },
  { id: "foraeldet", label: "Forældet" },
  { id: "discord", label: "Kun Discord" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type StatusId = (typeof statuses)[number]["id"];

export type ModLink = {
  label: string;
  href: string;
};

export type LineageEntry = {
  id: string;
  basedOn: string | null;
  relation: string | null;
};

export const lineage: LineageEntry[] = [
  { id: "original", basedOn: null, relation: null },
  { id: "chaos", basedOn: "original", relation: "BepInEx-udgave" },
  { id: "slaughter", basedOn: "chaos", relation: "Fork af 0.4.1" },
  { id: "stack", basedOn: "chaos", relation: "Viderebygning til 0.5.6" },
  { id: "remix", basedOn: "chaos", relation: "Fork efter december 2025" },
  { id: "gravity", basedOn: "chaos", relation: "Chaos, Slaughter House og Gravity Well" },
  { id: "online-1", basedOn: null, relation: null },
  { id: "online-2", basedOn: "online-1", relation: "Næste prototype" },
  { id: "eight", basedOn: null, relation: null },
  { id: "hats", basedOn: null, relation: null },
];

export function relatives(id: string) {
  const self = lineage.find((entry) => entry.id === id);
  const parent = self?.basedOn
    ? (mods.find((mod) => mod.id === self.basedOn) ?? null)
    : null;
  const children = lineage
    .filter((entry) => entry.basedOn === id)
    .flatMap((entry) => {
      const mod = mods.find((item) => item.id === entry.id);
      return mod ? [{ relation: entry.relation, mod }] : [];
    });
  return { relation: self?.relation ?? null, parent, children };
}

export type ModEntry = {
  id: string;
  name: string;
  authors: string;
  version: string;
  released: string;
  releasedLabel: string;
  updated: string;
  updatedLabel: string;
  updateNote?: string;
  status: StatusId;
  categories: CategoryId[];
  summary: string;
  features: string[];
  install: string[];
  compatibility: string;
  conflicts: string;
  links: ModLink[];
  downloads?: string;
  rank: number;
};

export const mods: ModEntry[] = [
  {
    id: "chaos",
    name: "Boomerang Foo: Chaos Mod",
    authors: "Jeff Jewett (Jeffjewett27), oprindeligt ws13sk",
    version: "0.5.4",
    released: "2025-08-02",
    releasedLabel: "2. august 2025",
    updated: "2025-12-19",
    updatedLabel: "19. december 2025",
    updateNote:
      "Udgivelse 0.5.4 er fra 2. august 2025. Committen 19. december er kun Steam Deck-afsnittet i readme.",
    status: "udgivet",
    categories: ["spiltilstand", "indstillinger", "powerups", "spillere"],
    summary:
      "Den mod, de fleste pc-spillere mener, når de siger Boomerang Fu-mod. Nye spiltilstande, en lang række modifiers i menuen og op til 11 bots, så en kamp kan være 12 figurer.",
    features: [
      "Spiltilstande: Power Drain, Juggernaut, Survive 'Till Dawn og Team Golden.",
      "Kampens længde, hurtigere powerup-spawn, maks. powerups, start-powerups, hoppende og større boomeranger.",
      "Spilhastighed fra 10 % til 500 %, sudden death-tider, knockback og en indstilling uden boomeranger.",
      "Powerup-modifiers for blandt andet Bamboozled, Decoy, Explosive, Fire, Hover, Caffeinated og Shield.",
      "Skjult bot-sværhedsgrad kaldet Impossible, og oversættelser via en JSON-fil.",
      "Fra 0.5.3: op til 11 bots. UI’et bliver trangt, og forfatteren kalder det eksperimentelt.",
    ],
    install: [
      "Hent BoomerangFoo-0.5.4.zip fra GitHub Releases.",
      "Pak den ud i Steam-mappen, så BepInEx ligger ved siden af Boomerang Fu.exe. Typisk sti: C:\\Program Files (x86)\\Steam\\steamapps\\common\\Boomerang Fu.",
      "Start spillet én gang. Versionsteksten i hovedmenuen skal indeholde Mod.",
      "Senere opdateringer kan nøjes med at erstatte BepInEx\\plugins\\BoomerangFoo\\BoomerangFoo.dll.",
    ],
    compatibility:
      "0.5.0 blev lavet til spilversion 1.3.5 (april 2025). 0.5.4 er fra august 2025, altså efter hotfix 1.3.6 og før 1.3.7 (16. oktober 2025). Ingen har bekræftet den på 1.3.7 eller på 1.4.0 fra 3. november 2026.",
    conflicts:
      "Zip-filen lægger sin egen BepInEx ind. Kun én BoomerangFoo.dll kan ligge i plugin-mappen. Den kan ikke køre samtidig med stack-forken, Remix, Slaughter House eller 8 Player Mod, fordi de retter de samme metoder.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Jeffjewett27/BoomerangFoo",
      },
      {
        label: "Download 0.5.4",
        href: "https://github.com/Jeffjewett27/BoomerangFoo/releases/download/v0.5.4/BoomerangFoo-0.5.4.zip",
      },
      {
        label: "Releases",
        href: "https://github.com/Jeffjewett27/BoomerangFoo/releases",
      },
    ],
    downloads: "591 downloads af 0.5.4-zippen på GitHub",
    rank: 1,
  },
  {
    id: "stack",
    name: "Chaos Mod, stack-fork",
    authors: "huseinnabil1997, bygget oven på Jeffjewett27",
    version: "0.5.6",
    released: "2026-08-15",
    releasedLabel: "15. august 2026",
    updated: "2026-09-09",
    updatedLabel: "9. september 2026",
    updateNote:
      "Zippen 0.5.6 er fra 15. august 2026. Repoet har commits 9. september, efter den zip.",
    status: "udgivet",
    categories: ["spiltilstand", "indstillinger", "powerups", "spillere"],
    summary:
      "En viderebygning af Chaos Mod, hvor den samme powerup kan stables op til tre gange, bøger kan rulles som en gacha, og lobbyen kan tage otte controllere og tolv spillere i alt.",
    features: [
      "Stack Same Powerup: samme evne op til tre gange. Eksplosionsradius, spor, fart, skjolde, decoys og ekstra discs skalerer med stakken.",
      "Book gacha: Normal, Magnet, Pity, Map Types, Double og et ikon på bogen, så man kan se evnen.",
      "Max Books begrænser hvor mange bøger der spawner pr. bane.",
      "Otte lokale controllere via Rewired. Resten af pladserne kan stadig være bots. Unikke figurer er slået til.",
      "Tolv spillere med ekstra spawn-punkter og en afslutningsskærm med tolv pladser.",
      "De oprindelige Chaos-tilstande og modifiers følger med. F1 er debug, ikke en menu.",
    ],
    install: [
      "Kræver Boomerang Fu på Steam til Windows.",
      "Hent BoomerangFoo-0.5.6.zip og pak den ud ved siden af Boomerang Fu.exe.",
      "Start spillet. Mod skal stå i versionslinjen i hovedmenuen.",
      "Lad Newtonsoft.Json.dll blive liggende, når du kun udskifter BoomerangFoo.dll.",
    ],
    compatibility:
      "Udgivet 15. august 2026, efter spillets 1.3.7 og før 1.4.0. Readme’en nævner ikke en præcis spilversion. Regn med at 1.4.0 fra 3. november 2026 kan have ødelagt den, indtil nogen tester den.",
    conflicts:
      "Erstatter den samme BoomerangFoo.dll som den originale Chaos Mod. Kør den ikke sammen med Remix, Slaughter House eller 8 Player Mod.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/huseinnabil1997/BoomerangFoo-ChaosMod",
      },
      {
        label: "Download 0.5.6",
        href: "https://github.com/huseinnabil1997/BoomerangFoo-ChaosMod/releases/download/v0.5.6/BoomerangFoo-0.5.6.zip",
      },
    ],
    downloads: "6 downloads af 0.5.6-zippen på GitHub",
    rank: 2,
  },
  {
    id: "eight",
    name: "8 Player Mod",
    authors: "Shyngyskhan-333",
    version: "3.0.0 beta",
    released: "2026-10-16",
    releasedLabel: "16. oktober 2026",
    updated: "2026-10-16",
    updatedLabel: "16. oktober 2026",
    status: "beta",
    categories: ["spillere"],
    summary:
      "En selvstændig BepInEx-plugin, der hæver den lokale grænse fra seks til otte spillere. Den rører ikke powerups eller spiltilstande, kun input, UI og spawn.",
    features: [
      "Rewired får otte spillere, før InputManager starter, så spiller 7 og 8 har deres eget input.",
      "Otte lobby-pladser, otte ikoner, en scoretavle der kan være på 1080p, og et podie til otte.",
      "Ekstra spawn-punkter på 54 af 57 baner, når der er syv eller otte spillere. Holdkampe deler punkterne i to sider.",
      "Med seks eller færre spillere kører spawn-koden ikke.",
      "Golden Disc får kortere overlevelsestid ved syv og otte spillere.",
    ],
    install: [
      "Installér BepInEx 5.4.23.x x64 i spilmappen og start spillet én gang.",
      "Hent BoomerangFu8P-3.0.0.zip. Kør install.ps1, eller læg BepInEx\\plugins\\BoomerangFu8P.dll i spillets plugins-mappe.",
      "Slå XInput fra i spillets indstillinger. XInput stopper ved fire Xbox-controllere. Uden den bruger Rewired Raw Input.",
    ],
    compatibility:
      "Kun undersøgt på spilversion 1.3.6 (Unity 2022.3.54f1). 1.3.7 og især 1.4.0 er nyere, så den er sandsynligvis i stykker på den aktuelle Steam-build, indtil den bliver opdateret. Fysiske controllere 7 og 8 er ikke testet. Bot-kampe er.",
    conflicts:
      "Kan ikke køre samtidig med Chaos Mod eller dens forks. De patcher de samme metoder.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Shyngyskhan-333/boomerang-fu-8-player-mod",
      },
      {
        label: "Download 3.0.0 beta",
        href: "https://github.com/Shyngyskhan-333/boomerang-fu-8-player-mod/releases/download/v3.0.0/BoomerangFu8P-3.0.0.zip",
      },
    ],
    downloads: "1 download af beta-zippen på GitHub",
    rank: 3,
  },
  {
    id: "online-2",
    name: "Online Multiplayer, andet prototype",
    authors: "Noob_Kid på Reddit",
    version: "Prototype 2",
    released: "2026-07-09",
    releasedLabel: "9. juli 2026",
    updated: "2026-07-09",
    updatedLabel: "9. juli 2026",
    status: "prototype",
    categories: ["online", "spillere"],
    summary:
      "Den nyeste offentlige online-mod til Steam-udgaven. Flere lokale spillere og bots på samme maskine, plus tilfældig matchmaking og et lobby-overlay.",
    features: [
      "Online-funktioner åbnes med O på tastatur eller START på controller, inde i en lobby.",
      "Flere lokale spillere pr. maskine og bots.",
      "Tilfældig matchmaking og ændringer i lobbyens UI.",
      "Kendt fejl: flere lokale spillere kan spawne oven i hinanden i solo-spiltilstande.",
      "En spiller har rapporteret, at den ikke vil køre under Proton.",
    ],
    install: [
      "Installér BepInEx via linket i Reddit-opslaget, start spillet én gang, og luk det igen.",
      "Læg mod-filen i BepInEx\\plugins. Selve filen ligger som et link i opslaget, ikke på GitHub.",
      "Start spillet og åbn online-menuen med O eller START.",
    ],
    compatibility:
      "Skrevet til Steam-versionen i juli 2026, altså efter 1.3.7 og før 1.4.0. Den er en prototype, og 1.4.0 tre dage før denne liste blev lavet, kan have ændret de klasser, den hooker.",
    conflicts:
      "Ikke testet sammen med Chaos Mod eller 8 Player Mod. De bruger alle BepInEx, men online-modden er et separat plugin.",
    links: [
      {
        label: "Reddit-opslag med download",
        href: "https://www.reddit.com/r/BoomerangFu/comments/1urnyqs/boomerang_fu_online_multiplayer_mod_second/",
      },
    ],
    rank: 4,
  },
  {
    id: "remix",
    name: "Boomerang Foo Remix",
    authors: "alialyami90, fork af Jeffjewett27",
    version: "Kildekode",
    released: "2026-11-13",
    releasedLabel: "13. november 2026",
    updated: "2026-11-13",
    updatedLabel: "13. november 2026",
    status: "kildekode",
    categories: ["powerups", "indstillinger", "spiltilstand", "spillere"],
    summary:
      "Chaos Mod med egne powerup-regler, Russian Roulette og rettelser, så kampe med syv eller flere figurer kan starte og nå afslutningsskærmen. Sidste commit er 13. november 2026. Der er stadig ingen færdig zip.",
    features: [
      "Start-powerups er delt i et gitter til mennesker og et til bots.",
      "Hver side kan have sin egen pulje af powerups fra bøger på banen.",
      "Hver powerup har en spawn-vægt: Off, Rare, Low, Normal, High eller Very High.",
      "Russian Roulette: hver runde får alle et tilfældigt sæt powerups, som standard tre, og der spawner ingen flere på banen.",
      "Powerup-display: menneskers aktuelle powerups vises i hvert sit hjørne. Det kan slås fra i modifier-menuen.",
      "Kampstatistik efter hver runde og på vinder-skærmen. Tabellen fader sammen med replayet, når man trykker R2.",
      "Smid den nyeste powerup med Q eller d-pad ned. De øvrige gives igen, og et skjold beholder de hit, det har tilbage.",
      "Syv eller flere figurer: livbarer og præmiekort bliver oprettet forbi de seks, så runden kan starte og afslutningsskærmen ikke låser. Bots flyttes væk fra menneskers spawn.",
      "Resten er den Chaos Mod, forken er taget fra, inklusive de ældre spiltilstande og modifier-menuen.",
    ],
    install: [
      "Der er ingen GitHub-release. Installér .NET SDK 8 eller nyere én gang.",
      "Hent Install-BoomerangFoo.bat fra repoet og dobbeltklik på den. Den henter master, finder spillet via Steam, bygger modden og lægger den ind.",
      "Første kørsel tager nogle minutter. Loggen havner i %TEMP%\\BoomerangFooRemix-install.log, hvis noget fejler.",
    ],
    compatibility:
      "Sidste commit på master er 13. november 2026. De første egne ændringer er fra 29.–30. oktober 2026, oven på Chaos Mod efter README-opdateringen 19. december 2025. Samme forbehold som Chaos Mod over for 1.4.0, og den er ikke prøvet af som færdig pakke.",
    conflicts:
      "Den lægger sin egen BoomerangFoo.dll ind og erstatter derfor Chaos Mod, stack-forken og Slaughter House.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/alialyami90/BoomerangFooRemix",
      },
      {
        label: "Install-BoomerangFoo.bat",
        href: "https://github.com/alialyami90/BoomerangFooRemix/blob/master/Install-BoomerangFoo.bat",
      },
      {
        label: "Seneste commit",
        href: "https://github.com/alialyami90/BoomerangFooRemix/commit/a62566a6",
      },
    ],
    rank: 5,
  },
  {
    id: "gravity",
    name: "Boomerang Mods",
    authors: "acaburaz, oven på Jeffjewett27 og william-spongberg",
    version: "Kildekode",
    released: "2026-11-13",
    releasedLabel: "13. november 2026",
    updated: "2026-11-13",
    updatedLabel: "13. november 2026",
    status: "kildekode",
    categories: ["spiltilstand", "powerups", "spillere"],
    summary:
      "En ny pakke fra 13. november 2026 med Chaos-tilstandene, Slaughter House, powerup’en Gravity Well og et loft på otte spillere. Readme’en nævner en zip, men der er ingen release.",
    features: [
      "Gravity Well: en eksplosion efterlader et lilla felt, der trækker de andre ind mod midten. Varighed, radius og trækstyrke kan sættes i menuen.",
      "Slaughter House fra william-spongbergs fork, med liv og respawn-forsinkelse.",
      "Power Drain, Juggernaut, Survive 'Till Dawn og Team Golden følger med, sammen med de kendte powerup-modifiers.",
      "Loftet er otte spillere i alt, mennesker og bots tilsammen. Spillets eget loft er seks.",
      "F1 åbner spillets debug. F2 giver alle levende spillere alle powerups.",
    ],
    install: [
      "Der er ingen release, selv om readme’en skriver, at man skal hente en zip.",
      "Klon repoet. Sæt GamePath i src/BoomerangFoo.csproj til spilmappen.",
      "Byg med dotnet build -c Debug fra mappen src. Buildet kopierer BoomerangFoo.dll ind i BepInEx\\plugins\\BoomerangFoo.",
    ],
    compatibility:
      "Ét commit, 13. november 2026. I kilden står NoBoomerangs som true fra start, så tjek modifieren Uden boomeranger, hvis kampen begynder uden boomeranger. Samme forbehold over for spilversion 1.4.0 som de andre Chaos-forks. Den er ikke prøvet af som færdig pakke.",
    conflicts:
      "Den lægger sin egen BoomerangFoo.dll ind og erstatter Chaos Mod, stack-forken, Remix, Slaughter House og 8 Player Mod.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/acaburaz/boomerang-mods",
      },
    ],
    rank: 6,
  },
  {
    id: "slaughter",
    name: "Slaughter House",
    authors: "william-spongberg, fork af Jeffjewett27",
    version: "0.4.1",
    released: "2025-03-02",
    releasedLabel: "2. marts 2025",
    updated: "2025-03-02",
    updatedLabel: "2. marts 2025",
    status: "foraeldet",
    categories: ["spiltilstand"],
    summary:
      "En ældre Chaos-fork, hvis eneste egne tilføjelse er spiltilstanden Slaughter House: holdkamp, hvor man selv sætter antal liv.",
    features: [
      "Slaughter House: vælg antal liv. Uendelige liv betyder, at man spiller til kill-grænsen.",
      "Mindst to liv. Selvmord tæller, og liv nulstilles mellem runder.",
      "De ældre Chaos-tilstande fra 0.4.1 følger med: Power Drain, Juggernaut, Survive 'Till Dawn og Team Golden.",
      "Mangler alt, der kom i Chaos Mod efter marts 2025, herunder spilhastighed, tolv bots og 1.3.5-banekortet.",
    ],
    install: [
      "Hent BoomerangFoo_v0.4.1.zip og pak den ud ved siden af Boomerang Fu.exe, samme måde som Chaos Mod.",
      "Eller læg den vedlagte BoomerangFoo.dll i BepInEx\\plugins\\BoomerangFoo, hvis BepInEx allerede er installeret.",
    ],
    compatibility:
      "Udgivet 2. marts 2025, før spillets 1.3.5 (28. marts 2025). Den er ældre end både 1.3.7 og 1.4.0. Spillet har desuden selv fået modifieren Lives Per Map i 1.4.0, som dækker en del af det samme ønske i Free For All.",
    conflicts:
      "Erstatter BoomerangFoo.dll. Brug den ikke oven i en nyere Chaos-udgivelse.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/william-spongberg/BoomerangFooMod",
      },
      {
        label: "Download 0.4.1",
        href: "https://github.com/william-spongberg/BoomerangFooMod/releases/download/Release/BoomerangFoo_v0.4.1.zip",
      },
    ],
    downloads: "56 downloads af 0.4.1-zippen på GitHub",
    rank: 7,
  },
  {
    id: "online-1",
    name: "Online Multiplayer, proof of concept",
    authors: "Noob_Kid på Reddit",
    version: "Første prototype",
    released: "2026-06-14",
    releasedLabel: "14. juni 2026",
    updated: "2026-06-14",
    updatedLabel: "14. juni 2026",
    status: "foraeldet",
    categories: ["online"],
    summary:
      "Det første offentlige udkast til online-modden. Spilbart ved omkring 100 ms, men visuelle elementer og rotation kunne gå ud af sync, og klienter hang fast på én bane.",
    features: [
      "Værts-/klient-spil over nettet på Steam-udgaven.",
      "Testet af forfatteren ved cirka 100 ms latenstid.",
      "Visuelle effekter og figurens rotation blev ikke altid synkroniseret.",
      "Hvis værten valgte en anden bane, blev klienterne på den første, og kampen desyncede.",
    ],
    install: [
      "Samme BepInEx-trin som det andet prototype: installér BepInEx, start spillet én gang, læg filen i BepInEx\\plugins.",
      "Download-linket står i Reddit-opslaget. Brug det nyere opslag, medmindre du bevidst vil prøve det første udkast.",
    ],
    compatibility:
      "Afløst af prototypen fra 9. juli 2026. Samme usikkerhed over for spilversion 1.4.0.",
    conflicts:
      "Læg ikke begge online-prototyper i plugins-mappen på én gang.",
    links: [
      {
        label: "Reddit-opslag",
        href: "https://www.reddit.com/r/BoomerangFu/comments/1u5emr1/boomerang_fu_proof_of_concept_online_multiplayer/",
      },
      {
        label: "Nyere prototype",
        href: "https://www.reddit.com/r/BoomerangFu/comments/1urnyqs/boomerang_fu_online_multiplayer_mod_second/",
      },
    ],
    rank: 8,
  },
  {
    id: "hats",
    name: "Hat Loader",
    authors: "exp111",
    version: "1.0.0",
    released: "2022-12-23",
    releasedLabel: "23. december 2022",
    updated: "2022-12-23",
    updatedLabel: "23. december 2022",
    status: "foraeldet",
    categories: ["kosmetik"],
    summary:
      "Den ældste offentlige Windows-mod. Den loader egne hatte fra asset bundles: en kube, en cowboyhat og en heksehat fulgte med udgivelsen.",
    features: [
      "Egne hatte via en meta.xml og et Unity asset bundle i BepInEx\\plugins\\…\\HatLoader.",
      "Hver hat kan skjule hår, sidde på hoved eller ansigt og udelukke figurer.",
      "Udgivelsen exp111-Hats.zip indeholder Square, Cowboy og Witch. Witch-modellen er krediteret til et Sketchfab-asset.",
      "Selve loader-pluginen ligger som kildekode i repoet. Zippen er hattepakken.",
    ],
    install: [
      "Byg HatLoader fra kildekoden mod den BepInEx-version, spillet brugte i 2022, og læg dll’en i BepInEx\\plugins.",
      "Læg hattepakken, så der findes en HatLoader-mappe med meta.xml og bundlerne ved siden af.",
      "Forvent at skulle tilpasse projektet. Spillet er ikke længere den Unity 2019-build, readme’en beskriver.",
    ],
    compatibility:
      "Skrevet da spillet kørte på Unity 2019.2. 8 Player Mod beskriver 1.3.6 som Unity 2022.3.54f1, og 1.4.0 er endnu nyere. Hatte fra 2022 loader næsten med sikkerhed ikke uden en omskrivning.",
    conflicts:
      "Et selvstændigt plugin. Det deler ikke dll-navn med Chaos Mod, men en gammel BepInEx fra 2022 kan ikke blandes med de nye pakker.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/exp111/BoomerangFuStuff",
      },
      {
        label: "Hattepakke 1.0.0",
        href: "https://github.com/exp111/BoomerangFuStuff/releases/download/1.0.0/exp111-Hats.zip",
      },
    ],
    downloads: "14 downloads af hattepakken på GitHub",
    rank: 9,
  },
  {
    id: "original",
    name: "Oprindelig Chaos-mod",
    authors: "wq13 på Reddit, Discord-navn ws13sk",
    version: "Opdateret til 1.3.5",
    released: "2024-09-16",
    releasedLabel: "16. september 2024",
    updated: "2025-03-30",
    updatedLabel: "30. marts 2025",
    updateNote:
      "Reddit-opslaget er fra 16. september 2024. Datoen her er kommentaren 30. marts 2025, som omtalte en build til spilversion 1.3.5.",
    status: "discord",
    categories: ["spiltilstand", "indstillinger", "powerups"],
    summary:
      "Modden, som Boomerang Foo er en BepInEx-udgave af. Den blev delt i den officielle Discord, ikke som et offentligt repo. En kommentar 30. marts 2025 sagde, at en build til spilversion 1.3.5 lå i videoen eller på Discord.",
    features: [
      "Banekort, tre nye spiltilstande, kampindstillinger, power-modifiers og kamera-modifiers.",
      "Kun pc, ifølge opslaget.",
      "Jeff Jewett skrev senere, at hans udgivelse var den første, der lagde indstillingerne ind i spillets egne menuer.",
    ],
    install: [
      "Der er ikke et offentligt download-link uden for Discord og den video, opslaget henviser til.",
      "Til almindeligt brug er Chaos Mod 0.5.4 eller stack-forken 0.5.6 den fil, man kan hente.",
    ],
    compatibility:
      "Den omtalte opdatering ramte 1.3.5. Den er ikke vedligeholdt offentligt siden, og 1.4.0 ligger flere versioner senere.",
    conflicts:
      "Forløberen til BoomerangFoo. Installér den ikke oven i en BepInEx-udgave af samme mod.",
    links: [
      {
        label: "Reddit-opslag",
        href: "https://www.reddit.com/r/BoomerangFu/comments/1fiffbs/boomerang_fu_mod_your_game/",
      },
      {
        label: "BepInEx-udgaven",
        href: "https://github.com/Jeffjewett27/BoomerangFoo",
      },
    ],
    rank: 10,
  },
];

export const omitted = [
  {
    title: "Steam Workshop, ModDB, Nexus Mods og Thunderstore",
    body: "Spillet har ikke Steam Workshop. ModDB’s side for Boomerang Fu viser nul mods. Søgninger på Nexus Mods og Thunderstore gav ingen Boomerang Fu-mods.",
  },
  {
    title: "Uændret GitHub-mirror",
    body: "tomkimberlin/BoomerangFoo er en fork uden egne commits. Den er den samme kode som Jeffjewett27 og tæller ikke som en selvstændig mod.",
  },
  {
    title: "ORDER",
    body: "Repoet raverhong3300-png/ORDER-BoomerangFu fra 16. november 2026 indeholder kun en kort readme. Releasen v1.0.0 lægger zippen ORDER-2.0.0-.zip op uden kildekode ved siden af, og teksten siger, at installationen kommer senere. Den er ikke taget med, og zippen bør ikke hentes.",
  },
  {
    title: "Repoet Boomerang Fu Trainer",
    body: "Et GitHub-repo med det navn er en generisk skabelon. Download-knappen peger på et andet projekt, og teksten lover sigte, våben og liv, som Boomerang Fu ikke har. Det er udeladt, og filen bør ikke hentes.",
  },
  {
    title: "Discord-eksperiment uden fil",
    body: "Brugeren SirusDoma skrev 17. juni 2026, at de også arbejdede på netværk med Unity NGO og havde lagt klip i den officielle Discord. Der er ingen offentlig release at linke til.",
  },
  {
    title: "Officielt indhold og andre spil",
    body: "Fresh Flavors, Just Desserts og Street Food er DLC fra Cranky Watermelon, ikke mods. En boomerang-evne på Thunderstore hører til Bopl Battle. boomerang-fu-web og Bumerang-Duell VR er egne spil, ikke mods til Steam-udgaven.",
  },
];
