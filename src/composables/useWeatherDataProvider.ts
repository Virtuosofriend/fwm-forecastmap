import { useWeatherOptionsStore } from "@/stores/weather";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { weatherConditionsDefinitions, type WeatherIconDropdownOption } from "@/types";

export const useWeatherDataProvider = () => {
    const weatherStore = useWeatherOptionsStore();
    const { locations, weatherConditions, windDirection } = storeToRefs(weatherStore);

    const computedWeatherConditions = computed(() => {
        return weatherConditions.value.reduce((acc, condition) => {
            const key = condition.weather_icon as keyof typeof weatherConditionsDefinitions;
            const definition = weatherConditionsDefinitions?.[key];
            if (definition) {
                acc.push({
                    icon: condition.asset,
                    label: definition,
                    value: condition.weather_icon,
                });
            }
            return acc;
        }, [] as WeatherIconDropdownOption[]);
    });

    const sortedWindDirection = computed(() =>
        [...windDirection.value].sort((a, b) => a.order - b.order),
    );
    return {
        locations,
        weatherConditions: computedWeatherConditions,
        windDirection: sortedWindDirection,
    };
};
