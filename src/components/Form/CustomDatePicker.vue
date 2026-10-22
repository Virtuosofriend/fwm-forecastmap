<template>
    <VueDatePicker
        v-model="inputDate"
        :model-type="formatDate"
        :locale="el"
        :action-row="{
            cancelBtnLabel: 'Άκυρο',
            selectBtnLabel: 'Επιλογή',
        }"
        :is-24="true"
        :range="isRangeEnable"
        :time-picker="isTimeOnly"
    ></VueDatePicker>
</template>

<script setup lang="ts">
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { el } from "date-fns/locale";

defineOptions({
    name: "CustomDatePicker",
});

withDefaults(
    defineProps<{
        formatDate: string;
        isRangeEnable: boolean;
        isTimeOnly: boolean;
    }>(),
    {
        formatDate: "dd/MM/yyyy",
        isRangeEnable: false,
        isTimeOnly: false,
    },
);

const inputDate = defineModel<string | string[] | null>();
</script>

<style>
.dp__menu {
    font-family: "Manrope";
}
.dp__input {
    font-family: "Manrope";
}
</style>
