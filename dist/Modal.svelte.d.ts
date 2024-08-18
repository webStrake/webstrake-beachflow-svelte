import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        isOpen?: boolean;
        title?: string;
        closeOnClickOutside?: boolean;
    };
    events: {
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        footer: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ModalProps = typeof __propDef.props;
export type ModalEvents = typeof __propDef.events;
export type ModalSlots = typeof __propDef.slots;
export default class Modal extends SvelteComponent<ModalProps, ModalEvents, ModalSlots> {
}
export {};
