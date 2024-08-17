import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        type?: "success" | "error" | "warning" | "info";
        message: string;
        duration?: number;
    };
    events: {
        close: CustomEvent<any>;
    } & {
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
