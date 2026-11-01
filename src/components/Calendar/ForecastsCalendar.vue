<template>
    <div class="flex flex-col gap-4 py-2">
        <VueDatePicker
            v-model="date"
            inline
            auto-apply
            dark
            :locale="el"
            :action-row="{
                cancelBtnLabel: 'Άκυρο',
                selectBtnLabel: 'Επιλογή',
            }"
            model-type="dd/MM/yyyy"
            prevent-min-max-navigation
            :min-date="minAllowed"
            :max-date="maxAllowed"
            :ui="{ menu: 'calendar-full' }"
            :hide-navigation="['time']"
            :markers="calendarMarkers"
            @update-month-year="handleUpdateMonthYear"
        >
            <template #top-extra>
                <div class="pb-2 flex items-center justify-center gap-1">
                    <p class="text-white text-center text-sm py-4">
                        Οι προγνώσεις είναι διαθέσιμες από
                    </p>
                    <button
                        type="button"
                        class="text-white text-sm font-bold cursor-pointer"
                        @click="date = '25/07/2025'"
                    >
                        25/07/2025
                    </button>
                </div>
            </template>
            <template #action-extra="{ selectCurrentDate }">
                <button
                    class="bg-gray-700 text-white w-2/5 p-1 rounded-lg cursor-pointer"
                    type="button"
                    @click="selectCurrentDate()"
                >
                    Σήμερα
                </button>
            </template>
        </VueDatePicker>

        <div class="flex flex-col items-center gap-2">
            <h3 class="text-white font-bold">Διαθέσιμες προγνώσεις</h3>
            <button
                v-for="(forecast, index) in forecastWithSelectedDate"
                :key="index"
                type="button"
                class="bg-gray-700 hover:bg-gray-900 text-white p-3 rounded-xl w-full cursor-pointer"
                @click="emit('userSelectedForecast', forecast)"
            >
                <p class="text-left">
                    Πρόγνωση για:
                    <span class="inline-block ml-2 font-bold">
                        {{ forecast.dates.forecast_date }}
                    </span>
                </p>
                <p class="mt-2 text-left">
                    Διάστημα πρόγνωσης:
                    {{
                        `${forecast.dates.forecast_start_hour} - ${forecast.dates.forecast_end_hour}`
                    }}
                </p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { el } from "date-fns/locale";
import { useHistoricalForecastProvider } from "@/composables/useHistoricalForecastsProvider";
import { minMaxCalendarAllowedDate } from "@/helpers/dates";
import type { FormDataSchema } from "@/types";

const { minAllowed, maxAllowed } = minMaxCalendarAllowedDate();

const date = defineModel<string>();
const emit = defineEmits<{
    (e: "updateMonthYear", month: number, year: number): void;
    (e: "userSelectedForecast", data: FormDataSchema): void;
}>();

const handleUpdateMonthYear = (value: { instance: number; month: number; year: number }) => {
    emit("updateMonthYear", value.month, value.year);
};

const { forecastsPerDate, calendarMarkers } = useHistoricalForecastProvider();
const forecastWithSelectedDate = computed(() => {
    if (date.value) {
        return forecastsPerDate.value[date.value];
    }
    return null;
});
</script>

<style lang="css">
.dp--outer-menu-wrap:has(.calendar-full) {
    width: 100%;
}
.calendar-full {
    width: 100%;
    height: 100%;
}
</style>
