import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: string;
        group: string | null;
        disabled?: boolean;
        color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type RadioProps = typeof __propDef.props;
export type RadioEvents = typeof __propDef.events;
export type RadioSlots = typeof __propDef.slots;
export default class Radio extends SvelteComponent<RadioProps, RadioEvents, RadioSlots> {
}
export {};
