import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        checked?: boolean;
        disabled?: boolean;
        color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
        size?: "sm" | "md" | "lg";
        label?: string;
        required?: boolean;
        error?: string | null;
        labelPosition?: "left" | "right";
        name?: string;
        id?: string;
        showRequiredIndicator?: boolean;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SwitchProps = typeof __propDef.props;
export type SwitchEvents = typeof __propDef.events;
export type SwitchSlots = typeof __propDef.slots;
export default class Switch extends SvelteComponent<SwitchProps, SwitchEvents, SwitchSlots> {
}
export {};
