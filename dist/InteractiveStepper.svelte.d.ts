import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        steps: string[];
        currentStep: number;
        isStepComplete: (step: number) => boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type InteractiveStepperProps = typeof __propDef.props;
export type InteractiveStepperEvents = typeof __propDef.events;
export type InteractiveStepperSlots = typeof __propDef.slots;
export default class InteractiveStepper extends SvelteComponent<InteractiveStepperProps, InteractiveStepperEvents, InteractiveStepperSlots> {
}
export {};
