import { BehaviorSubject, Observable } from "rxjs";
import {
  map,
  distinctUntilChanged,
  skip,
  take,
  shareReplay,
} from "rxjs/operators";

import { cache, clone, distinct } from "../utils";
import { debug } from "../operators";

function connectDevTools(name: string, options?: Record<string, unknown>) {
  console.info("🏁🏁🏁 RxDevTools connecting... 🏁🏁🏁");
  const isBrowser: boolean = typeof window !== "undefined";
  const isReduxDevToolsEnabled = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (!isBrowser || !isReduxDevToolsEnabled) return;

  const defaultOptions: Record<string, unknown> = {
    name: `@@${name}`,
    trace: true,
    jump: true,
  };

  window.DEBUG_STREAM = true;

  const DEV_TOOLS = window.__REDUX_DEVTOOLS_EXTENSION__.connect(
    Object.assign({}, defaultOptions, options)
  );

  DEV_TOOLS.send("@@INIT", null);

  document.addEventListener("DISPATCH", (event: Event) => {
    const { action, payload } = (
      event as CustomEvent<{
        action: string;
        payload: unknown;
      }>
    ).detail;

    cache(DEV_TOOLS.send(action, payload));
  });
}

function createStore<TState>(state: TState) {
  const state$ = new BehaviorSubject<TState>(state);

  function setState(action: string, setter: (state: TState) => TState): void {
    state$.pipe(skip(1), take(1), debug(action)).subscribe();

    return state$.next({
      ...getState(),
      ...clone(setter(getState())),
    });
  }

  function getState(): TState {
    return clone(state$.getValue());
  }

  function select$<TSelected>(
    select: (state: TState) => TSelected | undefined
  ): Observable<TSelected | undefined> {
    return state$.pipe(
      map(cache(select)),
      distinctUntilChanged(distinct),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  return { setState, getState, select$ };
}

export { createStore, connectDevTools };
