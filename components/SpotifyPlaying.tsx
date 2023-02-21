import useSWR from "swr";
import { BsSpotify } from "react-icons/bs";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import client from "../apollo-client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { gql } from "@apollo/client";

const SPOTIFY_URL = "https://api.spotify.com/v1/me/player/currently-playing";

interface Spotify {
  token: string;
  refreshToken: string;
}

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    const status = res.status;
    throw { detail: error, status };
  }
  return res.json();
};

const getToken = async (callback: Dispatch<SetStateAction<Spotify | null>>) => {
  const { data } = await client.query({
    query: gql`
      query {
        spotify {
          token
          refreshToken
        }
      }
    `,
  });
  callback({
    token: data.spotify.token,
    refreshToken: data.spotify.refreshToken,
  });
};

export default function SpotifyPlaying() {
  const [spotifyToken, setToken] = useState<Spotify | null>(null);
  useEffect(() => {
    getToken(setToken);
  }, []);
  const { data, error, isLoading } = useSWR(
    spotifyToken ? [SPOTIFY_URL, spotifyToken.token] : null,
    ([url, token]) => fetcher(url, token),
    {
      onError(err, key, config) {
        if (err.status === 401) {
          console.log("==> request refreshed token");

          if (spotifyToken?.refreshToken) {
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/spotify/refresh_spotify_token?` +
                new URLSearchParams({
                  refresh_token: spotifyToken?.refreshToken,
                })
            ).then(async (response) => {
              const data = await response.json();
              setToken({ ...spotifyToken, token: data.access_token });
            });
          }
        }
      },
    }
  );
  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>loading...</div>;

  if ((!error || !isLoading) && data) {
    console.log(data);
    return (
      <Link
        href={data.item.external_urls.spotify}
        rel="noopener"
        target={"_blank"}
      >
        <div className="w-full p-3 border rounded cursor-pointer bg-slate-200 dark:hover:bg-slate-800 dark:bg-slate-900 border-slate-300 md:w-80 dark:border-emerald-300 dark:text-emerald-400">
          <div className="flex items-center space-x-1">
            <BsSpotify className="w-5 h-5" />{" "}
            <p className="text-xl">Listening to:</p>
          </div>
          <div className="flex space-x-2">
            <Image
              className="flex-none h-fit"
              width={64}
              height={64}
              src={data.item.album.images[2].url}
              alt={data.item.name}
            />
            <div>
              {/* <Marquee
              gradient={false}
              delay={2}
              pauseOnHover
              style={{
                background: "transparent",
                height: "fit-content",
              }}
            >
              <div className="font-bold"> {data.item.name}</div>
            </Marquee> */}
              <div className="font-bold"> {data.item.name}</div>
              <div className="font-semibold">{data.item.album.name}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  return null;
}
