"use client";

import { Game } from "@/app/api/fetcher";
import Image from "next/image";
import Link from "next/link";
import { FaChrome, FaWindows, FaPlus, FaArrowRight } from "react-icons/fa";

interface PortalGameCardProps {
  game: Game;
}

export default function PortalGameCard({ game }: PortalGameCardProps) {
  return (
    <Link href={`/GameDetails/${game.id}`} className="block group">
      <div className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#00C1FF]/50 active:border-[#00C1FF] hover:shadow-[0_0_30px_rgba(0,193,255,0.15)] hover:-translate-y-2 active:-translate-y-0 h-full flex flex-col active:scale-95">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay Gradient on Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-80" />

          {/* Platform Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white/50 text-xs flex items-center gap-1.5 border border-white/10">
              {game.platform.includes("PC") ||
              game.platform.includes("Windows") ? (
                <FaWindows className="text-[#00C1FF]" />
              ) : (
                <FaChrome className="text-[#00C1FF]" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 relative">
          {/* Genre Badge - Floating Effect */}
          <div className="absolute -top-7 right-4">
            <span className="bg-[#00C1FF] text-black font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-[#00C1FF]/20">
              {game.genre}
            </span>
          </div>

          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[#00C1FF] group-active:text-[#00C1FF] transition-colors line-clamp-1">
              {game.title}
            </h3>
          </div>

          <div className="space-y-3 flex-1 flex flex-col">
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
              {game.short_description}
            </p>
          </div>

          {/* Footer Items */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                Release Date
              </span>
              <span className="text-gray-300 text-xs font-semibold">
                {game.release_date}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00C1FF] group-active:bg-[#00C1FF] transition-colors duration-300">
              <FaArrowRight className="text-white/50 group-hover:text-black group-active:text-black w-3 h-3 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
