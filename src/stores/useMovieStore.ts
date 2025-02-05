import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";

import type { Movie } from "../types/movie";
import {
  fetchAllMovies,
  fetchMoviesByGenre,
  insertMovie,
  updateMovieById,
} from "../services/movieServices";

export const useMovieStore = defineStore("movieStore", () => {
  const movies: Ref<Movie[]> = ref([]);

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const getMovies = async () => {
    try {
      loading.value = true;
      error.value = null;
      movies.value = await fetchAllMovies();
    } catch (err) {
      console.log(err);
      error.value = "Failed to fetch movie";
    } finally {
      loading.value = false;
    }
  };

  const getMoviesByGenre = async (genre: string) => {
    try {
      loading.value = true;
      error.value = null;
      movies.value = await fetchMoviesByGenre(genre);
    } catch (err) {
      error.value = "Failed to fetch movie";
    } finally {
      loading.value = false;
    }
  };

  const createMovie = async (movieData: Movie) => {
    try {
      loading.value = true;
      error.value = null;

      const newMovie = await insertMovie(movieData);

      // Biar local juga keubah
      movies.value.push(newMovie);

      return "Movie created successfully!";
    } catch (err: any) {
      error.value = err.message || "Failed to create movie.";
    } finally {
      loading.value = false;
    }
  };

  const updateMovie = async (movieData: Movie) => {
    try {
      loading.value = true;
      error.value = null;
      await updateMovieById(movieData);
      
      //biar lokal juga keubah
      const index = movies.value.findIndex((m) => m.id === movieData.id);
      if (index !== -1) {
        movies.value[index] = { ...movieData };
      }
    } catch (err: any) {
      error.value = err.message || "Failed to update movie.";
    } finally {
      loading.value = false;
    }
  };

  const genres = computed(() => [
    "All",
    ...new Set(movies.value.map((movie) => movie.genre)),
  ]);
  const selectedGenre = ref<string>("All");

  const setGenre = (genre: string) => {
    selectedGenre.value = genre;
  };

  const filteredMovies = computed(() => {
    return selectedGenre.value === "All"
      ? movies.value
      : movies.value.filter((movie) => movie.genre === selectedGenre.value);
  });

  const getMovieById = (id: number) => {
    return movies.value.find((m) => m.id === id);
  };

  return {
    loading,
    error,
    movies,
    genres,
    selectedGenre,
    setGenre,
    filteredMovies,
    getMovieById,
    getMovies,
    getMoviesByGenre,
    updateMovie,
    createMovie
  };
});
