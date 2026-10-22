import { ref } from "vue";
import { defineStore } from "pinia";
import type { WeatherLocations, WindDirection, WeatherConditions } from "@/types";

export const useWeatherOptionsStore = defineStore("weatherOptions", () => {
    const weatherConditions = ref<WeatherConditions[]>([]);

    const locations = ref<WeatherLocations[]>([
        {
            name: "Λαμία",
            value: "Lamia",
            location: [22.434891, 38.903708],
            wind: false,
            temp: true,
            snow: true,
        },
        {
            name: "Όρθρυς",
            value: "Orthris",
            location: [22.692526, 39.016905],
            wind: false,
            temp: true,
            snow: true,
        },
        {
            name: "Ανατολική Φθιώτιδα",
            value: "East",
            location: [22.856371, 38.937402],
            temp: true,
            wind: false,
            snow: true,
        },
        {
            name: "Βόρεια Φθιώτιδα",
            value: "North",
            location: [22.304424, 39.110429],
            temp: true,
            wind: false,
            snow: true,
        },
        {
            name: "Δυτική Φθιώτιδα",
            value: "West",
            location: [22.051932754998965, 38.97335229502],
            temp: true,
            wind: false,
            snow: true,
        },
        {
            name: "Καμένα Βούρλα",
            value: "Kamena",
            location: [22.775458, 38.759799],
            temp: true,
            wind: false,
            snow: true,
        },
        {
            name: "Οίτη",
            value: "Oiti",
            location: [22.311391, 38.783776],
            temp: true,
            wind: false,
            snow: true,
        },
        {
            name: "Αμφίκλεια",
            value: "Amfikleia",
            location: [22.670016, 38.657546],
            temp: true,
            wind: false,
            snow: true,
        },
        {
            name: "Λοκρίδα",
            value: "Lokrida",
            location: [23.034462, 38.650973],
            temp: true,
            wind: false,
            snow: true,
        },
        {
            name: "Διαύλος Ωρέων",
            value: "Oreoi",
            location: [22.97906390072416, 38.92460309724623],
            wind: true,
            temp: false,
        },
        {
            name: "Περιοχή Δομοκού",
            value: "Domokos",
            location: [22.462680353076728, 39.085151037874574],
            wind: true,
            temp: false,
        },
        {
            name: "Περιοχή Μακρακώμης",
            value: "Makrakomi",
            location: [22.2362134937132, 38.928194940769835],
            wind: true,
            temp: false,
        },
        {
            name: "Περιοχή Μαλιακού",
            value: "Maliakos",
            location: [22.60516214148766, 38.86432332239475],
            wind: true,
            temp: false,
        },
        {
            name: "Περιοχή Παρνασού",
            value: "Parnasos",
            location: [22.829551265109494, 38.6128697548764],
            wind: true,
            temp: false,
        },
        {
            name: "Περιοχή Ευβοϊκού",
            value: "Evvoikos",
            location: [23.160233676129977, 38.70574931835848],
            wind: true,
            temp: false,
        },
    ]);

    const windDirection = ref<WindDirection[]>([
        {
            degrees: 0,
            label: "Βόρειος",
            order: 1,
        },
        {
            degrees: 45,
            label: "Βόρειος - Ανατολικός",
            order: 5,
        },
        {
            degrees: 90,
            label: "Ανατολικός",
            order: 2,
        },
        {
            degrees: 135,
            label: "Νότιος - Ανατολικός",
            order: 7,
        },
        {
            degrees: 180,
            label: "Νότιος",
            order: 3,
        },
        {
            degrees: 225,
            label: "Νοτιος - Δυτικός",
            order: 8,
        },
        {
            degrees: 270,
            label: "Δυτικός",
            order: 4,
        },
        {
            degrees: 315,
            label: "Βόρειος - Δυτικός",
            order: 6,
        },
    ]);

    function setWeatherConditions(data: WeatherConditions[]) {
        weatherConditions.value = data;
    }

    function addWeatherCondition(condition: WeatherConditions) {
        weatherConditions.value.push(condition);
    }

    return {
        weatherConditions,
        setWeatherConditions,
        addWeatherCondition,
        locations,
        windDirection,
    };
});
