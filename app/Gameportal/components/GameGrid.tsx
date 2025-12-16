"use client";

import { Game } from "@/app/api/fetcher";
import PortalGameCard from "./PortalGameCard";
import { FaGhost } from "react-icons/fa";

interface GameGridProps {
  games: Game[];
}

export default function GameGrid({ games }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <FaGhost className="text-6xl text-gray-700 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2">No Games Found</h3>
        <p className="text-gray-400 max-w-md">
          We couldn&apos;t find any games matching your current filters. Try
          adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <PortalGameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
