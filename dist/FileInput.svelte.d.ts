import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        accept?: string;
        multiple?: boolean;
        placeholder?: string;
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
export type FileInputProps = typeof __propDef.props;
export type FileInputEvents = typeof __propDef.events;
export type FileInputSlots = typeof __propDef.slots;
export default class FileInput extends SvelteComponent<FileInputProps, FileInputEvents, FileInputSlots> {
}
export {};
