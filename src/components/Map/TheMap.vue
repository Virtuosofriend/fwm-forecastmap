<template>
    <mgl-map
        :map-style="style"
        :center="center"
        :zoom="zoom"
        height="100%"
        :mapKey="MapSettings.mapKey"
        :attribute-control="false"
        :render-world-copies="false"
        :canvasContextAttributes="{ preserveDrawingBuffer: true }"
        @map:click="onMapClickEvt"
    >
        <GeoJson />
        <mgl-navigation-control />
        <MglCustomControl position="top-left">
            <slot name="legend"></slot>
        </MglCustomControl>
        <slot name="content"></slot>
    </mgl-map>
</template>

<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";
import { setWorkerUrl, type MapMouseEvent } from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { MglMap, MglNavigationControl, MglCustomControl } from "@indoorequal/vue-maplibre-gl";
import { MapSettings } from "@/types";
import GeoJson from "./GeoJson.vue";

setWorkerUrl(maplibreWorkerUrl);
const style =
    "https://api.maptiler.com/maps/01a14e13-7729-70a0-8b15-2e47da9b699e/style.json?key=TYk3u1G7CnLO2KSx5EAN";
const center: [number, number] = [22.430257, 38.908674];
const zoom = 9;

const emit = defineEmits(["onMapClick"]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onMapClickEvt = (ev: any) => {
    emit("onMapClick", ev.event as MapMouseEvent);
};
</script>
