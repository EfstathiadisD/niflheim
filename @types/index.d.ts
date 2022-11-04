declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: {
      connect(options: Record<string, unknown>): {
        init(state: Record<string, unknown>): void;
        send<TPaylod = unknown>(
          name: string,
          payload: TPaylod
        ): (input: TPaylod) => TPaylod;
        unsubscribe(): void;
      };
    };
    DEBUG_STREAM: boolean;
  }
}

export {};
