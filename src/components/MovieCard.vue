<template>
  <div class="h-[45vh]">
    <img
      :src="movie.imageUrl"
      :alt="movie.title"
      class="w-full h-[80%] object-cover shadow-md rounded-lg"
    />
    <div class="py-4">
      <h3 class="text-lg font-semibold text-black">{{ movie.title }}</h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: Object,
});
</script>
