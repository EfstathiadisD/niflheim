declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: {
      connect(options: Record<string, unknown>): {
        send<TPaylod = unknown>(
          name: string,
          payload: TPaylod
        ): (input: TPaylod) => TPaylod;
      };
    };
    DEBUG_STREAM: boolean;
  }
}

export {};
