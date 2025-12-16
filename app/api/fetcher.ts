const API_BASE_URL = "https://www.freetogame.com/api";

// Type definitions based on FreeToGame API
export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export type Platform = "pc" | "browser" | "all";
export type SortBy = "release-date" | "popularity" | "alphabetical" | "relevance";
export type Category =
  | "mmorpg"
  | "shooter"
  | "strategy"
  | "moba"
  | "racing"
  | "sports"
  | "social"
  | "sandbox"
  | "open-world"
  | "survival"
  | "pvp"
  | "pve"
  | "pixel"
  | "voxel"
  | "zombie"
  | "turn-based"
  | "first-person"
  | "third-Person"
  | "top-down"
  | "tank"
  | "space"
  | "sailing"
  | "side-scroller"
  | "superhero"
  | "permadeath"
  | "card"
  | "battle-royale"
  | "mmofps"
  | "mmotps"
  | "3d"
  | "2d"
  | "anime"
  | "fantasy"
  | "sci-fi"
  | "fighting"
  | "action-rpg"
  | "action"
  | "military"
  | "martial-arts"
  | "flight"
  | "low-spec"
  | "tower-defense"
  | "horror"
  | "mmorts";

export interface GamesQueryParams {
  platform?: Platform;
  category?: Category;
  "sort-by"?: SortBy;
}

export interface FilterQueryParams {
  tag: string; // e.g., "3d.mmorpg.fantasy.pvp"
  platform?: Platform;
  sort?: SortBy;
}

/**
 * Fetches all games from the API
 */
export async function getAllGames(): Promise<Game[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/games`);
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all games:", error);
    throw error;
  }
}

/**
 * Fetches games filtered by platform
 * @param platform - 'pc', 'browser', or 'all'
 */
export async function getGamesByPlatform(
  platform: Platform
): Promise<Game[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games?platform=${platform}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching games for platform ${platform}:`, error);
    throw error;
  }
}

/**
 * Fetches games by category or tag
 * @param category - Game category (e.g., 'shooter', 'mmorpg', 'pvp')
 */
export async function getGamesByCategory(
  category: Category
): Promise<Game[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games?category=${category}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching games for category ${category}:`, error);
    throw error;
  }
}

/**
 * Fetches games sorted by a specific criteria
 * @param sortBy - Sort criteria: 'release-date', 'popularity', 'alphabetical', or 'relevance'
 */
export async function getGamesSorted(sortBy: SortBy): Promise<Game[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games?sort-by=${sortBy}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching sorted games:`, error);
    throw error;
  }
}

/**
 * Helper function to build query string from params
 */
function buildQueryString(params: Record<string, string | undefined>): string {
  const filtered = Object.entries(params).filter(
    ([_, value]) => value !== undefined
  );
  return new URLSearchParams(
    filtered.reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {} as Record<string, string>)
  ).toString();
}

/**
 * Fetches games with multiple query parameters
 * @param params - Object containing platform, category, and sort-by
 */
export async function getGamesWithFilters(
  params: GamesQueryParams
): Promise<Game[]> {
  try {
    const queryString = buildQueryString({
      platform: params.platform,
      category: params.category,
      "sort-by": params["sort-by"],
    });

    const response = await fetch(
      `${API_BASE_URL}/games?${queryString}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered games:", error);
    throw error;
  }
}

/**
 * Fetches games using the filter endpoint with tags
 * @param params - Object containing tag, platform (optional), and sort (optional)
 */
export async function getFilteredGames(
  params: FilterQueryParams
): Promise<Game[]> {
  try {
    const queryString = buildQueryString({
      tag: params.tag,
      platform: params.platform,
      sort: params.sort,
    });

    const response = await fetch(
      `${API_BASE_URL}/filter?${queryString}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch filtered games: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered games:", error);
    throw error;
  }
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface SystemRequirements {
  os?: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  storage?: string;
}

export interface GameDetails extends Game {
  status: string;
  description: string;
  minimum_system_requirements?: SystemRequirements;
  screenshots: Screenshot[];
}

// ... existing code ...

/**
 * Fetches details of a specific game by ID
 * @param id - Game ID
 */
export async function getGameById(id: number): Promise<GameDetails> {
  try {
    const response = await fetch(`${API_BASE_URL}/game?id=${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch game: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching game with id ${id}:`, error);
    throw error;
  }
}

// Convenience functions for common use cases

/**
 * Get trending games (sorted by popularity)
 */
export async function getTrendingGames(): Promise<Game[]> {
  return getGamesSorted("popularity");
}

/**
 * Get latest releases (sorted by release date)
 */
export async function getLatestReleases(): Promise<Game[]> {
  return getGamesSorted("release-date");
}

/**
 * Get PC games
 */
export async function getPCGames(): Promise<Game[]> {
  return getGamesByPlatform("pc");
}

/**
 * Get browser games
 */
export async function getBrowserGames(): Promise<Game[]> {
  return getGamesByPlatform("browser");
}

/**
 * Get games by platform and category
 */
export async function getGamesByPlatformAndCategory(
  platform: Platform,
  category: Category
): Promise<Game[]> {
  return getGamesWithFilters({ platform, category });
}

