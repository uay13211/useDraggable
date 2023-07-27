import React from "react";

interface TransitionOption {
    // transition related properties
    property?: string;
    // in ms
    duration?: number;
    delay?: number;
    timingFunction?: string;
}

interface Option extends TransitionOption {
    // transform related properties
    x?: string | number;
    y?: string | number;
    z?: string | number;
}

export function useTransform(target: React.RefObject<HTMLElement>) {
    const setTransition = React.useCallback((el: HTMLElement, options: Option) => {
        const {duration, delay, timingFunction, property} = options;
        el.style.willChange = "transform";
        duration && (el.style.transitionDuration = `${duration}ms`);
        delay && (el.style.transitionDelay = `${delay}ms`);
        timingFunction && (el.style.transitionTimingFunction = timingFunction);
        property && (el.style.transitionProperty = property);
    }, []);

    const clearTransition = React.useCallback((el: HTMLElement) => {
        el.style.transitionDuration = "";
        el.style.transitionDelay = "";
        el.style.transitionTimingFunction = "";
        el.style.transitionProperty = "";
    }, []);

    const to = React.useCallback((options: Option) => {
        const {x, y, z} = options;
        const format = (value: string | number | undefined) => (value ? (typeof value === "string" ? value : `${value}px`) : "0");
        requestAnimationFrame(() => {
            if (target.current) {
                setTransition(target.current, options);
                target.current.style.transform = `translate3d(${format(x)}, ${format(y)}, ${format(z)})`;
            }
        });
    }, []);

    const clear = React.useCallback(() => {
        requestAnimationFrame(() => {
            if (target.current) {
                target.current.style.transform = "";
                clearTransition(target.current);
            }
        });
    }, []);

    return {to, clear};
}
