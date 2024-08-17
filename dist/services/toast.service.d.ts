import type { Toast, ToastType } from "../types/toast.type.js";
export declare class ToastService {
    private store;
    private nextId;
    subscribe(run: (value: Toast[]) => void): import("svelte/store").Unsubscriber;
    trigger(type: ToastType, message: string): number;
    success(message: string): number;
    error(message: string): number;
    info(message: string): number;
    warning(message: string): number;
    remove(id: number): void;
    clear(): void;
}
export declare const toast: ToastService;
