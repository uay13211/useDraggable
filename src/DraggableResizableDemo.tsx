import React from "react";
import {Resizable} from "./component/Resizable";
import {useDraggable} from "./hooks/useDraggable";

export const DraggableResizableDemo = React.memo(() => {
    const draggableRef = React.useRef<HTMLDivElement | null>(null);
    const bind = useDraggable({target: draggableRef});

    return (
        <Resizable ref={draggableRef} initialHeight={200} initialWidth={200} minHeight={200} minWidth={200} maxHeight={500} maxWidth={500} x={300} y={400}>
            <div style={{width: "100%", height: 50, background: "red"}} {...bind}>
                Drag me
            </div>
        </Resizable>
    );
});
