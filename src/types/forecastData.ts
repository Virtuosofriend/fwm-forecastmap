import { TypeOfMarkers } from "@/types";

type WeatherConditionObject = {
    icon: string;
    label: string;
    value: string;
};

export type ForecastDataSchema = {
    weatherConditions?: WeatherConditionObject | null;
    tmax?: number | null;
    tmin?: number | null;
    wmax?: number | null;
    wmin?: number | null;
    windDirection?: number | null;
    snow?: number | null;
    location: [number, number];
    locationType: TypeOfMarkers.temp | TypeOfMarkers.wind;
};

export type ForecastHourSchema = {
    created: string | null;
    forecast_date: string | null;
    forecast_range: string[];
    forecast_start_hour: string | null;
    forecast_end_hour: string | null;
};

export type FormDataSchema = {
    dates: ForecastHourSchema;
    data: { [label: string]: ForecastDataSchema };
};

export type WarningModalSchema = {
    icon: string;
    comment: string;
};

export interface ForecastWarningsSchema extends WarningModalSchema {
    location: [number, number];
    locationType: TypeOfMarkers.warning;
}

export type ForecastDataPayload = {
    forecast: FormDataSchema;
};
