<script setup lang="ts">
import { ref, toRaw, watch } from "vue";
import type { Movie } from "../types/movie";


const form = ref({
  title: "",
  duration: 0,
  rating: 0,
  genre: "",
  description: "",
  image: "/dummies/movie-dummy-2.jpg",
});

const emit = defineEmits(["save"]);

const props = defineProps<{ movie?: Movie }>(); 

watch(
  () => props.movie,
  (newMovie) => {
    if (newMovie) {
        form.value = {...newMovie}
    }
  },
  { immediate: true }
);


const saveMovie = () => {
    emit("save", toRaw(form.value));
}
</script>

<template>
  <form @submit.prevent="saveMovie" class="flex flex-col gap-4 bg-white p-6 shadow-lg rounded-lg">
    <input
      v-model="form.title"
      placeholder="Title"
      class="p-2 border rounded"
    />
    <input
      v-model="form.duration"
      placeholder="Duration"
      class="p-2 border rounded"
    />
    <input
      v-model.number="form.rating"
      type="number"
      step="0.1"
      placeholder="Rating"
      class="p-2 border rounded"
    />
    <input
      v-model="form.genre"
      placeholder="Genre"
      class="p-2 border rounded"
    />
    <textarea
      v-model="form.description"
      placeholder="Description"
      class="p-2 border rounded"
    ></textarea>

    <button type="submit" class="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
      {{ props.movie ? "Update Movie" : "Create Movie" }}
    </button>
  </form>
</template>
