import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: string;
        disabled?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ButtonGroupItemProps = typeof __propDef.props;
export type ButtonGroupItemEvents = typeof __propDef.events;
export type ButtonGroupItemSlots = typeof __propDef.slots;
export default class ButtonGroupItem extends SvelteComponent<ButtonGroupItemProps, ButtonGroupItemEvents, ButtonGroupItemSlots> {
}
export {};
