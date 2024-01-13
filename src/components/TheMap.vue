<template>
  <div class="w-[100%] h-[100vh] relative">
    <l-map 
        ref="map" 
        :zoom="zoom" 
        :center="[38.908674, 22.430257]"
        :useGlobalLeaflet="false"
        @ready="emitMap"
        @click="$emit('mapClick', $event)"
    >
        <l-tile-layer
            url="https://api.mapbox.com/styles/v1/virtuosofriend/cipcir9ze005lcqniifuijd3u/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlydHVvc29mcmllbmQiLCJhIjoiY2lwY2lvc3ZjMDAyNnZobm5haDZ1M2VrcSJ9.IGVbY93V5cF7KvEVJnmUTQ"
            layer-type="base"
            name="Mapbox"
        ></l-tile-layer>
        <slot></slot>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref, defineOptions } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";
import type { Map } from "leaflet";

defineOptions({
    name: "TheMap",
});

defineEmits(["mapClick"]);

const zoom = ref<number>(10);
const forecastDataStore = useForecastDataStore();
const { setMap } = forecastDataStore;
const emitMap = (ev: Map) => {
    setMap(ev);
};
</script>