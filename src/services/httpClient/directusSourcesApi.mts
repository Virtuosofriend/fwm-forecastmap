import { api, publicApi } from "./api.mts";
import type { ForecastDataPayload, GetWeatherForecastsPayload } from "@/types";

const URLS = {
    FORECASTS: "fthiotida_forecasts",
    WEATHER_CONDITIONS: "weather_conditions",
};

export const addWeatherForecast = (data: ForecastDataPayload) => {
    return api.post(`items/${URLS.FORECASTS}`, data);
};

export const getWeatherConditions = () => {
    return publicApi.get(`items/${URLS.WEATHER_CONDITIONS}`);
};

export const getWeatherForecasts = ({ startDate, endDate }: GetWeatherForecastsPayload) => {
    return publicApi.get(
        `items/${URLS.FORECASTS}?limit=-1&sort[]=-date_created&filter[_and][0][date_created][_between][0]=${startDate}&filter[_and][0][date_created][_between][1]=${endDate}`,
    );
};
