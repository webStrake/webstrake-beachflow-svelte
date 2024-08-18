import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string[];
        placeholder?: string;
        whitelist?: string[];
        validation?: ((value: string) => boolean) | null;
        max?: number;
        minlength?: number;
        maxlength?: number;
        allowUpperCase?: boolean;
        allowDuplicates?: boolean;
        allowComma?: boolean;
    };
    events: {
        invalid: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type InputChipsProps = typeof __propDef.props;
export type InputChipsEvents = typeof __propDef.events;
export type InputChipsSlots = typeof __propDef.slots;
export default class InputChips extends SvelteComponent<InputChipsProps, InputChipsEvents, InputChipsSlots> {
}
export {};
