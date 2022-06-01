import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import { GiHumanTarget } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { AiFillThunderbolt } from "react-icons/ai";

import { Asset, User, MMR, Match } from "@/types/types";

import AccuracySvg from "@/components/svg/accuracy.svg";
import MatchHistoryRow from "@/components/MatchHistoryRow";

const Stats = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">K/D</div>
        <div className="font-bold">1.11</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">Win %</div>
        <div className="font-bold">48.2 %</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">HS %</div>
        <div className="font-bold">11.6 %</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">Kills</div>
        <div className="font-bold">1,525</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">Deaths</div>
        <div className="font-bold">1,377</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">Assists</div>
        <div className="font-bold">596</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">ADR</div>
        <div className="font-bold">142.9</div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-300 text-xs">ACS</div>
        <div className="font-bold">223.6</div>
      </div>
    </>
  );
};

const Accuracy = () => {
  useEffect(() => {
    const accuracy_head = document.getElementById("accuracy-head");
    const accuracy_body = document.getElementById("accuracy-body");
    const accuracy_legs = document.getElementById("accuracy-legs");

    if (accuracy_head && accuracy_body && accuracy_legs) {
      accuracy_head.style.fillOpacity = "0.226";
      accuracy_body.style.fillOpacity = "0.894";
      accuracy_legs.style.fillOpacity = "0.180";
    }
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-16 mr-4">
          <AccuracySvg />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="text-gray-300 text-xs">Head</div>
            <div className="font-bold">12.6 %</div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="text-gray-300 text-xs">Body</div>
            <div className="font-bold">79.4 %</div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="text-gray-300 text-xs">Legs</div>
            <div className="font-bold">8 %</div>
          </div>
        </div>
      </div>
    </>
  );
};

const Agent = () => {
  return <></>;
};

const Map = () => {
  return <></>;
};

type Props = {
  user: User;
  mmr: MMR;
  matches: Match[];
  agents: Asset[];
  maps: Asset[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = context.query.user;

  const props: Props = {
    user: {
      name: "",
      tag: "",
      card: "",
      puuid: "",
    },
    mmr: {
      rank: "",
      rp: 0,
    },
    matches: [],
    agents: [],
    maps: [],
  };

  let json;

  if (typeof user === "string") {
    const words = user.split("-");

    if (words.length > 1) {
      props.user.name = words[0];
      props.user.tag = words[1];

      json = await fetch(
        `https://api.henrikdev.xyz/valorant/v1/account/${props.user.name}/${props.user.tag}`
      ).then((r) => r.json());
      if (json.status === 200) {
        props.user.puuid = json.data.puuid;
        props.user.card = json.data.card.small;
      }
    }
  }

  if (props.user.puuid !== "") {
    json = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/ap/${props.user.puuid}`
    ).then((r) => r.json());
    if (json.status === 200) {
      props.mmr.rank = json.data.currenttierpatched;
      props.mmr.rp = json.data.ranking_in_tier;
    }

    json = await fetch(
      `https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/ap/${props.user.puuid}`
    ).then((r) => r.json());
    if (json.status === 200) {
      props.matches = json.data.map(
        (data: {
          metadata: {
            map: string;
            game_start: number;
            rounds_played: number;
            mode: string;
            matchid: string;
          };
          players: {
            all_players: Array<{
              puuid: string;
              team: "Blue" | "Red";
              character: string;
              assets: {
                agent: {
                  small: string;
                };
              };
              stats: {
                score: number;
                kills: number;
                deaths: number;
                assists: number;
                bodyshots: number;
                headshots: number;
                legshots: number;
              };
              damage_made: number;
            }>;
          };
          teams: {
            red: { rounds_won: number };
            blue: { rounds_won: number };
          };
          displayIcon: string;
        }) => {
          const match: Match = {
            time: data.metadata.game_start,
            matchid: data.metadata.matchid,
            map: data.metadata.map,
            mode: data.metadata.mode,

            rounds: data.metadata.rounds_played,
            red: data.teams.red.rounds_won,
            blue: data.teams.blue.rounds_won,

            player: {
              agent: {
                name: "",
                icon: "",
              },
              team: "Blue",
              kills: 0,
              deaths: 0,
              assists: 0,
              bodyshots: 0,
              headshots: 0,
              legshots: 0,
              acs: 0,
              adr: 0,
            },
          };

          for (let i = 0; i < data.players.all_players.length; i++) {
            if (data.players.all_players[i].puuid === props.user.puuid) {
              match.player.agent.name = data.players.all_players[i].character;
              match.player.agent.icon =
                data.players.all_players[i].assets.agent.small;
              match.player.team = data.players.all_players[i].team;
              match.player.kills = data.players.all_players[i].stats.kills;
              match.player.deaths = data.players.all_players[i].stats.deaths;
              match.player.assists = data.players.all_players[i].stats.assists;
              match.player.bodyshots =
                data.players.all_players[i].stats.bodyshots;
              match.player.headshots =
                data.players.all_players[i].stats.headshots;
              match.player.legshots =
                data.players.all_players[i].stats.legshots;
              match.player.acs = Math.round(
                data.players.all_players[i].stats.score / match.rounds
              );
              match.player.adr = Math.round(
                data.players.all_players[i].damage_made / match.rounds
              );

              break;
            }
          }

          return match;
        }
      );
    }

    json = await fetch(
      "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
    ).then((r) => r.json());
    if (json.status === 200) {
      props.agents = json.data.map(
        (data: { displayName: string; displayIcon: string }) => {
          return { name: data.displayName, icon: data.displayIcon };
        }
      );
    }

    json = await fetch("https://valorant-api.com/v1/maps").then((r) =>
      r.json()
    );
    if (json.status === 200) {
      props.maps = json.data.map(
        (data: { displayName: string; listViewIcon: string }) => {
          return { name: data.displayName, icon: data.listViewIcon };
        }
      );
    }
  }

  return {
    props,
  };
};

const UserPage = (props: Props) => {
  const [viewAllAgent, setViewAllAgent] = useState(false);
  const [viewAllMap, setViewAllMap] = useState(false);

  return (
    <>
      <main className="m-2">
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-2">
            <div className="relative w-16 h-16 mr-2 rounded-full shadow">
              <Image
                src={props.user.card}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <div className="font-bold text-2xl">
              {props.user.name}{" "}
              <span className="px-2 py-1 rounded bg-gray-800">
                #{props.user.tag}
              </span>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="mr-2">
              <div className="p-5 rounded bg-gray-800 mb-2">
                <div className="flex flex-row items-center mb-3">
                  <VscGraph className="mr-2" size={32} />
                  <div className="font-[valorant] text-lg translate-y-[2px]">
                    stats
                  </div>
                </div>

                <Stats />
              </div>

              <div className="p-5 rounded bg-gray-800 mb-2">
                <div className="flex flex-row items-center mb-3">
                  <GiHumanTarget className="mr-2" size={32} />
                  <div className="font-[valorant] text-lg translate-y-[2px]">
                    accuracy
                  </div>
                </div>

                <Accuracy />
              </div>

              <div className="p-5 rounded bg-gray-800 mb-2">
                <div className="flex flex-row items-center mb-3">
                  <AiFillThunderbolt className="mr-2" size={32} />
                  <div className="font-[valorant] text-lg translate-y-[2px]">
                    agent
                  </div>
                </div>

                {/* <Agent /> */}
                <div>
                  {props.agents
                    .slice(0, viewAllAgent ? props.agents.length : 3)
                    .map((agent) => (
                      <>
                        <div className="flex flex-row items-center justify-start mb-2">
                          <div className="relative w-8 h-8 mr-3 rounded bg-gray-800">
                            <Image
                              src={agent.icon}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div className="text-gray-300 font-bold text-sm">
                            {agent.name}
                          </div>
                        </div>
                      </>
                    ))}

                  <button
                    className="w-full mt-2 py-2 rounded bg-gray-700 text-center text-sm"
                    onClick={() => setViewAllAgent(!viewAllAgent)}
                  >
                    {viewAllAgent ? "隠す" : "全て表示"}
                  </button>
                </div>
              </div>

              <div className="p-5 rounded bg-gray-800">
                <div className="flex flex-row items-center mb-3">
                  <FaMapMarkerAlt className="mr-2" size={32} />
                  <div className="font-[valorant] text-lg translate-y-[2px]">
                    map
                  </div>
                </div>

                {/* <Map /> */}
                <div>
                  {props.maps
                    .slice(0, viewAllMap ? props.maps.length : 3)
                    .map((map) => (
                      <>
                        <div className="flex flex-row items-center justify-start mb-2">
                          <div className="relative w-full h-10 rounded bg-gray-800">
                            <Image
                              src={map.icon}
                              layout="fill"
                              objectFit="cover"
                            />
                            <div className="relative w-full h-full bg-black/70">
                              <div className="relative top-1/2 -translate-y-1/2 ml-2 text-gray-300 font-bold text-sm">
                                {map.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}

                  <button
                    className="w-full mt-2 py-2 rounded bg-gray-700 text-center text-sm"
                    onClick={() => setViewAllMap(!viewAllMap)}
                  >
                    {viewAllMap ? "隠す" : "全て表示"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 rounded bg-gray-800 w-full">
              <div className="mb-5">
                <select className="mr-2 px-2 py-1 rounded bg-gray-700 font-bold">
                  <option>Unrate</option>
                </select>

                <select className="px-2 py-1 rounded bg-gray-700 font-bold">
                  <option>EP4 Act3</option>
                </select>
              </div>

              {props.matches.map((match, index) => (
                <>
                  <MatchHistoryRow key={index} match={match} />
                </>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserPage;
