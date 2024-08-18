import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        total: number;
        perPage: number;
        page: number;
        limitOpts?: number[];
        showCount?: boolean;
    };
    events: {
        change: CustomEvent<any>;
        limitChange: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PaginationProps = typeof __propDef.props;
export type PaginationEvents = typeof __propDef.events;
export type PaginationSlots = typeof __propDef.slots;
export default class Pagination extends SvelteComponent<PaginationProps, PaginationEvents, PaginationSlots> {
}
export {};
