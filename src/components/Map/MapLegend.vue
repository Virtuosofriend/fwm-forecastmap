<template>
    <div
        v-if="legendMarkers.length > 0" 
        class="bg-white px-4 py-2 rounded"
    >
        <h3 class="text-lg text-bold text-center mb-4">
            Υπόμνημα
        </h3>
        <div class="flex justify-center items-center gap-2 max-w-[300px] flex-wrap">
            <div 
                class="flex items-center flex-col"
                v-for="(legend, index) in legendMarkers"
                :key="index"
            >
                <img 
                    :src="`icons/weather_conditions/${legend.icon}.svg`"
                    class="w-10"
                />
                <p>{{ legend.text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineOptions, watch, ref } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";
import { useWeatherOptionsStore } from "@/stores/weather";
import type { ForecastDataSchema } from "@/types";

type LegendMap = {
    text: string;
    icon: string;
};

defineOptions({
    name: "MapLegend",
});
const forecastDataStore = useForecastDataStore();
const { forecastDetails } = forecastDataStore;
const weatherOptionsStore = useWeatherOptionsStore();
const { weatherConditions } = weatherOptionsStore;

const markersData = forecastDetails.data;
const legendMarkers = ref<LegendMap[]>([]);

const createLegendIcons = ( data: {
        [label: string]: ForecastDataSchema;
    }) => {
    const selectedIcons: Set<string> = new Set();
    const allData = Object.values(data);
    allData.forEach(marker => {
        if (marker.weatherConditions) {
            selectedIcons.add(marker.weatherConditions);
        }
    });
    
    const filteredTexts = weatherConditions.reduce((result, condition) => {
        if ([...selectedIcons].includes(condition.icon)) {
            result.push(condition);
        }
        return result;
    }, [] as LegendMap[]);
    legendMarkers.value = filteredTexts;
};
watch(markersData, newVal => {
    createLegendIcons(newVal);
},{
    immediate: true,
});
</script>