"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Game } from "../api/fetcher";

interface FramerGalleryProps {
  games: Game[];
}

export default function FramerGallery({ games }: FramerGalleryProps) {
  const images = games.map((game) => game.thumbnail);

  return (
    <div className="space-y-8 overflow-hidden relative py-10">
      {/* العنوان */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Meet Our <span className="text-[#00C1FF]">Gallery</span>
        </h1>
        <div className="w-24 h-1 bg-[#00C1FF] mx-auto rounded"></div>
      </div>

      {/* Row 1: RTL */}
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-72 h-48 flex-shrink-0 rounded-lg overflow-hidden"
          >
            <Image src={src} alt="GamePortal gallery" fill className="object-cover" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-sm truncate">
                {games[index % games.length].title}
              </h3>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Row 2: LTR */}
      <motion.div
        className="flex gap-6"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-72 h-48 flex-shrink-0 rounded-lg overflow-hidden"
          >
            <Image src={src} alt="GamePortal gallery" fill className="object-cover" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-sm truncate">
                {games[index % games.length].title}
              </h3>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
