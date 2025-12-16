"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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

  // Initialize state from URL params
  const [platform, setPlatform] = useState(
    searchParams.get("platform") || "all"
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort-by") || "popularity"
  );

  // Update URL when filters change
  const updateFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (platform && platform !== "all") params.set("platform", platform);
    else params.delete("platform");

    if (category) params.set("category", category);
    else params.delete("category");

    if (sortBy) params.set("sort-by", sortBy);
    else params.delete("sort-by");

    router.push(`/Gameportal?${params.toString()}`);
  }, [platform, category, sortBy, router, searchParams]);

  // Sync state with URL if it changes externally
  useEffect(() => {
    setPlatform(searchParams.get("platform") || "all");
    setCategory(searchParams.get("category") || "");
    setSortBy(searchParams.get("sort-by") || "popularity");
  }, [searchParams]);

  // Apply filters effect
  useEffect(() => {
    // Debounce or just run on change? For simpler UX, running on change is fine for local state
    // But we need to actually trigger the route update.
    // Let's do it on dedicated Apply button or immediate effect?
    // Immediate effect is better for responsiveness.
    const params = new URLSearchParams();
    if (platform && platform !== "all") params.set("platform", platform);
    if (category) params.set("category", category);
    if (sortBy) params.set("sort-by", sortBy);

    // Only push if different from current
    if (params.toString() !== searchParams.toString()) {
      router.push(`/Gameportal?${params.toString()}`);
    }
  }, [platform, category, sortBy, router, searchParams]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#00C1FF] text-black p-4 rounded-full shadow-lg shadow-[#00C1FF]/30"
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
            <button onClick={() => setIsOpen(false)} className="text-gray-400">
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
                    className="flex items-center space-x-3 cursor-pointer group"
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
                      onChange={(e) => setSortBy(e.target.value)}
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
                    className="flex items-center space-x-3 cursor-pointer group"
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
                      onChange={(e) => setPlatform(e.target.value)}
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
                  onClick={() => setCategory("")}
                  className={`
                     px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
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
                    onClick={() => setCategory(cat)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-medium transition-colors border capitalize
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
