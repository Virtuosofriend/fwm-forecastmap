import { PRECIP_CONDITIONS } from "@/types";

export const isPrecipProbabilityFieldEnabled = (conditionValue: string | undefined): boolean =>
    !!conditionValue && PRECIP_CONDITIONS.has(conditionValue);
