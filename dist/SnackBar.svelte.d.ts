import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        duration?: number;
        max?: number;
        position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SnackBarProps = typeof __propDef.props;
export type SnackBarEvents = typeof __propDef.events;
export type SnackBarSlots = typeof __propDef.slots;
export default class SnackBar extends SvelteComponent<SnackBarProps, SnackBarEvents, SnackBarSlots> {
}
export {};
