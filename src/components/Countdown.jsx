import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Your 5 responsive queries
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  useEffect(() => {
    const targetDate = new Date("2025-06-27T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
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

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 text-center w-full max-w-full px-4">
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4 whitespace-nowrap">
        <i className="fa-solid fa-heart text-pink-500 text-xl animate-pulse"></i>
        <h2 className={`font-dancing text-pink-800 ${fontSize}`}>Birthday Countdown</h2>
        <i className="fa-solid fa-heart text-pink-500 text-xl animate-pulse"></i>
      </div>

      {/* Countdown Row */}
      <div className="flex flex-nowrap justify-center gap-3 mt-[] overflow-x-auto scrollbar-hide">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className={`bg-white/30 backdrop-blur-sm rounded-lg text-center ${boxSize}`}
          >
            <div className={`font-playfair font-bold text-purple-900 ${fontSize}`}>
              {String(value).padStart(2, "0")}
            </div>
            <div className={`font-montserrat text-purple-700 ${unitSize}`}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
