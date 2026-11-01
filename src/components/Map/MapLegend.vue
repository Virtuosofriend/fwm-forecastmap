<template>
    <div class="bg-white p-1 rounded">
        <h3 class="text-md font-bold text-center mb-2">Υπόμνημα</h3>
        <div class="flex justify-center items-center gap-1 max-w-75 flex-wrap">
            <div
                class="flex items-center flex-col"
                v-for="(legend, index) in legendMarkers"
                :key="index"
            >
                <img :src="`${backendUrl}/assets/${legend.icon}`" class="w-8" />
                <p>{{ legend.text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";
import { storeToRefs } from "pinia";
import { useWeatherOptionsStore } from "@/stores/weather";
import { weatherConditionsDefinitions } from "@/types";
import type { ForecastDataSchema } from "@/types";

type LegendMap = {
    text: string;
    icon: string;
};

defineOptions({
    name: "MapLegend",
});

const backendUrl = import.meta.env.VITE_DIRECTUS_API;
const forecastDataStore = useForecastDataStore();
const { forecastDetails } = forecastDataStore;
const { weatherConditions } = storeToRefs(useWeatherOptionsStore());

const legendMarkers = ref<LegendMap[]>([]);

const createLegendIcons = (data: { [label: string]: ForecastDataSchema }) => {
    const selectedIcons: Set<string> = new Set();
    const allData = Object.values(data);
    allData.forEach((marker) => {
        if (marker.weatherConditions) {
            selectedIcons.add(marker.weatherConditions.icon);
        }
    });

    const filteredTexts = weatherConditions.value.reduce((result, condition) => {
        if ([...selectedIcons].includes(condition.asset)) {
            result.push({
                text: weatherConditionsDefinitions[
                    condition.weather_icon as keyof typeof weatherConditionsDefinitions
                ],
                icon: condition.asset,
            });
        }
        return result;
    }, [] as LegendMap[]);

    legendMarkers.value = filteredTexts;
};
watch(
    forecastDetails,
    (newVal) => {
        createLegendIcons(newVal.data);
    },
    {
        deep: true,
    },
);
</script>
