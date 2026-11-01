import { computed } from "vue";
import { useForecastDataStore } from "@/stores/forecastData";
import { storeToRefs } from "pinia";
import { type Marker } from "@vuepic/vue-datepicker";
import { format, parse } from "date-fns";
import type { FormDataSchema } from "@/types";

type ForecastsPerDate = {
    [k: string]: FormDataSchema[];
};

const DATE_FORMAT = "dd/MM/yyyy";

export const useHistoricalForecastProvider = () => {
    const { pastForecasts } = storeToRefs(useForecastDataStore());

    const forecastsPerDate = computed(() =>
        pastForecasts.value.reduce((acc: ForecastsPerDate, current) => {
            const day = format(current.date_created, DATE_FORMAT);
            if (!acc[day]) {
                acc[day] = [current.forecast];
            } else {
                acc[day].push(current.forecast);
            }
            return acc;
        }, {}),
    );

    const calendarMarkers = computed<Marker[]>(() => {
        return Object.keys(forecastsPerDate.value).map((elem) => {
            return {
                date: parse(elem, DATE_FORMAT, new Date()),
                type: "dot",
                color: "yellow",
            };
        });
    });

    return {
        forecastsPerDate,
        calendarMarkers,
    };
};
