import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Your 5 responsive queries
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  // 🎉 Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const [daysToGoText, setDaysToGoText] = useState("");
  const fireworksRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date("2025-06-27T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
        if (days < 10 && days > 0) {
          setDaysToGoText(`${days} day${days === 1 ? '' : 's'} to go!`);
        } else {
          setDaysToGoText("");
        }
        setShowCelebration(false);
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setDaysToGoText("");
        setShowCelebration(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🎯 Font & box size logic based on query
  const fontSize = isBigScreen
    ? "text-4xl"
    : isDesktopOrLaptop
    ? "text-3xl"
    : isTabletOrMobile
    ? "text-2xl"
    : "text-xl";

  const unitSize = isBigScreen
    ? "text-base"
    : isTabletOrMobile
    ? "text-sm"
    : "text-xs";

  const boxSize = isBigScreen
    ? "min-w-[80px] p-4"
    : isDesktopOrLaptop
    ? "min-w-[70px] p-3"
    : "min-w-[60px] p-2";

  // Remove spinner, add animated linear line revolving around each countdown card
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 text-center w-full max-w-full px-4">
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4 whitespace-nowrap">
        <i className="fa-solid fa-heart text-pink-500 text-xl animate-pulse"></i>
        <h2 className={`font-dancing text-pink-800 ${fontSize}`}>Birthday Countdown</h2>
        <i className="fa-solid fa-heart text-pink-500 text-xl animate-pulse"></i>
      </div>
      {/* Days to go text */}
      {daysToGoText && !showCelebration && (
        <div className="mb-2 animate-bounce text-pink-700 font-bold text-2xl font-dancing drop-shadow-lg">
          {daysToGoText}
        </div>
      )}
      {/* Countdown Row with animated spinner border */}
      <div className="flex flex-nowrap justify-center gap-3 mt-[] overflow-x-auto scrollbar-hide">
        {Object.entries(timeLeft).map(([unit, value], idx) => (
          <div
            key={unit}
            className={`bg-white/30 backdrop-blur-sm rounded-lg text-center ${boxSize} relative flex flex-col items-center justify-center overflow-visible`}
          >
            <div className={`font-playfair font-bold text-purple-900 ${fontSize} relative z-10`}>
              {String(value).padStart(2, "0")}
            </div>
            <div className={`font-montserrat text-purple-700 ${unitSize} relative z-10`}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </div>
          </div>
        ))}
      </div>
      {/* Celebration effect */}
      {showCelebration && (
        <div className="mt-6 animate-bounce text-4xl font-dancing text-pink-600 drop-shadow-lg">
          🎉 Happy Birthday! 🎉
        </div>
      )}
    </div>
  );
}

/* Add to your tailwind.config.js (or in index.css for custom keyframes):
@layer utilities {
  @keyframes revolve-line {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-revolve-line {
    animation: revolve-line 2s linear infinite;
    transform-origin: 50% 50%;
  }
}
*/
