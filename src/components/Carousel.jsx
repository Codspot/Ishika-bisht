import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { useMediaQuery } from "react-responsive";
import { cards } from "../data/card";


export default function Carousel({ setMainImage, setQuote }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const cardWidthValue = isBigScreen ? 240 : isDesktopOrLaptop ? 220 : 100;
  const cardWidth = `${cardWidthValue}px`;
  const cardTotalWidth = cardWidthValue + 16; // gap-4 = 1rem = 16px
  const cardHeight = isBigScreen ? "300px" : isDesktopOrLaptop ? "260px" : "150px";
  const carouselWidth = isBigScreen ? "1000px" : isDesktopOrLaptop ? "900px" : "";

  // Duplicate cards for seamless infinite scroll
  const displayCards = [cards[cards.length - 1], ...cards, cards[0]];
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
    setMainImage(cards[0].src);
    setQuote(cards[0].quote);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      goTo(currentIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  });

  // Handle seamless loop
  useEffect(() => {
    if (currentIndex === cards.length) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(0);
      }, 300);
    } else if (currentIndex === -1) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(cards.length - 1);
      }, 300);
    } else {
      setTransition(true);
    }
    setMainImage(cards[(currentIndex + cards.length) % cards.length].src);
    setQuote(cards[(currentIndex + cards.length) % cards.length].quote);
  }, [currentIndex]);

  const goTo = (idx) => {
    setTransition(true);
    setCurrentIndex(idx);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === cards.length) {
      setTransition(false);
      setCurrentIndex(0);
    } else if (currentIndex === -1) {
      setTransition(false);
      setCurrentIndex(cards.length - 1);
    }
  };

  return (
    <>
      <div
        className={
          `${isMobile ? "fixed bottom-0 left-0 w-full bg-white/10 backdrop-blur-md z-30" : "absolute bottom-8 left-0 md:left-16 w-full md:w-auto max-w-[96%] md:max-w-6xl px-4 md:px-0 z-20"}`
        }
        style={isMobile ? { boxShadow: "0 -2px 16px 0 rgba(255,192,203,0.2)" } : {}}
      >
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-4 py-4 scrollbar-hide"
            style={{
              width: carouselWidth,
              transform: `translateX(-${(currentIndex + 1) * cardTotalWidth}px)` ,
              transition: transition ? "transform 0.3s cubic-bezier(0.4,0,0.2,1)" : "none"
            }}
            onTransitionEnd={handleTransitionEnd}
            id="carousel-container"
          >
            {displayCards.map((card, index) => (
              <div
                key={index}
                className="memory-card flex-shrink-0 relative cursor-pointer bg-white/30 backdrop-blur-md rounded-xl transition-all duration-300"
                onClick={() => goTo(index - 1)}
                data-tilt
                style={{ width: cardWidth, height: cardHeight, borderRadius: '1rem' }}
              >
                <img
                  src={card.src}
                  alt={card.caption}
                  className="w-full h-full object-cover rounded-xl transition-all duration-300"
                  style={{ borderRadius: '1rem' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent text-white font-montserrat rounded-b-xl">
                  {card.caption}
                </div>
                <div
                  className={`absolute inset-0 border-2 border-pink-400 rounded-xl transition-opacity duration-300 ${
                    (index - 1 + cards.length) % cards.length === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 opacity-30 transition-all duration-1000 z-0">
        <img
          className="w-full h-full object-cover"
          src={cards[(currentIndex + cards.length) % cards.length].src}
          alt="Background"
        />
        <div className="absolute inset-0 bg-pink-500/40"></div>
      </div>
    </>
  );
}
