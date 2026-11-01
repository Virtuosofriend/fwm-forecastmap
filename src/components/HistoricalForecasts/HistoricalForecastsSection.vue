<template>
    <section class="flex flex-col gap-2">
        <ForecastsCalendar
            v-model="date"
            @update-month-year="onUpdateMonthYear"
            @user-selected-forecast="handleUserSelectedForecast"
        />
        <BottomSheet v-model:open="isOpen" scrollable :label="`Πρόγνωση για ${date}`">
            <ForecastForm />
        </BottomSheet>
    </section>
</template>

<script setup lang="ts">
import { format, formatISO } from "date-fns";
import { getAllWeatherForecasts } from "@/services/fetchWeatherForecasts";
import { monthDates, monthDatesFromMonthYear } from "@/helpers/dates";
import { watch, ref } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";

import ForecastsCalendar from "@/components/Calendar/ForecastsCalendar.vue";
import BottomSheet from "@/components/Layout/BottomSheet.vue";
import ForecastForm from "@/components/Form/ForecastForm.vue";
import type { FormDataSchema } from "@/types";

const isOpen = ref<boolean>(false);

const { setPastForecasts, setForecastDetails } = useForecastDataStore();

const date = ref<string>(format(new Date(), "dd/MM/yyyy"));

const fetchForecasts = () => {
    let currentMonth = -1;
    let currentYear = 0;
    async function setForecasts(
        startDate: string,
        endDate: string,
        activeMonth: number,
        activeYear: number,
    ) {
        if (activeMonth !== currentMonth || activeYear !== currentYear) {
            const forecasts = await getAllWeatherForecasts({
                startDate,
                endDate,
            });
            if (forecasts.length > 0) {
                setPastForecasts(forecasts);
            }
            currentMonth = activeMonth;
            currentYear = activeYear;
        }
    }
    return setForecasts;
};

const execFetchForecasts = fetchForecasts();
watch(
    date,
    (newVal) => {
        const { firstDay, lastDay, currentMonth, currentYear } = monthDates(newVal);
        const startofDay = formatISO(firstDay).split("+")[0];
        const endOfDay = formatISO(lastDay).split("+")[0];
        if (startofDay && endOfDay) {
            execFetchForecasts(startofDay, endOfDay, currentMonth, currentYear);
        }
    },
    {
        immediate: true,
    },
);

const onUpdateMonthYear = (month: number, year: number) => {
    const { firstDay, lastDay, currentMonth, currentYear } = monthDatesFromMonthYear(month, year);
    const startofDay = formatISO(firstDay).split("+")[0];
    const endOfDay = formatISO(lastDay).split("+")[0];
    if (startofDay && endOfDay) {
        execFetchForecasts(startofDay, endOfDay, currentMonth, currentYear);
    }
};

const handleUserSelectedForecast = (forecast: FormDataSchema) => {
    setForecastDetails(forecast);
    isOpen.value = true;
};
</script>
