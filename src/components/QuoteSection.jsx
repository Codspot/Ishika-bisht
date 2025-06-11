export default function QuoteSection({ quote }) {
  return (
    <div className="w-full p-6 z-10 flex flex-col items-center justify-start text-center md:items-start md:text-left md:justify-center mt-0 md:mt-0">
      <h1
        className="font-dancing text-4xl sm:text-5xl md:text-7xl text-pink-800 mb-3 animate-fade-in opacity-0"
        style={{ animationDelay: "0.5s" }}
      >
        Happy Birthday
      </h1>

      <p
        className="font-playfair text-2xl sm:text-3xl md:text-4xl mb-4 animate-fade-in opacity-0 text-pink-900"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-pink-700 font-bold italic tracking-wide">Ishika</span>
      </p>

      <div
        className="font-montserrat text-base sm:text-lg md:text-2xl text-indigo-900 leading-relaxed mb-6 max-w-md animate-fade-in opacity-0"
        style={{ animationDelay: "1.5s" }}
      >
        "{quote}"
      </div>

      <p
        className="font-dancing text-lg sm:text-xl md:text-2xl text-pink-700 animate-fade-in opacity-0"
        style={{ animationDelay: "2s" }}
      >
        June 27th
      </p>
    </div>
  );
}
