import { useEffect, useState } from "react";
import { Howl } from "howler";
import { useMediaQuery } from "react-responsive";
import discImage from "../assets/music-images/disc.png";
import { trackList, birthdayTrackList, isBirthdayToday } from "../data/music";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
  const [useBirthday, setUseBirthday] = useState(isBirthdayToday());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => Math.floor(Math.random() * (useBirthday ? birthdayTrackList.length : trackList.length)));
  const [sound, setSound] = useState(null);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const tracks = useBirthday ? birthdayTrackList : trackList;
  const currentTrack = tracks[currentTrackIndex];

  const playTrack = (index, shouldPlay = isPlaying) => {
    if (sound) sound.unload();

    const newSound = new Howl({
      src: [tracks[index].src],
      volume: 0.5,
      onend: () => {
        playNext(true);
      },
    });

    setSound(newSound);
    setCurrentTrackIndex(index);
    if (shouldPlay) newSound.play();
  };

  const playNext = (auto = false) => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex, auto || isPlaying);
  };

  const playPrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex, isPlaying);
  };

  useEffect(() => {
    playTrack(currentTrackIndex);
    // eslint-disable-next-line
  }, [useBirthday]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && sound && isPlaying) {
        setWasPlayingBeforeHide(true);
        sound.pause();
        setIsPlaying(false);
      } else if (wasPlayingBeforeHide && sound) {
        sound.play();
        setIsPlaying(true);
        setWasPlayingBeforeHide(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [sound, isPlaying, wasPlayingBeforeHide]);

  // Listen for birthday date hit event to auto-switch playlist at midnight
  useEffect(() => {
    const handleBirthdayDateHit = () => {
      setUseBirthday(isBirthdayToday());
      setCurrentTrackIndex(Math.floor(Math.random() * (isBirthdayToday() ? birthdayTrackList.length : trackList.length)));
    };
    window.addEventListener('birthday-date-hit', handleBirthdayDateHit);
    return () => window.removeEventListener('birthday-date-hit', handleBirthdayDateHit);
  }, []);

  const toggleMusic = () => {
    if (!sound) return;
    if (!isPlaying) {
      sound.play();
      setIsPlaying(true);
    } else {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const handleSwitchTrackList = () => {
    setUseBirthday((prev) => {
      const newUseBirthday = !prev;
      setCurrentTrackIndex(Math.floor(Math.random() * (newUseBirthday ? birthdayTrackList.length : trackList.length)));
      return newUseBirthday;
    });
  };

  return (
    <div
      className={`z-30 fixed ${isTabletOrMobile
        ? "left-[20%] bottom-[25%]"
        : "top-6 right-6"
        }`}
    >
      <div className="bg-white/20 backdrop-blur-xl rounded-xl shadow-lg px-3 py-2 w-[220px] flex items-center gap-3 relative">
        {/* 💿 CD Disc */}
        <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-white overflow-hidden ${isPlaying ? "animate-spin-slow" : ""}`}>
          <img
            src={discImage}
            alt="disc"
            className="w-full h-full object-contain"
          />
        </div>
        {/* 🎵 Track info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col leading-tight">
            <span className="text-pink-900 text-[13px] sm:text-sm font-semibold truncate">
              {currentTrack.name}
            </span>
            {/* Subtitle hidden on very small screens */}
            <span className="text-[10px] text-indigo-700 hidden xs:inline-block sm:inline-block">
              • {currentTrack.sub}
            </span>
          </div>
        </div>
        {/* 🎛 Controls */}
        <div className="flex gap-2 items-center">
          <button
            onClick={playPrevious}
            className="text-pink-700 text-xs hover:scale-110 transition"
          >
            <i className="fa-solid fa-backward"></i>
          </button>
          <button
            onClick={toggleMusic}
            className="bg-pink-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-pink-700"
          >
            <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
          <button
            onClick={playNext}
            className="text-pink-700 text-xs hover:scale-110 transition"
          >
            <i className="fa-solid fa-forward"></i>
          </button>
        </div>
        {/* Switch Playlist Button - Circular Icon Button */}
        <button
          onClick={handleSwitchTrackList}
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl shadow-lg border-2 border-white transition hover:bg-pink-200"
          title={useBirthday ? "Switch to Regular Playlist" : "Switch to Birthday Playlist"}
        >
          <i className={`fa-solid ${useBirthday ? "fa-music" : "fa-cake-candles"} text-pink-700 text-xl`}></i>
        </button>
      </div>
    </div>
  );
}
