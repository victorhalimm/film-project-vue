import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/movies/:id", component: MovieDetailView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;