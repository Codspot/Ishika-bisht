// components/Carousel.jsx
import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";

import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";
import img6 from "../assets/images/6.jpg";
import img7 from "../assets/images/7.jpeg";
import img8 from "../assets/images/8.jpeg";

const cards = [
  {
    caption: "Golden Hour",
    src: img1,
    quote:
      "In a universe full of stars, you shine the brightest. Your beauty radiates from within, illuminating the lives of everyone around you.",
  },
  {
    caption: "You're Magic",
    src: img2,
    quote:
      "Like magic captured in a moment, you bring wonder to every space you enter. Your essence is pure enchantment.",
  },
  {
    caption: "Enchanted Dreams",
    src: img3,
    quote:
      "Dreams are made of moments like these, where your spirit dances with the light and creates something beautiful.",
  },
  {
    caption: "Timeless Beauty",
    src: img4,
    quote:
      "Time stands still when beauty meets grace. You are a masterpiece painted by the universe itself.",
  },
  {
    caption: "Radiant Soul",
    src: img5,
    quote:
      "Your laughter is the melody that makes hearts sing. You are joy personified, a radiant soul that lights up the world.",
  },
  {
    caption: "Playful Light",
    src: img6,
    quote:
      "You light up the world with the kind of laughter and love that makes everything better.",
  },
  {
    caption: "Winter Glow",
    src: img7,
    quote:
      "Like winter sunshine, your presence brings warmth even in the coldest moments.",
  },
  {
    caption: "Festive Radiance",
    src: img8,
    quote:
      "You bring color and joy to every moment — like a celebration that never ends.",
  },
];

export default function Carousel({ setMainImage, setQuote }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });

    // Set initial image & quote
    setMainImage(cards[0].src);
    setQuote(cards[0].quote);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      updateCard(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const updateCard = (index) => {
    setCurrentIndex(index);
    setMainImage(cards[index].src);
    setQuote(cards[index].quote);

    const scrollPos =
      index * 220 - carouselRef.current.offsetWidth / 2 + 110;
    carouselRef.current.scrollTo({
      left: Math.max(0, scrollPos),
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Carousel container */}
      <div className="absolute bottom-8 left-0 md:left-16 w-full md:w-auto max-w-[96%] md:max-w-6xl px-4 md:px-0 z-20">

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-hidden py-4 bg-red"
            id="carousel-container"
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`memory-card flex-shrink-0 w-[200px] h-[250px] relative cursor-pointer ${
                  index === currentIndex ? "active-card" : ""
                }`}
                onClick={() => updateCard(index)}
                data-tilt
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
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background sync with carousel */}
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
