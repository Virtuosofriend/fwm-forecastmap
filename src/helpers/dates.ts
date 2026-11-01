import { parse, endOfMonth, startOfMonth, getMonth, getYear, addDays } from "date-fns";

type MonthDatesFn = {
    firstDay: Date;
    lastDay: Date;
    currentMonth: number;
    currentYear: number;
};

export const minMaxCalendarAllowedDate = () => {
    return {
        minAllowed: new Date(2025, 6, 25),
        maxAllowed: addDays(new Date(), 1),
    };
};

export const monthDates = (date: string): MonthDatesFn => {
    const dateRecorded = parse(date, "dd/MM/yyyy", new Date());
    const lastDay = endOfMonth(dateRecorded);
    const firstDay = startOfMonth(dateRecorded);
    const currentMonth = getMonth(firstDay);
    const currentYear = getYear(firstDay);

    return {
        firstDay,
        lastDay,
        currentMonth,
        currentYear,
    };
};

export const monthDatesFromMonthYear = (month: number, year: number) => {
    const date = parse(`01/${month + 1}/${year}`, "dd/M/yyyy", new Date());
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);

    return {
        firstDay,
        lastDay,
        currentMonth: month,
        currentYear: year,
    };
};
