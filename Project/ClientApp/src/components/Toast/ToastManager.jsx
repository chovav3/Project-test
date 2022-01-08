import React from "react";
import ReactDOM from "react-dom";
import Toast from '../Toast/Toast'

export class ToastManager {
    containerRef;
    toasts = [];

    constructor() {
        const body = document.getElementsByTagName("body")[0];
        const toastContainer = document.createElement("div");
        toastContainer.id = "toast-container-main";
        body.insertAdjacentElement("beforeend", toastContainer);
        this.containerRef = toastContainer;
    }

    show(options) {
        const toastId = Math.random().toString(36).substr(2, 9);
        const toast = {
            id: toastId,
            ...options,
            destroy: () => this.destroy(toastId),
        };

        this.toasts = [...this.toasts, toast];
        this.render();
    }

    destroy(id) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
        this.render();
    }

    render() {
        const toastsList = this.toasts.map((toastProps) => (
            <Toast key={toastProps.id} {...toastProps} />
        ));
        ReactDOM.render(toastsList, this.containerRef);
    }
}

export const toast = new ToastManager();