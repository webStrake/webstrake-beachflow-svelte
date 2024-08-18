import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        type?: string;
        placeholder?: string;
        value?: string;
        label?: string;
        id?: string;
        icon?: string | undefined;
        required?: boolean;
        rows?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {
}
export {};
