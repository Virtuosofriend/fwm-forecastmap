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