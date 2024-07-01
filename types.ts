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
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
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
export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
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
  first_air_date: string;
  seasons?: Season[];
  imdb_id: string;
  original_language: string;
  original_title: string;
  original_name?: string;
  name?: string;
  number_of_seasons?: number;
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
export type Episode = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: CrewMember[];
  guest_stars: GuestStar[];
};

type CrewMember = {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

type GuestStar = {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};
export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface CollectionData {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: MoviesData[];
}
