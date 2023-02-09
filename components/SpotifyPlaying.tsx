import useSWR from "swr";
import { BsSpotify } from "react-icons/bs";
import Image from "next/image";
import Marquee from "react-fast-marquee";

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
    <div className="w-full p-3 border rounded md:w-80 border-emerald-300 text-emerald-400">
      <div className="flex items-center space-x-1">
        <BsSpotify className="w-5 h-5" />{" "}
        <p className="text-xl">Listening to:</p>
      </div>
      <div className="flex space-x-2">
        <Image
          className="flex-none"
          width={64}
          height={64}
          src={data.item.album.images[2].url}
          alt={data.item.name}
        />
        <div>
          <Marquee
            gradient={false}
            delay={2}
            pauseOnHover
            style={{
              background: "transparent",
              height: "fit-content",
            }}
          >
            <div className="font-bold"> {data.item.name}</div>
          </Marquee>
          <div className="font-semibold">{data.item.album.name}</div>
        </div>
      </div>
    </div>
  );
  //   }
}
