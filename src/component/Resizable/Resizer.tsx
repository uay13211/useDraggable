import React from "react";
import type {DragHandler} from "../../hooks/useDraggable/type";
import {useDraggable} from "../../hooks/useDraggable";
import classNames from "classnames";

interface Props {
    onResizeStart: DragHandler;
    onResize: DragHandler;
    gap?: number;
    className?: string;
}

export const Resizer = React.memo(({onResizeStart, onResize, gap, className}: Props) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const bind = useDraggable({target: ref, onDragStart: onResizeStart, onDrag: onResize, disabled: true, gap});

    return <div className={classNames("resizer", className)} ref={ref} {...bind} />;
});
