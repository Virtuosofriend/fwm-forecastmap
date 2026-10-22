<template>
    <div class="p-2 text-white">
        <div class="flex items-center justify-between border-gray-600">
            <h2 class="text-xl font-bold text-center">Εισαγωγή συνθηκών</h2>
            <SaveForecastButton :data="formData" />
        </div>
        <section class="mt-4">
            <form class="flex flex-col gap-4">
                <div class="flex gap-2 border-b border-gray-600 pb-4">
                    <div>
                        <label
                            for="weatherConditions"
                            class="block text-sm font-medium leading-6 my-2"
                        >
                            Ημ. Έκδοσης
                        </label>
                        <CustomPicker
                            v-model="formData.dates.created"
                            formatDate="dd/MM/yyyy"
                            :isRangeEnable="false"
                            :isTimeOnly="false"
                        ></CustomPicker>
                    </div>
                    <div>
                        <label
                            for="weatherConditions"
                            class="block text-sm font-medium leading-6 my-2"
                        >
                            Ημ. Πρόγνωσης
                        </label>
                        <CustomPicker
                            v-model="formData.dates.forecast_date"
                            formatDate="dd/MM/yyyy"
                            :isRangeEnable="false"
                            :isTimeOnly="false"
                        ></CustomPicker>
                    </div>
                    <div>
                        <label
                            for="weatherConditions"
                            class="block text-sm font-medium leading-6 my-2"
                        >
                            Χρ. Διάστημα
                        </label>
                        <CustomPicker
                            :isRangeEnable="true"
                            :isTimeOnly="true"
                            formatDate="HH:00"
                            v-model="formData.dates.forecast_range"
                        ></CustomPicker>
                    </div>
                </div>
                <!-- Temperatures -->
                <div
                    class="overflow-x-scroll pb-4 w-full max-w-full flex items-baseline gap-2 cursor-pointer min-h-36"
                >
                    <div
                        class="flex not-last:border-r border-dotted not-last:pr-3 border-gray-600 min-w-55"
                        v-for="(location, index) in temperatureLocations"
                        :key="index"
                    >
                        <div class="flex flex-col gap-2 w-full">
                            <h3 class="text-lg font-bold bg-amber-500 rounded-xl py-2 text-center">
                                {{ location.name }}
                            </h3>
                            <div class="flex flex-col gap-2">
                                <label for="weatherConditions" class="block text-sm font-medium">
                                    Συνθήκες
                                </label>
                                <select
                                    id="weatherConditions"
                                    name="weatherConditions"
                                    class="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-md sm:text-sm leading-6"
                                    v-model="getLocationData(location.value).weatherConditions"
                                >
                                    <option
                                        v-for="condition in weatherConditions"
                                        :key="condition.icon"
                                        :value="condition"
                                    >
                                        {{ condition.label }}
                                    </option>
                                </select>
                            </div>

                            <div
                                v-for="field in temperatureFields"
                                :key="field.value"
                                class="flex flex-col gap-2"
                            >
                                <label :for="field.value" class="block text-sm font-medium">
                                    {{ field.label }}
                                </label>
                                <div
                                    class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600"
                                >
                                    <CommonInput
                                        :placeholder="field.placeholderLabel"
                                        :input-name="field.value"
                                        :input-type="field.inputType"
                                        v-model="getLocationData(location.value)[field.value]"
                                    ></CommonInput>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Winds -->
                <div
                    class="overflow-x-scroll pb-4 w-full max-w-full flex items-baseline gap-2 cursor-pointer min-h-36"
                >
                    <div
                        class="flex not-last:border-r border-dotted not-last:pr-3 border-gray-600 min-w-55"
                        v-for="(location, index) in windLocations"
                        :key="index"
                    >
                        <div class="flex flex-col gap-2 w-full">
                            <h3 class="text-lg font-bold bg-amber-500 rounded-xl py-2 text-center">
                                {{ location.name }}
                            </h3>
                            <div class="flex flex-col gap-2">
                                <label for="windDirection" class="block text-sm font-medium">
                                    Διεύθυνση ανέμου
                                </label>
                                <select
                                    id="windDirection"
                                    name="windDirection"
                                    class="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-md sm:text-smleading-6"
                                    v-model="getLocationData(location.value).windDirection"
                                >
                                    <option
                                        v-for="direction in windDirection"
                                        :key="direction.degrees"
                                        :value="direction.degrees"
                                    >
                                        {{ direction.label }}
                                    </option>
                                </select>
                            </div>
                            <div
                                v-for="field in windFields"
                                :key="field.value"
                                class="flex flex-col gap-2"
                            >
                                <label :for="field.value" class="block text-sm font-medium">
                                    {{ field.label }}
                                </label>
                                <div
                                    class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus:ring-inset focus:ring-gray-600"
                                >
                                    <CommonInput
                                        :placeholder="field.placeholderLabel"
                                        :input-name="field.value"
                                        :input-type="field.inputType"
                                        v-model="getLocationData(location.value)[field.value]"
                                    ></CommonInput>
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
import { reactive, watch } from "vue";
import CustomPicker from "./CustomDatePicker.vue";
import CommonInput from "./CommonInput.vue";
import SaveForecastButton from "@/components/Buttons/SaveForecastButton.vue";

