import { withAsync } from "./httpClient/helpers/withAsync.mts";
import { getWeatherForecasts } from "./httpClient/directusSourcesApi.mts";
import type { PastForecastResponse } from "@/types";

type GetAllWeatherForecastsParams = {
    startDate: string;
    endDate: string;
};
export const getAllWeatherForecasts = async ({
    startDate,
    endDate,
}: GetAllWeatherForecastsParams): Promise<PastForecastResponse[] | []> => {
    const { response, error } = await withAsync(getWeatherForecasts, { startDate, endDate });

    if (error || !response) {
        return [];
    }
    const conditions = (response as { data: { data: PastForecastResponse[] } }).data.data;
    return conditions;
};
