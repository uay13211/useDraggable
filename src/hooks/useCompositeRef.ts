import React from "react";

type Ref = React.MutableRefObject<any> | React.RefCallback<any> | undefined | null;

export function useCompositeRef(...refs: Ref[]) {
    return React.useCallback(
        (node: Node | null) => {
            refs.forEach(ref => {
                if (node && ref) {
                    if (typeof ref === "function") {
                        ref(node);
                    } else {
                        ref.current = node;
                    }
                }
            });
        },
        [refs]
    );
}
