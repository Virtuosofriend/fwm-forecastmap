<template>
    <div class="bg-white/80 p-4 rounded">
        <p>
            Ημερομηνία έκδοσης: {{ forecastDetails.dates.created }}
        </p>
        <p>
            Ισχύς: 
            <span class="font-bold">
                {{ forecastDetails.dates.forecast_date }}
            </span> από 
            <span class="font-bold">
                {{ forecastDetails.dates.forecast_start_hour }}
            </span> έως 
            <span class="font-bold">
                {{ forecastDetails.dates.forecast_end_hour }}
            </span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineOptions } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";

defineOptions({
    name: "MapInfo",
});

const forecastDataStore = useForecastDataStore();
const { forecastDetails } = forecastDataStore;

</script>