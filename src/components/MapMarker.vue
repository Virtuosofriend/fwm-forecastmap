<template>
    <l-marker
        :lat-lng="location"
        :draggable="draggable"
    >
        <slot></slot>
    </l-marker>
</template>

<script setup lang="ts">
import { LMarker } from "@vue-leaflet/vue-leaflet";
import { defineOptions, type PropType } from "vue";
import type { LatLngExpression } from "leaflet";

defineOptions({
    name: "MapMarker",
});

defineProps({
    location: {
        required: true,
        type: Object as PropType<LatLngExpression>,
    },
    draggable: {
        required: false,
        type: Boolean,
    },
});
</script>