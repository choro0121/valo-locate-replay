import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";

const MatchHistoryRow = ({ matchId }: { matchId: string }) => {
  const router = useRouter();

  let map = "スプリット";
  let gemeStartMillis = 0;
  let character = "フェイド";
  let kills = 19;
  let deaths = 9;
  let assists = 7;
  let kd = Math.round((kills / deaths) * 10) / 10;
  let adr = 184;
  let acs = 288;
  let hs = 22;
  let wins = [13, 5];
  let ranking = 1;

  useEffect(() => {}, [matchId]);

  return (
    <>
      <div
        className="flex flex-row justify-between items-center py-4 border-t hover:bg-gray-700 border-t-gray-900/50 border-l-2 border-l-red-500 hover:cursor-pointer"
        onClick={() => {
          router.push("/match/hogehoge");
        }}
      >
        <div className="flex flex-row items-center mr-4">
          <div className="mr-2">
            エージェント
            <br />
            アイコン
          </div>

          <div className="flex flex-col items-center">
            <div className="px-2 py-0.5 rounded-full text-gray-400 bg-gray-700/50 text-xs">
              02:46 PM
            </div>
            <div className="mt-1 text-gray-400 font-bold text-xs">{map}</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-2xl">
            <span
              className={
                "mr-2 " +
                (wins[0] == wins[1]
                  ? "text-yellow-500"
                  : wins[0] > wins[1]
                  ? "text-green-300"
                  : "text-red-500")
              }
            >
              {wins[0]}
            </span>
            -
            <span
              className={
                "ml-2 " +
                (wins[0] == wins[1]
                  ? "text-yellow-500"
                  : wins[0] < wins[1]
                  ? "text-green-300"
                  : "text-red-500")
              }
            >
              {wins[1]}
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
              {kills}/{deaths}/{assists}
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
            <div className="font-bold text-lg">{adr}</div>
          </div>

          <div className="flex flex-col items-end mr-4">
            <div className="text-gray-400 text-xs">ACS</div>
            <div className="font-bold text-lg">{acs}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchHistoryRow;
