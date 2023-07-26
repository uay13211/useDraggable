import React from "react";
import {Resizer} from "./Resizer";
import classNames from "classnames";
import type {DragState} from "../../hooks/useDraggable/type";
import {useCompositeRef} from "../../hooks/useCompositeRef";

interface Rect {
    top: number;
    right: number;
    left: number;
    bottom: number;
    width: number;
    height: number;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    x: number;
    y: number;
    initialHeight: number;
    initialWidth: number;
    minHeight?: number;
    minWidth?: number;
    maxHeight?: number;
    maxWidth?: number;
    gap?: number;
}

const RESIZER_THICKNESS = 8;

export const Resizable = React.forwardRef<HTMLDivElement, Props>(
    ({initialHeight, initialWidth, x, y, className, style, gap, children, maxHeight = window.innerHeight, maxWidth = window.innerWidth, minHeight = 0, minWidth = 0, ...restProps}, ref) => {
        const resizableRef = React.useRef<HTMLDivElement | null>(null);
        const startRect = React.useRef<Rect>({top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0});
        const compositeRef = useCompositeRef(resizableRef, ref);

        const onResizeStart = () => {
            if (resizableRef.current) {
                const {top, right, bottom, left, width, height} = resizableRef.current.getBoundingClientRect();
                startRect.current = {top, right, bottom, left, width, height};
            }
        };

        const onResizeTop = (state: DragState) => {
            if (resizableRef.current) {
                const {top, height} = startRect.current;
                const deltaY = state.delta[1];
                const transformedHeight = height - deltaY;
                if (transformedHeight < minHeight || transformedHeight > maxHeight) {
                    return;
                }
                resizableRef.current.style.top = `${top + deltaY}px`;
                resizableRef.current.style.height = `${transformedHeight}px`;
            }
        };

        const onResizeRight = (state: DragState) => {
            if (resizableRef.current) {
                const {width} = startRect.current;
                const transformedWidth = width + state.delta[0];
                if (transformedWidth < minWidth || transformedWidth > maxWidth) {
                    return;
                }
                resizableRef.current.style.width = `${transformedWidth}px`;
            }
        };

        const onResizeBottom = (state: DragState) => {
            if (resizableRef.current) {
                const {height} = startRect.current;
                const transformedHeight = height + state.delta[1];
                if (transformedHeight < minHeight || transformedHeight > maxHeight) {
                    return;
                }
                resizableRef.current.style.height = `${transformedHeight}px`;
            }
        };

        const onResizeLeft = (state: DragState) => {
            if (resizableRef.current) {
                const {left, width} = startRect.current;
                const deltaX = state.delta[0];
                const transformedWidth = width - deltaX;
                if (transformedWidth < minWidth || transformedWidth > maxWidth) {
                    return;
                }
                resizableRef.current.style.left = `${left + deltaX}px`;
                resizableRef.current.style.width = `${transformedWidth}px`;
            }
        };

        return (
            <div
                className={classNames("g-resizable", className)}
                ref={compositeRef}
                style={{position: "fixed", zIndex: 99, border: "1px solid #333", height: initialHeight, width: initialWidth, top: y, left: x, ...style}}
                {...restProps}
            >
                <Resizer
                    style={{
                        cursor: "ns-resize",
                        top: -RESIZER_THICKNESS / 2,
                        left: RESIZER_THICKNESS / 2,
                        width: `calc(100% - ${RESIZER_THICKNESS}px)`,
                        height: RESIZER_THICKNESS,
                    }}
                    onResizeStart={onResizeStart}
                    gap={gap}
                    onResize={onResizeTop}
                />
                <Resizer
                    style={{
                        cursor: "nesw-resize",
                        width: 2 * RESIZER_THICKNESS,
                        height: 2 * RESIZER_THICKNESS,
                        top: -RESIZER_THICKNESS,
                        left: `calc(100% - ${RESIZER_THICKNESS}px)`,
                    }}
                    gap={gap}
                    onResizeStart={onResizeStart}
                    onResize={state => {
                        onResizeTop(state);
                        onResizeRight(state);
                    }}
                />
                <Resizer
                    style={{
                        cursor: "ew-resize",
                        top: RESIZER_THICKNESS / 2,
                        left: `calc(100% - ${RESIZER_THICKNESS / 2}px)`,
                        width: RESIZER_THICKNESS,
                        height: `calc(100% - ${RESIZER_THICKNESS}px)`,
                    }}
                    gap={gap}
                    onResizeStart={onResizeStart}
                    onResize={onResizeRight}
                />
                <Resizer
                    style={{
                        cursor: "nwse-resize",
                        width: 2 * RESIZER_THICKNESS,
                        height: 2 * RESIZER_THICKNESS,
                        top: `calc(100% - ${RESIZER_THICKNESS}px)`,
                        left: `calc(100% - ${RESIZER_THICKNESS}px)`,
                    }}
                    gap={gap}
                    onResizeStart={onResizeStart}
                    onResize={state => {
                        onResizeRight(state);
                        onResizeBottom(state);
                    }}
                />
                <Resizer
                    style={{
                        cursor: "ns-resize",
                        top: `calc(100% - ${RESIZER_THICKNESS / 2}px)`,
                        left: RESIZER_THICKNESS / 2,
                        width: `calc(100% - ${RESIZER_THICKNESS}px)`,
                        height: RESIZER_THICKNESS,
                    }}
                    gap={gap}
                    onResizeStart={onResizeStart}
                    onResize={onResizeBottom}
                />
                <Resizer
                    style={{
                        cursor: "nesw-resize",
                        width: 2 * RESIZER_THICKNESS,
                        height: 2 * RESIZER_THICKNESS,
                        top: `calc(100% - ${RESIZER_THICKNESS}px)`,
                        left: -RESIZER_THICKNESS,
                    }}
                    gap={gap}
                    onResizeStart={onResizeStart}
                    onResize={state => {
                        onResizeBottom(state);
                        onResizeLeft(state);
                    }}
                />
                <Resizer
                    style={{
                        cursor: "ew-resize",
                        top: RESIZER_THICKNESS / 2,
                        left: -RESIZER_THICKNESS / 2,
                        width: RESIZER_THICKNESS,
                        height: `calc(100% - ${RESIZER_THICKNESS}px)`,
                    }}
                    gap={gap}
                    onResizeStart={onResizeStart}
                    onResize={onResizeLeft}
                />
                <Resizer
                    style={{
                        cursor: "nwse-resize",
                        width: 2 * RESIZER_THICKNESS,
                        height: 2 * RESIZER_THICKNESS,
                        top: -RESIZER_THICKNESS,
                        left: -RESIZER_THICKNESS,
                    }}
                    gap={gap}
                    onResizeStart={onResizeStart}
                    onResize={state => {
                        onResizeTop(state);
                        onResizeLeft(state);
                    }}
                />
                <div className="g-resizable-body">{children}</div>
            </div>
        );
    }
);
