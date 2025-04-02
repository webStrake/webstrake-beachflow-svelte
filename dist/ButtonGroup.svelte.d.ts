import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        color?: "plain" | "primary" | "secondary" | "tertiary";
        outlined?: boolean;
        activeItem?: string | null;
        items?: Array<{
            label: string;
            value: string;
            disabled?: boolean;
        }>;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ButtonGroupProps = typeof __propDef.props;
export type ButtonGroupEvents = typeof __propDef.events;
export type ButtonGroupSlots = typeof __propDef.slots;
export default class ButtonGroup extends SvelteComponent<ButtonGroupProps, ButtonGroupEvents, ButtonGroupSlots> {
}
export {};
