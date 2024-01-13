<template>
    <div class="p-4">
        <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-semibold text-gray-900 text-center">
                Εισαγωγή συνθηκών
            </h2>
            <button 
                class="bg-green-900 text-white rounded p-2 text-sm font-bold"
                disabled
            >
                Αποθήκευση
            </button>
            <!-- <button 
                class="bg-red-900 text-white rounded p-2 text-sm font-bold"
                @click="populateData"
            >
                populate
            </button> -->
        </div>
        <section class="overflow-y-auto sidebar">
            <form>
                <div class="grid grid-cols-12 gap-4 py-6">
                    <div class="col-span-6">
                        <label 
                            for="weatherConditions"
                            class="block text-sm font-medium leading-6 text-gray-900 my-2"
                        >
                            Ημερομηνία εκδοσης
                        </label>
                        <CustomPicker
                            v-model="date_created"
                        ></CustomPicker>
                    </div>
                    <div class="col-span-6">
                        <label 
                            for="weatherConditions"
                            class="block text-sm font-medium leading-6 text-gray-900 my-2"
                        >
                            Ημερομηνία πρόγνωσης
                        </label>
                        <CustomPicker
                            v-model="date_forecast"
                        ></CustomPicker>
                    </div>
                    <div class="col-span-12">
                        <label 
                            for="weatherConditions"
                            class="block text-sm font-medium leading-6 text-gray-900 my-2"
                        >
                            Χρονικό διάστημα
                        </label>
                        <CustomPicker 
                            :isRangeEnable="true"
                            :isTimeOnly="true"
                            formatDate="HH:00"
                            v-model="date_range"
                        ></CustomPicker>
                    </div>
                </div>
                <div 
                    class="grid grid-cols-12 border-b border-gray-900/10 py-6"
                    v-for="(location,index) in locations"
                    :key="index"
                >
                    <div class="col-span-12 p-2">
                        <h3 class="leading-6 text-lg font-bold mb-2">
                            <span class="bg-black rounded text-white p-2 px-4 text-md mr-2">{{ index + 1 }}</span>{{ location.name }}
                        </h3>
                        <div class="grid grid-cols-12 gap-4">
                            <div
                                v-if="location.temp"
                                class="col-span-12"
                            >
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
                                    v-model="formData[location.value].weatherConditions"
                                >
                                    <option 
                                        v-for="condition in weatherConditions"
                                        :key="condition.icon"
                                        :value="condition.icon"
                                    >
                                        {{ condition.text }}
                                    </option>
                                </select>
                            </div>
                            <div
                                v-if="location.temp"
                                class="col-span-12 flex items-center gap-4"
                            >
                                <div class="w-full">
                                    <label 
                                        for="tmax" 
                                        class="block text-sm font-medium leading-6 text-gray-900 my-2"
                                    >
                                        Μεγ Θερμ.
                                    </label>
                                    <div 
                                        class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600"
                                    >
                                        <CommonInput
                                            v-model="formData[location.value].tmax"
                                            placeholder="Μέγιστη"
                                            input-name="tmax"
                                            input-type="number"
                                        ></CommonInput>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <label 
                                        for="tmin" 
                                        class="block text-sm font-medium leading-6 text-gray-900 my-2"
                                    >
                                        Ελαχ Θερμ.
                                    </label>
                                    <div 
                                        class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-md">
                                        <CommonInput
                                            v-model="formData[location.value].tmin"
                                            placeholder="Ελάχιστη"
                                            input-name="tmin"
                                            input-type="number"
                                        ></CommonInput>
                                    </div>
                                </div>
                            </div>
                            <div 
                                v-if="location.snow"
                                class="col-span-12"
                            >
                                <label 
                                    for="snow"
                                    class="block text-sm font-medium leading-6 text-gray-900 my-2"
                                >
                                    Χιονόπτωση
                                </label>
                                <div 
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-md"
                                >
                                    <CommonInput
                                        v-model="formData[location.value].snow"
                                        placeholder="Σε m"
                                        input-name="snow"
                                        input-type="number"
                                    ></CommonInput>
                                </div>
                            </div>
                            <div 
                                v-if="location.wind"
                                class="col-span-12"
                            >
                                <label 
                                    for="windDirection"
                                    class="block text-sm font-medium leading-6 text-gray-900 my-2"
                                >
                                    Διεύθυνση ανέμου
                                </label>
                                <select 
                                    id="windDirection"
                                    name="windDirection"
                                    class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-md sm:text-smleading-6"
                                    v-model="formData[location.value].windDirection"
                                >
                                    <option 
                                        v-for="direction in sortedWindDirection"
                                        :key="direction.degrees"
                                        :value="direction.degrees"
                                    >
                                        {{ direction.label }}
                                    </option>
                                </select>
                                <div class="flex items-center gap-2">
                                    <div class="w-full">
                                        <label 
                                            for="wmax"
                                            class="block text-sm font-medium leading-6 text-gray-900 my-2"
                                        >
                                            Μεγ. άνεμος
                                        </label>
                                        <div 
                                            class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600">
                                            <CommonInput
                                                v-model="formData[location.value].wmax"
                                                placeholder="σε Bft"
                                                input-name="wmax"
                                                input-type="number"
                                            ></CommonInput>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <label 
                                            for="wmin"
                                            class="block text-sm font-medium leading-6 text-gray-900 my-2"
                                        >
                                            Ελαχ. άνεμος
                                        </label>
                                        <div 
                                            class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600">
                                            <CommonInput
                                                v-model="formData[location.value].wmin"
                                                placeholder="σε Bft"
                                                input-name="wmin"
                                                input-type="number"
                                            ></CommonInput>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
