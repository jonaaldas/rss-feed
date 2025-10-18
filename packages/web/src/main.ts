import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "@/App.vue";
import { router } from "@/router";
import { PiniaColada } from "@pinia/colada";
const pinia = createPinia();

createApp(App).use(router).use(pinia).use(PiniaColada, {}).mount("#app");
