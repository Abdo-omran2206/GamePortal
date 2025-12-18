import { getGameById } from "@/app/api/fetcher";
import Image from "next/image";

import {
  FaWindows,
  FaGlobe,
  FaClock,
  FaBuilding,
  FaGamepad,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import BackButton from "@/app/components/BackButton";
import { Footer } from "@/app/components/assets";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ GameID: string }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { GameID } = await params;
  const game = await getGameById(parseInt(GameID));

  if (!game) {
    return {
      title: "Game Not Found",
      description: "The requested game could not be found.",
    };
  }

  return {
    title: `${game.title} | GamePortal`,
    description: game.short_description,
  };
}

export default async function GameDetailsPage({ params }: PageProps) {
  const { GameID } = await params;
  const game = await getGameById(parseInt(GameID));
  if (!game) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <h1 className="text-2xl">Game not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white font-sans selection:bg-[#00C1FF] selection:text-black">
      <Navbar />

      {/* Hero Poster Section */}
      <div className="relative h-[80vh] w-full border-b border-[#00C1FF]/20">
        <div className="absolute inset-0">
          <Image
            src={game.screenshots?.[0]?.image || game.thumbnail}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent opacity-80" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-16 z-20">
          {/* Breadcrumb - Over image */}
          {/* Breadcrumb - Over image */}
          <BackButton />

          <div className="flex flex-col lg:flex-row gap-12 items-end">
            {/* Text Content */}
            <div className="space-y-4 lg:space-y-6 pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#00C1FF] text-black font-extrabold px-3 py-1 rounded text-xs uppercase tracking-wider shadow-[0_0_10px_rgba(0,193,255,0.4)]">
                  {game.status}
                </span>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded text-gray-200 text-sm border border-white/10">
                  {game.platform === "PC (Windows)" ||
                  game.platform === "Windows" ? (
                    <FaWindows className="text-[#00C1FF]" />
                  ) : (
                    <FaGlobe className="text-[#00C1FF]" />
                  )}
                  {game.platform}
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-[0.9]">
                {game.title}
              </h1>

              <div className="flex flex-wrap gap-4 lg:gap-6 text-sm font-medium text-gray-300 items-center">
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-[#00C1FF]" />
                  {game.publisher}
                </div>
                <div className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#00C1FF]" />
                  {game.release_date}
                </div>
              </div>

              <p className="max-w-2xl text-base md:text-lg text-gray-200 leading-relaxed line-clamp-3 drop-shadow-md">
                {game.short_description}
              </p>

              <a
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#00C1FF] text-black font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,193,255,0.4)] hover:shadow-[0_0_50px_rgba(0,193,255,0.6)] active:shadow-[0_0_20px_rgba(0,193,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 mt-4"
              >
                <FaGamepad className="text-2xl" />
                Play Now For Free
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 items-start">
          {/* Left Column: Box Art & Extra Info */}
          <div className="space-y-8 lg:-mt-32 relative z-30">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black border-2 border-white/10 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-500">
              <Image
                src={game.thumbnail}
                alt={game.title}
                width={350}
                height={200}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Quick Info Box */}
            <div className="bg-[#161616] rounded-xl p-6 border border-white/5 space-y-4">
              <h3 className="text-white font-bold text-lg border-b border-white/10 pb-2">
                Game Info
              </h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Genre</span>
                <span className="text-white font-medium text-[#00C1FF]">
                  {game.genre}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Developer</span>
                <span className="text-white font-medium">{game.developer}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Dive */}
          <div className="space-y-12">
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
              <h3 className="text-white text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#00C1FF] rounded-full"></span>
                About {game.title}
              </h3>
              <p>{game.description}</p>
            </div>

            {/* System Requirements */}
            {(game.platform === "Windows" ||
              game.platform === "PC (Windows)") &&
              game.minimum_system_requirements && (
                <div className="bg-[#161616] rounded-2xl p-8 border border-white/5">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <FaWindows className="text-[#00C1FF]" />
                    System Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {Object.entries(game.minimum_system_requirements).map(
                      ([key, value]) => (
                        <div key={key} className="relative">
                          <div className="absolute -left-4 top-1 w-1 h-full bg-white/5 rounded-full"></div>
                          <h4 className="text-[#00C1FF] text-xs font-bold uppercase tracking-widest mb-2 pl-2">
                            {key}
                          </h4>
                          <p className="text-white font-medium pl-2">
                            {value ? value : "N/A"}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Screenshots Gallery */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#00C1FF] rounded-full"></span>
                  Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {game.screenshots.map((shot) => (
                    <div
                      key={shot.id}
                      className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer border border-white/5 hover:border-[#00C1FF]/50 active:border-[#00C1FF] transition-all"
                    >
                      <Image
                        src={shot.image}
                        alt={`Screenshot ${shot.id}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <FaExternalLinkAlt className="text-[#00C1FF] text-3xl drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
