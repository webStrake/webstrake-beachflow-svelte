import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        columnWidth?: number;
        gap?: number;
        items?: any[];
        animate?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            item: any;
            index: any;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MasonryProps = typeof __propDef.props;
export type MasonryEvents = typeof __propDef.events;
export type MasonrySlots = typeof __propDef.slots;
export default class Masonry extends SvelteComponent<MasonryProps, MasonryEvents, MasonrySlots> {
}
export {};
