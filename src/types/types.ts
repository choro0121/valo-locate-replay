export type Link = string;

export type Asset = {
  name: string;
  icon: Link;
};

export type User = {
  name: string;
  tag: string;
  card: Link;
  puuid: string;
};

export type MMR = {
  rank: string;
  rp: number;
};

export type Match = {
  time: number;
  matchid: string;
  map: string;
  mode: string;

  rounds: number;
  red: number;
  blue: number;

  player: {
    agent: Asset;
    team: "Blue" | "Red";
    kills: number;
    deaths: number;
    assists: number;
    bodyshots: number;
    headshots: number;
    legshots: number;
    adr: number;
    acs: number;
  };
};
