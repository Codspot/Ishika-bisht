import { useMediaQuery } from "react-responsive";

export default function QuoteSection({ quote }) {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Dynamic styles
  const headingSize = isMobile
    ? "text-4xl"
    : isTablet
    ? "text-5xl"
    : "text-7xl";

  const nameSize = isMobile
    ? "text-2xl"
    : isTablet
    ? "text-3xl"
    : "text-4xl";

  const quoteSize = isMobile
    ? "text-base"
    : isTablet
    ? "text-lg"
    : "text-2xl";

  const dateSize = isMobile
    ? "text-lg"
    : isTablet
    ? "text-xl"
    : "text-2xl";

  const alignment = isMobile ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`w-full p-6 z-10 flex flex-col justify-center mt-0 ${alignment}`}>
      <h1
        className="font-dancing text-4xl sm:text-5xl md:text-7xl text-pink-800 mb-3 animate-fade-in opacity-0"
        style={{ animationDelay: "0.5s" }}
      >
        Happy Birthday
      </h1>

      <p
        className={`font-playfair ${nameSize} mb-4 animate-fade-in opacity-0 text-pink-900`}
        style={{ animationDelay: "1s" }}
      >
        <span className="text-pink-700 font-bold italic tracking-wide">Ishika</span>
      </p>

      <div
        className={`font-montserrat ${quoteSize} text-indigo-900 leading-relaxed mb-6 max-w-md animate-fade-in opacity-0`}
        style={{ animationDelay: "1.5s" }}
      >
        "{quote}"
      </div>
    </div>
  );
}
