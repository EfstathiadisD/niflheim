import { tap } from "rxjs/operators";

import type { Observable } from "rxjs";

import { log } from "../utils";

function debug<TPayload>(action: string) {
  return (source$: Observable<TPayload>) => {
    return source$.pipe(
      tap({
        next: (payload) => {
          log({ action, payload });
        },
        error: (payload) => {
          log({ action, payload });
        },
      })
    );
  };
}

type StorageMedium = "LOCAL_STORAGE" | "SESSION_STORAGE" | "INDEX_DB";

function store<TPayload>(action: string, medium: StorageMedium) {
  return (source$: Observable<TPayload>) => {
    return source$.pipe(
      tap({
        next: (payload) => {
          console.log("Next", payload);
        },
        error: (payload) => {
          console.log("Error", payload);
        },
      })
    );
  };
}

export { store, debug };
