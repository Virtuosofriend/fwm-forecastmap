<template>
    <div v-if="isMapLoaded">
        <button
            class="px-2 py-1 bg-white text-gray-800 font-medium cursor-pointer"
            @click="handleUserClick"
        >
            Εξαγωγή χάρτη
        </button>
        <img class="relative hidden" id="#image-container" ref="imageContainer" />
    </div>
</template>

<script setup lang="ts">
import { toElement } from "@/utilities/maplibre-utilities";
import { computed, useTemplateRef } from "vue";
import { MapSettings, type ToElementFunctionOptions } from "@/types";
import { useMap } from "@indoorequal/vue-maplibre-gl";

const map = useMap(MapSettings.mapKey);
const isMapLoaded = computed(() => map.isLoaded);
const imageContainer = useTemplateRef("imageContainer");
const handleUserClick = async () => {
    const options: ToElementFunctionOptions = {
        targetImageId: "#image-container",
        hideAllControls: false,
        coverEdits: false,
        format: "png",
        hideControlsInCorner: ["top-right", "bottom-left", "bottom-right"],
    };
    try {
        const currentMap = map.map;
        if (!currentMap) {
            console.error("Map is not available");
            return;
        }
        await toElement(currentMap, options);
        if (!imageContainer.value) {
            console.error("Image container not found");
            return;
        }
        const dataUrl = imageContainer.value.src;
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "map_screenshot.png";
        link.click();
    } catch (error) {
        console.error("Error creating element from map:", error);
    }
};
</script>
