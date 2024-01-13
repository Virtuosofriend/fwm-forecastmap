<template>
    <form class="flex flex-col">
        <div class="w-full">
            <label 
                for="tmax" 
                class="block text-sm font-medium leading-6 text-gray-900 my-2"
            >
                Τίτλος
            </label>
            <div 
                class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600"
            >
                <CommonInput
                    v-model="inputValue.comment"
                    placeholder="Καταιγίδα, χιόνι..."
                    input-name="weatherTitle"
                    input-type="text"
                ></CommonInput>
            </div>
        </div>
        <div class="w-full">
            <label 
                for="weatherConditions"
                class="block text-sm font-medium leading-6 text-gray-900 my-2"
            >
                Συνθήκες
            </label>
            <select 
                id="weatherConditions" 
                name="weatherConditions" 
                class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-md sm:text-smleading-6"
                v-model="inputValue.icon"
            >
                <option 
                    v-for="option in options"
                    :key="option.id"
                    :value="option.value"
                >
                    {{ option.text }}
                </option>
            </select>
        </div>
        <div class="w-1/3 mt-4">
            <button 
                class="bg-green-900 text-white rounded p-2 text-sm font-bold"
                @click.prevent="handleButtonSubmit"
            >
                Αποθήκευση
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineOptions, reactive } from "vue";
import type { WarningModalSchema } from "@/types";

import CommonInput from "@/components/sidebar/CommonInput.vue";

defineOptions({
    name: "ModalForm",
});

const emits = defineEmits(["onSubmit"]);

const options = [{
    id: 1,
    text: "Γενικό",
    value: "general",
},{
    id: 2,
    text: "Καταιγίδα",
    value: "storm",
},{
    id: 3,
    text: "Χιονόπτωση",
    value: "snow",
},{
    id: 4,
    text: "Άνεμος",
    value: "wind",
}];

let inputValue = reactive<WarningModalSchema>({
    icon: "general",
    comment: "",
});

const handleButtonSubmit = () => {
    emits("onSubmit", inputValue);
};
</script>