import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        type?: "linear" | "circular";
        variant?: "determinate" | "indeterminate";
        value?: number;
        color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
        size?: "sm" | "md" | "lg";
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ProgressProps = typeof __propDef.props;
export type ProgressEvents = typeof __propDef.events;
export type ProgressSlots = typeof __propDef.slots;
export default class Progress extends SvelteComponent<ProgressProps, ProgressEvents, ProgressSlots> {
}
export {};
