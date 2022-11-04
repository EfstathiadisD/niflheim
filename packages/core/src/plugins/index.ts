import { cache } from "../utils";

type Plugin = "REDUX_PLUGIN" | "PERSIST_PLUGIN" | "NETWORK_PLUGIN";

function reduxPlugin(name = "REDUX_PLUGIN", options?: Record<string, unknown>) {
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

function persistPlugin() {
  document.addEventListener("PERSIST", (event: Event) => {
    const customEvent = event as CustomEvent<Record<string, string>>;
  });
}

export { reduxPlugin, persistPlugin };
export type { Plugin };
