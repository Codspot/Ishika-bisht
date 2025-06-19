// App.jsx
import { useState } from "react";
import Background from "./components/Background";
import Countdown from "./components/Countdown";
import QuoteSection from "./components/QuoteSection";
import MainImage from "./components/MainImage";
import Carousel from "./components/Carousel";
import MusicToggle from "./components/MusicToggle";
import PhotoModal from "./components/PhotoModal";
import SocialLinks from "./components/SocialLinks";


function App() {
  const [quote, setQuote] = useState("");
  const [mainImage, setMainImage] = useState("");

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <Background />
        <Countdown />
        <MusicToggle />
        <SocialLinks />
        <div className="relative h-full w-full flex items-center px-4">
          <QuoteSection quote={quote} />
          <MainImage src={mainImage} />
        </div>
      </div>

      {/* Fixed bottom carousel */}
      <Carousel setMainImage={setMainImage} setQuote={setQuote} />
      <PhotoModal />
    </div>
  );
}


export default App;
