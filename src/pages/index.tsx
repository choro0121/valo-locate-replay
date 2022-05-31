import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { BsX } from "react-icons/bs";

type User = {
  name: string;
  tag: string;
};

const Home: NextPage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    tag: "",
  });

  const router = useRouter();

  const onKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      if (user.name !== "" && user.tag !== "") {
        router.push(`/profile/${user.name}-${user.tag}`);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Locate Replay</title>
        <meta name="description" content="Locate Replay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="relative w-screen h-screen">
          <Image
            src="/assets/img/L10_Sillos_Final.jpg"
            layout="fill"
            objectFit="cover"
            className="blur"
          />

          <div className="flex flex-col items-center justify-center relative w-screen h-screen bg-black/70">
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 mr-2">
                <Image
                  src="/assets/img/V_Logomark_Red.png"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="font-[valorant] text-4xl">find user</div>
            </div>

            <div className="flex items-center">
              <input
                className="px-5 py-3 w-[240px] rounded-tl-lg rounded-bl-lg border-r text-gray-600 bg-gray-50 font-bold text-md"
                placeholder="username"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                onKeyDown={onKeyDown}
              />
              <div className="relative">
                <input
                  className="pl-5 pr-10 py-3 w-[120px] rounded-tr-lg rounded-br-lg text-gray-600 bg-gray-50 font-bold text-md"
                  placeholder="#tag"
                  value={user.tag}
                  onChange={(e) => setUser({ ...user, tag: e.target.value })}
                  onKeyDown={onKeyDown}
                />
                <button
                  className={
                    "absolute top-1/2 -translate-y-1/2 right-3 " +
                    (user.name === "" && user.tag === ""
                      ? "text-gray-400"
                      : "text-gray-600")
                  }
                  onClick={() => setUser({ name: "", tag: "" })}
                >
                  <BsX size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
