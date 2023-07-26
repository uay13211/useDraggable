import React from "react";
import type {DragHandler} from "../../hooks/useDraggable/type";
import {useDraggable} from "../../hooks/useDraggable";

interface Props {
    onResizeStart: DragHandler;
    onResize: DragHandler;
    gap?: number;
    style?: React.CSSProperties;
}

export const Resizer = React.memo(({onResizeStart, onResize, gap, style}: Props) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const bind = useDraggable({target: ref, onDragStart: onResizeStart, onDrag: onResize, disabled: true, gap});

    return <div className="resizer" style={{position: "absolute", zIndex: 100, ...style}} ref={ref} {...bind} />;
});
