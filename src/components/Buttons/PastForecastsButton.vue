<template>
    <button
        class="px-2 py-1 bg-white text-gray-800 font-medium cursor-pointer"
        @click="openCalendar"
    >
        Ιστορικό
    </button>
</template>

<script setup lang="ts">
const openCalendar = () => {
    console.log("clicked");
};
</script>
