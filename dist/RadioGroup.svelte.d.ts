import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        legend: string;
        selected?: string | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            selected: string | null;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type RadioGroupProps = typeof __propDef.props;
export type RadioGroupEvents = typeof __propDef.events;
export type RadioGroupSlots = typeof __propDef.slots;
export default class RadioGroup extends SvelteComponent<RadioGroupProps, RadioGroupEvents, RadioGroupSlots> {
}
export {};
