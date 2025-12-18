"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const CATEGORIES = [
  "mmorpg",
  "shooter",
  "strategy",
  "moba",
  "racing",
  "sports",
  "social",
  "sandbox",
  "open-world",
  "survival",
  "pvp",
  "pve",
  "pixel",
  "voxel",
  "zombie",
  "turn-based",
  "first-person",
  "third-Person",
  "top-down",
  "tank",
  "space",
  "sailing",
  "side-scroller",
  "superhero",
  "permadeath",
  "card",
  "battle-royale",
  "mmofps",
  "mmotps",
  "3d",
  "2d",
  "anime",
  "fantasy",
  "sci-fi",
  "fighting",
  "action-rpg",
  "action",
  "military",
  "martial-arts",
  "flight",
  "low-spec",
  "tower-defense",
  "horror",
  "mmorts",
];

const PLATFORMS = [
  { value: "all", label: "All Platforms" },
  { value: "pc", label: "PC (Windows)" },
  { value: "browser", label: "Web Browser" },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "popularity", label: "Popularity" },
  { value: "release-date", label: "Release Date" },
  { value: "alphabetical", label: "Alphabetical" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Derive filter values directly from URL (Source of Truth)
  const platform = searchParams.get("platform") || "all";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort-by") || "popularity";

  // Helper to update URL params
  const updateQuery = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all" && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/Gameportal?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#00C1FF] text-black p-4 rounded-full shadow-lg shadow-[#00C1FF]/30 active:scale-95 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaFilter size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-[#121212] border-r border-white/5 transform transition-transform duration-300 ease-in-out overflow-y-auto
        md:relative md:translate-x-0 md:h-[calc(100vh-80px)] md:top-20 md:sticky
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-[#333]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:hover:bg-[#00C1FF]
      `}
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between md:hidden">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 active:scale-95 transition-transform"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Sort By */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#00C1FF] uppercase tracking-wider">
                Sort By
              </h3>
              <div className="space-y-2">
                {SORT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 cursor-pointer group active:opacity-70"
                  >
                    <div
                      className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${
                        sortBy === option.value
                          ? "border-[#00C1FF]"
                          : "border-gray-600 group-hover:border-[#00C1FF]/50"
                      }
                    `}
                    >
                      {sortBy === option.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00C1FF]" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={() => updateQuery("sort-by", option.value)}
                      className="hidden"
                    />
                    <span
                      className={`text-sm ${
                        sortBy === option.value
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#00C1FF] uppercase tracking-wider">
                Platform
              </h3>
              <div className="space-y-2">
                {PLATFORMS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 cursor-pointer group active:opacity-70"
                  >
                    <div
                      className={`
                      w-5 h-5 rounded flex items-center justify-center border-2
                      ${
                        platform === option.value
                          ? "border-[#00C1FF] bg-[#00C1FF]/10"
                          : "border-gray-600 group-hover:border-[#00C1FF]/50"
                      }
                    `}
                    >
                      {platform === option.value && (
                        <div className="w-2.5 h-2.5 bg-[#00C1FF]" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="platform"
                      value={option.value}
                      checked={platform === option.value}
                      onChange={() => updateQuery("platform", option.value)}
                      className="hidden"
                    />
                    <span
                      className={`text-sm ${
                        platform === option.value
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#00C1FF] uppercase tracking-wider">
                Genre
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateQuery("category", "")}
                  className={`
                     px-3 py-1.5 rounded-full text-xs font-medium transition-all border active:scale-95
                     ${
                       category === ""
                         ? "bg-[#00C1FF] text-black border-[#00C1FF]"
                         : "bg-[#161616] text-gray-400 border-white/10 hover:border-[#00C1FF]/50 hover:text-white"
                     }
                   `}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateQuery("category", cat)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-medium transition-all border capitalize active:scale-95
                      ${
                        category === cat
                          ? "bg-[#00C1FF] text-black border-[#00C1FF]"
                          : "bg-[#161616] text-gray-400 border-white/10 hover:border-[#00C1FF]/50 hover:text-white"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
