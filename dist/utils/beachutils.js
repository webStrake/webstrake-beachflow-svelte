// utils.ts
import { DateTime } from 'luxon';
import { MONTH_FORMATS, TIME_FORMATS } from '../constants/datepicker.contants.js';
export function parseDate(value) {
    if (!value)
        return null;
    if (value instanceof Date) {
        return DateTime.fromJSDate(value);
    }
    if (typeof value === 'number') {
        return DateTime.fromMillis(value);
    }
    if (value instanceof DateTime) {
        return value;
    }
    return DateTime.fromISO(value);
}
export function formatDate(date, format, locale) {
    return date.setLocale(locale).toFormat(format);
}
export function isDateDisabled(date, config, minDate, maxDate) {
    if (minDate && date < minDate)
        return true;
    if (maxDate && date > maxDate)
        return true;
    const isDisabledDay = config.disabledDays.includes(date.weekday);
    if (isDisabledDay)
        return true;
    const isDisabledDate = config.disabledDates.some(disabled => date.hasSame(parseDate(disabled), 'day'));
    return isDisabledDate;
}
export function generateYearRange(currentYear, config) {
    const range = config.yearRange;
    const start = Math.max(config.minYear, currentYear - Math.floor(range / 2));
    const end = Math.min(config.maxYear, start + range);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
export function generateMonthArray(currentDate, config, minDate, maxDate) {
    return Array.from({ length: 12 }, (_, i) => {
        const month = currentDate.set({ month: i + 1 });
        const disabled = !!((minDate && month < minDate.startOf('month')) ||
            (maxDate && month > maxDate.startOf('month')));
        return {
            value: i + 1,
            label: month.toFormat(MONTH_FORMATS.short),
            disabled
        };
    });
}
export function generateTimeOptions(interval, use24Hours) {
    const format = use24Hours ? TIME_FORMATS.hour24 : TIME_FORMATS.hour12;
    const slots = Math.floor(24 * 60 / interval);
    return Array.from({ length: slots }, (_, i) => {
        const minutes = i * interval;
        const time = DateTime.fromObject({
            hour: Math.floor(minutes / 60),
            minute: minutes % 60
        });
        return time.toFormat(format);
    });
}
export function getWeekDays(locale, firstDayOfWeek) {
    const start = DateTime.fromObject({}, { locale })
        .startOf('week')
        .plus({ days: firstDayOfWeek });
    return Array.from({ length: 7 }, (_, i) => start.plus({ days: i }).toFormat('ccc'));
}
export function handleKeyboardNavigation(event, currentDate) {
    switch (event.key) {
        case 'ArrowLeft':
            return currentDate.minus({ days: 1 });
        case 'ArrowRight':
            return currentDate.plus({ days: 1 });
        case 'ArrowUp':
            return currentDate.minus({ weeks: 1 });
        case 'ArrowDown':
            return currentDate.plus({ weeks: 1 });
        case 'PageUp':
            return event.shiftKey
                ? currentDate.minus({ years: 1 })
                : currentDate.minus({ months: 1 });
        case 'PageDown':
            return event.shiftKey
                ? currentDate.plus({ years: 1 })
                : currentDate.plus({ months: 1 });
        case 'Home':
            return currentDate.startOf('week');
        case 'End':
            return currentDate.endOf('week');
        default:
            return null;
    }
}
export function calculatePopupPosition(trigger, popup, placement) {
    const triggerRect = trigger.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let top = 0;
    let left = triggerRect.left + scrollLeft;
    switch (placement) {
        case 'top':
            top = triggerRect.top + scrollTop - popupRect.height;
            break;
        case 'bottom':
            top = triggerRect.bottom + scrollTop;
            break;
        case 'auto':
        default:
            // Check if there's enough space below
            if (window.innerHeight - triggerRect.bottom > popupRect.height) {
                top = triggerRect.bottom + scrollTop;
            }
            else {
                top = triggerRect.top + scrollTop - popupRect.height;
            }
            break;
    }
    // Ensure popup stays within viewport
    if (left + popupRect.width > window.innerWidth) {
        left = window.innerWidth - popupRect.width - 10;
    }
    if (left < 0) {
        left = 10;
    }
    return { top, left };
}
