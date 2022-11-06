import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { distinctUntilChanged, map, share } from "rxjs/operators";

import { cache, clone, distinct } from "../utils";

import type { Plugin } from "~/niflheim/plugins";

function createStore<TState>(state: TState, plugins: Plugin<TState>[]) {
  const state$ = new BehaviorSubject<TState>(state);

  function setState(action: string, setter: (state: TState) => TState): void {
    if (plugins.length > 0) {
      plugins.map((plugin) => plugin.execute(action, state$));
    }

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
      share({ connector: () => new ReplaySubject(1), resetOnComplete: true })
    );
  }

  return { setState, getState, select$ };
}

export { createStore };
