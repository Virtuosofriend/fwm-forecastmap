<template>
    <VueDatePicker
        v-model="inputDate"
        :model-type="formatDate"
        :locale="el"
        :action-row="{
            cancelBtnLabel: 'Άκυρο',
            selectBtnLabel: 'Επιλογή',
        }"
        :range="isRangeEnable"
        :min-date="new Date()"
        :time-picker="isTimeOnly"
        :auto-apply="!isTimeOnly"
        :formats="formats"
        :time-config="{
            enableTimePicker: isTimeOnly,
            ignoreTimeValidation: true,
            startTime: [
                { hours: 0, minutes: 0 },
                { hours: 23, minutes: 0 },
            ],
        }"
    ></VueDatePicker>
</template>

<script setup lang="ts">
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { el } from "date-fns/locale";
import { computed } from "vue";

defineOptions({
    name: "CustomDatePicker",
});

const props = withDefaults(
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
const formats = computed(() => {
    return props.isTimeOnly ? { input: "HH:mm" } : { input: "dd/MM/yyyy" };
});
</script>
