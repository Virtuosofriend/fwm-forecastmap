import { defineStore } from "pinia";
import { computed, shallowRef } from "vue";
import { loginUser, logoutUser, restoreUserSession } from "@/services/authService";
import type { AuthUser } from "@/types";

export const useAuthStore = defineStore("auth", () => {
    const userInitial = shallowRef<AuthUser | null>(null);
    const user = computed(() => userInitial.value);
    const isAuthenticated = computed(() => userInitial.value !== null);

    let restorePromise: Promise<void> | null = null;

    async function login(email: string, password: string): Promise<boolean> {
        userInitial.value = await loginUser(email, password);
        return isAuthenticated.value;
    }

    // Runs once; later calls get the same promise, so the router guard can await it on every
    // navigation without repeating the request.
    function restoreSession(): Promise<void> {
        if (!restorePromise) {
            restorePromise = restoreUserSession().then((restoredUser) => {
                userInitial.value = restoredUser;
            });
        }
        return restorePromise;
    }

    async function logout(): Promise<void> {
        await logoutUser();
        userInitial.value = null;
    }

    // For when the server has already rejected the session (401): no request needed.
    function clearSession() {
        userInitial.value = null;
    }

    return {
        user,
        isAuthenticated,
        login,
        restoreSession,
        logout,
        clearSession,
    };
});
