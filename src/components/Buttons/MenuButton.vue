<template>
    <button
        class="px-2 py-1 bg-white text-gray-800 font-medium rounded cursor-pointer"
        @click="toggelBottomSheet"
    >
        Νέα πρόγνωση
    </button>
    <BottomSheet scrollable>
        <ForecastForm />
    </BottomSheet>
</template>

<script setup lang="ts">
import { useBottomSheet } from "@/stores/bottomSheet";
import BottomSheet from "@/components/Layout/BottomSheet.vue";
import ForecastForm from "@/components/Form/ForecastForm.vue";

const toggelBottomSheet = () => {
    const bottomSheetStore = useBottomSheet();
    bottomSheetStore.toggle();
};
</script>
