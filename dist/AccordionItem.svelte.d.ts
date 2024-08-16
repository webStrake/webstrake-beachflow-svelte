import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        title?: string;
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
export type AccordionItemProps = typeof __propDef.props;
export type AccordionItemEvents = typeof __propDef.events;
export type AccordionItemSlots = typeof __propDef.slots;
export default class AccordionItem extends SvelteComponent<AccordionItemProps, AccordionItemEvents, AccordionItemSlots> {
}
export {};
