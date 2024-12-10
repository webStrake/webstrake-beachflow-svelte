import { DateTime } from 'luxon';
import type { DatePickerValue, DatePickerConfig, DatePickerPlacement } from '../types/date-picker.type.js';
export declare function parseDate(value: DatePickerValue | null): DateTime | null;
export declare function formatDate(date: DateTime, format: string, locale: string): string;
export declare function isDateDisabled(date: DateTime, config: DatePickerConfig, minDate?: DateTime | null, maxDate?: DateTime | null): boolean;
export declare function generateYearRange(currentYear: number, config: DatePickerConfig): number[];
export declare function generateMonthArray(currentDate: DateTime, config: DatePickerConfig, minDate?: DateTime | null, maxDate?: DateTime | null): {
    value: number;
    label: string;
    disabled: boolean;
}[];
export declare function generateTimeOptions(interval: number, use24Hours: boolean): string[];
export declare function getWeekDays(locale: string, firstDayOfWeek: number): string[];
export declare function handleKeyboardNavigation(event: KeyboardEvent, currentDate: DateTime): DateTime | null;
export declare function calculatePopupPosition(trigger: HTMLElement, popup: HTMLElement, placement: DatePickerPlacement): {
    top: number;
    left: number;
};
