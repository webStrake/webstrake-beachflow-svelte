import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        styles?: {
            container?: string;
            header?: string;
            sidebarLeft?: string;
            main?: string;
            pageHeader?: string;
            pageContent?: string;
            pageFooter?: string;
            sidebarRight?: string;
            footer?: string;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        sidebarLeft: {};
        pageHeader: {};
        default: {};
        pageFooter: {};
        sidebarRight: {};
        footer: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type LayoutProps = typeof __propDef.props;
export type LayoutEvents = typeof __propDef.events;
export type LayoutSlots = typeof __propDef.slots;
export default class Layout extends SvelteComponent<LayoutProps, LayoutEvents, LayoutSlots> {
}
export {};
