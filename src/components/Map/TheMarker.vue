<template>
    <mgl-marker :coordinates="coordinates" :draggable="draggable">
        <template #marker>
            <div class="flex flex-col gap-2 items-center">
                <div class="w-14 relative" v-if="locationType === TypeOfMarkers.temp && assetId">
                    <img :src="`${backendUrl}/assets/${assetId}`" class="w-14" />
                    <div
                        v-if="precipProbability"
                        class="absolute -top-1 left-12 text-amber-800 bg-white rounded font-bold px-1 shadow"
                    >
                        {{ `${precipProbability}%` }}
                    </div>
                </div>
                <div v-if="locationType === 'warning'" class="w-10 h-10">
                    <img :src="`icons/warnings/${warningIcon}.png`" class="w-full" />
                </div>
                <slot name="markerText"></slot>
            </div>
        </template>
    </mgl-marker>
</template>

<script setup lang="ts">
import { MglMarker } from "@indoorequal/vue-maplibre-gl";
import type { LngLatLike } from "maplibre-gl";
import { TypeOfMarkers } from "@/types";

defineOptions({
    name: "TheMarker",
});

withDefaults(
    defineProps<{
        coordinates: LngLatLike;
        locationType: TypeOfMarkers.temp | TypeOfMarkers.warning | TypeOfMarkers.wind;
        assetId?: string | null | undefined;
        precipProbability?: number;
        windDirection?: number;
        warningIcon?: string;
        draggable?: boolean;
    }>(),
    {
        draggable: false,
    },
);
const backendUrl = import.meta.env.VITE_DIRECTUS_API;
</script>
