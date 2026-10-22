<template>
    <TheHeader />
    <section class="w-full h-[calc(100vh-4rem)] relative">
        <TheMap @onMapClick="handleOnMapClick">
            <template #content>
                <MarkersLayer />
            </template>
            <template #legend>
                <div class="flex flex-col gap-1 bg-black">
                    <MapInfo />
                    <MapLegend />
                </div>
            </template>
        </TheMap>
        <MainModal :is-open="isModalOpen">
            <template #title> Προσθήκη προειδοποίησης </template>
            <template #body>
                <ModalForm @onSubmit="onSubmitForm"></ModalForm>
            </template>
        </MainModal>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWeatherOptionsStore } from "@/stores/weather";
import { withAsync } from "@/services/httpClient/helpers/withAsync.mjs";
import { getWeatherConditions } from "@/services/httpClient/directusSourcesApi.mjs";
import type { WeatherConditions, WarningModalSchema } from "@/types";
import type { MapMouseEvent } from "maplibre-gl";

import TheMap from "@/components/Map/TheMap.vue";
import TheHeader from "@/components/Layout/TheHeader.vue";
import MarkersLayer from "@/components/Map/MarkersLayer.vue";
import MapInfo from "@/components/Map/MapInfo.vue";
import MapLegend from "@/components/Map/MapLegend.vue";
import MainModal from "@/components/modal/MainModal.vue";
import ModalForm from "@/components/modal/components/ModalForm.vue";

import { handleModalFormSubmit } from "@/components/modal/handleForm";
defineOptions({
    name: "HomePage",
});

const weatherStore = useWeatherOptionsStore();
const { setWeatherConditions } = weatherStore;

const getAllWeatherConditions = async (): Promise<WeatherConditions[]> => {
    const { response, error } = await withAsync(getWeatherConditions);

    if (error || !response) {
        return [];
    }
    const conditions = (response as { data: { data: WeatherConditions[] } }).data.data;
    setWeatherConditions(conditions);
    return conditions;
};

const mapEvent = ref<[number, number]>([0, 0]);
const isModalOpen = ref(false);
const handleOnMapClick = (ev: MapMouseEvent) => {
    const { lng, lat } = ev.lngLat;
    mapEvent.value = [lng, lat];
    isModalOpen.value = true;
};

const onSubmitForm = (form: WarningModalSchema) => {
    handleModalFormSubmit({
        form,
        location: mapEvent.value,
    });
    isModalOpen.value = false;
};
getAllWeatherConditions();
</script>
