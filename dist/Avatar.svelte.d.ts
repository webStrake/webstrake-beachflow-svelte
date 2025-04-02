import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        src?: string;
        alt?: string;
        size?: "xs" | "sm" | "md" | "lg" | "xl";
        squared?: boolean;
        ring?: boolean;
        ringColor?: "primary" | "secondary" | "tertiary" | "success" | "error" | "warning" | null;
        online?: boolean;
        initials?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AvatarProps = typeof __propDef.props;
export type AvatarEvents = typeof __propDef.events;
export type AvatarSlots = typeof __propDef.slots;
export default class Avatar extends SvelteComponent<AvatarProps, AvatarEvents, AvatarSlots> {
}
export {};
