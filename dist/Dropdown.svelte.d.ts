import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        options?: {
            value: string;
            label: string;
        }[];
        selected?: string;
        placeholder?: string;
        searchable?: boolean;
        loadMore?: (() => Promise<void>) | null;
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
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
export default class Dropdown extends SvelteComponent<DropdownProps, DropdownEvents, DropdownSlots> {
}
export {};
