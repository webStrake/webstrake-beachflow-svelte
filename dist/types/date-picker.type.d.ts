import type { DateTime } from "luxon";
export type DatePickerMode = 'date' | 'time' | 'datetime';
export type DatePickerView = 'calendar' | 'month' | 'year' | 'time';
export type DatePickerValue = string | Date | number | DateTime;
export type DatePickerPlacement = 'top' | 'bottom' | 'auto';
export interface DateRange {
    start: DatePickerValue;
    end: DatePickerValue | null;
}
export interface DatePickerConfig {
    firstDayOfWeek: number;
    format: string;
    locale: string;
    minYear: number;
    maxYear: number;
    yearRange: number;
    disabledDates: DatePickerValue[];
    disabledDays: number[];
    highlightedDates: DatePickerValue[];
    timeInterval: number;
    use24Hours: boolean;
}
export interface DatePickerChangeEvent {
    value?: DatePickerValue;
    start?: DatePickerValue;
    end?: DatePickerValue | null;
}
