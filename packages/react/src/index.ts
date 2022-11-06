import { useLayoutEffect } from "react";
import type { Observable } from "rxjs";

import { useForceUpdate, useRefOnce } from "./private";

function useObservable<TSource>(source$: Observable<TSource>, init: TSource) {
  const reference = useRefOnce<TSource>(() => init);
  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    if (!source$ || !source$.subscribe) return;

    const subscription = source$.subscribe((state: TSource) => {
      forceUpdate();
      reference.current = state;
    });

    return () => subscription.unsubscribe();
  }, [source$]);

  return reference.current;
}

export { useObservable };
