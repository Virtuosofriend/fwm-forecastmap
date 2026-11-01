import { defineStore } from "pinia";
import { computed, reactive, shallowRef } from "vue";
import type { FormDataSchema, ForecastWarningsSchema, PastForecastResponse } from "@/types";
import { createEmptyForecastDetails } from "./helpers/forecastDataHelpers";

export const useForecastDataStore = defineStore("forecastData", () => {
    const forecastDetailsInitial = shallowRef(createEmptyForecastDetails());
    const warningLocationsInitial = reactive<ForecastWarningsSchema[]>([]);
    const pastForecastsInitial = shallowRef<PastForecastResponse[]>([]);

    const forecastDetails = computed(() => forecastDetailsInitial.value);
    const warningLocations = computed(() => warningLocationsInitial);
    const pastForecasts = computed(() => pastForecastsInitial.value);

    function setForecastDetails(data: FormDataSchema) {
        forecastDetailsInitial.value = data;
    }
    function setWarningLocations(location: ForecastWarningsSchema) {
        warningLocationsInitial.push(location);
    }
    function setPastForecasts(data: PastForecastResponse[]) {
        pastForecastsInitial.value = data;
    }

    function resetForecastDetails() {
        forecastDetailsInitial.value = createEmptyForecastDetails();
    }

    return {
        forecastDetails,
        setForecastDetails,
        warningLocations,
        setWarningLocations,
        pastForecasts,
        setPastForecasts,
        resetForecastDetails,
    };
});
