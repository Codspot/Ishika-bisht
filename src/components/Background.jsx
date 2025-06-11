// components/Background.jsx
export default function Background() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 opacity-80 pointer-events-none">
      <div className="absolute w-20 h-20 rounded-full bg-pink-300/30 blur-xl top-1/4 left-1/5 animate-float"></div>
      <div className="absolute w-32 h-32 rounded-full bg-purple-300/20 blur-xl top-2/3 right-1/4 animate-float-slow"></div>
      <div className="absolute w-16 h-16 rounded-full bg-yellow-200/30 blur-xl top-1/2 left-1/3 animate-pulse-slow"></div>
      <div className="absolute w-24 h-24 rounded-full bg-indigo-300/20 blur-xl bottom-1/4 right-1/3 animate-float"></div>
      <div className="absolute w-6 h-6 text-pink-400 top-10 left-1/4 animate-float-slow">
        <i className="fa-solid fa-heart"></i>
      </div>
      <div className="absolute w-6 h-6 text-pink-300 top-1/3 right-1/5 animate-float">
        <i className="fa-solid fa-heart"></i>
      </div>
      <div className="absolute w-8 h-8 text-purple-300 bottom-1/4 left-1/6 animate-float-slow">
        <i className="fa-solid fa-heart"></i>
      </div>
      <div className="absolute w-full h-40 bg-white/10 blur-3xl bottom-0 left-0 animate-pulse-slow"></div>
      <div className="absolute w-80 h-80 bg-white/5 blur-3xl top-1/4 right-1/4 animate-pulse-slow"></div>
      <div className="absolute w-2 h-2 bg-yellow-100 rounded-full top-1/5 left-1/5 animate-sparkle"></div>
      <div className="absolute w-2 h-2 bg-yellow-100 rounded-full top-1/3 right-1/3 animate-sparkle delay-75"></div>
      <div className="absolute w-2 h-2 bg-yellow-100 rounded-full bottom-1/4 left-1/3 animate-sparkle delay-150"></div>
      <div className="absolute w-2 h-2 bg-yellow-100 rounded-full bottom-1/3 right-1/4 animate-sparkle delay-200"></div>
    </div>
  );
}