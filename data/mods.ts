import { c, type Copy } from "@/lib/copy";

export const CHECKED_LABEL = c("27. november 2026", "27 November 2026");

export const BEPINEX_RELEASE = c(
  "5.4.23.6, udgivet 24. oktober 2026",
  "5.4.23.6, released 24 October 2026",
);

export const categories = [
  { id: "spiltilstand", label: c("Spiltilstande", "Game modes") },
  { id: "indstillinger", label: c("Indstillinger", "Settings") },
  { id: "powerups", label: c("Powerups", "Powerups") },
  { id: "spillere", label: c("Flere spillere", "More players") },
  { id: "online", label: c("Online", "Online") },
  { id: "kosmetik", label: c("Kosmetik", "Cosmetic") },
  { id: "vaerktoej", label: c("Værktøj", "Tool") },
] as const;

export const statuses = [
  { id: "udgivet", label: c("Udgivet", "Released") },
  { id: "beta", label: c("Beta", "Beta") },
  { id: "prototype", label: c("Prototype", "Prototype") },
  { id: "kildekode", label: c("Kun kildekode", "Source only") },
  { id: "foraeldet", label: c("Forældet", "Outdated") },
  { id: "discord", label: c("Kun Discord", "Discord only") },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type StatusId = (typeof statuses)[number]["id"];

export type ModLink = {
  label: Copy;
  href: string;
};

export type LineageEntry = {
  id: string;
  basedOn: string | null;
  relation: Copy | null;
};

export const lineage: LineageEntry[] = [
  { id: "original", basedOn: null, relation: null },
  { id: "chaos", basedOn: "original", relation: c("BepInEx-udgave", "BepInEx edition") },
  { id: "slaughter", basedOn: "chaos", relation: c("Fork af 0.4.1", "Fork of 0.4.1") },
  {
    id: "stack",
    basedOn: "chaos",
    relation: c("Viderebygning til 0.5.6", "Continuation to 0.5.6"),
  },
  {
    id: "remix",
    basedOn: "chaos",
    relation: c("Fork efter december 2025", "Fork after December 2025"),
  },
  {
    id: "gravity",
    basedOn: "chaos",
    relation: c(
      "Chaos, Slaughter House og Gravity Well",
      "Chaos, Slaughter House and Gravity Well",
    ),
  },
  { id: "online-1", basedOn: null, relation: null },
  { id: "online-2", basedOn: "online-1", relation: c("Næste prototype", "Next prototype") },
  { id: "online-github", basedOn: null, relation: null },
  { id: "eight", basedOn: null, relation: null },
  { id: "hats", basedOn: null, relation: null },
  { id: "speedrun", basedOn: null, relation: null },
  { id: "team-mint", basedOn: null, relation: null },
  { id: "manager", basedOn: null, relation: null },
];

export type LineageView = {
  id: string;
  basedOn: string | null;
  relation: string | null;
};

export function relatives<T extends { id: string }>(
  id: string,
  modList: T[],
  lineageList: LineageView[],
) {
  const self = lineageList.find((entry) => entry.id === id);
  const parent = self?.basedOn
    ? (modList.find((mod) => mod.id === self.basedOn) ?? null)
    : null;
  const children = lineageList
    .filter((entry) => entry.basedOn === id)
    .flatMap((entry) => {
      const mod = modList.find((item) => item.id === entry.id);
      return mod ? [{ relation: entry.relation, mod }] : [];
    });
  return { relation: self?.relation ?? null, parent, children };
}

export type ModEntry = {
  id: string;
  name: Copy;
  authors: Copy;
  version: Copy;
  released: string;
  releasedLabel: Copy;
  updated: string;
  updatedLabel: Copy;
  updateNote?: Copy;
  status: StatusId;
  categories: CategoryId[];
  summary: Copy;
  features: Copy[];
  install: Copy[];
  compatibility: Copy;
  conflicts: Copy;
  links: ModLink[];
  downloads?: Copy;
  rank: number;
};

const same = (text: string) => c(text, text);

export const mods: ModEntry[] = [
  {
    id: "chaos",
    name: same("Boomerang Foo: Chaos Mod"),
    authors: c(
      "Jeff Jewett (Jeffjewett27), oprindeligt ws13sk",
      "Jeff Jewett (Jeffjewett27), originally ws13sk",
    ),
    version: same("0.5.4"),
    released: "2025-08-02",
    releasedLabel: c("2. august 2025", "2 August 2025"),
    updated: "2025-12-19",
    updatedLabel: c("19. december 2025", "19 December 2025"),
    updateNote: c(
      "Udgivelse 0.5.4 er fra 2. august 2025. Committen 19. december er kun Steam Deck-afsnittet i readme.",
      "Release 0.5.4 is from 2 August 2025. The 19 December commit only updates the Steam Deck section of the readme.",
    ),
    status: "udgivet",
    categories: ["spiltilstand", "indstillinger", "powerups", "spillere"],
    summary: c(
      "Den mod, de fleste pc-spillere mener, når de siger Boomerang Fu-mod. Nye spiltilstande, en lang række modifiers i menuen og op til 11 bots, så en kamp kan være 12 figurer.",
      "The mod most PC players mean when they say Boomerang Fu mod. New game modes, a long list of modifiers in the menu, and up to 11 bots, so a match can have 12 figures.",
    ),
    features: [
      c(
        "Spiltilstande: Power Drain, Juggernaut, Survive 'Till Dawn og Team Golden.",
        "Game modes: Power Drain, Juggernaut, Survive 'Till Dawn, and Team Golden.",
      ),
      c(
        "Kampens længde, hurtigere powerup-spawn, maks. powerups, start-powerups, hoppende og større boomeranger.",
        "Match length, faster powerup spawn, max powerups, starting powerups, bouncy and larger boomerangs.",
      ),
      c(
        "Spilhastighed fra 10 % til 500 %, sudden death-tider, knockback og en indstilling uden boomeranger.",
        "Game speed from 10% to 500%, sudden death times, knockback, and a setting with no boomerangs.",
      ),
      c(
        "Powerup-modifiers for blandt andet Bamboozled, Decoy, Explosive, Fire, Hover, Caffeinated og Shield.",
        "Powerup modifiers for Bamboozled, Decoy, Explosive, Fire, Hover, Caffeinated, and Shield, among others.",
      ),
      c(
        "Skjult bot-sværhedsgrad kaldet Impossible, og oversættelser via en JSON-fil.",
        "A hidden bot difficulty called Impossible, and translations via a JSON file.",
      ),
      c(
        "Fra 0.5.3: op til 11 bots. UI’et bliver trangt, og forfatteren kalder det eksperimentelt.",
        "From 0.5.3: up to 11 bots. The UI gets cramped, and the author calls it experimental.",
      ),
    ],
    install: [
      c(
        "Hent BoomerangFoo-0.5.4.zip fra GitHub Releases.",
        "Download BoomerangFoo-0.5.4.zip from GitHub Releases.",
      ),
      c(
        "Pak den ud i Steam-mappen, så BepInEx ligger ved siden af Boomerang Fu.exe. Typisk sti: C:\\Program Files (x86)\\Steam\\steamapps\\common\\Boomerang Fu.",
        "Extract it into the Steam folder so BepInEx sits next to Boomerang Fu.exe. Typical path: C:\\Program Files (x86)\\Steam\\steamapps\\common\\Boomerang Fu.",
      ),
      c(
        "Start spillet én gang. Versionsteksten i hovedmenuen skal indeholde Mod.",
        "Start the game once. The version text on the main menu should contain Mod.",
      ),
      c(
        "Senere opdateringer kan nøjes med at erstatte BepInEx\\plugins\\BoomerangFoo\\BoomerangFoo.dll.",
        "Later updates can just replace BepInEx\\plugins\\BoomerangFoo\\BoomerangFoo.dll.",
      ),
    ],
    compatibility: c(
      "0.5.0 blev lavet til spilversion 1.3.5 (april 2025). 0.5.4 er fra august 2025, altså efter hotfix 1.3.6 og før 1.3.7 (16. oktober 2025). Ingen har bekræftet den på 1.3.7, 1.4.0 eller 1.4.1.",
      "0.5.0 was made for game version 1.3.5 (April 2025). 0.5.4 is from August 2025, after hotfix 1.3.6 and before 1.3.7 (16 October 2025). Nobody has confirmed it on 1.3.7, 1.4.0, or 1.4.1.",
    ),
    conflicts: c(
      "Zip-filen lægger sin egen BepInEx ind. Kun én BoomerangFoo.dll kan ligge i plugin-mappen. Den kan ikke køre samtidig med stack-forken, Remix, Slaughter House eller 8 Player Mod, fordi de retter de samme metoder.",
      "The zip installs its own BepInEx. Only one BoomerangFoo.dll can sit in the plugin folder. It cannot run at the same time as the stack fork, Remix, Slaughter House, or 8 Player Mod, because they patch the same methods.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/Jeffjewett27/BoomerangFoo" },
      {
        label: same("Download 0.5.4"),
        href: "https://github.com/Jeffjewett27/BoomerangFoo/releases/download/v0.5.4/BoomerangFoo-0.5.4.zip",
      },
      { label: same("Releases"), href: "https://github.com/Jeffjewett27/BoomerangFoo/releases" },
    ],
    downloads: c(
      "591 downloads af 0.5.4-zippen på GitHub",
      "591 downloads of the 0.5.4 zip on GitHub",
    ),
    rank: 1,
  },
  {
    id: "stack",
    name: c("Chaos Mod, stack-fork", "Chaos Mod, stack fork"),
    authors: c(
      "huseinnabil1997, bygget oven på Jeffjewett27",
      "huseinnabil1997, built on Jeffjewett27",
    ),
    version: same("0.5.6"),
    released: "2026-08-15",
    releasedLabel: c("15. august 2026", "15 August 2026"),
    updated: "2026-09-09",
    updatedLabel: c("9. september 2026", "9 September 2026"),
    updateNote: c(
      "Zippen 0.5.6 er fra 15. august 2026. Repoet har commits 9. september, efter den zip.",
      "The 0.5.6 zip is from 15 August 2026. The repo has commits on 9 September, after that zip.",
    ),
    status: "udgivet",
    categories: ["spiltilstand", "indstillinger", "powerups", "spillere"],
    summary: c(
      "En viderebygning af Chaos Mod, hvor den samme powerup kan stables op til tre gange, bøger kan rulles som en gacha, og lobbyen kan tage otte controllere og tolv spillere i alt.",
      "A continuation of Chaos Mod where the same powerup can stack up to three times, books can be rolled like a gacha, and the lobby can take eight controllers and twelve players in total.",
    ),
    features: [
      c(
        "Stack Same Powerup: samme evne op til tre gange. Eksplosionsradius, spor, fart, skjolde, decoys og ekstra discs skalerer med stakken.",
        "Stack Same Powerup: the same ability up to three times. Explosion radius, trails, speed, shields, decoys, and extra discs scale with the stack.",
      ),
      c(
        "Book gacha: Normal, Magnet, Pity, Map Types, Double og et ikon på bogen, så man kan se evnen.",
        "Book gacha: Normal, Magnet, Pity, Map Types, Double, and an icon on the book so you can see the ability.",
      ),
      c(
        "Max Books begrænser hvor mange bøger der spawner pr. bane.",
        "Max Books limits how many books spawn per map.",
      ),
      c(
        "Otte lokale controllere via Rewired. Resten af pladserne kan stadig være bots. Unikke figurer er slået til.",
        "Eight local controllers via Rewired. The remaining slots can still be bots. Unique characters are turned on.",
      ),
      c(
        "Tolv spillere med ekstra spawn-punkter og en afslutningsskærm med tolv pladser.",
        "Twelve players, with extra spawn points and a results screen with twelve slots.",
      ),
      c(
        "De oprindelige Chaos-tilstande og modifiers følger med. F1 er debug, ikke en menu.",
        "The original Chaos modes and modifiers come along. F1 is debug, not a menu.",
      ),
    ],
    install: [
      c(
        "Kræver Boomerang Fu på Steam til Windows.",
        "Requires Boomerang Fu on Steam for Windows.",
      ),
      c(
        "Hent BoomerangFoo-0.5.6.zip og pak den ud ved siden af Boomerang Fu.exe.",
        "Download BoomerangFoo-0.5.6.zip and extract it next to Boomerang Fu.exe.",
      ),
      c(
        "Start spillet. Mod skal stå i versionslinjen i hovedmenuen.",
        "Start the game. Mod should appear in the version line on the main menu.",
      ),
      c(
        "Lad Newtonsoft.Json.dll blive liggende, når du kun udskifter BoomerangFoo.dll.",
        "Leave Newtonsoft.Json.dll in place when you only replace BoomerangFoo.dll.",
      ),
    ],
    compatibility: c(
      "Udgivet 15. august 2026, efter spillets 1.3.7 og før 1.4.0. Readme’en nævner ikke en præcis spilversion. Regn med at 1.4.0 fra 3. november 2026 og 1.4.1 fra 19. november kan have ødelagt den, indtil nogen tester den.",
      "Released 15 August 2026, after the game's 1.3.7 and before 1.4.0. The readme does not name an exact game version. Assume 1.4.0 from 3 November 2026 and 1.4.1 from 19 November may have broken it until someone tests it.",
    ),
    conflicts: c(
      "Erstatter den samme BoomerangFoo.dll som den originale Chaos Mod. Kør den ikke sammen med Remix, Slaughter House eller 8 Player Mod.",
      "It replaces the same BoomerangFoo.dll as the original Chaos Mod. Do not run it with Remix, Slaughter House, or 8 Player Mod.",
    ),
    links: [
      {
        label: same("GitHub"),
        href: "https://github.com/huseinnabil1997/BoomerangFoo-ChaosMod",
      },
      {
        label: same("Download 0.5.6"),
        href: "https://github.com/huseinnabil1997/BoomerangFoo-ChaosMod/releases/download/v0.5.6/BoomerangFoo-0.5.6.zip",
      },
    ],
    downloads: c(
      "6 downloads af 0.5.6-zippen på GitHub",
      "6 downloads of the 0.5.6 zip on GitHub",
    ),
    rank: 2,
  },
  {
    id: "eight",
    name: same("8 Player Mod"),
    authors: same("Shyngyskhan-333"),
    version: same("3.0.0 beta"),
    released: "2026-10-16",
    releasedLabel: c("16. oktober 2026", "16 October 2026"),
    updated: "2026-10-16",
    updatedLabel: c("16. oktober 2026", "16 October 2026"),
    status: "beta",
    categories: ["spillere"],
    summary: c(
      "En selvstændig BepInEx-plugin, der hæver den lokale grænse fra seks til otte spillere. Den rører ikke powerups eller spiltilstande, kun input, UI og spawn.",
      "A standalone BepInEx plugin that raises the local limit from six to eight players. It does not touch powerups or game modes, only input, UI, and spawn.",
    ),
    features: [
      c(
        "Rewired får otte spillere, før InputManager starter, så spiller 7 og 8 har deres eget input.",
        "Rewired gets eight players before InputManager starts, so players 7 and 8 have their own input.",
      ),
      c(
        "Otte lobby-pladser, otte ikoner, en scoretavle der kan være på 1080p, og et podie til otte.",
        "Eight lobby slots, eight icons, a scoreboard that fits on 1080p, and a podium for eight.",
      ),
      c(
        "Ekstra spawn-punkter på 54 af 57 baner, når der er syv eller otte spillere. Holdkampe deler punkterne i to sider.",
        "Extra spawn points on 54 of 57 maps when there are seven or eight players. Team matches split the points into two sides.",
      ),
      c(
        "Med seks eller færre spillere kører spawn-koden ikke.",
        "With six or fewer players the spawn code does not run.",
      ),
      c(
        "Golden Disc får kortere overlevelsestid ved syv og otte spillere.",
        "Golden Disc gets a shorter survival time at seven and eight players.",
      ),
    ],
    install: [
      c(
        "Installér BepInEx 5.4.23.x x64 i spilmappen og start spillet én gang.",
        "Install BepInEx 5.4.23.x x64 in the game folder and start the game once.",
      ),
      c(
        "Hent BoomerangFu8P-3.0.0.zip. Kør install.ps1, eller læg BepInEx\\plugins\\BoomerangFu8P.dll i spillets plugins-mappe.",
        "Download BoomerangFu8P-3.0.0.zip. Run install.ps1, or put BepInEx\\plugins\\BoomerangFu8P.dll in the game's plugins folder.",
      ),
      c(
        "Slå XInput fra i spillets indstillinger. XInput stopper ved fire Xbox-controllere. Uden den bruger Rewired Raw Input.",
        "Turn XInput off in the game settings. XInput stops at four Xbox controllers. Without it, Rewired uses Raw Input.",
      ),
    ],
    compatibility: c(
      "Kun undersøgt på spilversion 1.3.6 (Unity 2022.3.54f1). 1.3.7, 1.4.0 og den aktuelle 1.4.1 er nyere, så den er sandsynligvis i stykker på den aktuelle Steam-build, indtil den bliver opdateret. Fysiske controllere 7 og 8 er ikke testet. Bot-kampe er.",
      "Only checked on game version 1.3.6 (Unity 2022.3.54f1). 1.3.7, 1.4.0, and the current 1.4.1 are newer, so it is probably broken on the current Steam build until it is updated. Physical controllers 7 and 8 are not tested. Bot matches are.",
    ),
    conflicts: c(
      "Kan ikke køre samtidig med Chaos Mod eller dens forks. De patcher de samme metoder.",
      "It cannot run at the same time as Chaos Mod or its forks. They patch the same methods.",
    ),
    links: [
      {
        label: same("GitHub"),
        href: "https://github.com/Shyngyskhan-333/boomerang-fu-8-player-mod",
      },
      {
        label: same("Download 3.0.0 beta"),
        href: "https://github.com/Shyngyskhan-333/boomerang-fu-8-player-mod/releases/download/v3.0.0/BoomerangFu8P-3.0.0.zip",
      },
    ],
    downloads: c(
      "1 download af beta-zippen på GitHub",
      "1 download of the beta zip on GitHub",
    ),
    rank: 3,
  },
  {
    id: "online-2",
    name: c("Online Multiplayer, andet prototype", "Online Multiplayer, second prototype"),
    authors: c("Noob_Kid på Reddit", "Noob_Kid on Reddit"),
    version: same("Prototype 2"),
    released: "2026-07-09",
    releasedLabel: c("9. juli 2026", "9 July 2026"),
    updated: "2026-07-09",
    updatedLabel: c("9. juli 2026", "9 July 2026"),
    status: "prototype",
    categories: ["online", "spillere"],
    summary: c(
      "En online-prototype til Steam-udgaven. Flere lokale spillere og bots på samme maskine, plus tilfældig matchmaking og et lobby-overlay. Boomerang Fu Online på GitHub er en nyere, færdig pakke fra en anden forfatter.",
      "An online prototype for the Steam version. Several local players and bots on the same machine, plus random matchmaking and a lobby overlay. Boomerang Fu Online on GitHub is a newer, finished pack from another author.",
    ),
    features: [
      c(
        "Online-funktioner åbnes med O på tastatur eller START på controller, inde i en lobby.",
        "Online features open with O on a keyboard or START on a controller, inside a lobby.",
      ),
      c(
        "Flere lokale spillere pr. maskine og bots.",
        "Several local players per machine, and bots.",
      ),
      c(
        "Tilfældig matchmaking og ændringer i lobbyens UI.",
        "Random matchmaking and changes to the lobby UI.",
      ),
      c(
        "Kendt fejl: flere lokale spillere kan spawne oven i hinanden i solo-spiltilstande.",
        "Known issue: several local players can spawn on top of each other in solo game modes.",
      ),
      c(
        "En spiller har rapporteret, at den ikke vil køre under Proton.",
        "One player has reported that it will not run under Proton.",
      ),
    ],
    install: [
      c(
        "Installér BepInEx via linket i Reddit-opslaget, start spillet én gang, og luk det igen.",
        "Install BepInEx from the link in the Reddit post, start the game once, and close it again.",
      ),
      c(
        "Læg mod-filen i BepInEx\\plugins. Selve filen ligger som et link i opslaget, ikke på GitHub.",
        "Put the mod file in BepInEx\\plugins. The file itself is a link in the post, not on GitHub.",
      ),
      c(
        "Start spillet og åbn online-menuen med O eller START.",
        "Start the game and open the online menu with O or START.",
      ),
    ],
    compatibility: c(
      "Skrevet til Steam-versionen i juli 2026, altså efter 1.3.7 og før 1.4.0. Den er en prototype, og 1.4.0 fra 3. november 2026 og 1.4.1 fra 19. november kan have ændret de klasser, den hooker.",
      "Written for the Steam version in July 2026, after 1.3.7 and before 1.4.0. It is a prototype, and 1.4.0 from 3 November 2026 and 1.4.1 from 19 November may have changed the classes it hooks.",
    ),
    conflicts: c(
      "Ikke testet sammen med Chaos Mod eller 8 Player Mod. Læg den ikke i samme plugins-mappe som den første prototype eller som Boomerang Fu Online.",
      "Not tested together with Chaos Mod or 8 Player Mod. Do not put it in the same plugins folder as the first prototype or as Boomerang Fu Online.",
    ),
    links: [
      {
        label: c("Reddit-opslag med download", "Reddit post with download"),
        href: "https://www.reddit.com/r/BoomerangFu/comments/1urnyqs/boomerang_fu_online_multiplayer_mod_second/",
      },
    ],
    rank: 5,
  },
  {
    id: "online-github",
    name: c("Boomerang Fu Online", "Boomerang Fu Online"),
    authors: same("fraustiz"),
    version: same("2.4.1"),
    released: "2026-11-07",
    releasedLabel: c("7. november 2026", "7 November 2026"),
    updated: "2026-11-07",
    updatedLabel: c("7. november 2026", "7 November 2026"),
    status: "udgivet",
    categories: ["online", "spillere"],
    summary: c(
      "En færdig BepInEx-pakke med vært og klient over Steam eller direkte IP. Én spiller pr. computer og højst fire i alt. Zippen har BepInEx med.",
      "A finished BepInEx pack with host and client play over Steam or direct IP. One player per computer and four at most. The zip includes BepInEx.",
    ),
    features: [
      c(
        "Steam som Spacewar som standard, så invitationer virker, også med et lån fra familiebiblioteket. Steam viser Spacewar, og spilletiden tæller ikke på Boomerang Fu. Det kan slås fra i config-filen.",
        "Steam as Spacewar by default, so invites work, including with a family-library loan. Steam shows Spacewar, and playtime does not count on Boomerang Fu. It can be turned off in the config file.",
      ),
      c(
        "Direkte IP på UDP-port 7777. UPnP åbner porten. Hvis boksen nægter, viser menuen, at porten skal åbnes.",
        "Direct IP on UDP port 7777. UPnP opens the port. If the router refuses, the menu says the port has to be opened.",
      ),
      c(
        "Værten styrer bevægelse, slag, død og boomeranger. De andre ser den samme kamp, med ping plus omkring 0,1 sekund.",
        "The host controls movement, hits, deaths, and boomerangs. The others see the same match, with ping plus about 0.1 seconds.",
      ),
      c(
        "Man kan joine midt i en kamp og kommer ind, når runden slutter. Taber man forbindelsen, kan man joine igen og få sin figur tilbage.",
        "You can join during a match and enter when the round ends. If the connection drops, you can join again and get your character back.",
      ),
      c(
        "Ledige pladser kan være bots. Escape to gange forlader sessionen. Spillet pauser ikke, når vinduet mister fokus.",
        "Free slots can be bots. Escape twice leaves the session. The game does not pause when the window loses focus.",
      ),
      c(
        "2.4 synkroniserer bevægelige vægge, gulve og døre, og de andre kan se rikochetter, når nogen griber en boomerang, parader, afvæbninger, dash og skærmrystelser. 2.4.1 lægger hovedmenuens billede bag online-skærmen.",
        "2.4 synchronises moving walls, floors, and doors, and the others can see ricochets, catches, parries, disarms, dashes, and screen shake. 2.4.1 puts the main menu illustration behind the online screen.",
      ),
    ],
    install: [
      c(
        "Hent BoomerangFuOnline-v2.4.1.zip. Den indeholder BepInEx 5.4.22, modden og Spacewar-patcheren.",
        "Download BoomerangFuOnline-v2.4.1.zip. It contains BepInEx 5.4.22, the mod, and the Spacewar patcher.",
      ),
      c(
        "Pak hele indholdet ud ved siden af Boomerang Fu.exe, så winhttp.dll og mappen BepInEx ligger der. Overskriv filerne, hvis en ældre udgave allerede ligger der.",
        "Extract the entire contents next to Boomerang Fu.exe, so winhttp.dll and the BepInEx folder sit there. Overwrite the files if an older copy is already there.",
      ),
      c(
        "Start spillet fra Steam. Online-punktet hedder EN LIGNE og ligger under Jouer i hovedmenuen.",
        "Start the game from Steam. The online item is called EN LIGNE and sits under Jouer on the main menu.",
      ),
      c(
        "Alle skal bruge 2.4. 2.4.1 kan spille med 2.4.0, men ikke med ældre versioner.",
        "Everyone needs 2.4. 2.4.1 can play with 2.4.0, but not with older versions.",
      ),
    ],
    compatibility: c(
      "Udgivet 7. november 2026, fire dage efter spillets 1.4.0. Readme’en nævner ikke en spilversion, så den er ikke bekræftet på 1.4.0 eller på 1.4.1.",
      "Released 7 November 2026, four days after the game's 1.4.0. The readme does not name a game version, so it is not confirmed on 1.4.0 or on 1.4.1.",
    ),
    conflicts: c(
      "Patcheren sætter spillet til Steam-appen Spacewar, AppID 480. Kør den ikke sammen med Reddit-prototyperne. Den lægger ikke BoomerangFoo.dll ind, og den er ikke testet sammen med Chaos-familien.",
      "The patcher presents the game to Steam as Spacewar, AppID 480. Do not run it with the Reddit prototypes. It does not install BoomerangFoo.dll, and it has not been tested with the Chaos family.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/fraustiz/boomerang-fu-online" },
      {
        label: same("Download 2.4.1"),
        href: "https://github.com/fraustiz/boomerang-fu-online/releases/download/v2.4.1/BoomerangFuOnline-v2.4.1.zip",
      },
      {
        label: same("Releases"),
        href: "https://github.com/fraustiz/boomerang-fu-online/releases",
      },
    ],
    downloads: c(
      "8 downloads af 2.4.1-zippen på GitHub",
      "8 downloads of the 2.4.1 zip on GitHub",
    ),
    rank: 4,
  },
  {
    id: "remix",
    name: same("Boomerang Foo Remix"),
    authors: c("alialyami90, fork af Jeffjewett27", "alialyami90, fork of Jeffjewett27"),
    version: c("Kildekode", "Source"),
    released: "2026-11-13",
    releasedLabel: c("13. november 2026", "13 November 2026"),
    updated: "2026-11-13",
    updatedLabel: c("13. november 2026", "13 November 2026"),
    status: "kildekode",
    categories: ["powerups", "indstillinger", "spiltilstand", "spillere"],
    summary: c(
      "Chaos Mod med egne powerup-regler, Russian Roulette og rettelser, så kampe med syv eller flere figurer kan starte og nå afslutningsskærmen. Sidste commit er 13. november 2026. Der er stadig ingen færdig zip.",
      "Chaos Mod with its own powerup rules, Russian Roulette, and fixes so matches with seven or more figures can start and reach the results screen. The latest commit is 13 November 2026. There is still no finished zip.",
    ),
    features: [
      c(
        "Start-powerups er delt i et gitter til mennesker og et til bots.",
        "Starting powerups are split into a grid for humans and one for bots.",
      ),
      c(
        "Hver side kan have sin egen pulje af powerups fra bøger på banen.",
        "Each side can have its own pool of powerups from books on the map.",
      ),
      c(
        "Hver powerup har en spawn-vægt: Off, Rare, Low, Normal, High eller Very High.",
        "Each powerup has a spawn weight: Off, Rare, Low, Normal, High, or Very High.",
      ),
      c(
        "Russian Roulette: hver runde får alle et tilfældigt sæt powerups, som standard tre, og der spawner ingen flere på banen.",
        "Russian Roulette: every round everyone gets a random set of powerups, three by default, and no more spawn on the map.",
      ),
      c(
        "Powerup-display: menneskers aktuelle powerups vises i hvert sit hjørne. Det kan slås fra i modifier-menuen.",
        "Powerup display: each human's current powerups are shown in their own corner. It can be turned off in the modifier menu.",
      ),
      c(
        "Kampstatistik efter hver runde og på vinder-skærmen. Tabellen fader sammen med replayet, når man trykker R2.",
        "Match stats after every round and on the winner screen. The table fades out with the replay when you press R2.",
      ),
      c(
        "Smid den nyeste powerup med Q eller d-pad ned. De øvrige gives igen, og et skjold beholder de hit, det har tilbage.",
        "Discard the newest powerup with Q or d-pad down. The others are given back, and a shield keeps the hits it has left.",
      ),
      c(
        "Syv eller flere figurer: livbarer og præmiekort bliver oprettet forbi de seks, så runden kan starte og afslutningsskærmen ikke låser. Bots flyttes væk fra menneskers spawn.",
        "Seven or more figures: life bars and award cards are created past the first six, so the round can start and the results screen does not lock. Bots are moved away from human spawns.",
      ),
      c(
        "Resten er den Chaos Mod, forken er taget fra, inklusive de ældre spiltilstande og modifier-menuen.",
        "The rest is the Chaos Mod the fork was taken from, including the older game modes and the modifier menu.",
      ),
    ],
    install: [
      c(
        "Der er ingen GitHub-release. Installér .NET SDK 8 eller nyere én gang.",
        "There is no GitHub release. Install the .NET SDK 8 or newer once.",
      ),
      c(
        "Hent Install-BoomerangFoo.bat fra repoet og dobbeltklik på den. Den henter master, finder spillet via Steam, bygger modden og lægger den ind.",
        "Download Install-BoomerangFoo.bat from the repo and double-click it. It fetches master, finds the game through Steam, builds the mod, and installs it.",
      ),
      c(
        "Første kørsel tager nogle minutter. Loggen havner i %TEMP%\\BoomerangFooRemix-install.log, hvis noget fejler.",
        "The first run takes a few minutes. The log lands in %TEMP%\\BoomerangFooRemix-install.log if something fails.",
      ),
    ],
    compatibility: c(
      "Sidste commit på master er 13. november 2026. De første egne ændringer er fra 29.–30. oktober 2026, oven på Chaos Mod efter README-opdateringen 19. december 2025. Samme forbehold som Chaos Mod over for 1.4.0 og 1.4.1, og den er ikke prøvet af som færdig pakke.",
      "The latest commit on master is 13 November 2026. The first original changes are from 29–30 October 2026, on top of Chaos Mod after the README update of 19 December 2025. The same caveat as Chaos Mod applies to 1.4.0 and 1.4.1, and it has not been tried as a finished package.",
    ),
    conflicts: c(
      "Den lægger sin egen BoomerangFoo.dll ind og erstatter derfor Chaos Mod, stack-forken og Slaughter House.",
      "It installs its own BoomerangFoo.dll and therefore replaces Chaos Mod, the stack fork, and Slaughter House.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/alialyami90/BoomerangFooRemix" },
      {
        label: same("Install-BoomerangFoo.bat"),
        href: "https://github.com/alialyami90/BoomerangFooRemix/blob/master/Install-BoomerangFoo.bat",
      },
      {
        label: c("Seneste commit", "Latest commit"),
        href: "https://github.com/alialyami90/BoomerangFooRemix/commit/a62566a6",
      },
    ],
    rank: 7,
  },
  {
    id: "gravity",
    name: same("Boomerang Mods"),
    authors: c(
      "acaburaz, oven på Jeffjewett27 og william-spongberg",
      "acaburaz, on top of Jeffjewett27 and william-spongberg",
    ),
    version: c("Kildekode", "Source"),
    released: "2026-11-13",
    releasedLabel: c("13. november 2026", "13 November 2026"),
    updated: "2026-11-13",
    updatedLabel: c("13. november 2026", "13 November 2026"),
    status: "kildekode",
    categories: ["spiltilstand", "powerups", "spillere"],
    summary: c(
      "En ny pakke fra 13. november 2026 med Chaos-tilstandene, Slaughter House, powerup’en Gravity Well og et loft på otte spillere. Readme’en nævner en zip, men der er ingen release.",
      "A new pack from 13 November 2026 with the Chaos modes, Slaughter House, the Gravity Well powerup, and a cap of eight players. The readme mentions a zip, but there is no release.",
    ),
    features: [
      c(
        "Gravity Well: en eksplosion efterlader et lilla felt, der trækker de andre ind mod midten. Varighed, radius og trækstyrke kan sættes i menuen.",
        "Gravity Well: an explosion leaves a purple field that pulls the others toward the centre. Duration, radius, and pull strength can be set in the menu.",
      ),
      c(
        "Slaughter House fra william-spongbergs fork, med liv og respawn-forsinkelse.",
        "Slaughter House from william-spongberg's fork, with lives and a respawn delay.",
      ),
      c(
        "Power Drain, Juggernaut, Survive 'Till Dawn og Team Golden følger med, sammen med de kendte powerup-modifiers.",
        "Power Drain, Juggernaut, Survive 'Till Dawn, and Team Golden come along, together with the familiar powerup modifiers.",
      ),
      c(
        "Loftet er otte spillere i alt, mennesker og bots tilsammen. Spillets eget loft er seks.",
        "The cap is eight players in total, humans and bots together. The game's own cap is six.",
      ),
      c(
        "F1 åbner spillets debug. F2 giver alle levende spillere alle powerups.",
        "F1 opens the game's debug. F2 gives every living player every powerup.",
      ),
    ],
    install: [
      c(
        "Der er ingen release, selv om readme’en skriver, at man skal hente en zip.",
        "There is no release, even though the readme says to download a zip.",
      ),
      c(
        "Klon repoet. Sæt GamePath i src/BoomerangFoo.csproj til spilmappen.",
        "Clone the repo. Set GamePath in src/BoomerangFoo.csproj to the game folder.",
      ),
      c(
        "Byg med dotnet build -c Debug fra mappen src. Buildet kopierer BoomerangFoo.dll ind i BepInEx\\plugins\\BoomerangFoo.",
        "Build with dotnet build -c Debug from the src folder. The build copies BoomerangFoo.dll into BepInEx\\plugins\\BoomerangFoo.",
      ),
    ],
    compatibility: c(
      "Ét commit, 13. november 2026. I kilden står NoBoomerangs som true fra start, så tjek modifieren Uden boomeranger, hvis kampen begynder uden boomeranger. Samme forbehold over for spilversion 1.4.0 og 1.4.1 som de andre Chaos-forks. Den er ikke prøvet af som færdig pakke.",
      "One commit, 13 November 2026. In the source NoBoomerangs starts as true, so check the No boomerangs modifier if a match begins without boomerangs. The same caveat about game versions 1.4.0 and 1.4.1 as the other Chaos forks. It has not been tried as a finished package.",
    ),
    conflicts: c(
      "Den lægger sin egen BoomerangFoo.dll ind og erstatter Chaos Mod, stack-forken, Remix, Slaughter House og 8 Player Mod.",
      "It installs its own BoomerangFoo.dll and replaces Chaos Mod, the stack fork, Remix, Slaughter House, and 8 Player Mod.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/acaburaz/boomerang-mods" },
    ],
    rank: 8,
  },
  {
    id: "slaughter",
    name: same("Slaughter House"),
    authors: c(
      "william-spongberg, fork af Jeffjewett27",
      "william-spongberg, fork of Jeffjewett27",
    ),
    version: same("0.4.1"),
    released: "2025-03-02",
    releasedLabel: c("2. marts 2025", "2 March 2025"),
    updated: "2025-03-02",
    updatedLabel: c("2. marts 2025", "2 March 2025"),
    status: "foraeldet",
    categories: ["spiltilstand"],
    summary: c(
      "En ældre Chaos-fork, hvis eneste egne tilføjelse er spiltilstanden Slaughter House: holdkamp, hvor man selv sætter antal liv.",
      "An older Chaos fork whose only original addition is the Slaughter House game mode: a team match where you set the number of lives.",
    ),
    features: [
      c(
        "Slaughter House: vælg antal liv. Uendelige liv betyder, at man spiller til kill-grænsen.",
        "Slaughter House: choose the number of lives. Infinite lives means you play until the kill limit.",
      ),
      c(
        "Mindst to liv. Selvmord tæller, og liv nulstilles mellem runder.",
        "At least two lives. Suicide counts, and lives reset between rounds.",
      ),
      c(
        "De ældre Chaos-tilstande fra 0.4.1 følger med: Power Drain, Juggernaut, Survive 'Till Dawn og Team Golden.",
        "The older Chaos modes from 0.4.1 come along: Power Drain, Juggernaut, Survive 'Till Dawn, and Team Golden.",
      ),
      c(
        "Mangler alt, der kom i Chaos Mod efter marts 2025, herunder spilhastighed, tolv bots og 1.3.5-banekortet.",
        "It lacks everything added to Chaos Mod after March 2025, including game speed, twelve bots, and the 1.3.5 map list.",
      ),
    ],
    install: [
      c(
        "Hent BoomerangFoo_v0.4.1.zip og pak den ud ved siden af Boomerang Fu.exe, samme måde som Chaos Mod.",
        "Download BoomerangFoo_v0.4.1.zip and extract it next to Boomerang Fu.exe, the same way as Chaos Mod.",
      ),
      c(
        "Eller læg den vedlagte BoomerangFoo.dll i BepInEx\\plugins\\BoomerangFoo, hvis BepInEx allerede er installeret.",
        "Or put the included BoomerangFoo.dll in BepInEx\\plugins\\BoomerangFoo if BepInEx is already installed.",
      ),
    ],
    compatibility: c(
      "Udgivet 2. marts 2025, før spillets 1.3.5 (28. marts 2025). Den er ældre end både 1.3.7, 1.4.0 og 1.4.1. Spillet har desuden selv fået modifieren Lives Per Map i 1.4.0, som dækker en del af det samme ønske i Free For All.",
      "Released 2 March 2025, before the game's 1.3.5 (28 March 2025). It is older than 1.3.7, 1.4.0, and 1.4.1. The game itself also gained the Lives Per Map modifier in 1.4.0, which covers part of the same wish in Free For All.",
    ),
    conflicts: c(
      "Erstatter BoomerangFoo.dll. Brug den ikke oven i en nyere Chaos-udgivelse.",
      "It replaces BoomerangFoo.dll. Do not use it on top of a newer Chaos release.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/william-spongberg/BoomerangFooMod" },
      {
        label: same("Download 0.4.1"),
        href: "https://github.com/william-spongberg/BoomerangFooMod/releases/download/Release/BoomerangFoo_v0.4.1.zip",
      },
    ],
    downloads: c(
      "56 downloads af 0.4.1-zippen på GitHub",
      "56 downloads of the 0.4.1 zip on GitHub",
    ),
    rank: 11,
  },
  {
    id: "online-1",
    name: same("Online Multiplayer, proof of concept"),
    authors: c("Noob_Kid på Reddit", "Noob_Kid on Reddit"),
    version: c("Første prototype", "First prototype"),
    released: "2026-06-14",
    releasedLabel: c("14. juni 2026", "14 June 2026"),
    updated: "2026-06-14",
    updatedLabel: c("14. juni 2026", "14 June 2026"),
    status: "foraeldet",
    categories: ["online"],
    summary: c(
      "Det første offentlige udkast til online-modden. Spilbart ved omkring 100 ms, men visuelle elementer og rotation kunne gå ud af sync, og klienter hang fast på én bane.",
      "The first public draft of the online mod. Playable at about 100 ms, but visual elements and rotation could fall out of sync, and clients stayed stuck on one map.",
    ),
    features: [
      c(
        "Værts-/klient-spil over nettet på Steam-udgaven.",
        "Host and client play over the network on the Steam version.",
      ),
      c(
        "Testet af forfatteren ved cirka 100 ms latenstid.",
        "Tested by the author at about 100 ms of latency.",
      ),
      c(
        "Visuelle effekter og figurens rotation blev ikke altid synkroniseret.",
        "Visual effects and the character's rotation were not always synchronised.",
      ),
      c(
        "Hvis værten valgte en anden bane, blev klienterne på den første, og kampen desyncede.",
        "If the host picked another map, clients stayed on the first one and the match desynced.",
      ),
    ],
    install: [
      c(
        "Samme BepInEx-trin som det andet prototype: installér BepInEx, start spillet én gang, læg filen i BepInEx\\plugins.",
        "The same BepInEx steps as the second prototype: install BepInEx, start the game once, put the file in BepInEx\\plugins.",
      ),
      c(
        "Download-linket står i Reddit-opslaget. Brug det nyere opslag, medmindre du bevidst vil prøve det første udkast.",
        "The download link is in the Reddit post. Use the newer post unless you deliberately want to try the first draft.",
      ),
    ],
    compatibility: c(
      "Afløst af prototypen fra 9. juli 2026. Samme usikkerhed over for spilversion 1.4.0 og 1.4.1.",
      "Superseded by the prototype from 9 July 2026. The same uncertainty about game versions 1.4.0 and 1.4.1.",
    ),
    conflicts: c(
      "Læg ikke begge online-prototyper eller Boomerang Fu Online i plugins-mappen på én gang.",
      "Do not put both online prototypes, or Boomerang Fu Online, in the plugins folder at once.",
    ),
    links: [
      {
        label: c("Reddit-opslag", "Reddit post"),
        href: "https://www.reddit.com/r/BoomerangFu/comments/1u5emr1/boomerang_fu_proof_of_concept_online_multiplayer/",
      },
      {
        label: c("Nyere prototype", "Newer prototype"),
        href: "https://www.reddit.com/r/BoomerangFu/comments/1urnyqs/boomerang_fu_online_multiplayer_mod_second/",
      },
    ],
    rank: 12,
  },
  {
    id: "hats",
    name: same("Hat Loader"),
    authors: same("exp111"),
    version: same("1.0.0"),
    released: "2022-12-23",
    releasedLabel: c("23. december 2022", "23 December 2022"),
    updated: "2022-12-23",
    updatedLabel: c("23. december 2022", "23 December 2022"),
    status: "foraeldet",
    categories: ["kosmetik"],
    summary: c(
      "Den ældste offentlige Windows-mod. Den loader egne hatte fra asset bundles: en kube, en cowboyhat og en heksehat fulgte med udgivelsen.",
      "The oldest public Windows mod. It loads custom hats from asset bundles: a cube, a cowboy hat, and a witch hat shipped with the release.",
    ),
    features: [
      c(
        "Egne hatte via en meta.xml og et Unity asset bundle i BepInEx\\plugins\\…\\HatLoader.",
        "Custom hats via a meta.xml and a Unity asset bundle in BepInEx\\plugins\\…\\HatLoader.",
      ),
      c(
        "Hver hat kan skjule hår, sidde på hoved eller ansigt og udelukke figurer.",
        "Each hat can hide hair, sit on the head or the face, and exclude characters.",
      ),
      c(
        "Udgivelsen exp111-Hats.zip indeholder Square, Cowboy og Witch. Witch-modellen er krediteret til et Sketchfab-asset.",
        "The exp111-Hats.zip release contains Square, Cowboy, and Witch. The Witch model is credited to a Sketchfab asset.",
      ),
      c(
        "Selve loader-pluginen ligger som kildekode i repoet. Zippen er hattepakken.",
        "The loader plugin itself is source code in the repo. The zip is the hat pack.",
      ),
    ],
    install: [
      c(
        "Byg HatLoader fra kildekoden mod den BepInEx-version, spillet brugte i 2022, og læg dll’en i BepInEx\\plugins.",
        "Build HatLoader from source against the BepInEx version the game used in 2022, and put the dll in BepInEx\\plugins.",
      ),
      c(
        "Læg hattepakken, så der findes en HatLoader-mappe med meta.xml og bundlerne ved siden af.",
        "Install the hat pack so there is a HatLoader folder with meta.xml and the bundles beside it.",
      ),
      c(
        "Forvent at skulle tilpasse projektet. Spillet er ikke længere den Unity 2019-build, readme’en beskriver.",
        "Expect to adapt the project. The game is no longer the Unity 2019 build the readme describes.",
      ),
    ],
    compatibility: c(
      "Skrevet da spillet kørte på Unity 2019.2. 8 Player Mod beskriver 1.3.6 som Unity 2022.3.54f1, og 1.4.1 er endnu nyere. Hatte fra 2022 loader næsten med sikkerhed ikke uden en omskrivning.",
      "Written when the game ran on Unity 2019.2. 8 Player Mod describes 1.3.6 as Unity 2022.3.54f1, and 1.4.1 is newer still. Hats from 2022 almost certainly will not load without a rewrite.",
    ),
    conflicts: c(
      "Et selvstændigt plugin. Det deler ikke dll-navn med Chaos Mod, men en gammel BepInEx fra 2022 kan ikke blandes med de nye pakker.",
      "A standalone plugin. It does not share a dll name with Chaos Mod, but an old BepInEx from 2022 cannot be mixed with the new packs.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/exp111/BoomerangFuStuff" },
      {
        label: c("Hattepakke 1.0.0", "Hat pack 1.0.0"),
        href: "https://github.com/exp111/BoomerangFuStuff/releases/download/1.0.0/exp111-Hats.zip",
      },
    ],
    downloads: c(
      "14 downloads af hattepakken på GitHub",
      "14 downloads of the hat pack on GitHub",
    ),
    rank: 13,
  },
  {
    id: "team-mint",
    name: same("Team Mint"),
    authors: c("Nørdic (Scorch), GitHub Nordic-maker", "Nørdic (Scorch), GitHub Nordic-maker"),
    version: same("1.0.0"),
    released: "2026-11-26",
    releasedLabel: c("26. november 2026", "26 November 2026"),
    updated: "2026-11-26",
    updatedLabel: c("26. november 2026", "26 November 2026"),
    updateNote: c(
      "Zippen blev udgivet 26. november 2026. Samme dags sidste commit retter kun download-linket. Tekstfilen i zippen kalder også pluginnet for intern version 1.3.30.",
      "The zip was published on 26 November 2026. That day's last commit only fixes the download link. The text file in the zip also calls the plugin internal version 1.3.30.",
    ),
    status: "udgivet",
    categories: ["spiltilstand"],
    summary: c(
      "Et BepInEx-plugin, der lægger Team Mint ind som et tredje hold ved siden af Spicey og Chill. Repoet har kun README. Selve modden ligger i zippen.",
      "A BepInEx plugin that adds Team Mint as a third team beside Spicey and Chill. The repo only has a README. The mod itself is in the zip.",
    ),
    features: [
      c(
        "Et holdområde på Pick Teams. Controlleren går ned for at vælge Mint og op for at komme tilbage. Venstre og højre vælger stadig Spicey og Chill.",
        "A team area on Pick Teams. The controller moves down to choose Mint and up to go back. Left and right still choose Spicey and Chill.",
      ),
      c(
        "En kamp kan bruge to af holdene eller alle tre. Den kan starte, når alle klar-spillere og bots har et hold, og mindst to hold er i brug.",
        "A match can use two of the teams or all three. It can start when every ready player and bot has a team, and at least two teams are in use.",
      ),
      c(
        "Y skifter mellem fire bot-tilstande: Bots Join Both Teams, Bots Join Chill, Bots Join Spicey og Bots Join Mint.",
        "Y cycles four bot modes: Bots Join Both Teams, Bots Join Chill, Bots Join Spicey, and Bots Join Mint.",
      ),
      c(
        "Egne farver, et banner og et trekantet point-ikon. Automatisk fordeling tager endnu ikke Mint med i den almindelige blandede tilstand.",
        "Its own colors, a banner, and a triangle score icon. Automatic assignment does not yet include Mint in the ordinary mixed mode.",
      ),
    ],
    install: [
      c(
        "Installér BepInEx, hvis det ikke allerede er i spillets mappe, og start spillet én gang.",
        "Install BepInEx if it is not already in the game folder, and start the game once.",
      ),
      c(
        "Hent Team-Mint-Public-v1.0.zip. I mappen Plugins ligger tre filer: Boomerang Fu ThirdTeam V.1.0 Release.dll, TeamMintBanner.png og MintTriangleFlag.png. Læg alle tre i BepInEx\\plugins.",
        "Download Team-Mint-Public-v1.0.zip. The Plugins folder holds three files: Boomerang Fu ThirdTeam V.1.0 Release.dll, TeamMintBanner.png, and MintTriangleFlag.png. Place all three in BepInEx\\plugins.",
      ),
      c(
        "De to png-filer skal blive liggende ved siden af dll’en. Tekstfilen i zippen kalder dll’en BoomerangFuTeamMint.dll. Det navn er ikke i zippen.",
        "The two png files have to stay beside the dll. The text file in the zip calls the dll BoomerangFuTeamMint.dll. That name is not in the zip.",
      ),
    ],
    compatibility: c(
      "Hverken GitHub-readme’en eller tekstfilen i zippen nævner en spilversion. Zippen blev lagt op 26. november 2026, mens Steam var på 1.4.1, men det er ikke en bekræftet test. Nogle partikler kan stadig være blå eller Chill-farvede, og enkelte figurer er farvet skævt.",
      "Neither the GitHub readme nor the text file in the zip names a game version. The zip went up on 26 November 2026, while Steam was on 1.4.1, but that is not a confirmed test. Some particles can still be blue or Chill-colored, and a few characters are recolored imperfectly.",
    ),
    conflicts: c(
      "Dll’en hedder ikke BoomerangFoo.dll, så den erstatter ikke Chaos-familien. Fjern en ældre Team Mint- eller Third Team-dll. info.json peger på preview.png, men filen i zippen hedder prevew.png.",
      "The dll is not named BoomerangFoo.dll, so it does not replace the Chaos family. Remove an older Team Mint or Third Team dll. info.json points at preview.png, but the file in the zip is named prevew.png.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/Nordic-maker/Boomerang-Fu-Team-Mint" },
      {
        label: c("Hent 1.0.0", "Download 1.0.0"),
        href: "https://github.com/Nordic-maker/Boomerang-Fu-Team-Mint/releases/download/V1.0.0/Team-Mint-Public-v1.0.zip",
      },
    ],
    downloads: c(
      "2 downloads af Team-Mint-Public-v1.0.zip",
      "2 downloads of Team-Mint-Public-v1.0.zip",
    ),
    rank: 6,
  },
  {
    id: "manager",
    name: same("Mod Manager"),
    authors: same("Vulcan5757"),
    version: same("1.0.0"),
    released: "2026-11-25",
    releasedLabel: c("25. november 2026", "25 November 2026"),
    updated: "2026-11-25",
    updatedLabel: c("25. november 2026", "25 November 2026"),
    updateNote: c(
      "info.json siger 1.0.0 og forfatteren Vulcan57. Tagget v1.0.0 har ingen zip. Dll, info.json og preview.png ligger i repoet.",
      "info.json says 1.0.0 and the author Vulcan57. The v1.0.0 tag has no zip. The dll, info.json, and preview.png are in the repo.",
    ),
    status: "udgivet",
    categories: ["vaerktoej"],
    summary: c(
      "Et BepInEx-plugin, der tænder og slukker andre mods inde i spillet, genstarter spillet, så ændringen træder i kraft, og kan vise forhåndsvisning og beskrivelse. Det har controller-styring.",
      "A BepInEx plugin that turns other mods on and off inside the game, restarts the game so the change takes effect, and can show a preview and a description. It has controller support.",
    ),
    features: [
      c(
        "Hver mod skal ligge i sin egen mappe med en info.json. En forhåndsvisning skal hedde det, info.json peger på.",
        "Each mod has to sit in its own folder with an info.json. A preview has to use the name info.json points at.",
      ),
      c(
        "Readme’en nævner en senere online-katalog og opdateringstjek. Det er ikke med i 1.0.0.",
        "The readme mentions a later online catalog and update check. That is not in 1.0.0.",
      ),
    ],
    install: [
      c(
        "Installér BepInEx, hvis det ikke allerede er i spillets mappe, og start spillet én gang.",
        "Install BepInEx if it is not already in the game folder, and start the game once.",
      ),
      c(
        "Tagget v1.0.0 har ingen zip. Hent mappen fra repoet med B-Fu Mod Manager.dll, info.json og preview.png, og læg den i BepInEx\\plugins.",
        "The v1.0.0 tag has no zip. Download the folder from the repo with B-Fu Mod Manager.dll, info.json, and preview.png, and place it in BepInEx\\plugins.",
      ),
    ],
    compatibility: c(
      "Readme’en nævner ingen spilversion. 1.0.0 blev lagt op 25. november 2026, mens Steam var på 1.4.1, men det er ikke en bekræftet test.",
      "The readme names no game version. 1.0.0 went up on 25 November 2026, while Steam was on 1.4.1, but that is not a confirmed test.",
    ),
    conflicts: c(
      "Filen hedder ikke BoomerangFoo.dll, så den erstatter ikke Chaos-familien. Den er lavet til at ligge ved siden af andre plugins og slå dem til og fra.",
      "The file is not named BoomerangFoo.dll, so it does not replace the Chaos family. It is made to sit beside other plugins and turn them on and off.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/Vulcan5757/B-Fu-Mod-Manager" },
      {
        label: c("Tag v1.0.0", "Tag v1.0.0"),
        href: "https://github.com/Vulcan5757/B-Fu-Mod-Manager/releases/tag/v1.0.0",
      },
    ],
    rank: 10,
  },
  {
    id: "speedrun",
    name: c("Speedrun Timer", "Speedrun Timer"),
    authors: same("Vulcan5757"),
    version: same("1.1.0"),
    released: "2026-11-25",
    releasedLabel: c("25. november 2026", "25 November 2026"),
    updated: "2026-11-25",
    updatedLabel: c("25. november 2026", "25 November 2026"),
    updateNote: c(
      "Dll’en lå i repoet 13. november 2026 uden versionsnummer. info.json fra 25. november siger 1.1.0. Tagget v1.1.0 har ingen zip.",
      "The dll was in the repo on 13 November 2026 without a version number. The info.json from 25 November says 1.1.0. The v1.1.0 tag has no zip.",
    ),
    status: "udgivet",
    categories: ["vaerktoej"],
    summary: c(
      "Et lille BepInEx-plugin til speedrunnere. Det starter og stopper automatisk spillets timer ud fra speedrun.com-reglerne og har hurtig reset.",
      "A small BepInEx plugin for speedrunners. It starts and stops an in-game timer automatically according to speedrun.com rules and includes fast reset.",
    ),
    features: [
      c(
        "Timeren starter og stopper automatisk efter reglerne på speedrun.com-siden.",
        "The timer starts and stops automatically according to the rules on the speedrun.com page.",
      ),
      c(
        "Tryk + på controller for at gå tilbage til karaktervalget.",
        "Press + on a controller to reset quickly to character selection.",
      ),
      c(
        "I Any% går reset til en sejerskærm fra den aktuelle session, så man kan trykke REMATCH. Det virker først, når man har gennemført ét helt Any%-run i sessionen.",
        "In Any%, reset goes to a win screen from the current session so you can press REMATCH. That only works after one full Any% run in the session.",
      ),
      c(
        "Timeren kan være få frames forkert; den er ikke et uafhængigt automatiseret speedrun-verifikationsværktøj.",
        "The timer can be a few frames off; it is not an independent automated speedrun verification tool.",
      ),
    ],
    install: [
      c(
        "Installér BepInEx, hvis det ikke allerede er i spillets mappe.",
        "Install BepInEx if it is not already in the game folder.",
      ),
      c(
        "Tagget v1.1.0 har ingen zip. Hent mappen fra repoet med Speedrunning Mod.dll, info.json og preview.png, og læg den i BepInEx\\plugins.",
        "The v1.1.0 tag has no zip. Download the folder from the repo with Speedrunning Mod.dll, info.json, and preview.png, and place it in BepInEx\\plugins.",
      ),
      c(
        "info.json og preview.png er til Mod Manager. Omdøb dll’en til .disabled for at deaktivere den.",
        "info.json and preview.png are for Mod Manager. Rename the dll to .disabled to disable it.",
      ),
    ],
    compatibility: c(
      "info.json 1.1.0 er fra 25. november 2026. Readme’en nævner ingen spilversion, så den er ikke bekræftet på 1.4.1. Timeren læser spillets tilstand, så den kan kræve tilpasning, hvis runder eller skærme ændrer sig.",
      "info.json 1.1.0 is from 25 November 2026. The readme names no game version, so it is not confirmed on 1.4.1. The timer reads the game's state, so it may need adjustment if rounds or screens change.",
    ),
    conflicts: c(
      "Et selvstændigt plugin. Filen hedder ikke BoomerangFoo.dll, så den erstatter ikke Chaos-familien.",
      "A standalone plugin. The file is not named BoomerangFoo.dll, so it does not replace the Chaos family.",
    ),
    links: [
      { label: same("GitHub"), href: "https://github.com/Vulcan5757/B-Fu-Speedrunning-Mod" },
      {
        label: c("Tag v1.1.0", "Tag v1.1.0"),
        href: "https://github.com/Vulcan5757/B-Fu-Speedrunning-Mod/releases/tag/v1.1.0",
      },
      {
        label: c("Speedrun.com", "Speedrun.com"),
        href: "https://www.speedrun.com/boomerang_fu",
      },
    ],
    rank: 9,
  },
  {
    id: "original",
    name: c("Oprindelig Chaos-mod", "Original Chaos mod"),
    authors: c(
      "wq13 på Reddit, Discord-navn ws13sk",
      "wq13 on Reddit, Discord name ws13sk",
    ),
    version: c("Opdateret til 1.3.5", "Updated for 1.3.5"),
    released: "2024-09-16",
    releasedLabel: c("16. september 2024", "16 September 2024"),
    updated: "2025-03-30",
    updatedLabel: c("30. marts 2025", "30 March 2025"),
    updateNote: c(
      "Reddit-opslaget er fra 16. september 2024. Datoen her er kommentaren 30. marts 2025, som omtalte en build til spilversion 1.3.5.",
      "The Reddit post is from 16 September 2024. The date here is the comment of 30 March 2025, which mentioned a build for game version 1.3.5.",
    ),
    status: "discord",
    categories: ["spiltilstand", "indstillinger", "powerups"],
    summary: c(
      "Modden, som Boomerang Foo er en BepInEx-udgave af. Den blev delt i den officielle Discord, ikke som et offentligt repo. En kommentar 30. marts 2025 sagde, at en build til spilversion 1.3.5 lå i videoen eller på Discord.",
      "The mod that Boomerang Foo is a BepInEx edition of. It was shared in the official Discord, not as a public repo. A comment on 30 March 2025 said a build for game version 1.3.5 was in the video or on Discord.",
    ),
    features: [
      c(
        "Banekort, tre nye spiltilstande, kampindstillinger, power-modifiers og kamera-modifiers.",
        "A map list, three new game modes, match settings, power modifiers, and camera modifiers.",
      ),
      c("Kun pc, ifølge opslaget.", "PC only, according to the post."),
      c(
        "Jeff Jewett skrev senere, at hans udgivelse var den første, der lagde indstillingerne ind i spillets egne menuer.",
        "Jeff Jewett later wrote that his release was the first to put the settings into the game's own menus.",
      ),
    ],
    install: [
      c(
        "Der er ikke et offentligt download-link uden for Discord og den video, opslaget henviser til.",
        "There is no public download link outside Discord and the video the post points to.",
      ),
      c(
        "Til almindeligt brug er Chaos Mod 0.5.4 eller stack-forken 0.5.6 den fil, man kan hente.",
        "For ordinary use, Chaos Mod 0.5.4 or the 0.5.6 stack fork is the file you can download.",
      ),
    ],
    compatibility: c(
      "Den omtalte opdatering ramte 1.3.5. Den er ikke vedligeholdt offentligt siden, og 1.4.1 ligger flere versioner senere.",
      "The update that was mentioned targeted 1.3.5. It has not been maintained in public since, and 1.4.1 is several versions later.",
    ),
    conflicts: c(
      "Forløberen til BoomerangFoo. Installér den ikke oven i en BepInEx-udgave af samme mod.",
      "The predecessor of BoomerangFoo. Do not install it on top of a BepInEx edition of the same mod.",
    ),
    links: [
      {
        label: c("Reddit-opslag", "Reddit post"),
        href: "https://www.reddit.com/r/BoomerangFu/comments/1fiffbs/boomerang_fu_mod_your_game/",
      },
      {
        label: c("BepInEx-udgaven", "BepInEx edition"),
        href: "https://github.com/Jeffjewett27/BoomerangFoo",
      },
    ],
    rank: 14,
  },
];