import { defineOptions, ref, watch } from "vue";
import { useWeatherOptionsStore } from "@/stores/weather";
import { useForecastDataStore } from "@/stores/forecastData";
import CommonInput from "./CommonInput.vue";
import CustomPicker from "./CustomDatePicker.vue";
import type { ForecastHourSchema } from "@/types";

defineOptions({
    name: "SideBar",
});

const weatherStore = useWeatherOptionsStore();
const { locations, weatherConditions, windDirection } = weatherStore;

let sortedWindDirection = windDirection.sort((a,b) => a.order - b.order);

const forecastDataStore = useForecastDataStore();
const { forecastDetails: form } = forecastDataStore;
const formData = form.data;
const formDates = form.dates;

const date_created = ref<string | null>(null);
const date_forecast = ref<string | null>(null);
const date_range = ref<string[] | null>([]);

watch(date_created, (newVal) => {
    if (newVal) {
        populateDatesData("created", newVal);
    }
});

watch(date_forecast, (newVal) => {
    if (newVal) {
        populateDatesData("forecast_date", newVal);
    }
});

watch(date_range, (newVal) => {
    if (newVal) {
        const newDate = { ...date_range.value };
        const forecast_start_hour = newDate[0];
        const forecast_end_hour = newDate[1];
        populateDatesData("forecast_start_hour", forecast_start_hour);
        populateDatesData("forecast_end_hour", forecast_end_hour);
    }
});

const populateDatesData = (property: keyof ForecastHourSchema & string, val: string) => {
    formDates[property] = val;
};
// const populateData = () => {
//     for(let value in formData){
//         if("tmax" in formData[value]) {
//             formData[value].tmax = 1;
//             formData[value].tmin = 1;
//             formData[value].weatherConditions = "day/sunny";
//         }
//         if("wmax" in formData[value]) {
//             formData[value].wmax = 4;
//             formData[value].wmin = 1;
//             formData[value].windDirection = 90;
//         }
//     }

// };
</script>

<style scoped>
.sidebar {
    height: calc(100vh - 120px);
}
</style>