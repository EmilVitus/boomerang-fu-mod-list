import type { Locale } from "@/lib/locale-shared";

export type Messages = {
  metaTitle: string;
  metaDescription: string;
  language: string;
  languageGroup: string;
  choiceBrowser: string;
  choiceDanish: string;
  choiceEnglish: string;
  browserDanish: string;
  browserEnglish: string;
  checked: (date: string) => string;
  title: string;
  intro: string;
  statMods: string;
  statZip: string;
  statSource: string;
  statOnline: string;
  searchPlaceholder: string;
  searchLabel: string;
  filterType: string;
  filterStatus: string;
  filterView: string;
  filterSort: string;
  viewTree: string;
  viewList: string;
  viewFeatures: string;
  viewPlayers: string;
  sortRank: string;
  sortNewest: string;
  sortName: string;
  count: (shown: number, total: number, inTree: boolean) => string;
  emptyTitle: string;
  emptyBody: string;
  reset: string;
  readDetails: string;
  sourceLink: string;
  installTitle: string;
  installFolderBefore: string;
  installFolderAfter: string;
  installBepinexBefore: string;
  installBepinexMiddle: string;
  installBepinexAfter: (release: string) => string;
  installOneDll: string;
  installAfterUpdate: string;
  omittedTitle: string;
  footer: (date: string) => string;
  dialogVersion: (authors: string, version: string) => string;
  dialogLineage: string;
  dialogBuiltOn: string;
  dialogRoot: string;
  dialogWhat: string;
  dialogInstall: string;
  dialogGameVersion: string;
  dialogConflicts: string;
  dialogDownloads: (downloads: string, date: string) => string;
  treeDimmed: string;
  chaosTitle: string;
  chaosIntro: string;
  chaosCaption: string;
  featureColumn: string;
  playersTitle: string;
  playersIntro: string;
  playersCaption: string;
  playerHeaders: [string, string, string, string, string];
  chaosFamily: string;
  chaosFamilySummary: string;
  onlineFamily: string;
  onlineFamilySummary: string;
  soloFamily: string;
  soloFamilySummary: string;
};

