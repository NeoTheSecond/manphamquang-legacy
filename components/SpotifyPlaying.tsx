import useSWR from "swr";
import { BsSpotify } from "react-icons/bs";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import client from "../apollo-client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { gql } from "@apollo/client";

const SPOTIFY_URL = "https://api.spotify.com/v1/me/player/currently-playing";

const SPOTIFY_RECENT = "https://api.spotify.com/v1/me/player/recently-played";

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
  if (res.status === 204) {
    const error = new Error("Not playing anything");
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
  const [nonePlaying, setNonePlaying] = useState(false);
  useEffect(() => {
    getToken(setToken);
  }, []);
  const { data, error, isLoading } = useSWR(
    spotifyToken && !nonePlaying ? [SPOTIFY_URL, spotifyToken.token] : null,
    ([url, token]) => fetcher(url, token),
    {
      onError(err, key, config) {
        if (err.status === 401) {
          if (spotifyToken?.refreshToken) {
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/spotify/refresh_spotify_token?` +
                new URLSearchParams({
                  refresh_token: spotifyToken?.refreshToken,
                })
            )
              .then(async (response) => {
                const data = await response.json();
                setToken({ ...spotifyToken, token: data.access_token });
              })
              .catch((err) => console.log(err));
          }
        }
        if (err.status === 204) {
          setNonePlaying(true);
        }
      },
    }
  );

  const {
    data: lastPlayed,
    error: lastPlayedErr,
    isLoading: lastPlayedIsLoading,
  } = useSWR(
    nonePlaying && spotifyToken ? [SPOTIFY_RECENT, spotifyToken.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  if (isLoading) return <div>loading...</div>;

  if ((!error || !isLoading) && data) {
    const recentData = data.item;
    return (
      <Link
        href={recentData.external_urls.spotify}
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
              src={recentData.album.images[2].url}
              alt={recentData.name}
            />
            <div>
              <div className="font-bold"> {recentData.name}</div>
              <div className="font-semibold">{recentData.album.name}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if ((!lastPlayedErr || !lastPlayedIsLoading) && lastPlayed) {
    const recentData = lastPlayed.items[0].track;
    return (
      <Link
        href={recentData.external_urls.spotify}
        rel="noopener"
        target={"_blank"}
      >
        <div className="w-full p-3 border rounded cursor-pointer bg-slate-200 dark:hover:bg-slate-800 dark:bg-slate-900 border-slate-300 md:w-80 dark:border-emerald-300 dark:text-emerald-400">
          <div className="flex items-center space-x-1">
            <BsSpotify className="w-5 h-5" />{" "}
            <p className="text-xl">Last listened to:</p>
          </div>
          <div className="flex space-x-2">
            <Image
              className="flex-none h-fit"
              width={64}
              height={64}
              src={recentData.album.images[2].url}
              alt={recentData.name}
            />
            <div>
              <div className="font-bold"> {recentData.name}</div>
              <div className="font-semibold">{recentData.album.name}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  return null;
}
