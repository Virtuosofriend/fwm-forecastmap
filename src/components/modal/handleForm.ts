import type { WarningModalSchema, ForecastWarningsSchema } from "@/types";
import { TypeOfMarkers } from "@/types";
import { useForecastDataStore } from "@/stores/forecastData";

type handleModalFormSubmit = {
    form: WarningModalSchema;
    location: [number, number];
};
export const handleModalFormSubmit = ({ form, location }: handleModalFormSubmit) => {
    const markerLocation: ForecastWarningsSchema = {
        location: location,
        locationType: TypeOfMarkers.warning,
        icon: form.icon,
        comment: form.comment,
    };

    const forecastStore = useForecastDataStore();
    const { setWarningLocations } = forecastStore;
    setWarningLocations(markerLocation);
};
