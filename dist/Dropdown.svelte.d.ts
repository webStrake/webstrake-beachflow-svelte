import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        options?: {
            value: any;
            label: string;
        }[];
        selected?: any;
        placeholder?: string;
        searchable?: boolean;
        label?: string;
        loadMore?: (() => Promise<void>) | null;
        multiple?: boolean;
        required?: boolean;
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
