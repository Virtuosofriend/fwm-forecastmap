<template>
    <l-geo-json
        v-if="geojson"
        :geojson="geojson" 
        :options-style="geoStyler"
    ></l-geo-json>
</template>

<script setup lang="ts">
import { LGeoJson } from "@vue-leaflet/vue-leaflet";
import { ref, defineOptions } from "vue";
import type { StyleFunction } from "leaflet";

defineOptions({
    name: "GeoJson",
});

const props = defineProps({
    geojsonUrl: {
        required: true,
        type: String,
    },
});

const geojson = ref<GeoJSON.FeatureCollection | null>(null);
const geoStyler: StyleFunction = () => {
    return {
        fill: true,
        fillColor: "#6787b4",
        fillOpacity: .5,
        weight: 1,
        opacity: .7,
        color: "#003157",
        dashArray: "1",
    };
};
const fetchGeoJSON = async () => {
    const response = await fetch(`/geo/${props.geojsonUrl}`);
    const result = await response.json();
    geojson.value = result;
};
fetchGeoJSON();
</script>