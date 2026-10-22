<template>
    <div class="flex flex-col gap-2 items-center">
        <button
            class="rounded p-2 text-sm font-bold bg-green-700 text-white cursor-pointer min-w-20"
            @click="handleSaveBtn"
        >
            <span v-show="isLoading">
                <TheLoader />
            </span>
            <span v-show="!isLoading"> Αποθήκευση </span>
        </button>
        <p class="text-white font-bold">{{ finishedText }}</p>
    </div>
</template>

<script setup lang="ts">
import { toRaw, defineAsyncComponent, ref } from "vue";
import { withAsync } from "@/services/httpClient/helpers/withAsync.mjs";
import { addWeatherForecast } from "@/services/httpClient/directusSourcesApi.mjs";
import type { FormDataSchema } from "@/types";
import { useForecastDataStore } from "@/stores/forecastData.ts";

const TheLoader = defineAsyncComponent(() => import("@/components/icons/TheLoader.vue"));
const { setForecastDetails } = useForecastDataStore();

const props = defineProps<{
    data: FormDataSchema;
}>();

const isLoading = ref(false);
const finishedText = ref("");
const handleSaveBtn = () => {
    setForecastDetails(props.data);
    sendWeatherForecastData(props.data);
};

const sendWeatherForecastData = async (data: FormDataSchema) => {
    try {
        isLoading.value = true;
        const payload = {
            forecast: toRaw(data),
        };
        const response = await withAsync(addWeatherForecast, payload);
        if (response.response?.status !== 200) {
            finishedText.value = "Κάτι πήγε στραβά! Δοκιμάστε ξανά";
            throw new Error("Error creating forecast");
        }
        finishedText.value = "Επιτυχής αποθήκευση!";
    } catch (error) {
        console.error("Error sending weather forecast data:", error);
        return (finishedText.value = "Κάτι πήγε στραβά! Δοκιμάστε ξανά");
    } finally {
        isLoading.value = false;
    }
};
</script>
