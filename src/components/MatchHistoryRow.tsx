import { useRouter } from "next/router";
import Image from "next/image";

import { BsFillStarFill } from "react-icons/bs";
import { Match } from "@/types/types";

enum MATCH_RESULT {
  Win,
  Lose,
  Draw,
}
const MatchHistoryRow = ({ match }: { match: Match }) => {
  const router = useRouter();

  const datetime = new Date(match.time * 1000);
  const kd = Math.round((match.player.kills / match.player.deaths) * 10) / 10;
  const hs =
    Math.round(
      (match.player.headshots /
        (match.player.headshots +
          match.player.bodyshots +
          match.player.legshots)) *
        1000
    ) / 10;
  const ranking = 1;
  const result: MATCH_RESULT = (function () {
    if (match.blue == match.red) {
      return MATCH_RESULT.Draw;
    }
    if (match.player.team === "Blue") {
      if (match.blue > match.red) {
        return MATCH_RESULT.Win;
      }
    } else {
      if (match.blue < match.red) {
        return MATCH_RESULT.Win;
      }
    }
    return MATCH_RESULT.Lose;
  })();

  return (
    <>
      <div
        className={
          "flex flex-row justify-between items-center py-4 border-t hover:bg-gray-700 border-t-gray-900/50 border-l-2 hover:cursor-pointer " +
          (result === MATCH_RESULT.Win
            ? "border-l-red-500"
            : result === MATCH_RESULT.Lose
            ? "border-l-green-300"
            : "border-l-yellow-500")
        }
        onClick={() => {
          router.push(`/match/${match.matchid}`);
        }}
      >
        <div className="flex flex-row items-center mr-4">
          <div className="relative w-16 h-16 mx-4">
            <Image
              src={match.player.agent.icon}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="px-2 py-0.5 rounded-full text-gray-400 bg-gray-700/50 text-xs">
              {datetime.getFullYear()}/{datetime.getMonth() + 1}/
              {datetime.getDay()} {datetime.getHours()}:{datetime.getMinutes()}
            </div>
            <div className="mt-1 text-gray-400 font-bold text-xs">
              {match.map}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-2xl">
            <span
              className={
                "mr-2 " +
                (match.red == match.blue
                  ? "text-yellow-500"
                  : match.red > match.blue
                  ? "text-green-300"
                  : "text-red-500")
              }
            >
              {match.red}
            </span>
            -
            <span
              className={
                "ml-2 " +
                (match.red == match.blue
                  ? "text-yellow-500"
                  : match.red < match.blue
                  ? "text-green-300"
                  : "text-red-500")
              }
            >
              {match.blue}
            </span>
          </div>

          {ranking == 1 ? (
            <div className="flex flex-row items-center justify-center w-14 mt-1 py-0.5 rounded-full border border-yellow-400 text-yellow-400">
              <BsFillStarFill size="11" className="mr-1" />
              <div className="font-bold text-xs">MVP</div>
            </div>
          ) : ranking <= 3 ? (
            <div className="flex flex-row items-center justify-center w-14 mt-1 py-0.5 rounded-full border border-blue-400 text-blue-400">
              <BsFillStarFill size="11" className="mr-1" />
              <div className="font-bold text-xs">{ranking}th</div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center w-14 mt-1 py-0.5 rounded-full border border-gray-700 text-gray-400 bg-gray-700/50">
              <div className="font-bold text-xs">{ranking}th</div>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center">
          <div className="flex flex-col items-end mr-4">
            <div className="text-gray-400 text-xs">K/D/A</div>
            <div className="font-bold text-lg">
              {match.player.kills}/{match.player.deaths}/{match.player.assists}
            </div>
          </div>

          <div className="flex flex-col items-end mr-4">
            <div className="text-gray-400 text-xs">KD</div>
            <div
              className={
                "font-bold text-lg " +
                (kd >= 1 ? "text-green-300" : "text-red-500")
              }
            >
              {kd}
            </div>
          </div>

          <div className="flex flex-col items-end mr-4">
            <div className="text-gray-400 text-xs">HS%</div>
            <div className="font-bold text-lg">{hs}</div>
          </div>

          <div className="flex flex-col items-end mr-4">
            <div className="text-gray-400 text-xs">ADR</div>
            <div className="font-bold text-lg">{match.player.adr}</div>
          </div>

          <div className="flex flex-col items-end mr-4">
            <div className="text-gray-400 text-xs">ACS</div>
            <div className="font-bold text-lg">{match.player.acs}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchHistoryRow;
