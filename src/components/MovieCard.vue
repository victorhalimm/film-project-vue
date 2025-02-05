<template>
  <div class="h-[45vh]" @click="goToDetail(movie.id)">
    <img
      :src="movie.image"
      :alt="movie.title"
      class="w-full h-[80%] object-cover shadow-md rounded-lg"
    />
    <div class="py-4">
      <h3 class="text-lg font-semibold text-black">{{ movie.title }}</h3>
    </div>
  </div>
</template>

<script setup>
import router from "../router";

defineProps({
  movie: Object,
});

function goToDetail(id) {
    router.push(`/movie/${id}`);
}
</script>
