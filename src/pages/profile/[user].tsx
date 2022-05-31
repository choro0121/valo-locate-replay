import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

import { GiHumanTarget } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { AiFillThunderbolt } from "react-icons/ai";

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

export async function getServerSideProps() {
  let agents = [];
  let maps = [];

  let json;

  json = await fetch("https://valorant-api.com/v1/agents").then((r) =>
    r.json()
  );
  if (json.status === 200) {
    agents = json.data
      .filter((data) => {
        return data.isPlayableCharacter;
      })
      .map((data) => {
        return { name: data.displayName, icon: data.displayIcon };
      });
  }

  json = await fetch("https://valorant-api.com/v1/maps").then((r) => r.json());
  if (json.status === 200) {
    maps = json.data.map((data) => {
      return { name: data.displayName, icon: data.listViewIcon };
    });
  }

  return {
    props: {
      agents: agents,
      maps: maps,
    },
  };
}

const User: NextPage = ({ agents, maps }: {}) => {
  const [viewAllAgent, setViewAllAgent] = useState(false);
  const [viewAllMap, setViewAllMap] = useState(false);

  const router = useRouter();
  const { user } = router.query;

  let name;
  let tag;

  if (typeof user === "string") {
    const words = user.split("-");
    if (words.length > 1) {
      name = words[0];
      tag = words[1];
    }
  }

  return (
    <>
      <main className="m-2">
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-2">
            <div className="relative w-16 h-16 mr-2 rounded-full shadow">
              <Image
                src={
                  "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/displayicon.png"
                }
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <div className="font-bold text-2xl">
              {name}{" "}
              <span className="px-2 py-1 rounded bg-gray-800">#{tag}</span>
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
                  {agents
                    .slice(0, viewAllAgent ? agents.length : 3)
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
                          <div className="text-gray-300 font-bold text-xs">
                            {agent.name}
                          </div>
                        </div>
                      </>
                    ))}

                  <button
                    className="w-full mt-2 py-2 rounded bg-gray-700 text-center text-xs"
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
                  {maps.slice(0, viewAllMap ? maps.length : 3).map((map) => (
                    <>
                      <div className="flex flex-row items-center justify-start mb-2">
                        <div className="relative w-full h-10 rounded bg-gray-800">
                          <Image
                            src={map.icon}
                            layout="fill"
                            objectFit="cover"
                          />
                          <div className="relative w-full h-full bg-black/70">
                            <div className="relative top-1/2 -translate-y-1/2 ml-2 text-gray-300 font-bold text-xs">
                              {map.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

                  <button
                    className="w-full mt-2 py-2 rounded bg-gray-700 text-center text-xs"
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

              <MatchHistoryRow />
              <MatchHistoryRow />
              <MatchHistoryRow />
              <MatchHistoryRow />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
