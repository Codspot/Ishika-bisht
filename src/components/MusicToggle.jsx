import { useEffect, useState } from "react";
import { Howl } from "howler";
import { useMediaQuery } from "react-responsive";

import AasaKooda from "../assets/music/Aasa Kooda (PenduJatt.Com.Se).mp3"; // Aasa Kooda (PenduJatt.Com.Se)
import CheriCheriLady from "../assets/music/Cheri-Cheri-Lady.mp3"; // Cheri-Cheri-Lady
import Chuttamalle from "../assets/music/Chuttamalle (PenduJatt.Com.Se).mp3"; // Chuttamalle (PenduJatt.Com.Se)
import Feelings from "../assets/music/Feelings.mp3"; // Feelings
import MarBaitha from "../assets/music/Mar Baitha - Abhijeet Srivastava 320KBPS .mp3"; // Mar Baitha - Abhijeet Srivastava 320KBPS
import Masoom from "../assets/music/Masoom.mp3"; // Masoom
import MereWargi from "../assets/music/Mere Wargi.mp3"; // Mere Wargi
import ShakeItToTheMax from "../assets/music/MOLIY_Silent_Addy_Skillibeng_Shenseea_-_Shake_It_To_The_Max.mp3"; // MOLIY_Silent_Addy_Skillibeng_Shenseea_-_Shake_It_To_The_Max
import PalPal from "../assets/music/Pal Pal - Afusic 320 Kbps.mp3"; // Pal Pal - Afusic 320 Kbps
import Qatal from "../assets/music/Qatal.mp3"; // Qatal
import Sapphire from "../assets/music/Sapphire.mp3"; // Sapphire
import Shaky from "../assets/music/Shaky-(SambalpuriStar.In).mp3"; // Shaky-(SambalpuriStar.In)
import SheesheWaliChunni from "../assets/music/Sheeshe Wali Chunni Glory 320 Kbps.mp3"; // Sheeshe Wali Chunni Glory 320 Kbps
import TereNainonMein from "../assets/music/Tere Nainon Mein (PenduJatt.Com.Se).mp3"; // Tere Nainon Mein (PenduJatt.Com.Se)
import TikTik from "../assets/music/TIK TIK(KoshalWorld.Com).mp3"; // TIK TIK(KoshalWorld.Com)
import VekhSohneyaa from "../assets/music/Vekh Sohneyaa (PenduJatt.Com.Se).mp3"; // Vekh Sohneyaa (PenduJatt.Com.Se)



const trackList = [
  { name: "Aasa Kooda (PenduJatt.Com.Se)", src: AasaKooda },
  { name: "Cheri-Cheri-Lady", src: CheriCheriLady },
  { name: "Chuttamalle (PenduJatt.Com.Se)", src: Chuttamalle },
  { name: "Feelings", src: Feelings },
  { name: "Mar Baitha - Abhijeet Srivastava 320KBPS", src: MarBaitha },
  { name: "Masoom", src: Masoom },
  { name: "Mere Wargi", src: MereWargi },
  { name: "MOLIY_Silent_Addy_Skillibeng_Shenseea_-_Shake_It_To_The_Max", src: ShakeItToTheMax },
  { name: "Pal Pal - Afusic 320 Kbps", src: PalPal },
  { name: "Qatal", src: Qatal },
  { name: "Sapphire", src: Sapphire },
  { name: "Shaky-(SambalpuriStar.In)", src: Shaky },
  { name: "Sheeshe Wali Chunni Glory 320 Kbps", src: SheesheWaliChunni },
  { name: "Tere Nainon Mein (PenduJatt.Com.Se)", src: TereNainonMein },
  { name: "TIK TIK(KoshalWorld.Com)", src: TikTik },
  { name: "Vekh Sohneyaa (PenduJatt.Com.Se)", src: VekhSohneyaa },
];


export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => Math.floor(Math.random() * trackList.length));
  const [sound, setSound] = useState(null);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const currentTrack = trackList[currentTrackIndex];

  useEffect(() => {
    const newSound = new Howl({
      src: [currentTrack.src],
      volume: 0.5,
      onend: () => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * trackList.length);
        } while (nextIndex === currentTrackIndex && trackList.length > 1);
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
      className={`z-30 absolute ${isTabletOrMobile
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
