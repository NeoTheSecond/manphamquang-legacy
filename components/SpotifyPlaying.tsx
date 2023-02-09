import useSWR from "swr";
import { BsSpotify } from "react-icons/bs";
import Image from "next/image";

const SPOTIFY_URL = "https://api.spotify.com/v1/me/player/currently-playing";

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  }).then((res) => res.json());

export default function SpotifyPlaying({
  spotify,
}: {
  spotify: { token: string };
}) {
  const { data, error, isLoading } = useSWR(
    [SPOTIFY_URL, spotify.token],
    ([url, token]) => fetcher(url, token)
  );
  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>loading...</div>;

  //   if (!error || !isLoading) {
  return (
    <div className="p-3 border rounded border-cyan-300">
      <BsSpotify /> {data.item.name}
      <Image
        width={64}
        height={64}
        src={data.item.album.images[2].url}
        alt={data.item.name}
      />
    </div>
  );
  //   }
}
