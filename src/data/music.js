// src/data/trackList.js
import AasaKooda from "../assets/music/Aasa Kooda (PenduJatt.Com.Se).mp3";
import CheriCheriLady from "../assets/music/Cheri-Cheri-Lady.mp3";
import Chuttamalle from "../assets/music/Chuttamalle (PenduJatt.Com.Se).mp3";
import Feelings from "../assets/music/Feelings.mp3";
import Masoom from "../assets/music/Masoom.mp3";
import MereWargi from "../assets/music/Mere Wargi.mp3";
import ShakeItToTheMax from "../assets/music/MOLIY_Silent_Addy_Skillibeng_Shenseea_-_Shake_It_To_The_Max.mp3";
import PalPal from "../assets/music/Pal Pal - Afusic 320 Kbps.mp3";
import Qatal from "../assets/music/Qatal.mp3";
import Sapphire from "../assets/music/Sapphire.mp3";
import Shaky from "../assets/music/Shaky-(SambalpuriStar.In).mp3";
import SheesheWaliChunni from "../assets/music/Sheeshe Wali Chunni Glory 320 Kbps.mp3";
import TereNainonMein from "../assets/music/Tere Nainon Mein (PenduJatt.Com.Se).mp3";
import TikTik from "../assets/music/TIK TIK(KoshalWorld.Com).mp3";
import VekhSohneyaa from "../assets/music/Vekh Sohneyaa (PenduJatt.Com.Se).mp3";

// Birthday tracks
import Birthday1 from "../assets/music/birthday/Pallavi-Happy-Birthday.mp3";
import Birthday2 from "../assets/music/birthday/Happy-birthday-to-you-ji-Birthday-song-Hindi.mp3";
import Birthday3 from "../assets/music/birthday/happy-birthday-254480.mp3";
import Birthday4 from "../assets/music/birthday/Dadaji-Birthday-Song-Hindi-Birthday-Song.mp3";
import Birthday5 from "../assets/music/birthday/Birthday-Hindi-Song.mp3";
import Birthday6 from "../assets/music/birthday/Birthday-Hindi-Song-1.mp3";
import Birthday7 from "../assets/music/birthday/Birthday-Album-Song-Hindi.mp3";
import Birthday8 from "../assets/music/birthday/A-Wish-You-Happy-Happy-Birthday.mp3";

export const trackList = [
  { name: "Aasa Kooda", sub: "PenduJatt", src: AasaKooda },
  { name: "Cheri-Cheri-Lady", sub: "80s Classic", src: CheriCheriLady },
  { name: "Chuttamalle", sub: "PenduJatt", src: Chuttamalle },
  { name: "Feelings", sub: "LoFi", src: Feelings },
  { name: "Masoom", sub: "Emotional", src: Masoom },
  { name: "Mere Wargi", sub: "Romantic", src: MereWargi },
  { name: "Shake It To The Max", sub: "EDM", src: ShakeItToTheMax },
  { name: "Pal Pal", sub: "Afusic 320", src: PalPal },
  { name: "Qatal", sub: "Hard Beats", src: Qatal },
  { name: "Sapphire", sub: "Instrumental", src: Sapphire },
  { name: "Shaky", sub: "Sambalpuri", src: Shaky },
  { name: "Sheeshe Wali Chunni", sub: "320 Kbps", src: SheesheWaliChunni },
  { name: "Tere Nainon Mein", sub: "Romantic", src: TereNainonMein },
  { name: "Tik Tik", sub: "KoshalWorld", src: TikTik },
  { name: "Vekh Sohneyaa", sub: "PenduJatt", src: VekhSohneyaa },
];

export const birthdayTrackList = [
  { name: "Happy Birthday (Pallavi)", sub: "Birthday Special", src: Birthday1 },
  { name: "Happy Birthday to You Ji", sub: "Birthday Special", src: Birthday2 },
  { name: "Happy Birthday (254480)", sub: "Birthday Special", src: Birthday3 },
  { name: "Dadaji Birthday Song", sub: "Birthday Special", src: Birthday4 },
  { name: "Birthday Hindi Song", sub: "Birthday Special", src: Birthday5 },
  { name: "Birthday Hindi Song 1", sub: "Birthday Special", src: Birthday6 },
  { name: "Birthday Album Song", sub: "Birthday Special", src: Birthday7 },
  { name: "A Wish You Happy Happy Birthday", sub: "Birthday Special", src: Birthday8 },
];

// Set your birthday here (month is 0-indexed, e.g., June = 5)
const BIRTHDAY_MONTH = 5; // June
const BIRTHDAY_DATE = 27; // Set to 27 for tomorrow

export function isBirthdayToday() {
  const today = new Date();
  // Only return true if it is the birthday AND the time is after midnight (00:00)
  return (
    today.getMonth() === BIRTHDAY_MONTH &&
    today.getDate() === BIRTHDAY_DATE &&
    today.getHours() >= 0 // after midnight
  );
}
