<template>
    <button
        class="px-2 py-1 bg-white text-gray-800 rounded font-medium cursor-pointer"
        @click="openCalendar"
    >
        Ιστορικό προγνώσεων
    </button>
    <BottomSheet
        v-model:open="isOpen"
        scrollable
        label="Ιστορικό προγνώσεων"
        :closeOnClickOutside="false"
    >
        <HistoricalForecastsSection />
    </BottomSheet>
</template>

<script setup lang="ts">
import BottomSheet from "@/components/Layout/BottomSheet.vue";
import HistoricalForecastsSection from "@/components/HistoricalForecasts/HistoricalForecastsSection.vue";
import { ref } from "vue";

const isOpen = ref<boolean>(false);

const openCalendar = async () => {
    isOpen.value = true;
};
</script>
