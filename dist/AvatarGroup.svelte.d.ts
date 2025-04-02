import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        max?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        overflow: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AvatarGroupProps = typeof __propDef.props;
export type AvatarGroupEvents = typeof __propDef.events;
export type AvatarGroupSlots = typeof __propDef.slots;
export default class AvatarGroup extends SvelteComponent<AvatarGroupProps, AvatarGroupEvents, AvatarGroupSlots> {
}
export {};
