<template>
    <div class="bg-white p-2 rounded">
        <p>Ημερομηνία έκδοσης: {{ forecastDetails.dates.created }}</p>
        <p class="flex gap-1">
            Ισχύει για
            <span class="font-bold"> {{ forecastDetails.dates.forecast_date }}</span>
            <span class="font-bold">
                {{ forecastDetails.dates.forecast_start_hour }}
            </span>
            -
            <span class="font-bold">
                {{ forecastDetails.dates.forecast_end_hour }}
            </span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { useForecastDataStore } from "@/stores/forecastData";

defineOptions({
    name: "MapInfo",
});

const forecastDataStore = useForecastDataStore();
const { forecastDetails } = forecastDataStore;
</script>
