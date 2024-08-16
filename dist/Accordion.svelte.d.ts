import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        items?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AccordionProps = typeof __propDef.props;
export type AccordionEvents = typeof __propDef.events;
export type AccordionSlots = typeof __propDef.slots;
export default class Accordion extends SvelteComponent<AccordionProps, AccordionEvents, AccordionSlots> {
}
export {};
