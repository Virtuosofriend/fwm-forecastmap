<template>
    <header class="h-16 bg-gray-800 text-white flex items-center justify-between gap-2">
        <h2 class="text-xl font-bold text-white px-4">Fthiotida Meteogroup - Προγνώσεις</h2>
        <div class="flex items-center gap-2 px-4">
            <MenuButton />
            <ExportMapButton />
        </div>
    </header>
</template>

<script setup lang="ts">
import ExportMapButton from "@/components/Buttons/ExportMap.vue";
import MenuButton from "@/components/Buttons/MenuButton.vue";
</script>
