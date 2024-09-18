import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";
import { playPause, setActiveNaat } from "../redux/features/playerSlice";
import { useGetTrackQuery } from "../redux/services/spotify.Track.Api";
import Loader from "./Loader";
import Error from "./Error";

export default function NaatCard({ naat, i, activeNaat, data, isPlaying }) {

  const dispatch = useDispatch();
  const Naat = naat?.data?.albumOfTrack;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveNaat({ naat, data, i }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    if (activeNaat?.name === Naat?.name) {
      console.log("Working");
    }
  }, [activeNaat, Naat]);

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeNaat?.name === Naat?.name ? "flex bg-black bg-opacity-70" : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeNaat={activeNaat}
            naat={naat}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </div>
        <img src={Naat.coverArt.sources[0].url} alt="" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/naats/${naat?.key}`}>{Naat.name}</Link>
        </p>
      </div>
    </div>
  );
}