export const ui: Record<Locale, Messages> = {
  da: {
    metaTitle: "Boomerang Fu-mods til Windows",
    metaDescription:
      "Katalog over offentlige Boomerang Fu-mods til Windows: Chaos Mod, stack-fork, otte spillere, online-prototyper og hatte.",
    language: "Sprog",
    languageGroup: "Vælg sprog",
    choiceBrowser: "Browser",
    choiceDanish: "Dansk",
    choiceEnglish: "Engelsk",
    browserDanish: "Browseren er sat til dansk.",
    browserEnglish: "Browseren er ikke dansk, så siden vises på engelsk.",
    checked: (date) => `Sidst opdateret ${date}`,
    title: "Alle offentlige Boomerang Fu-mods til Windows",
    intro:
      "Ti mods og forks, som kan hentes eller læses uden at være med i en lukket gruppe. Stamtræet viser, hvilken der er bygget oven på hvilken. Spillet fik version 1.4.0 den 3. november 2026. Ingen af dem er bekræftet på den build.",
    statMods: "Mods i listen",
    statZip: "Med en zip",
    statSource: "Kun kilde eller Discord",
    statOnline: "Med online-funktion",
    searchPlaceholder: "Søg efter navn, forfatter eller powerup",
    searchLabel: "Søg i mods",
    filterType: "Type",
    filterStatus: "Status",
    filterView: "Visning",
    filterSort: "Sortering",
    viewTree: "Stamtræ",
    viewList: "Liste",
    viewFeatures: "Funktionstabel",
    viewPlayers: "Ekstra spillere",
    sortRank: "Mest brugbar",
    sortNewest: "Nyeste",
    sortName: "Navn",
    count: (shown, total, inTree) =>
      `${shown} af ${total} ${inTree ? "i træet" : "vist"}`,
    emptyTitle: "Ingen mods matcher",
    emptyBody:
      "Søgningen og filtrene rammer ingen af de ti poster. Ryd dem, og hele listen kommer tilbage.",
    reset: "Nulstil filtre",
    readDetails: "Læs detaljer",
    sourceLink: "Kilde",
    installTitle: "Sådan lægges en mod i",
    installFolderBefore: "Ejer du spillet på Steam, ligger det som regel i",
    installFolderAfter: ", ved siden af",
    installBepinexBefore:
      "Chaos Mod og stack-forken har BepInEx med i zippen. 8 Player Mod og online-prototyperne kræver, at du installerer BepInEx 5 x64 selv og starter spillet én gang, før plugin-filen lægges i",
    installBepinexMiddle: ". Seneste stabile udgave i 5.x-linjen er BepInEx",
    installBepinexAfter: (release) => release + ".",
    installOneDll:
      "Kun én BoomerangFoo.dll kan være aktiv. Chaos Mod, stack-forken, Remix og Slaughter House erstatter hinanden. 8 Player Mod kan heller ikke køre sammen med dem.",
    installAfterUpdate:
      "Efter 1.4.0 skal du regne med, at menuen kan crashe eller at modden slet ikke loader. Fjern dll’en for at komme tilbage til det rene spil.",
    omittedTitle: "Ikke med i listen",
    footer: (date) =>
      `Kilder: GitHub-repos og releases for Jeffjewett27/BoomerangFoo, huseinnabil1997/BoomerangFoo-ChaosMod, Shyngyskhan-333/boomerang-fu-8-player-mod, alialyami90/BoomerangFooRemix, william-spongberg/BoomerangFooMod og exp111/BoomerangFuStuff, plus opslag i r/BoomerangFu. Download-tal er GitHubs tæller på den nævnte fil, læst ${date}. Modsene er uofficielle og har ingen tilknytning til Cranky Watermelon.`,
    dialogVersion: (authors, version) => `${authors}. Version ${version}.`,
    dialogLineage: "Stamtræ",
    dialogBuiltOn: "Bygget oven på",
    dialogRoot: "Udgangspunktet i sin gren.",
    dialogWhat: "Hvad den gør",
    dialogInstall: "Installation på Windows",
    dialogGameVersion: "Spilversion",
    dialogConflicts: "Kan den køre sammen med andre?",
    dialogDownloads: (downloads, date) => `${downloads}, læst ${date}.`,
    treeDimmed:
      "Dæmpede kort matcher ikke filtret. De bliver stående, så man stadig kan se, hvad de er bygget på.",
    chaosTitle: "Chaos-familiens funktioner",
    chaosIntro:
      "Stack og Remix har Chaos Mods funktioner fra 0.5.4 med, fordi de commits ligger i deres historik. Delt betyder, at Remix giver mennesker og bots hver deres sæt. Efter zippen er otte controllere, commit’et 9. september 2026, efter 0.5.6-zippen fra 15. august. Boomerang Mods er kildepakken fra 13. november 2026. Den har Gravity Well, Slaughter House og et loft på otte spillere i alt. Ukendt betyder, at den funktion ikke er nævnt i kilden.",
    chaosCaption:
      "Hvilke funktioner Slaughter House 0.4.1, Chaos Mod 0.5.4, stack-forken 0.5.6, Remix og Boomerang Mods har.",
    featureColumn: "Funktion",
    playersTitle: "Ekstra spillere",
    playersIntro:
      "Spillet har seks lokale mennesker. Farvede celler er det, modden lægger oveni. Chaos Mod og Remix fylder de ekstra pladser med bots. 8 Player Mod lægger to menneskepladser til og lader bot-loftet være. Stack-forken har begge dele i koden: otte controllere blev commit’et 9. september 2026, efter 0.5.6-zippen, som allerede nævner en lobby til 12. Fysiske controllere 7 og 8 er ikke testet i 8 Player Mod. Bot-kampe er.",
    playersCaption:
      "Hvor mange lokale mennesker, bots og netværksspillere hver mod lægger til.",
    playerHeaders: ["Mod", "Mennesker ved skærmen", "Bots", "Samlet loft", "Over nettet"],
    chaosFamily: "Chaos-familien",
    chaosFamilySummary:
      "Discord-modden blev til Jeff Jewetts BepInEx-udgave, og fire projekter er forket derfra. De lægger alle BoomerangFoo.dll ind, så de erstatter hinanden. Kortet for Chaos Mod viser udgivelse 0.5.4. Slaughter House er forket fra 0.4.1, før de senere tilføjelser.",
    onlineFamily: "Online",
    onlineFamilySummary:
      "Samme forfatter lagde først et proof of concept op og byggede derefter den anden prototype oven på det.",
    soloFamily: "Egen kodebase",
    soloFamilySummary:
      "8 Player Mod og Hat Loader har hver deres repo og deler ikke kode med Chaos-familien eller med hinanden.",
  },
  en: {
    metaTitle: "Boomerang Fu mods for Windows",
    metaDescription:
      "A catalog of public Boomerang Fu mods for Windows: Chaos Mod, the stack fork, eight players, online prototypes, and hats.",
    language: "Language",
    languageGroup: "Choose language",
    choiceBrowser: "Browser",
    choiceDanish: "Dansk",
    choiceEnglish: "English",
    browserDanish: "The browser is set to Danish.",
    browserEnglish: "The browser is not Danish, so this page is in English.",
    checked: (date) => `Last updated ${date}`,
    title: "Every public Boomerang Fu mod for Windows",
    intro:
      "Ten mods and forks you can download or read without joining a closed group. The family tree shows which one is built on which. The game reached version 1.4.0 on 3 November 2026. None of them are confirmed on that build.",
    statMods: "Mods in the list",
    statZip: "With a zip",
    statSource: "Source or Discord only",
    statOnline: "With online play",
    searchPlaceholder: "Search by name, author, or powerup",
    searchLabel: "Search mods",
    filterType: "Type",
    filterStatus: "Status",
    filterView: "View",
    filterSort: "Sort",
    viewTree: "Family tree",
    viewList: "List",
    viewFeatures: "Feature table",
    viewPlayers: "Extra players",
    sortRank: "Most useful",
    sortNewest: "Newest",
    sortName: "Name",
    count: (shown, total, inTree) =>
      `${shown} of ${total} ${inTree ? "in the tree" : "shown"}`,
    emptyTitle: "No mods match",
    emptyBody:
      "The search and filters miss all ten entries. Clear them and the full list comes back.",
    reset: "Reset filters",
    readDetails: "Read details",
    sourceLink: "Source",
    installTitle: "How to install a mod",
    installFolderBefore: "If you own the game on Steam, it is usually in",
    installFolderAfter: ", next to",
    installBepinexBefore:
      "Chaos Mod and the stack fork include BepInEx in the zip. 8 Player Mod and the online prototypes need you to install BepInEx 5 x64 yourself and start the game once before the plugin file goes in",
    installBepinexMiddle: ". The latest stable release on the 5.x line is BepInEx",
    installBepinexAfter: (release) => release + ".",
    installOneDll:
      "Only one BoomerangFoo.dll can be active. Chaos Mod, the stack fork, Remix, and Slaughter House replace each other. 8 Player Mod cannot run alongside them either.",
    installAfterUpdate:
      "After 1.4.0, expect the menu to crash or the mod not to load at all. Remove the dll to get back to the unmodified game.",
    omittedTitle: "Left out of the list",
    footer: (date) =>
      `Sources: GitHub repos and releases for Jeffjewett27/BoomerangFoo, huseinnabil1997/BoomerangFoo-ChaosMod, Shyngyskhan-333/boomerang-fu-8-player-mod, alialyami90/BoomerangFooRemix, william-spongberg/BoomerangFooMod, and exp111/BoomerangFuStuff, plus posts on r/BoomerangFu. Download counts are GitHub's counter for the named file, read on ${date}. The mods are unofficial and are not affiliated with Cranky Watermelon.`,
    dialogVersion: (authors, version) => `${authors}. Version ${version}.`,
    dialogLineage: "Family tree",
    dialogBuiltOn: "Built on top of",
    dialogRoot: "The starting point of its branch.",
    dialogWhat: "What it does",
    dialogInstall: "Installing on Windows",
    dialogGameVersion: "Game version",
    dialogConflicts: "Can it run alongside others?",
    dialogDownloads: (downloads, date) => `${downloads}, read on ${date}.`,
    treeDimmed:
      "Dimmed cards do not match the filter. They stay so you can still see what they are built on.",
    chaosTitle: "Chaos family features",
    chaosIntro:
      "Stack and Remix include Chaos Mod's 0.5.4 features, because those commits are in their history. Split means Remix gives humans and bots a set each. After the zip is eight controllers, committed on 9 September 2026, after the 0.5.6 zip from 15 August. Boomerang Mods is the source pack from 13 November 2026. It has Gravity Well, Slaughter House, and a cap of eight players in total. Unknown means the source does not mention that feature.",
    chaosCaption:
      "Which features Slaughter House 0.4.1, Chaos Mod 0.5.4, the 0.5.6 stack fork, Remix, and Boomerang Mods have.",
    featureColumn: "Feature",
    playersTitle: "Extra players",
    playersIntro:
      "The game has six local humans. Coloured cells are what the mod adds. Chaos Mod and Remix fill the extra slots with bots. 8 Player Mod adds two human slots and leaves the bot cap alone. The stack fork has both in the code: eight controllers were committed on 9 September 2026, after the 0.5.6 zip, which already mentions a lobby for 12. Physical controllers 7 and 8 are not tested in 8 Player Mod. Bot matches are.",
    playersCaption: "How many local humans, bots, and online players each mod adds.",
    playerHeaders: ["Mod", "Humans at the screen", "Bots", "Combined cap", "Over the network"],
    chaosFamily: "The Chaos family",
    chaosFamilySummary:
      "The Discord mod became Jeff Jewett's BepInEx edition, and four projects are forked from that. They all install BoomerangFoo.dll, so they replace each other. The Chaos Mod card shows release 0.5.4. Slaughter House is forked from 0.4.1, before the later additions.",
    onlineFamily: "Online",
    onlineFamilySummary:
      "The same author posted a proof of concept first, then built the second prototype on top of it.",
    soloFamily: "Own codebase",
    soloFamilySummary:
      "8 Player Mod and Hat Loader each have their own repo and do not share code with the Chaos family or with each other.",
  },
};
