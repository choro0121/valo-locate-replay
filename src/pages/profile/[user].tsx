import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";

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

// export async function getServerSideProps() {
//   const json = await fetch("https://valorant-api.com/v1/agents").then((r) =>
//     r.json()
//   );
//   console.log(json);

//   return {};
// }

const User: NextPage = () => {
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
            <div className="relative w-20 h-20 mr-5 rounded bg-gray-800">
              <Image
                src={
                  "https://media.valorant-api.com/playercards/33c1f011-4eca-068c-9751-f68c788b2eee/displayicon.png"
                }
                layout="fill"
                objectFit="cover"
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

                <Agent />
              </div>

              <div className="p-5 rounded bg-gray-800">
                <div className="flex flex-row items-center mb-3">
                  <FaMapMarkerAlt className="mr-2" size={32} />
                  <div className="font-[valorant] text-lg translate-y-[2px]">
                    map
                  </div>
                </div>

                <Map />
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
