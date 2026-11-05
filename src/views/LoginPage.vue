<template>
    <div
        class="relative min-h-dvh flex items-center justify-center overflow-hidden bg-gray-900 p-4"
    >
        <img
            src="/images/lamia_sunset.jpg"
            alt=""
            aria-hidden="true"
            class="absolute inset-0 size-full object-cover transition-opacity duration-1000"
            :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
            @load="imageLoaded = true"
        />
        <div
            class="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/50 to-gray-900/30"
            aria-hidden="true"
        ></div>
        <section
            class="login-card relative flex w-full max-w-md flex-col items-center gap-6 rounded-2xl bg-gray-800/70 p-8 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
        >
            <img
                src="/logo-stacked-dark.png"
                alt="Meteogroup Φθιώτιδα"
                class="h-36 w-auto object-contain"
            />
            <div class="flex flex-col gap-1 text-center">
                <h1 class="text-2xl font-extrabold">Σύνδεση</h1>
                <p class="text-sm text-gray-300">Εργαλείο προγνώσεων καιρού</p>
            </div>

            <form
                class="flex w-full flex-col gap-4"
                name="login-form"
                @submit.prevent="handleSubmit"
            >
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-sm font-semibold">Email</label>
                    <input
                        id="email"
                        ref="emailInput"
                        v-model="email"
                        type="email"
                        name="email"
                        autocomplete="username"
                        required
                        :aria-invalid="hasError"
                        aria-describedby="login-error"
                        class="login-input w-full rounded-lg bg-white/10 px-3 py-2.5 text-white ring-1 ring-white/20 transition placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        @input="hasError = false"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="password" class="text-sm font-semibold">Κωδικός πρόσβασης</label>
                    <input
                        id="password"
                        ref="passwordInput"
                        v-model="password"
                        type="password"
                        name="password"
                        autocomplete="current-password"
                        required
                        :aria-invalid="hasError"
                        aria-describedby="login-error"
                        class="login-input w-full rounded-lg bg-white/10 px-3 py-2.5 text-white ring-1 ring-white/20 transition placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        @input="hasError = false"
                    />
                </div>

                <p
                    id="login-error"
                    role="alert"
                    class="rounded-lg bg-red-900/50 px-3 py-2 text-sm text-red-100 ring-1 ring-red-400/40"
                    v-show="hasError"
                >
                    Η σύνδεση απέτυχε. Ελέγξτε τα στοιχεία σας και δοκιμάστε ξανά.
                </p>

                <div class="pt-2">
                    <button
                        type="submit"
                        class="flex w-full cursor-pointer items-center justify-center rounded-lg bg-amber-600 px-4 py-2.5 font-bold text-white transition hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="isLoading"
                        :aria-busy="isLoading"
                    >
                        <TheLoader v-if="isLoading" />
                        <span v-else>Σύνδεση</span>
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const TheLoader = defineAsyncComponent(() => import("@/components/icons/TheLoader.vue"));
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const hasError = ref(false);
const imageLoaded = ref(false);
const emailInput = ref<HTMLInputElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);

const getRedirectTarget = () => {
    const redirect = route.query.redirect;
    if (
        typeof redirect === "string" &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//") &&
        !redirect.startsWith("/\\") &&
        !redirect.startsWith("/login")
    ) {
        return redirect;
    }
    return { name: "Homepage" };
};

const handleSubmit = async () => {
    if (isLoading.value) {
        return;
    }
    hasError.value = false;
    isLoading.value = true;
    const success = await authStore.login(email.value.trim(), password.value);
    isLoading.value = false;

    if (success) {
        await router.replace(getRedirectTarget());
        return;
    }
    hasError.value = true;
    password.value = "";
    passwordInput.value?.focus();
};

onMounted(() => {
    emailInput.value?.focus();
});
</script>

<style lang="css" scoped>
.login-card {
    animation: card-rise 0.6s ease-out both;
}

@keyframes card-rise {
    from {
        opacity: 0;
        transform: translateY(16px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-input:-webkit-autofill {
    -webkit-text-fill-color: #fff;
    caret-color: #fff;
    box-shadow: 0 0 0 1000px #374151 inset;
}

@media (prefers-reduced-motion: reduce) {
    .login-card {
        animation: none;
    }
}
</style>
