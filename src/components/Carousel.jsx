import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { useMediaQuery } from "react-responsive";
import { cards } from "../data/card";


export default function Carousel({ setMainImage, setQuote }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  const cardWidthValue = isBigScreen ? 240 : isDesktopOrLaptop ? 220 : 100;
  const cardWidth = `${cardWidthValue}px`;
  const cardTotalWidth = cardWidthValue + 16; // gap-4 = 1rem = 16px
  const cardHeight = isBigScreen ? "300px" : isDesktopOrLaptop ? "260px" : "150px";
  const carouselWidth = isBigScreen ? "1000px" : isDesktopOrLaptop ? "900px" : "";

  const duplicatedCards = [...cards, ...cards]; // Make it loop-like

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

  useEffect(() => {
    const container = carouselRef.current;
    let scrollLeft = 0;
    const scrollStep = cardTotalWidth;

    const interval = setInterval(() => {
      if (!container) return;

      scrollLeft += scrollStep;

      // Reset when nearing the end of the duplicated list
      if (scrollLeft >= container.scrollWidth / 2) {
        scrollLeft = 0;
        container.scrollTo({ left: scrollLeft }); // Instant reset
      } else {
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }

      const visibleIndex = Math.floor((scrollLeft % (cards.length * cardTotalWidth)) / cardTotalWidth);
      setCurrentIndex(visibleIndex);
      setMainImage(cards[visibleIndex].src);
      setQuote(cards[visibleIndex].quote);
    }, 3000);

    return () => clearInterval(interval);
  }, [cardTotalWidth]);

  const updateCard = (index) => {
    const container = carouselRef.current;
    const scrollTo = index * cardTotalWidth;
    container.scrollTo({ left: scrollTo, behavior: "smooth" });

    setCurrentIndex(index % cards.length);
    setMainImage(cards[index % cards.length].src);
    setQuote(cards[index % cards.length].quote);
  };

  return (
    <>
      <div className="absolute bottom-8 left-0 md:left-16 w-full md:w-auto max-w-[96%] md:max-w-6xl px-4 md:px-0 z-20">
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto py-4 scrollbar-hide"
            style={{ width: carouselWidth }}
            id="carousel-container"
          >
            {duplicatedCards.map((card, index) => (
              <div
                key={index}
                className="memory-card flex-shrink-0 relative cursor-pointer"
                onClick={() => updateCard(index)}
                data-tilt
                style={{ width: cardWidth, height: cardHeight }}
              >
                <img
                  src={card.src}
                  alt={card.caption}
                  className="w-full h-full object-cover rounded-lg transition-all duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent text-white font-montserrat">
                  {card.caption}
                </div>
                <div
                  className={`absolute inset-0 border-2 border-pink-400 rounded-lg transition-opacity duration-300 ${
                    index % cards.length === currentIndex ? "opacity-100" : "opacity-0"
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
          src={cards[currentIndex].src}
          alt="Background"
        />
        <div className="absolute inset-0 bg-pink-500/40"></div>
      </div>
    </>
  );
}
