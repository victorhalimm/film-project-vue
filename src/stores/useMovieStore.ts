import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";

import type { Movie } from "../types/movie";
import {
  deleteMovieById,
  fetchAllMovies,
  fetchMoviesByGenre,
  insertMovie,
  updateMovieById,
} from "../services/movieServices";
import { useToast } from "vue-toastification";

export const useMovieStore = defineStore("movieStore", () => {
  const toast = useToast();
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

      toast.success("Movie created successfully!");
    } catch (err: any) {
      error.value = err.message || "Failed to create movie.";
      toast.error(error.value);
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

      toast.success("Succesfully updated a movie data!");
    } catch (err: any) {
      error.value = err.message || "Failed to update movie.";
      toast.error(error.value);
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

  const deleteMovie = async (id : number) => {
    try {
      loading.value = true;
      error.value = null;
      await deleteMovieById(id);
      
      //biar lokal juga keubah
      movies.value.splice(movies.value.findIndex(m => m.id == id), 1);
      
      toast.success('Succesfully deleted a movie data');
    } catch (err : any) {
      error.value = err.message || "Failed to remove a film!";
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  }

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
    createMovie,
    deleteMovie
  };
});
