// App.jsx
import { useState } from "react";
import Background from "./components/Background";
import Countdown from "./components/Countdown";
import QuoteSection from "./components/QuoteSection";
import MainImage from "./components/MainImage";
import Carousel from "./components/Carousel";
import MusicToggle from "./components/MusicToggle";
import PhotoModal from "./components/PhotoModal";

function App() {
  const [quote, setQuote] = useState("");
  const [mainImage, setMainImage] = useState("");

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />
      
      <Countdown />
      <MusicToggle />
      <div className="relative h-full w-full flex items-center  px-4">
  <QuoteSection quote={quote} />
  <MainImage src={mainImage} />
</div>

      <Carousel setMainImage={setMainImage} setQuote={setQuote} />
      <PhotoModal />
    </div>
  );
}

export default App;
