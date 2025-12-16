import { getAllGames } from "@/app/api/fetcher";
import PortalGameCard from "@/app/Gameportal/components/PortalGameCard";
import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/assets";
import SearchBar from "@/app/components/SearchBar";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

  const allGames = await getAllGames();

  const filteredGames = query
    ? allGames.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white font-sans selection:bg-[#00C1FF] selection:text-black">
      <Navbar />

      <div className="container mx-auto px-6 py-32 min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Search Results for{" "}
          <span className="text-[#00C1FF]">&quot;{query}&quot;</span>
        </h1>

        <div className="max-w-2xl mb-12">
          <SearchBar />
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <PortalGameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-400">
              No games found for &quot;{query}&quot;
            </h2>
            <p className="text-gray-500 mt-2">
              Try searching for something else.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
