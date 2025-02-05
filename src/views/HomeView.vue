<script setup lang="ts">
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiPlus, FaSearch } from "oh-vue-icons/icons";

import MovieCard from "../components/MovieCard.vue";
import { useMovieStore } from "../stores/useMovieStore";

import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import LoadingBar from "../components/LoadingBar.vue";

addIcons(FaSearch, BiPlus);

const movieStore = useMovieStore();

onMounted(() => {
    movieStore.getMovies();
});


</script>

<template>
  <div class="w-full">
    <div class="flex w-full justify-between py-8">
      <div class="flex space-x-4">
        <button
          v-for="genre in movieStore.genres"
          :class="
            genre === movieStore.selectedGenre ? 'bg-blue-500 text-white' : ''
          "
          class="border-2 px-8 py-2 text-lg rounded-full duration-150"
          @click="movieStore.setGenre(genre)"
        >
          {{ genre }}
        </button>
      </div>
      <div
        class="flex items-center border border-gray-300 rounded-lg overflow-hidden w-96"
      >
        <input
          type="text"
          placeholder="Search movies..."
          class="w-full px-4 py-2 focus:outline-none"
        />
        <button
          class="bg-blue-500 flex-grow px-4 h-full text-white flex items-center"
        >
          <OhVueIcon name="fa-search" class="text-white text-2xl" />
        </button>
      </div>
    </div>

    <div class="py-4 flex justify-end">
      <RouterLink
        to="/movie/create"
        class="rounded-3xl bg-blue-500 text-white p-3 mt-4"
      >
        Create New Film
      </RouterLink>
    </div>

    <div class="flex justify-center items-center">
        <loading-bar v-if="movieStore.loading"/>
    </div>
    
    <div class="grid grid-cols-2 lg:grid-cols-5 w-full mt-12 gap-[18px]">
      <MovieCard
        v-for="movie in movieStore.filteredMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<style scoped></style>
