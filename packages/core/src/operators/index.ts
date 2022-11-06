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

export { debug };
