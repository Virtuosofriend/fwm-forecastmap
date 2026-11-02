<template>
    <button
        class="px-2 py-1 bg-white text-gray-800 font-medium rounded cursor-pointer"
        @click="handleOpen"
    >
        <span> Νέα πρόγνωση </span>
    </button>
    <BottomSheet v-model:open="isOpen" scrollable label="Νέα πρόγνωση">
        <ForecastForm />
    </BottomSheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BottomSheet from "@/components/Layout/BottomSheet.vue";
import ForecastForm from "@/components/Form/ForecastForm.vue";
import { useForecastDataStore } from "@/stores/forecastData";

const isOpen = ref<boolean>(false);
const { resetForecastDetails } = useForecastDataStore();

const handleOpen = () => {
    resetForecastDetails();
    isOpen.value = true;
};
</script>
