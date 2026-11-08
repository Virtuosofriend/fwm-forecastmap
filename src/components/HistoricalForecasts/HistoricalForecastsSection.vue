<template>
    <section class="overflow-x-hidden">
        <Transition
            name="slide-scale"
            mode="out-in"
            @after-enter="onAfterEnter"
            @enter="resetScroll"
        >
            <div class="flex flex-col gap-2 focus:outline-none" v-if="activeView === 'calendar'">
                <h3 class="font-bold text-xl text-white">Επιλογή ημερομηνίας</h3>
                <ForecastsCalendar
                    v-model="date"
                    @update-month-year="onUpdateMonthYear"
                    @user-selected-forecast="handleUserSelectedForecast"
                />
            </div>
            <div class="flex flex-col focus:outline-none pt-2" v-else>
                <div class="flex items-center gap-2 mb-2 border-b border-gray-600 pb-2">
                    <h3 class="font-bold text-xl text-white w-full">
                        Προβολή πρόγνωσης {{ date }}
                    </h3>
                    <button
                        class="px-2 py-1 bg-gray-600 hover:bg-gray-900 text-white text-sm rounded cursor-pointer"
                        @click="handleBackToCalendar"
                    >
                        Επιστροφή στο ημερολόγιο
                    </button>
                </div>
                <ForecastForm />
            </div>
        </Transition>
    </section>
</template>

<script setup lang="ts">
import { format, formatISO } from "date-fns";
import { getAllWeatherForecasts } from "@/services/fetchWeatherForecasts";
import { monthDates, monthDatesFromMonthYear } from "@/helpers/dates";
import { watch, ref } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";

import ForecastsCalendar from "@/components/Calendar/ForecastsCalendar.vue";

import ForecastForm from "@/components/Form/ForecastForm.vue";
import type { FormDataSchema } from "@/types";

const { setPastForecasts, setForecastDetails } = useForecastDataStore();
const activeView = ref<"calendar" | "forecast">("calendar");
const date = ref<string>(format(new Date(), "dd/MM/yyyy"));
const direction = ref<"1" | "-1">("1");

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

            setPastForecasts(forecasts);
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
    direction.value = "1";
    activeView.value = "forecast";
};

const handleBackToCalendar = () => {
    direction.value = "-1";
    activeView.value = "calendar";
};

const onAfterEnter = (el: Element) => {
    if (el instanceof HTMLElement) {
        el.tabIndex = -1;
        el.focus({ preventScroll: true });
    }
};

const resetScroll = (el: Element) => {
    el.closest('[role="dialog"]')?.scrollTo({ top: 0, behavior: "instant" });
};
</script>

<style lang="css" scoped>
.slide-scale-enter-active {
    transition: all 0.3s ease-out;
}

.slide-scale-leave-active {
    transition: all 0.2s ease-in;
}

.slide-scale-enter-from {
    transform: translateX(calc(v-bind("direction") * 100%));
}

.slide-scale-leave-to {
    transform: translateX(calc(v-bind("direction") * -100%));
}
</style>
