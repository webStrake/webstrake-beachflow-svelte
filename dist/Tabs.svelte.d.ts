import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        tabs?: {
            id: string;
            label: string;
        }[];
        activeTab?: string;
        color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            activeTab: string;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TabsProps = typeof __propDef.props;
export type TabsEvents = typeof __propDef.events;
export type TabsSlots = typeof __propDef.slots;
export default class Tabs extends SvelteComponent<TabsProps, TabsEvents, TabsSlots> {
}
export {};
