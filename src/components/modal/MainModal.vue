<template>
    <Dialog
        :open="isOpen"
        class="relative z-1000"
    >
        <div class="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel class="w-full max-w-sm rounded bg-white p-4">
                <DialogTitle class="font-bold text-lg">
                    <slot name="title"></slot>
                </DialogTitle>
                <DialogDescription>
                    <slot name="body"></slot>
                </DialogDescription>
            </DialogPanel>
        </div>
    </Dialog>
</template>
  
<script setup lang="ts">
import { withDefaults } from "vue";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription
} from "@headlessui/vue";
  
withDefaults(defineProps<{
    isOpen: boolean;
 }>(), {
    isOpen: false,
});

</script>