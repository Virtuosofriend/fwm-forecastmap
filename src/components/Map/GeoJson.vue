<template>
    <MglGeoJsonSource v-if="geojson" source-id="geojson" :data="geojson">
        <MglFillLayer layer-id="geojson-fill" :paint="fill" />
    </MglGeoJsonSource>
</template>

<script setup lang="ts">
import { MglGeoJsonSource, MglFillLayer } from "@indoorequal/vue-maplibre-gl";
import { ref } from "vue";

defineOptions({
    name: "GeoJson",
});

const geojson = ref<GeoJSON.FeatureCollection | null>(null);
const fill = { "fill-color": "#F8E0A4", "fill-opacity": 0.5 };

const fetchGeoJSON = async () => {
    const response = await fetch(`/geo/fthiotis.geo.json`);
    const result = await response.json();
    geojson.value = result;
};
fetchGeoJSON();
</script>
