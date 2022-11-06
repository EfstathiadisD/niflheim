import { Observable, skip, take } from "rxjs";
import { debug } from "~/niflheim/core";

interface Plugin<TState> {
  execute(action: string, state$: Observable<TState>): void;
}

type ReduxDevToolsParams = {
  name: string;
  options: Record<string, unknown>;
};

function reduxDTPlugin<TState>(params: ReduxDevToolsParams): Plugin<TState> {
  console.info("🏁🏁🏁 RxDevTools connecting... 🏁🏁🏁");

  const IS_BROWSER = typeof window !== "undefined";
  const IS_REDUX_DEVTOOLS_ENABLED = !!window.__REDUX_DEVTOOLS_EXTENSION__;

  if (!IS_BROWSER || !IS_REDUX_DEVTOOLS_ENABLED) {
    throw new Error("ReduxDevTools weren't available in the Window Object.");
  }

  const defaultOptions: Record<string, unknown> = {
    name: `@@${params.name}`,
    trace: true,
    jump: true,
  };

  window.DEBUG_STREAM = true;

  const DEV_TOOLS = window.__REDUX_DEVTOOLS_EXTENSION__.connect(
    Object.assign({}, defaultOptions, params.options)
  );

  DEV_TOOLS.send("@@INIT", null);

  document.addEventListener("DISPATCH", (event: Event) => {
    const { action, payload } = (
      event as CustomEvent<{
        action: string;
        payload: unknown;
      }>
    ).detail;

    DEV_TOOLS.send(action, payload);
  });

  const execute = (action: string, state$: Observable<TState>) => {
    state$.pipe(skip(1), take(1), debug(action)).subscribe();
  };

  return { execute };
}

export { reduxDTPlugin };
export type { Plugin, ReduxDevToolsParams };
