import { defineStore } from "pinia";
import { ref, type Ref, computed } from "vue";

import type { Movie } from "../types/movie";

export const useMovieStore = defineStore("movieStore", () => {
  const movies: Ref<Movie[]> = ref([
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      duration: "152 min",
      rating: 7.6,
      genre: "Fantasy",
      imageUrl: "/dummies/movie-dummy-1.jpg",
    },
    {
      id: 2,
      title: "Inception",
      duration: "148 min",
      rating: 8.8,
      genre: "Sci-Fi",
      imageUrl: "/dummies/movie-dummy-2.jpg",
    },
    {
      id: 3,
      title: "Titanic",
      duration: "195 min",
      rating: 7.8,
      genre: "Romance",
      imageUrl: "/dummies/movie-dummy-3.jpg",
    },
    {
      id: 4,
      title: "The Dark Knight",
      duration: "152 min",
      rating: 9.0,
      genre: "Action",
      imageUrl: "/dummies/movie-dummy-4.jpg",
    },
    {
      id: 5,
      title: "Interstellar",
      duration: "169 min",
      rating: 8.6,
      genre: "Sci-Fi",
      imageUrl: "/dummies/movie-dummy-5.jpeg",
    },
  ]);

  const genres = computed(() => [
    "All",
    ...new Set(movies.value.map((movie) => movie.genre)),
  ]);
  const selectedGenre = ref<string | null>("All");

  const setGenre = (genre: string) => {
    selectedGenre.value = genre;
  };

  return {movies, genres, selectedGenre, setGenre};
});
