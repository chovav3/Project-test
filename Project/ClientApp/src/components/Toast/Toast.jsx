import React, { useEffect } from "react";
import '../Toast/Toast.css'
import  TosatIcon  from './ToastIcon'

const Toast = (props) => {
    const { destroy, content, variant, duration = 0 } = props;

    useEffect(() => {
        if (!duration) return;

        const timer = setTimeout(() => {
            destroy();
        }, duration);

        return () => clearTimeout(timer);
    }, [destroy, duration]);

    return (
        <div className={variant} >
            <div className={"toast-header"}>
                <div>{variant}</div>
                <button className="destroy" onClick={destroy}>X</button>
            </div>
            <div className={"toast-body"}><TosatIcon className="icon" variant={variant} />{content}</div>
        </div>
    );
};
export default Toast