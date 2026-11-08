import { createRouter, createWebHistory } from "vue-router";
import HomepageView from "@/views/HomePageView.vue";
import LoginPage from "@/views/LoginPage.vue";
import { useAuthStore } from "@/stores/auth";

declare module "vue-router" {
    interface RouteMeta {
        requiresAuth?: boolean;
    }
}

const routes = [
    {
        path: "/",
        meta: { requiresAuth: true },
        children: [{ path: "", component: HomepageView, name: "Homepage" }],
    },
    { path: "/login", component: LoginPage, name: "Login" },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    await authStore.restoreSession();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: "Login", query: { redirect: to.fullPath } };
    }
    if (to.name === "Login" && authStore.isAuthenticated) {
        return { name: "Homepage" };
    }
});
