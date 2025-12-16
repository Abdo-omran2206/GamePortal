"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/Search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-6 py-4 pr-12 rounded-lg bg-black/70 backdrop-blur-sm text-white placeholder-[#AFAFAF] border-2 border-[#5B57FF]/50 focus:border-[#00C1FF] focus:outline-none transition-colors text-lg"
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-800 hover:cursor-pointer text-white px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        Search
      </button>
    </div>
  );
}
