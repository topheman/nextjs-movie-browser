/**
 * Generated with https://jvilk.com/MakeTypes/
 */
export interface TmdbMovieEntity {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: null;
  budget: number;
  genres?: (TmdbGenresEntity)[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: (TmdbProductionCompaniesEntity)[] | null;
  production_countries?: (TmdbProductionCountriesEntity)[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: (TmdbSpokenLanguagesEntity)[] | null;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface TmdbGenresEntity {
  id: number;
  name: string;
}
export interface TmdbProductionCompaniesEntity {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}
export interface TmdbProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}
export interface TmdbSpokenLanguagesEntity {
  iso_639_1: string;
  name: string;
}
