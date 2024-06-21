type UserTable = {
  created_at: string;
  email: string;
  id: string;
};

export interface ProfilesTypes {
  created_at: string;
  favoriteIds: number[] | null;
  id: string;
  profilePicture: string;
  userId: string;
  userTable?: UserTable;
  username: string;
}

interface Collection {
  // Define properties for the collection if needed
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface Genre {
  id: number;
  name: string;
}
export interface MoviesData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | Collection;
  budget: number;
  genres: Genre[];
  genre_ids: number[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
