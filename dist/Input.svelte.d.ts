import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        type?: "text" | "textarea" | "checkbox" | "date" | "time" | any;
        placeholder?: string;
        value?: string | boolean | any;
        label?: string;
        id?: string;
        icon?: string | undefined;
        required?: boolean;
        rows?: number;
        disabled?: boolean;
        step?: any;
        min?: any;
        max?: any;
        lang?: string;
        error?: string | null;
    };
    events: {
        input: CustomEvent<any>;
        change: CustomEvent<any>;
    } & {
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
