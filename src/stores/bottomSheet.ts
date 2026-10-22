import { ref } from "vue";
import { defineStore } from "pinia";

export const useBottomSheet = defineStore("bottomSheet", () => {
    const isOpen = ref(false);
    function toggle() {
        isOpen.value = !isOpen.value;
    }

    return { isOpen, toggle };
});
