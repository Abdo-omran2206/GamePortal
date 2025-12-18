import {
  getTrendingGames,
  getLatestReleases,
  getGamesSorted,
  getBrowserGames,
  getPCGames,
} from "@/app/api/fetcher";
import GameSection from "@/app/components/GameCard";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlay,
  FaFire,
  FaStar,
  FaDesktop,
  FaGlobe,
  FaClock,
} from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import FramerGallery from "./components/Gallery";
import { Footer } from "./components/assets";
import SearchBar from "./components/SearchBar";

export default async function Home() {
  const [trendingGames, latestReleases, topRated, browserGames, pcGames] =
    await Promise.all([
      getTrendingGames(),
      getLatestReleases(),
      getGamesSorted("popularity"),
      getBrowserGames(),
      getPCGames(),
    ]);

  return (
    <>
      <Navbar />
      <header>
        <div className="relative h-screen">
          <video
            src="/grok-video-4b654073-d29e-4640-9fc9-7f73f0461492-0.mp4"
            autoPlay
            muted
            loop
            className="w-screen h-screen object-cover"
          ></video>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center p-8 flex flex-col items-center w-full">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                WELCOME TO{" "}
                <b className="text-purple-800 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  GAMEPORTAL
                </b>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                <b className="text-purple-800 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] ">
                  Your Gateway
                </b>{" "}
                to Every Free Game
              </h2>
              {/* Search Bar */}
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-[#0D0D0D] min-h-screen">
        <AboutSection />
        <FramerGallery games={trendingGames} />
        <div className="py-16 px-6 bg-[#121212]">
          {/* Section Title */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex-1 h-1 bg-[#00C1FF] rounded"></div>

            <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
              Meet Our{" "}
              <span className="text-[#00C1FF]">Curated Collections</span>
            </h2>

            <div className="flex-1 h-1 bg-[#00C1FF] rounded"></div>
          </div>

          {/* Trending Games */}
          <GameSection
            title={
              <span className="flex items-center gap-2">
                <FaFire className="text-[#00C1FF]" /> Trending Games
              </span>
            }
            games={trendingGames}
            viewAllLink="/Gameportal?sort-by=popularity"
          />

          {/* Latest Releases */}
          <GameSection
            title={
              <span className="flex items-center gap-2">
                <FaClock className="text-[#00C1FF]" /> Latest Releases
              </span>
            }
            games={latestReleases}
            viewAllLink="/Gameportal?sort-by=release-date"
          />

          {/* Top Rated Games */}
          <GameSection
            title={
              <span className="flex items-center gap-2">
                <FaStar className="text-[#00C1FF]" /> Top Rated Games
              </span>
            }
            games={topRated}
            viewAllLink="/Gameportal?sort-by=popularity"
          />

          {/* Browser Games */}
          <GameSection
            title={
              <span className="flex items-center gap-2">
                <FaGlobe className="text-[#00C1FF]" /> Browser Games
              </span>
            }
            games={browserGames}
            viewAllLink="/Gameportal?platform=browser"
          />

          {/* PC Games */}
          <GameSection
            title={
              <span className="flex items-center gap-2">
                <FaDesktop className="text-[#00C1FF]" /> PC Games
              </span>
            }
            games={pcGames}
            viewAllLink="/Gameportal?platform=pc"
          />
        </div>

        <section className="relative py-50 w-full bg-[#121212] flex items-center justify-center overflow-hidden px-6">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            src="/grok-video-962480c8-6251-4448-aa3f-93dd65ef7d90-3.mp4"
            autoPlay
            loop
            muted
          />

          {/* Content Overlay */}
          <div className="relative z-10 max-w-3xl flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join the <span className="text-[#00C1FF]">GamePortal</span>{" "}
              Community
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Discover, play, and share free games across multiple platforms.
              Stay updated with trending games and never miss a release.
            </p>
            <Link
              href="/Gameportal"
              className="bg-[#00C1FF] text-black font-semibold px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 hover:bg-[#00a3e0] active:bg-[#008cc0] hover:cursor-pointer hover:translate-y-[-2px] active:translate-y-0 hover:drop-shadow-md transition-all duration-300 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export function AboutSection() {
  const sizes = [
    "w-[400px] h-[500px]", // الأولى كبيرة (Hero)
    "w-[350px] h-[450px]", // الثانية أصغر
    "w-[260px] h-[380px]", // fallback لو زودت صور
  ];

  const images = [
    {
      src: "4fc64e9ef528f65566204fbc6d4c2359.jpg",
      title: "Kratos",
      quote: "Boy… you are not ready",
      color: "#b00000",
    },
    {
      src: "13b34007d510e82d5d65e6b953cb099d.jpg",
      title: "Scorpion",
      quote: "Finish Him!",
      color: "#00C1FF",
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-[#121212]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About <span className="text-[#00C1FF]">GamePortal</span>
          </h1>

          <div className="w-80 h-1 bg-[#00C1FF]"></div>

          <p className="max-w-xl text-[#AFAFAF] text-lg leading-relaxed">
            GamePortal is your ultimate destination for discovering and playing
            free games across multiple platforms. Whether you&apos;re into
            action-packed shooters, immersive RPGs, or casual browser games,
            we’ve got something for everyone. Our curated collections and clean,
            user-friendly interface make it effortless to find your next
            favorite game. Dive in and explore the world of gaming — completely
            free.
          </p>
          <div>
            <Link
              href="/Gameportal"
              className="
              bg-[#00C1FF] 
              text-black 
              font-semibold 
              px-6 py-3 
              rounded-lg 
              shadow-lg 
              flex items-center gap-3 
              hover:bg-[#00a3e0] 
              active:bg-[#008cc0]
              hover:shadow-[0_0_15px_rgb(0,193,255)]
              hover:translate-y-[-2px]
              active:translate-y-0
              transition-all duration-300
              active:scale-95
              cursor-pointer
            "
            >
              <FaPlay className="w-5 h-5" />
              Discover our world
            </Link>
          </div>
        </div>

        {/* Image Scroll */}
        <div className="relative w-full">
          {/* Glow / Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C1FF]/20 to-transparent rounded-lg blur-2xl z-0"></div>

          {/* Horizontal Scroll */}
          <div className="relative flex items-center gap-7 w-full overflow-x-auto scrollbar-hide z-10 pb-6 p-5">
            {images.map((img, index) => {
              const size = sizes[index] || sizes[sizes.length - 1];

              return (
                <div
                  key={img.src}
                  className={`
                    relative
                    ${size}
                    rounded-lg
                    overflow-hidden
                    transition-transform duration-300
                    hover:scale-105
                    active:scale-105
                    ${index === 0 ? "-translate-y-6" : ""}
                  `}
                >
                  {/* Image */}
                  <Image
                    src={`/character/${img.src}`}
                    alt={`${img.title} - Quote`}
                    width={500}
                    height={700}
                    className="object-cover w-full h-full"
                  />

                  {/* Overlay with Quote */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg mb-1 truncate">
                      {img.title}
                    </h3>
                    <p
                      className="text-sm italic font-medium"
                      style={{
                        color: img.color,
                        textShadow: `0 0 10px ${img.color}`,
                      }}
                    >
                      &quot;{img.quote}&quot;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
