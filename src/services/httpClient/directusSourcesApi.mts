
import { api } from "./api.mjs";
import type { ForecastDataPayload } from "@/types/forecastData";

const URLS = {
    FORECASTS: "fthiotida_forecasts",
    WEATHER_CONDITIONS: "weather_conditions",
};

export const addWeatherForecast = (data: ForecastDataPayload) => {
    return api.post(`items/${ URLS.FORECASTS }`, data);
};

export const getWeatherConditions = () => {
    return api.get(`items/${ URLS.WEATHER_CONDITIONS }`);
};