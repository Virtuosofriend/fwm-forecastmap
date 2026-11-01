import type { FormDataSchema } from "@/types";

export const createEmptyForecastDetails = (): FormDataSchema => {
    return {
        dates: {
            created: null,
            forecast_date: null,
            forecast_range: [],
            forecast_start_hour: null,
            forecast_end_hour: null,
        },
        data: {},
    };
};
