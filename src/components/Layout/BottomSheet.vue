<template>
    <Teleport to="main">
        <transition name="fade-in">
            <div
                v-if="isOpen"
                class="fixed inset-0 bg-black/50 z-9"
                @click="handleClickOutside"
            ></div>
        </transition>
        <transition name="fade-slide" @after-enter="focusElement" @after-leave="restoreFocus">
            <section
                v-if="isOpen"
                class="fixed rounded-t-2xl md:translate-x-1/2 bottom-0 left-0 w-full md:w-1/2 h-10/12 bg-gray-800 p-4 shadow-2xl z-10"
                :class="{
                    'overflow-y-scroll max-h-full': scrollable,
                }"
                ref="bottomSheet"
                tabindex="-1"
                role="dialog"
                aria-modal="true"
                :aria-label="label"
                @keydown.esc="close"
            >
                <div class="flex justify-end">
                    <button
                        class="text-white bg-amber-900 cursor-pointer px-2 py-1 text-sm font-black rounded-xl"
                        aria-label="Κλείσιμο"
                        type="button"
                        @click="close"
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
import { ref, watch } from "vue";

interface Props {
    label: string;
    scrollable?: boolean;
    closeOnClickOutside?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    scrollable: false,
    closeOnClickOutside: true,
});

const emit = defineEmits<{
    (e: "opened"): void;
    (e: "closed"): void;
}>();

const isOpen = defineModel<boolean>("open", { required: true });

const close = () => (isOpen.value = false);

const handleClickOutside = () => {
    if (props.closeOnClickOutside) {
        return close();
    }
};

const bottomSheet = ref<HTMLElement | null>(null);
let activeElement: HTMLElement | null = null;

const focusElement = () => {
    bottomSheet.value?.focus();
};

const restoreFocus = () => {
    activeElement?.focus();
};

watch(isOpen, (newVal) => {
    if (newVal) {
        activeElement = document.activeElement as HTMLElement;
        emit("opened");
    } else {
        emit("closed");
    }
});
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

.fade-in-enter-active,
.fade-in-leave-active {
    transition: opacity 0.2s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
    opacity: 0;
}

.fade-in-enter-to,
.fade-in-leave-from {
    opacity: 1;
}
</style>
