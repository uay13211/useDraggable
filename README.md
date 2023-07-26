## use-draggable

provide a react hook for creating draggable and resizable element

# Installation

```sh
#PNPM
pnpm add use-draggable

#NPM
npm i use-draggable
```

# Simple example

```tsx
import React from "react";
import {Resizable} from "use-draggable/component/Resizable";
import {useDraggable} from "use-draggable/hooks/useDraggable";

export const DraggableResizableDemo = React.memo(() => {
    const draggableRef = React.useRef<HTMLDivElement | null>(null);
    const bind = useDraggable({target: draggableRef});

    return (
        <Resizable ref={draggableRef} initialHeight={200} initialWidth={200} x={0} y={0}>
            <div style={{width: "100%", height: 50, background: "red"}} {...bind}>
                Drag me
            </div>
        </Resizable>
    );
});
```

The example above create a resizable `div` that can follow the mouse when u drag its header.

The `useDraggable` accept a ref of the element that move with the drag, and return a group of event listener that bind to the element for accepting the drag event.
