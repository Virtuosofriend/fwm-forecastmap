<template>
    <TheMarker
        v-for="(marker, index) in forecastDetails.data"
        :key="index"
        :locationType="marker.locationType"
        :coordinates="marker.location"
        :assetId="marker.weatherConditions?.icon"
        :windDirection="marker.windDirection || undefined"
    >
        <template #markerText>
            <div class="bg-white rounded p-1">
                <p class="text-gray-800 text-sm font-extrabold">
                    {{ marker.tmin || marker.wmin }}<span class="font-medium">...</span
                    >{{ marker.tmax || marker.wmax }}{{ units[marker.locationType] }}
                </p>
            </div>
        </template>
    </TheMarker>
    <TheMarker
        v-for="(warning, index) in warningLocations"
        :key="index"
        :coordinates="warning.location"
        :locationType="warning.locationType"
        :warningIcon="warning.icon"
        draggable
    >
        <template #markerText>
            <div class="bg-red-900 p-1 rounded">
                <p class="text-white text-sm font-extrabold">
                    {{ warning.comment }}
                </p>
            </div>
        </template>
    </TheMarker>
</template>

<script setup lang="ts">
import { useForecastDataStore } from "@/stores/forecastData";
import TheMarker from "@/components/Map/TheMarker.vue";

const { forecastDetails, warningLocations } = useForecastDataStore();
const units: Record<string, string> = {
    temp: "˚C",
    wind: "Bft",
};
</script>
