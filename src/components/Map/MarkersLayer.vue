<template>
    <TheMarker
        v-for="(marker, index) in forecastDetails.data"
        :key="index"
        :locationType="marker.locationType"
        :coordinates="marker.location"
        :assetId="marker.weatherConditions?.icon"
        :precipProbability="marker.precipProbability || undefined"
        :windDirection="marker.windDirection || undefined"
    >
        <template #markerText>
            <div v-if="marker.locationType === 'temp'" class="flex flex-col w-20 gap-1 -mt-2">
                <div class="flex items-center">
                    <div class="w-full bg-gray-800 text-center min-w-5 rounded-tl rounded-bl">
                        <p class="text-white text-lg font-bold">
                            {{ marker.tmin }}
                        </p>
                    </div>
                    <div class="w-full bg-white text-center min-w-5 rounded-tr rounded-br">
                        <p class="text-gray-800 text-lg font-bold">
                            {{ marker.tmax }}
                        </p>
                    </div>
                </div>
                <div
                    v-show="marker.snow && marker.snow > 0"
                    class="bg-white rounded-2xl flex items-center justify-center text-red-900 text-sm font-bold"
                >
                    <img src="/icons/snow.svg" class="size-4 mr-1" /> {{ marker.snow }} m
                </div>
            </div>
            <div
                v-if="marker.locationType === 'wind'"
                class="flex items-center gap-1 bg-white rounded-4xl p-0.5"
            >
                <div class="bg-gray-800 p-2 rounded-full size-7">
                    <WindIcon
                        class="size-full fill-white"
                        :style="{
                            transform: `rotate(${marker.windDirection}deg)`,
                        }"
                    ></WindIcon>
                </div>
                <div class="text-gray-800 text-lg font-bold">
                    {{ marker.wmin }} - {{ marker.wmax }}
                    <span class="inline text-xs">
                        {{ units[marker.locationType] }}
                    </span>
                </div>
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
import { storeToRefs } from "pinia";
import WindIcon from "@/components/icons/WindIcon.vue";

const { forecastDetails, warningLocations } = storeToRefs(useForecastDataStore());

const units: Record<string, string> = {
    temp: "˚C",
    wind: "Bft",
};
</script>
