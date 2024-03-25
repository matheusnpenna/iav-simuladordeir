import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { init } from "./setup/api";

import { registerComponents } from "./components";
import initStore from "@/stores";

init();

const app = createApp(App)

registerComponents(app)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$store = initStore();
app.config.globalProperties.$app = app;

app.mount('#app')
