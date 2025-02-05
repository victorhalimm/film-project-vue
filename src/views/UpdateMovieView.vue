<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useMovieStore } from "../stores/useMovieStore";
import MovieForm from "./MovieForm.vue";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();

const movie = computed(() => {
  return movieStore.getMovieById(Number(route.params.id));
});

const updateMovie = (updatedMovie: any) => {
  router.push("/");
};
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Edit Movie</h1>
    <MovieForm v-if="movie" :movie="movie" @save="updateMovie" />
    <p v-else class="text-red-500">Movie not found.</p>
  </div>
</template>