export const omitted = [
  {
    title: c(
      "Steam Workshop, ModDB, Nexus Mods og Thunderstore",
      "Steam Workshop, ModDB, Nexus Mods, and Thunderstore",
    ),
    body: c(
      "Spillet har ikke Steam Workshop. ModDB’s side for Boomerang Fu viser nul mods. Søgninger på Nexus Mods og Thunderstore gav ingen Boomerang Fu-mods.",
      "The game has no Steam Workshop. ModDB's page for Boomerang Fu shows zero mods. Searches on Nexus Mods and Thunderstore found no Boomerang Fu mods.",
    ),
  },
  {
    title: c("Uændret GitHub-mirror", "Unchanged GitHub mirror"),
    body: c(
      "tomkimberlin/BoomerangFoo er en fork uden egne commits. Den er den samme kode som Jeffjewett27 og tæller ikke som en selvstændig mod.",
      "tomkimberlin/BoomerangFoo is a fork with no commits of its own. It is the same code as Jeffjewett27 and does not count as a separate mod.",
    ),
  },
  {
    title: same("ORDER"),
    body: c(
      "Repoet raverhong3300-png/ORDER-BoomerangFu fra 16. november 2026 indeholder kun en kort readme. Releasen v1.0.0 lægger zippen ORDER-2.0.0-.zip op uden kildekode ved siden af, og teksten siger, at installationen kommer senere. Den er ikke taget med, og zippen bør ikke hentes.",
      "The repo raverhong3300-png/ORDER-BoomerangFu from 16 November 2026 contains only a short readme. Release v1.0.0 uploads the zip ORDER-2.0.0-.zip with no source beside it, and the text says the install instructions come later. It is not included, and the zip should not be downloaded.",
    ),
  },
  {
    title: c("Repoet Boomerang Fu Trainer", "The Boomerang Fu Trainer repo"),
    body: c(
      "Et GitHub-repo med det navn er en generisk skabelon. Download-knappen peger på et andet projekt, og teksten lover sigte, våben og liv, som Boomerang Fu ikke har. Det er udeladt, og filen bør ikke hentes.",
      "A GitHub repo with that name is a generic template. The download button points at a different project, and the text promises aim, weapons, and health, which Boomerang Fu does not have. It is left out, and the file should not be downloaded.",
    ),
  },
  {
    title: c("Discord-eksperiment uden fil", "Discord experiment with no file"),
    body: c(
      "Brugeren SirusDoma skrev 17. juni 2026, at de også arbejdede på netværk med Unity NGO og havde lagt klip i den officielle Discord. Der er ingen offentlig release at linke til.",
      "The user SirusDoma wrote on 17 June 2026 that they were also working on networking with Unity NGO and had posted clips in the official Discord. There is no public release to link to.",
    ),
  },
  {
    title: c("Officielt indhold og andre spil", "Official content and other games"),
    body: c(
      "Fresh Flavors, Just Desserts og Street Food er DLC fra Cranky Watermelon, ikke mods. En boomerang-evne på Thunderstore hører til Bopl Battle. boomerang-fu-web og Bumerang-Duell VR er egne spil, ikke mods til Steam-udgaven.",
      "Fresh Flavors, Just Desserts, and Street Food are DLC from Cranky Watermelon, not mods. A boomerang ability on Thunderstore belongs to Bopl Battle. boomerang-fu-web and Bumerang-Duell VR are their own games, not mods for the Steam version.",
    ),
  },
];
