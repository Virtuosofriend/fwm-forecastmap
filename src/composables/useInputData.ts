import { useForecastDataStore } from "./../stores/forecastData";
import { useWeatherOptionsStore } from "../stores/weather";

import { reactive } from "vue";
import type { FormDataSchema, ForecastDataSchema } from "@/types";


export function useMarkersData() {
    const weatherOptionsStore = useWeatherOptionsStore();
    const { locations } = weatherOptionsStore;

    const formData = reactive<FormDataSchema>({
        dates: {
            created: null,
            forecast_date: null,
            forecast_start_hour: null,
            forecast_end_hour: null,
        },
        data: {},
    });

    locations.forEach(location => {
        const formDataPopulate: ForecastDataSchema = {
            location: location.location,
        };
        if (location.temp) {
            formDataPopulate.tmax = null;
            formDataPopulate.tmin = null;
            formDataPopulate.weatherConditions = null;
        }

        if (location.wind) {
            formDataPopulate.wmax = null;
            formDataPopulate.wmin = null;
            formDataPopulate.windDirection = null;
        }

        if (location.snow) {
            formDataPopulate.snow = null;
        }
        formData.data[location.value] = formDataPopulate;
    });

    const forecastDataStore = useForecastDataStore();
    const { setForecastDetails } = forecastDataStore;
    setForecastDetails(formData);

    return {
        formData,
    };
}
