import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        accept?: string;
        multiple?: boolean;
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
export type DragDropFileProps = typeof __propDef.props;
export type DragDropFileEvents = typeof __propDef.events;
export type DragDropFileSlots = typeof __propDef.slots;
export default class DragDropFile extends SvelteComponent<DragDropFileProps, DragDropFileEvents, DragDropFileSlots> {
}
export {};
