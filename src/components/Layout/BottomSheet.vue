<template>
    <Teleport to="main">
        <div
            v-if="isOpen"
            class="absolute top-0 right-0 left-0 bottom-0 size-full bg-black opacity-50 z-10"
        ></div>
        <transition name="fade-slide">
            <section
                v-if="isOpen"
                ref="bottomSheet"
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
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { useBottomSheet } from "@/stores/bottomSheet";
import { storeToRefs } from "pinia";
import { ref } from "vue";

defineProps<{
    scrollable: boolean;
}>();

const bottomSheetStore = useBottomSheet();
const { isOpen } = storeToRefs(bottomSheetStore);
const { toggle } = bottomSheetStore;
const bottomSheet = ref<HTMLElement | null>(null);
console.log(bottomSheet.value);
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    transform: translateY(50px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    transform: translateY(0px);
}
</style>
