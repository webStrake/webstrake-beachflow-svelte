import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        text: string;
        color?: "primary" | "secondary" | "success" | "warning" | "error";
        outlined?: boolean;
        closable?: boolean;
        icon?: string | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ChipProps = typeof __propDef.props;
export type ChipEvents = typeof __propDef.events;
export type ChipSlots = typeof __propDef.slots;
export default class Chip extends SvelteComponent<ChipProps, ChipEvents, ChipSlots> {
}
export {};
