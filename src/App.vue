<script setup lang="ts">
import { ref } from "vue";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaSearch } from "oh-vue-icons/icons";

import MovieCard from "./components/MovieCard.vue";
import { useMovieStore } from "./stores/useMovieStore";

addIcons(FaSearch);

const selectedGenre = ref<string | null>("All");
const setGenre = (genre : string) => {
  selectedGenre.value = genre
}

const movieStore = useMovieStore();
</script>

<template>
  <div class="min-h-screen p-32 w-full">
    <div class="flex w-full justify-between">
      <div class="text-4xl text-black font-semibold">MovieList</div>

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

    <div class="flex space-x-4 py-8">
      <button
        v-for="genre in movieStore.genres"
        :class="genre === selectedGenre ? 'bg-blue-500 text-white' : ''"
        class="border-2 px-8 py-2 text-lg rounded-full duration-150"
        @click="setGenre(genre)"
      >
        {{ genre }}
      </button>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-5 w-full mt-12 gap-[18px]">
      <MovieCard
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<style scoped></style>
