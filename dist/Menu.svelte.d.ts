import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        items?: Array<{
            label: string;
            value: string;
            icon?: string;
        }>;
        isOpen?: boolean;
        position?: "left" | "right";
    };
    events: {
        select: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        trigger: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MenuProps = typeof __propDef.props;
export type MenuEvents = typeof __propDef.events;
export type MenuSlots = typeof __propDef.slots;
export default class Menu extends SvelteComponent<MenuProps, MenuEvents, MenuSlots> {
}
export {};
