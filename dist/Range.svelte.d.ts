import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: number;
        min?: number;
        max?: number;
        step?: number;
        color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
        size?: "sm" | "md" | "lg";
        showValue?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type RangeProps = typeof __propDef.props;
export type RangeEvents = typeof __propDef.events;
export type RangeSlots = typeof __propDef.slots;
export default class Range extends SvelteComponent<RangeProps, RangeEvents, RangeSlots> {
}
export {};
