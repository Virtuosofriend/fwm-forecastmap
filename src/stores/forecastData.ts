import { defineStore } from "pinia";
import { computed, reactive, shallowRef } from "vue";
import type { FormDataSchema, ForecastWarningsSchema } from "@/types";
import { createEmptyForecastDetails } from "./helpers/forecastDataHelpers";

export const useForecastDataStore = defineStore("forecastData", () => {
    const forecastDetailsInitial = shallowRef(createEmptyForecastDetails());
    const warningLocationsInitial: ForecastWarningsSchema[] = reactive([]);

    const forecastDetails = computed(() => forecastDetailsInitial);
    const warningLocations = computed(() => warningLocationsInitial);
    function setForecastDetails(data: FormDataSchema) {
        forecastDetailsInitial.value = data;
    }
    function setWarningLocations(location: ForecastWarningsSchema) {
        warningLocationsInitial.push(location);
    }
    return { forecastDetails, setForecastDetails, warningLocations, setWarningLocations };
});
