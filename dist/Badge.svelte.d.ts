import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        text?: string;
        color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
        size?: "xs" | "sm" | "md" | "lg" | "xl";
        variant?: "default" | "outline" | "flat";
        square?: boolean;
        icon?: string | null;
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
export type BadgeProps = typeof __propDef.props;
export type BadgeEvents = typeof __propDef.events;
export type BadgeSlots = typeof __propDef.slots;
export default class Badge extends SvelteComponent<BadgeProps, BadgeEvents, BadgeSlots> {
}
export {};
