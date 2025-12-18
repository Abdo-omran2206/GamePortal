"use client";
import Image from "next/image";
import { Game } from "../api/fetcher";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
interface GameCardProps {
  game: Game;
}

export default function GameSection({
  title,
  games,
  viewAllLink = "/Gameportal", // Default link
}: {
  title: React.ReactNode;
  games: Game[];
  viewAllLink?: string;
}) {
  return (
    <section className="py-8 px-4">
      <div className="mx-auto">
        <div className="flex flex-row justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span className="w-1 h-10 bg-[#00C1FF]"></span>
            {title}
          </h2>
          <Link
            href={viewAllLink}
            className="
              group relative flex items-center gap-2
              px-5 py-2.5
              text-sm font-semibold text-white
              rounded-full
              bg-gradient-to-r from-[#00C1FF] to-[#0066FF]
              shadow-lg shadow-[#00C1FF]/30
              transition-all duration-300
              hover:scale-105 hover:shadow-[#00C1FF]/60
              active:scale-95
              hover:cursor-pointer
            "
          >
            View All
            <FaArrowRight
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
              size={14}
            />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {games.slice(0, 12).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GameCard({ game }: GameCardProps) {
  const router = useRouter();

  const handlenavigate = (id: number) => {
    router.push(`/GameDetails/${id}`);
  };

  return (
    <div
      className="relative min-w-[450px] bg-[#161616] rounded-lg overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      onClick={() => handlenavigate(game.id)}
    >
      <Image
        src={game.thumbnail}
        alt={game.title}
        width={450}
        height={300}
        className="w-[450px] h-[300px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-white font-semibold text-sm truncate">
          {game.title}
        </h3>

        <p className="text-xs text-gray-300">
          {game.genre} • {game.platform === "PC (Windows)" ? "PC" : "Browser"}
        </p>

        {/* Hover content */}
        <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 group-active:opacity-100 group-active:max-h-40 transition-all duration-500 overflow-hidden">
          <p className="text-xs text-gray-200 mt-2 line-clamp-2">
            {game.short_description}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {game.publisher} • {game.release_date}
          </p>
        </div>
      </div>
    </div>
  );
}
