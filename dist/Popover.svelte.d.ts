import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        position?: "top" | "bottom" | "left" | "right";
        open?: boolean;
    };
    events: {
        toggle: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        trigger: {};
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PopoverProps = typeof __propDef.props;
export type PopoverEvents = typeof __propDef.events;
export type PopoverSlots = typeof __propDef.slots;
export default class Popover extends SvelteComponent<PopoverProps, PopoverEvents, PopoverSlots> {
}
export {};
