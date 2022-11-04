import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";
import { distinctUntilChanged, map, take, skip, share } from "rxjs/operators";

import { cache, clone, distinct } from "../utils";
import { debug } from "../operators";
import type { Plugin } from "../plugins";

function createStore<TState>(state: TState, middlewares: { name: Plugin }[]) {
  const state$ = new BehaviorSubject<TState>(state);

  function setState(action: string, setter: (state: TState) => TState): void {
    if (middlewares.length > 0) {
      middlewares.forEach(({ name }) => {
        if (name === "REDUX_PLUGIN") {
          state$.pipe(skip(1), take(1), debug(action)).subscribe();
        }
        if (name === "PERSIST_PLUGIN") {
          // state$.pipe(skip(1), take(1), persist(action)).subscribe();
        }
      });
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
