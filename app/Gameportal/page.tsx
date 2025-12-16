import { Footer } from "@/app/components/assets";
import Navbar from "@/app/components/Navbar";
import {
  Category,
  getAllGames,
  getGamesWithFilters,
  Platform,
  SortBy,
} from "@/app/api/fetcher";
import FilterSidebar from "./components/FilterSidebar";
import GameGrid from "./components/GameGrid";

interface PageProps {
  searchParams: Promise<{
    platform?: string;
    category?: string;
    "sort-by"?: string;
  }>;
}

export default async function GamePortal({ searchParams }: PageProps) {
  const params = await searchParams;
  const platform = params.platform as Platform | undefined;
  const category = params.category as Category | undefined;
  const sortBy = params["sort-by"] as SortBy | undefined;

  let games;

  // Decide which fetcher to use based on params
  // If multiple filters are present or sort is involved with other filters, use getGamesWithFilters
  if (platform || category || sortBy) {
    // If only sort is present and valid, we could use getGamesSorted, but getGamesWithFilters handles it too.
    // However, the API might behave differently.
    // getGamesWithFilters maps to /games?platform=..&category=..&sort-by=..
    games = await getGamesWithFilters({
      platform: platform === "all" ? undefined : platform,
      category,
      "sort-by": sortBy,
    });
  } else {
    // Default view: All games
    games = await getAllGames();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D0D] pt-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-72 flex-shrink-0">
              <FilterSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 pb-16">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">
                  All Games
                  <span className="text-gray-500 text-lg ml-3 font-normal">
                    ({games.length})
                  </span>
                </h1>
              </div>

              <GameGrid games={games} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
