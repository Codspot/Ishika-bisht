// components/MainImage.jsx
import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

export default function MainImage({ src }) {
  console.log("main image",src)
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }, []);

  return (
    <div className="hidden md:block w-1/2 h-[500px] relative z-10">
      <div className="absolute inset-0 rounded-full bg-white/30 blur-3xl transform scale-90"></div>
      <div className="relative h-full flex items-center justify-center">
        <div className="w-[500px] h-[600px] relative" data-tilt>
          <img
            className="rounded-2xl object-cover w-full h-full shadow-2xl transition-all duration-1000"
            src={src}
            alt="Main"
          />
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_15px_5px_rgba(255,192,203,0.5)] animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
}
