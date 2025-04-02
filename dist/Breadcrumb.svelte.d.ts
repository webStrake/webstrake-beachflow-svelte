import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        items?: Array<{
            label: string;
            href?: string;
            active?: boolean;
        }>;
        separator?: string;
        color?: "default" | "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
        onClick?: (item: {
            label: string;
            href?: string;
            active?: boolean;
        }) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type BreadcrumbProps = typeof __propDef.props;
export type BreadcrumbEvents = typeof __propDef.events;
export type BreadcrumbSlots = typeof __propDef.slots;
export default class Breadcrumb extends SvelteComponent<BreadcrumbProps, BreadcrumbEvents, BreadcrumbSlots> {
}
export {};
