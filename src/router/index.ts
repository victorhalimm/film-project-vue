import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";
import CreateMovieView from "../views/CreateMovieView.vue";
import UpdateMovieView from "../views/UpdateMovieView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/movie/create", component: CreateMovieView},
  { path: "/movie/update/:id", component: UpdateMovieView, props: true },
  { path: "/movie/:id", component: MovieDetailView, props: true },
];  

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;