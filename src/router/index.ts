import { createRouter, createWebHistory } from "vue-router";
import HomepageView from "@/views/HomePageView.vue";

const routes = [{ path: "/", children: [{ path: "", component: HomepageView, name: "Homepage" }] }];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
