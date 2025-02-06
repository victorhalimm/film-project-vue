import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'
import router from './router'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Toast, {
    position : POSITION.BOTTOM_RIGHT
});
app.mount('#app');
