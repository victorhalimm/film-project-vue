<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/useMovieStore";
import MovieForm from "./MovieForm.vue";
import { computed } from "vue";
import type { Movie } from "../types/movie";
import router from "../router";

const route = useRoute();
const movieStore = useMovieStore();

const movie = computed(() => {
  return movieStore.getMovieById(Number(route.params.id));
});

const updateMovieToDB = (updatedMovie: Movie) => {
//   console.log(updatedMovie);
  movieStore.updateMovie(updatedMovie);
  router.push('/');
};
</script>

<template>
  <h1 class="text-3xl font-bold mb-6">Edit Movie</h1>
  <MovieForm v-if="movie" :movie="movie" @save="updateMovieToDB" />
  <p v-else class="text-red-500">Movie not found.</p>
</template>
