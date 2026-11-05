import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/main.css";

import App from "./App.vue";
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth";
import { setUnauthorizedHandler } from "@/services/httpClient/api.mts";

const app = createApp(App);

app.use(createPinia());
app.use(router);

setUnauthorizedHandler(() => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
        return;
    }
    authStore.clearSession();
    router.replace({ name: "Login", query: { redirect: router.currentRoute.value.fullPath } });
});

app.mount("#app");