import { useWeatherDataProvider } from "@/composables/useWeatherDataProvider";
import { createEmptyForecastDetails } from "@/stores/helpers/forecastDataHelpers";
import type { ForecastDataSchema, FormDataSchema, WeatherLocations } from "@/types";
import { TypeOfMarkers } from "@/types";

const { locations, weatherConditions, windDirection } = useWeatherDataProvider();
const temperatureLocations = locations.value.filter((elem) => elem.temp);
const windLocations = locations.value.filter((elem) => elem.wind);

const temperatureFields = [
    {
        label: "Μεγ θερμοκρασία",
        value: "tmax",
        placeholderLabel: "Μέγιστη θερμοκρασία",
        inputType: "number",
    },
    {
        label: "Ελαχ θερμοκρασία",
        value: "tmin",
        placeholderLabel: "Ελάχιστη θερμοκρασία",
        inputType: "number",
    },
    {
        label: "Χιονόπτωση",
        value: "snow",
        placeholderLabel: "Σε m",
        inputType: "number",
    },
] as const;
const windFields = [
    {
        label: "Μεγ άνεμος",
        value: "wmax",
        placeholderLabel: "σε Bft",
        inputType: "number",
    },
    {
        label: "Ελαχ άνεμος",
        value: "wmin",
        placeholderLabel: "σε Bft",
        inputType: "number",
    },
] as const;

const formData = reactive<FormDataSchema>(createEmptyForecastDetails());
const getLocationData = (locationValue: string): ForecastDataSchema => {
    const locationData = formData.data[locationValue];
    if (!locationData) {
        throw new Error(`No forecast data initialized for location "${locationValue}"`);
    }
    return locationData;
};

const populateFormData = (locations: WeatherLocations[]) => {
    locations.forEach((element) => {
        const locationData: ForecastDataSchema = {
            location: element.location,
            locationType: TypeOfMarkers.temp,
        };

        if (element.temp) {
            locationData.tmax = null;
            locationData.tmin = null;
            locationData.weatherConditions = null;
        }
        if (element.wind) {
            locationData.wmax = null;
            locationData.wmin = null;
            locationData.windDirection = null;
            locationData.locationType = TypeOfMarkers.wind;
        }
        if (element.snow) {
            locationData.snow = 0;
        }

        formData.data[element.value] = locationData;
    });
};
populateFormData(locations.value);

watch(formData.dates, (newVal) => {
    if (newVal.forecast_range.length > 0) {
        formData.dates.forecast_start_hour = newVal.forecast_range[0] || "00:00";
        formData.dates.forecast_end_hour = newVal.forecast_range[1] || "00:00";
    }
});
</script>
