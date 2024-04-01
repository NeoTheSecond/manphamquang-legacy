import useSWR from "swr";
import { BsSpotify } from "react-icons/bs";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import client from "../apollo-client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import classNames from "classnames";

const SPOTIFY_URL = "https://api.spotify.com/v1/me/player/currently-playing";

const SPOTIFY_RECENT = "https://api.spotify.com/v1/me/player/recently-played";

interface Spotify {
  token: string;
  refreshToken: string;
}

const fetcher = async (
  url: string,
  token: string,
  successCallback: () => void
) => {
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
  successCallback();
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

const renderIsPlaying = (
  isPlayingData: SpotifyApi.CurrentlyPlayingResponse
) => {
  const data = isPlayingData.item;
  const album = (data as SpotifyApi.TrackObjectFull)?.album;
  const artists = (data as SpotifyApi.TrackObjectFull)?.artists;
  const mainArtist = artists[0] || null;

  if (!data) return null;
  return (
    <Link href={data.external_urls.spotify} rel="noopener" target={"_blank"}>
      <div className="flex items-center space-x-1">
        <BsSpotify className="w-5 h-5" />{" "}
        <p className="text-xl">Listening to:</p>
      </div>
      <div className="flex space-x-2">
        {album && (
          <Image
            className="flex-none rounded h-fit"
            width={64}
            height={64}
            src={album.images[2].url}
            alt={data.name}
          />
        )}
        <div>
          <div className="font-bold"> {data.name}</div>
          {mainArtist && <div>{mainArtist.name}</div>}
        </div>
      </div>
    </Link>
  );
};

const renderLastPlayed = (
  lastPlayedData: SpotifyApi.UsersRecentlyPlayedTracksResponse
) => {
  const data = lastPlayedData.items[0].track;
  return (
    <Link href={data.external_urls.spotify} rel="noopener" target={"_blank"}>
      <div className="flex items-center space-x-1">
        <BsSpotify className="w-5 h-5" />{" "}
        <p className="text-xl">Last listened to:</p>
      </div>
      <div className="flex space-x-2">
        <Image
          className="flex-none rounded h-fit"
          width={64}
          height={64}
          src={data.album.images[2].url}
          alt={data.name}
        />
        <div>
          <div className="font-bold"> {data.name}</div>
          <div className="">{data.artists[0].name}</div>
        </div>
      </div>
    </Link>
  );
};

export default function SpotifyPlaying() {
  const [showSpotify, setShowSpotify] = useState(false);
  const [spotifyToken, setToken] = useState<Spotify | null>(null);
  const [nonePlaying, setNonePlaying] = useState(false);
  useEffect(() => {
    getToken(setToken);
  }, []);
  const { data, error, isLoading } = useSWR(
    spotifyToken && !nonePlaying ? [SPOTIFY_URL, spotifyToken.token] : null,
    ([url, token]) => fetcher(url, token, () => setShowSpotify(true)),
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
              .catch((err) => {
                console.log(err);
              });
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
    ([url, token]) => fetcher(url, token, () => setShowSpotify(true))
  );

  if (data?.item === null || !showSpotify) return null;

  return (
    <div
      className={classNames(
        "w-full max-w-[300px] h-[118px] p-3 text-base border rounded cursor-pointer   hover:bg-slate-200 dark:hover:bg-slate-800 dark:bg-slate-900 border-slate-300 dark:border-emerald-300 dark:text-emerald-400",
        {
          "animate-pulse": isLoading,
        }
      )}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-[200px] rounded w-200 bg-slate-300 dark:bg-emerald-300 " />
          <div className="flex mt-2 space-x-2">
            <div className="w-[64px] h-[64px] rounded bg-slate-300 dark:bg-emerald-300" />
            <div className="mt-1">
              <div className="rounded h-4 mb-1 w-[150px] bg-slate-300 dark:bg-emerald-300" />
              <div className="rounded h-4 w-[50px] bg-slate-300 dark:bg-emerald-300" />
            </div>
          </div>
        </>
      ) : (!error || !isLoading) && data ? (
        renderIsPlaying(data)
      ) : (!lastPlayedErr || !lastPlayedIsLoading) && lastPlayed ? (
        renderLastPlayed(lastPlayed)
      ) : null}
    </div>
  );
}
