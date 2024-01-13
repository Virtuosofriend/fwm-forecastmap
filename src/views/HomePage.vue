<template>
  <main class="flex w-full h-full">
    <div 
        class="w-full relative"
    >
        <div 
            class="absolute z-[1000] flex flex-col gap-2"
            :class="{
                'top-0 right-0': expandMenu,
                'right-2 top-2': !expandMenu
            }"
        >
            <button class="bg-white rounded p-2 shadow" @click="changeVisibility"> 
                <img :src="menuIcon">
            </button>
        </div>
        <TheMap>
            <template #default>
                <div class="absolute top-2 left-2 z-[1000]">
                    <MapInfo v-if="forecastDetails.dates.created || forecastDetails.dates.forecast_date || forecastDetails.dates.forecast_end_hour || forecastDetails.dates.forecast_start_hour"></MapInfo>
                    <MapLegend class="mt-2"></MapLegend>
                </div>
                <MapMarker 
                    v-for="(marker, city) in markersData" 
                    :key="city"
                    :location="marker.location"
                >
                    <l-icon
                        :icon-size="[120,50]"
                        v-if="marker.weatherConditions != null"
                    >
                        <div class="flex flex-col items-center justify-center">
                            <div class="mb-2">
                                <img 
                                    :src="`icons/weather_conditions/${marker.weatherConditions}.svg`"
                                    class="!w-14"
                                />
                            </div>
                            <div 
                                v-show="marker.tmin != null && marker.tmax != null"
                                class="bg-white/60 rounded px-2 py-1"
                            >
                                <p class="text-base font-bold">
                                    {{ marker.tmin }}...{{ marker.tmax }} ˚C
                                    <span class="flex items-center justify-center text-red-500 text-sm font-medium" v-show="marker.snow != null">
                                        <img src="/icons/snow.svg" class="w-5 h-5 mr-1">{{ marker.snow }}m
                                    </span>
                                </p>
                            </div>
                        </div>
                    </l-icon>
                    <l-icon
                        :icon-size="[120,50]"
                        v-if="marker.windDirection != null"
                    >
                        <div class="flex flex-col items-center justify-center">
                            <div class="mb-0">
                                <WindIcon
                                    class="w-20 h-6 mb-2"
                                    :style="{
                                        transform: `rotate(${marker.windDirection}deg)`
                                    }"  
                                ></WindIcon>
                            </div>
                            <div 
                                v-show="marker.wmin != null && marker.wmax != null"
                                class="bg-white/60 rounded px-2 py-1"
                            >
                                <p class="text-base font-bold">
                                    {{ marker.wmin }}...{{ marker.wmax }} Bft
                                </p>
                            </div>
                        </div>
                    </l-icon>
                </MapMarker>
                <GeoJson
                    geojson-url="fthiotis.geo.json"
                ></GeoJson>
            </template>
        </TheMap>
    </div>
    <div 
        :class="{
            'hidden': !expandMenu,
            'w-1/3': expandMenu
        }"
    >
        <SideBar></SideBar>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineOptions, ref, computed } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";
import { useMarkersData } from "@/composables/useInputData";

import { LIcon } from "@vue-leaflet/vue-leaflet";
import TheMap from "@/components/TheMap.vue";
import SideBar from "@/components/sidebar/SideBar.vue";
import GeoJson from "@/components/GeoJson.vue";
import MapMarker from "@/components/MapMarker.vue";
import WindIcon from "@/components/icons/WindIcon.vue";
import MapInfo from "@/components/Map/MapInfo.vue";
import MapLegend from "@/components/Map/MapLegend.vue";

defineOptions({
    name: "HomePage",
});

const expandMenu = ref<boolean>(false);
const changeVisibility = () => expandMenu.value = !expandMenu.value;
const menuIcon = computed<string>(() => {
    return expandMenu.value ? "icons/close.svg" : "icons/menu.svg";
});
useMarkersData();
const forecastDataStore = useForecastDataStore();
const { forecastDetails } = forecastDataStore;
const markersData = forecastDetails.data;
</script>