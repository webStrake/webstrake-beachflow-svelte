import { writable } from "svelte/store";
export class ToastService {
    store = writable([]);
    nextId = 0;
    subscribe(run) {
        return this.store.subscribe(run);
    }
    trigger(type, message) {
        const id = this.nextId++;
        this.store.update(toasts => [...toasts, { id, type, message }]);
        return id;
    }
    success(message) {
        return this.trigger('success', message);
    }
    error(message) {
        return this.trigger('error', message);
    }
    info(message) {
        return this.trigger('info', message);
    }
    warning(message) {
        return this.trigger('warning', message);
    }
    remove(id) {
        this.store.update(toasts => toasts.filter(t => t.id !== id));
    }
    clear() {
        this.store.set([]);
    }
}
export const toast = new ToastService();
