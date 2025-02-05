<script setup lang="ts">
import MovieForm from './MovieForm.vue';
import { useMovieStore } from '../stores/useMovieStore';
import type { Movie } from '../types/movie';

const movieStore = useMovieStore();

const insertMovieToDB = (movieData : Movie) => {
    movieStore.createMovie(movieData);
}

</script>

<template>
    <movie-form @save="insertMovieToDB"/>
</template>