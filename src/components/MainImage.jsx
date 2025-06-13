import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import { useMediaQuery } from "react-responsive";

export default function MainImage({ src }) {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }, []);

  // ✅ Responsive sizing logic
  let maxWidth = "clamp(250px, 40vw, 400px)";
  let aspectRatio = "4 / 5";

  if (isBigScreen) {
    maxWidth = "clamp(300px, 30vw, 450px)";
    aspectRatio = "4 / 5";
  }

  if (isPortrait && isTabletOrMobile) {
    maxWidth = "clamp(240px, 50vw, 320px)";
    aspectRatio = "3 / 5";
  }

  return (
    <div className="flex justify-center items-center w-full px-4 relative z-10">
      {/* Blur glow */}
      <div className="absolute inset-0 rounded-full bg-white/30 blur-3xl scale-90"></div>

      <div
        data-tilt
        className="w-full relative"
        style={{
          maxWidth,
          aspectRatio,
        }}
      >
        <img
          src={src}
          alt="Main"
          className="rounded-2xl object-cover w-full h-full shadow-2xl transition-all duration-1000"
        />
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_15px_5px_rgba(255,192,203,0.5)] animate-pulse-slow"></div>
      </div>
    </div>
  );
}
