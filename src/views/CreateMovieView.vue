<script setup lang="ts">
import MovieForm from './MovieForm.vue';
import { useMovieStore } from '../stores/useMovieStore';
import type { Movie } from '../types/movie';
import router from '../router';

const movieStore = useMovieStore();

const insertMovieToDB = (movieData : Movie) => {
    movieStore.createMovie(movieData);
    router.push('/');
}

</script>

<template>
    <movie-form @save="insertMovieToDB"/>
</template>