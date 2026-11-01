export type WeatherConditions = {
    id: number;
    weather_icon: string;
    day: boolean;
    night: boolean;
    asset: string;
    openweather_icon: string;
};

export type WeatherIconDropdownOption = {
    label: string;
    value: string;
    icon: string;
};

export enum MapSettings {
    mapKey = "mainMap",
}

export type ToElementFunctionOptions = {
    targetImageId: string;
    hideAllControls?: boolean;
    hideControlsInCorner?: string[];
    hideMarkers?: boolean;
    hidePopups?: boolean;
    hideVisibleLayers?: string[];
    showHiddenLayers?: string[];
    bbox?: [[number, number], [number, number]];
    coverEdits?: boolean;
    format?: "jpeg" | "png" | "svg" | "canvas";
    pixelRatio?: number;
    htmlToImageOptions?: Record<string, unknown>;
};

export enum weatherConditionsDefinitions {
    sunny = "Ηλιοφάνεια",
    mostly_cloudy = "Διαστήματα ηλιοφάνειας",
    thin_cloudy = "Αραιή συννεφιά",
    intermittent_clouds = "Σχεδόν αίθριος",
    mostly_cloudy_w_showers = "Διαστήματα βροχής",
    clear = "Ξαστεριά",
    mostly_clear = "Διαστήματα ξαστεριάς",
    cloudy = "Συννεφιασμένος",
    rain = "Βροχή",
    showers = "Ασθενής βροχή",
    "t-storms" = "Καταιγίδα",
    flurries = "Ελαφριά Χιονόπτωση",
    snow = "Βαριά Χιονόπτωση",
    ice = "Πάγος",
    hot = "Kαύσωνας",
    fog = "Ομίχλη",
    windy = "Ισχυρός Άνεμος",
    dust = "Σκόνη",
}

export enum TypeOfMarkers {
    temp = "temp",
    wind = "wind",
    warning = "warning",
}
