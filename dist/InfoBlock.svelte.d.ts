import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        title?: string;
        type?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
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
export type InfoBlockProps = typeof __propDef.props;
export type InfoBlockEvents = typeof __propDef.events;
export type InfoBlockSlots = typeof __propDef.slots;
export default class InfoBlock extends SvelteComponent<InfoBlockProps, InfoBlockEvents, InfoBlockSlots> {
}
export {};
