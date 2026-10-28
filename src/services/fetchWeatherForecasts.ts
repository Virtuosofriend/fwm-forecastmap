import { withAsync } from "./httpClient/helpers/withAsync.mts";
import { getWeatherForecasts } from "./httpClient/directusSourcesApi.mts";
import type { FormDataSchema } from "@/types";

export const getAllWeatherForecasts = async (): Promise<FormDataSchema[]> => {
    const { response, error } = await withAsync(getWeatherForecasts);

    if (error || !response) {
        return [];
    }
    const conditions = (response as { data: { data: FormDataSchema[] } }).data.data;
    return conditions;
};
