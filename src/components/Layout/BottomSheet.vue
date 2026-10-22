<template>
    <Teleport to="main">
        <section
            v-if="isOpen"
            class="fixed rounded-t-2xl md:translate-x-1/2 bottom-0 left-0 w-full md:w-1/2 h-10/12 bg-gray-800 p-4 shadow-2xl z-10"
            :class="{
                'overflow-y-scroll max-h-full': scrollable,
            }"
        >
            <div class="flex justify-end">
                <button
                    class="text-white bg-amber-900 cursor-pointer px-2 py-1 text-sm font-black rounded-xl"
                    @click="toggle"
                >
                    X
                </button>
            </div>
            <slot></slot>
        </section>
    </Teleport>
</template>

<script setup lang="ts">
import { useBottomSheet } from "@/stores/bottomSheet";
import { storeToRefs } from "pinia";

defineProps<{
    scrollable: boolean;
}>();

const bottomSheetStore = useBottomSheet();
const { isOpen } = storeToRefs(bottomSheetStore);
const { toggle } = bottomSheetStore;
</script>
