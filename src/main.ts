import App from '~/App.vue';
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import { createI18n } from 'vue-i18n';

import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import './styles/main.css';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(generatedRoutes),
});

const app = createApp(App);
app.use(router);
app.use(createHead());
app.use(createPinia());
app.use(createI18n());

app.mount('#app');
