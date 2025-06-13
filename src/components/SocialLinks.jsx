import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

export default function SocialLinks() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const links = [
    {
      name: "Instagram",
      icon: <FaInstagram className="text-pink-600 text-base" />,
      handle: "@isshiikaaa_",
      href: "https://www.instagram.com/isshiikaaa_",
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-base" />,
      handle: "ishikabishttt",
      href: "https://m.facebook.com/ishikabishttt",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-red-600 text-base" />,
      handle: "@ishika_bisht_1",
      href: "https://www.youtube.com/@ishika_bisht_1",
    },
  ];

  return (
    <div
      className={`z-30 absolute ${
        isTabletOrMobile
          ? "top-[27%] left-1/2 -translate-x-1/2 flex-row bg-transparent"
          : "top-[5.5rem] right-6 flex-col bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg"
      } flex items-center gap-2`}
    >
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-black rounded-full px-4 py-2 shadow-md transition-all ${
            isTabletOrMobile ? "text-xs" : "text-sm hover:scale-105"
          }`}
        >
          {link.icon}
          <span className="whitespace-nowrap font-medium">{link.handle}</span>
        </a>
      ))}
    </div>
  );
}
