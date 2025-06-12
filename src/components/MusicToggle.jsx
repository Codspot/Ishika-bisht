// components/MusicToggle.jsx
import { useEffect, useState } from "react";
import { Howl } from "howler";

import sapphire from "../assets/music/Sapphire.mp3";
import cheri from "../assets/music/Cheri-Cheri-Lady.mp3";
import masoom from "../assets/music/Masoom.mp3";

const tracks = [sapphire, cheri, masoom];

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const newSound = new Howl({
      src: [tracks[currentTrackIndex]],
      volume: 0.5,
      onend: () => {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
      },
    });

    setSound(newSound);
    if (isPlaying) newSound.play();

    return () => {
      newSound.unload();
    };
  }, [currentTrackIndex]);

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
    <div className="absolute top-6 right-6 z-30">
      <button
        onClick={toggleMusic}
        className="bg-white/30 hover:bg-white/50 backdrop-blur-sm text-pink-800 rounded-full p-3 transition-all"
      >
        <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-music"}`}></i>
      </button>
    </div>
  );
}
