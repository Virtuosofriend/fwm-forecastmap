<template>
    <input 
        :type="inputType" 
        :name="inputName" 
        :id="inputName" 
        class="w-full border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none" 
        :placeholder="placeholder"
        v-model="inputValue"
    >
</template>

<script setup lang="ts">
import { 
    defineOptions,
    withDefaults,
    defineModel
} from "vue";

defineOptions({
    name: "CommonInput",
});

withDefaults(defineProps<{
    placeholder?: string;
    inputType: string;
    inputName: string;
 }>(), {
    placeholder: "---",
    inputType: "number",
    inputName: "",
});

let inputValue = defineModel<number | string | null>();
</script>