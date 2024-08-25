import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        type?: "info" | "success" | "warning" | "error";
        title?: string;
        description?: string;
        closable?: boolean;
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
export type AlertProps = typeof __propDef.props;
export type AlertEvents = typeof __propDef.events;
export type AlertSlots = typeof __propDef.slots;
export default class Alert extends SvelteComponent<AlertProps, AlertEvents, AlertSlots> {
}
export {};
