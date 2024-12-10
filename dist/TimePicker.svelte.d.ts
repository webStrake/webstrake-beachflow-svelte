import { SvelteComponent } from "svelte";
import { DateTime } from 'luxon';
import type { DatePickerConfig } from './types/date-picker.type.js';
declare const __propDef: {
    props: {
        value?: DateTime | null;
        config: DatePickerConfig;
    };
    events: {
        change: CustomEvent<{
            hours: number;
            minutes: number;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TimePickerProps = typeof __propDef.props;
export type TimePickerEvents = typeof __propDef.events;
export type TimePickerSlots = typeof __propDef.slots;
export default class TimePicker extends SvelteComponent<TimePickerProps, TimePickerEvents, TimePickerSlots> {
}
export {};
