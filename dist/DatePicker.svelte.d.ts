import { SvelteComponent } from "svelte";
import type { DatePickerValue, DatePickerMode, DatePickerPlacement, DatePickerConfig, DatePickerChangeEvent } from "./types/date-picker.type.js";
declare const __propDef: {
    props: {
        value?: DatePickerValue | null;
        mode?: DatePickerMode;
        placement?: DatePickerPlacement;
        config?: Partial<DatePickerConfig>;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        error?: string | null;
        minDate?: DatePickerValue | null;
        maxDate?: DatePickerValue | null;
        allowRange?: boolean;
    };
    events: {
        change: CustomEvent<DatePickerChangeEvent>;
        open: CustomEvent<void>;
        close: CustomEvent<void>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DatePickerProps = typeof __propDef.props;
export type DatePickerEvents = typeof __propDef.events;
export type DatePickerSlots = typeof __propDef.slots;
export default class DatePicker extends SvelteComponent<DatePickerProps, DatePickerEvents, DatePickerSlots> {
}
export {};
