// components/Countdown.jsx
import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <i className="fa-solid fa-heart text-pink-500 text-2xl animate-pulse"></i>
        <h2 className="font-dancing text-3xl text-pink-800">Birthday Countdown</h2>
        <i className="fa-solid fa-heart text-pink-500 text-2xl animate-pulse"></i>
      </div>
      <div className="flex gap-4 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-center min-w-[60px]">
            <div className="font-playfair text-2xl font-bold text-purple-900">{String(value).padStart(2, "0")}</div>
            <div className="font-montserrat text-sm text-purple-700">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
