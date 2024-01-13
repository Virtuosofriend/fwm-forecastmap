export type ForecastDataSchema = {
    weatherConditions?: string | null
    tmax?: number | null
    tmin?: number | null
    wmax?: number | null
    wmin?: number | null
    windDirection?: number | null
    snow?: number | null
    location: [number, number]
};

export type ForecastHourSchema = {
    created: string | null
    forecast_date: string | null
    forecast_start_hour: string | null
    forecast_end_hour: string | null
};

export type FormDataSchema = {
    dates: ForecastHourSchema
    data: {[label: string]: ForecastDataSchema}
};