<script setup lang="ts">
import MovieCard from "../components/MovieCard.vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/useMovieStore";
import { computed } from "vue";
import { BiTrashFill, FaStar, MdUpdateRound } from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { RouterLink } from "vue-router";
import router from "../router";

const route = useRoute();
const movieStore = useMovieStore();

addIcons(MdUpdateRound, BiTrashFill, FaStar);

const movie = computed(() => {
  return movieStore.movies.find((m) => m.id === Number(route.params.id));
});

const deleteAction = async () => {

    if (movie.value === undefined) return;

    console.log(movie.value.id);
    await movieStore.deleteMovie(movie.value.id);
    // router.push('/');
}


</script>

<template>
  <div class="flex py-8 justify-between">
    <div class="w-[20%] flex flex-col">
      <movie-card v-if="movie" :movie="movie"></movie-card>
      <div class="flex space-x-4">
        <router-link :to="`/movie/update/${movie?.id}`" class="rounded-full bg-blue-500 p-3 mt-4 h-12 w-12">
          <OhVueIcon name="md-update-round" class="text-white text-5xl" />
        </router-link>
        <button @click="deleteAction" class="rounded-full bg-red-500 p-3 mt-4 h-12 w-12">
          <OhVueIcon name="bi-trash-fill" class="text-white text-5xl" />
        </button>
      </div>
    </div>
    <div
      class="w-[65%] text-lg text-black h-full items-center align-middle flex"
    >
      {{ movie?.description }}
    </div>
  </div>
</template>
