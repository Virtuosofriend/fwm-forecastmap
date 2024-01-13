<template>
    <VueDatePicker 
        v-model="inputDate"
        :format="formatDate"
        model-type="format"
        locale="el"
        cancelText="Άκυρο" 
        selectText="Επιλογή"
        :is-24="true"
        :range="isRangeEnable"
        :time-picker="isTimeOnly"
    ></VueDatePicker>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { 
    defineOptions,
    withDefaults,
    defineModel
} from "vue";

defineOptions({
    name: "CustomDatePicker",
});

withDefaults(defineProps<{
    formatDate: string;
    isRangeEnable: boolean;
    isTimeOnly: boolean;
 }>(), {
    formatDate: "dd/MM/yyyy",
    isRangeEnable: false,
    isTimeOnly: false,
});

const inputDate = defineModel<string | string[] | null>();
</script>