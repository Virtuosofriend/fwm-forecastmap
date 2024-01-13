import { reactive } from "vue";
import { defineStore } from "pinia";
import type { WeatherLocations, WindDirection } from "@/types";

export const useWeatherOptionsStore = defineStore("weatherOptions", () => {
    const weatherConditions = reactive([
        {
            icon: "day/sunny",
            text: "Ηλιοφάνεια",
        },{
            icon: "day/mostly_cloudy",
            text: "Διαστήματα ηλιοφάνειας",
        },{
            icon: "day/mostly_cloudy_w_showers",
            text: "Διαστήματα βροχής",
        },{
            icon: "night/clear",
            text: "Ξαστεριά",
        },{
            icon: "night/mostly_clear",
            text: "Διαστήματα ξαστεριάς",
        },{
            icon: "night/mostly_cloudy_w_showers",
            text: "Διαστήματα βροχής (Ν)",
        },{
            icon: "day/cloudy",
            text: "Συννεφιασμένος",
        },{
            icon: "day/rain",
            text: "Βροχή",
        },{
            icon: "day/t-storms",
            text: "Καταιγίδα",
        },{
            icon: "day/flurries",
            text: "Ελαφριά Χιονόπτωση",
        },{
            icon: "day/snow",
            text: "Βαριά Χιονόπτωση",
        },{
            icon: "day/ice",
            text: "Παγετός",
        },{
            icon: "day/hot",
            text: "Καύσωνας",
        },{
            icon: "day/fog",
            text: "Ομίχλη",
        },{
            icon: "day/fog",
            text: "Σκόνη",
        }
    ]);

    const locations = reactive<WeatherLocations[]>([
        {
            name: "Λαμία",
            value: "Lamia",
            location: [38.903708, 22.434891],
            wind: false,
            temp: true,
            snow: true,
        },{
            name: "Όρθρυς",
            value: "Orthris",
            location: [39.016905, 22.692526],
            wind: false,
            temp: true,
            snow: true,
        },{
            name: "Ανατολική Φθιώτιδα",
            value: "East",
            location: [38.937402, 22.856371],
            temp: true,
            wind: false,
            snow: true,
        },{
            name: "Βόρεια Φθιώτιδα",
            value: "North",
            location: [39.110429, 22.304424],
            temp: true,
            wind: false,
            snow: true,
        },{
            name: "Δυτική Φθιώτιδα",
            value: "West",
            location: [38.905100, 22.039833],
            temp: true,
            wind: false,
            snow: true,
        },{
            name: "Καμένα Βούρλα",
            value: "Kamena",
            location: [38.759799, 22.775458],
            temp: true,
            wind: false,
            snow: true,
        },{
            name: "Οίτη",
            value: "Oiti",
            location: [38.783776, 22.311391],
            temp: true,
            wind: false,
            snow: true,
        },{
            name: "Αμφίκλεια",
            value: "Amfikleia",
            location: [38.657546, 22.670016],
            temp: true,
            wind: false,
            snow: true,
        },{
            name: "Λοκρίδα",
            value: "Lokrida",
            location: [38.650973, 23.034462],
            temp: true,
            wind: false,
            snow: true,
        },{
            name: "Διαύλος Ωρέων",
            value: "Oreoi",
            location: [38.92460309724623, 22.97906390072416],
            wind: true,
            temp: false,
        },{
            name: "Περιοχή Δομοκού",
            value: "Domokos",
            location: [39.085151037874574, 22.462680353076728],
            wind: true,
            temp: false,
        },{
            name: "Περιοχή Μακρακώμης",
            value: "Makrakomi",
            location: [38.928194940769835, 22.2362134937132],
            wind: true,
            temp: false,
        },{
            name: "Περιοχή Μαλιακού",
            value: "Maliakos",
            location: [38.860116203790405, 22.68706671506156],
            wind: true,
            temp: false,
        },{
            name: "Περιοχή Παρνασού",
            value: "Parnasos",
            location: [38.6128697548764, 22.829551265109494],
            wind: true,
            temp: false,
        },{
            name: "Περιοχή Ευβοϊκού",
            value: "Evvoikos",
            location: [38.70574931835848, 23.160233676129977],
            wind: true,
            temp: false,
        }
    ]);
    
    const windDirection = reactive<WindDirection[]>([
        {
            degrees: 0,
            label: "Βόρειος",
            order: 1,
        },{
            degrees: 45,
            label: "Βόρειος - Ανατολικός",
            order: 5,
        },{
            degrees: 90,
            label: "Ανατολικός",
            order: 2,
        },{
            degrees: 135,
            label: "Νότιος - Ανατολικός",
            order: 7,
        },{
            degrees: 180,
            label: "Νότιος",
            order: 3,
        },{
            degrees: 225,
            label: "Νοτιος - Δυτικός",
            order: 8,
        },{
            degrees: 270,
            label: "Δυτικός",
            order: 4,
        },{
            degrees: 315,
            label: "Βόρειος - Δυτικός",
            order: 6,
        }]);
    return { weatherConditions, locations, windDirection };
});
