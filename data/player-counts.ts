export type PlayerRow = {
  id: string | null;
  name: string;
  detail: string;
  humans: string;
  bots: string;
  cap: string;
  online: string;
  extraHumans: boolean;
  extraBots: boolean;
  extraOnline: boolean;
};

export const playerRows: PlayerRow[] = [
  {
    id: null,
    name: "Spillet selv",
    detail: "uden mod",
    humans: "6",
    bots: "Spillets egne",
    cap: "6",
    online: "Nej",
    extraHumans: false,
    extraBots: false,
    extraOnline: false,
  },
  {
    id: "chaos",
    name: "Chaos Mod",
    detail: "0.5.4",
    humans: "6",
    bots: "Op til 11",
    cap: "12 figurer",
    online: "Nej",
    extraHumans: false,
    extraBots: true,
    extraOnline: false,
  },
  {
    id: "remix",
    name: "Remix",
    detail: "kilde",
    humans: "6",
    bots: "Op til 11",
    cap: "12 figurer",
    online: "Nej",
    extraHumans: false,
    extraBots: true,
    extraOnline: false,
  },
  {
    id: "stack",
    name: "Stack-fork",
    detail: "0.5.6",
    humans: "8 i repoet efter zippen",
    bots: "Resten af pladserne",
    cap: "12",
    online: "Nej",
    extraHumans: true,
    extraBots: true,
    extraOnline: false,
  },
  {
    id: "eight",
    name: "8 Player Mod",
    detail: "3.0.0 beta",
    humans: "8 pladser",
    bots: "Spillets eget loft",
    cap: "8",
    online: "Nej",
    extraHumans: true,
    extraBots: false,
    extraOnline: false,
  },
  {
    id: "online-2",
    name: "Online, prototype 2",
    detail: "9. juli 2026",
    humans: "Flere på samme maskine",
    bots: "Ja, antal ikke oplyst",
    cap: "Ikke oplyst",
    online: "Ja",
    extraHumans: true,
    extraBots: true,
    extraOnline: true,
  },
];
