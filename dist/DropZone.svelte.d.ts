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
export type DropZoneProps = typeof __propDef.props;
export type DropZoneEvents = typeof __propDef.events;
export type DropZoneSlots = typeof __propDef.slots;
export default class DropZone extends SvelteComponent<DropZoneProps, DropZoneEvents, DropZoneSlots> {
}
export {};
