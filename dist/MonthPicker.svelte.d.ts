import { SvelteComponent } from "svelte";
import { DateTime } from 'luxon';
import type { DatePickerConfig } from './types/date-picker.type.js';
declare const __propDef: {
    props: {
        currentDate: DateTime;
        config: DatePickerConfig;
        parsedMinDate: DateTime | null;
        parsedMaxDate: DateTime | null;
    };
    events: {
        select: CustomEvent<number>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MonthPickerProps = typeof __propDef.props;
export type MonthPickerEvents = typeof __propDef.events;
export type MonthPickerSlots = typeof __propDef.slots;
export default class MonthPicker extends SvelteComponent<MonthPickerProps, MonthPickerEvents, MonthPickerSlots> {
}
export {};
