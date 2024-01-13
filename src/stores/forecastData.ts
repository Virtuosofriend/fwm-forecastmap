import { defineStore } from "pinia";
import type { FormDataSchema, ForecastWarningsSchema } from "@/types";
import type { Map } from "leaflet";

interface ForecastState {
    forecastDetails: FormDataSchema,
    map: Map | null,
    warningLocations: ForecastWarningsSchema[]
}

export const useForecastDataStore = defineStore("forecastData", {
    state: (): ForecastState => {
        return {
            forecastDetails: {
                dates: {
                    created: null,
                    forecast_date: null,
                    forecast_start_hour: null,
                    forecast_end_hour: null,
                },
                data: {},
            },
            map: null,
            warningLocations: [],
        };
    },
    actions: {
        setForecastDetails(data: FormDataSchema ) {
            this.forecastDetails = data;
        },
        setMap(map: Map) {
            this.map = map;
        },
        setWarningLocations(location: ForecastWarningsSchema) {
            this.warningLocations.push(location);
        },
    },
});

