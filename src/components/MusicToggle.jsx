import { useEffect, useState } from "react";
import { Howl } from "howler";
import { useMediaQuery } from "react-responsive";

import sapphire from "../assets/music/Sapphire.mp3";
import cheri from "../assets/music/Cheri-Cheri-Lady.mp3";
import masoom from "../assets/music/Masoom.mp3";

const trackList = [
  { name: "Masoom", src: masoom },
  { name: "Sapphire", src: sapphire },
  { name: "Cheri Cheri Lady", src: cheri },
];

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const currentTrack = trackList[currentTrackIndex];

  useEffect(() => {
    const newSound = new Howl({
      src: [currentTrack.src],
      volume: 0.5,
      onend: () => {
        const nextIndex = (currentTrackIndex + 1) % trackList.length;
        setCurrentTrackIndex(nextIndex);
      },
    });

    setSound(newSound);
    if (isPlaying) newSound.play();

    return () => newSound.unload();
  }, [currentTrackIndex]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (sound && isPlaying) {
          setWasPlayingBeforeHide(true);
          sound.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeHide && sound) {
          sound.play();
          setIsPlaying(true);
          setWasPlayingBeforeHide(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [sound, isPlaying, wasPlayingBeforeHide]);

  const toggleMusic = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      sound && sound.play();
    } else {
      setIsPlaying(false);
      sound && sound.pause();
    }
  };

  return (
    <div
  className={`z-30 absolute ${
    isTabletOrMobile
      ? "top-[20%] left-1/2 -translate-x-1/2"  // below countdown visually
      : "top-6 right-6"
  }`}
>


      <button
        onClick={toggleMusic}
        className="flex items-center gap-2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-pink-800 rounded-full px-4 py-2 shadow-md transition-all max-w-[200px] overflow-hidden"
      >
        <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-music"}`}></i>
        <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-medium animate-marquee">
          {currentTrack.name}
        </span>
      </button>
    </div>
  );
}
