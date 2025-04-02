import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        type?: "button" | "submit" | "reset";
        variant?: "default" | "outlined" | "flat";
        color?: "plain" | "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
        size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
        disabled?: boolean;
        loading?: boolean;
        icon?: string | null;
        iconPosition?: "left" | "right";
        fullWidth?: boolean;
        stopPropagation?: boolean;
        preventDefault?: boolean;
        once?: boolean;
        capture?: boolean;
        self?: boolean;
        trusted?: boolean;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponent<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
