import { SvelteComponent } from "svelte";
import { DateTime } from "luxon";
import type { DatePickerConfig } from "./types/date-picker.type.js";
declare const __propDef: {
    props: {
        currentDate: DateTime;
        config: DatePickerConfig;
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
export type YearPickerProps = typeof __propDef.props;
export type YearPickerEvents = typeof __propDef.events;
export type YearPickerSlots = typeof __propDef.slots;
export default class YearPicker extends SvelteComponent<YearPickerProps, YearPickerEvents, YearPickerSlots> {
}
export {};
