<template>
    <button
        class="px-2 py-1 bg-white text-gray-800 font-medium cursor-pointer"
        @click="openCalendar"
    >
        Ιστορικό
    </button>
    <BottomSheet v-show="isOpen" scrollable ref="history">
        <p class="text-white">BOTTTOM</p>
    </BottomSheet>
</template>

<script setup lang="ts">
import { useBottomSheet } from "@/stores/bottomSheet";
import BottomSheet from "@/components/Layout/BottomSheet.vue";
import { getAllWeatherForecasts } from "@/services/fetchWeatherForecasts";
import { useForecastDataStore } from "@/stores/forecastData";
import { ref } from "vue";

const history = ref(null);

const { setPastForecasts } = useForecastDataStore();
const { toggle, isOpen } = useBottomSheet();

const openCalendar = async () => {
    const forecasts = await getAllWeatherForecasts();
    setPastForecasts(forecasts);
    console.log(history.value);
    toggle(history.value);
};
</script>
