<template>
    <header class="h-16 bg-gray-800 text-white flex items-center justify-between gap-2">
        <img src="/logo-dark.png" class="hidden object-cover h-18 md:inline-block" />
        <img src="/logo_standalone.svg" class="object-cover h-16 md:hidden" />
        <div class="flex items-center gap-2 px-4">
            <NewForecastButton />
            <PastForecastsButton />
            <ExportMapButton />
        </div>
    </header>
</template>

<script setup lang="ts">
import ExportMapButton from "@/components/Buttons/ExportMap.vue";
import NewForecastButton from "@/components/Buttons/NewForecastButton.vue";
import PastForecastsButton from "@/components/Buttons/PastForecastsButton.vue";
</script>
