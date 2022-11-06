import { useRef, useState } from "react";

function useRefOnce<TState>(fn: () => TState) {
  const emmited = useRef(true);
  const ref = useRef<TState | null>(null);

  if (emmited.current) {
    emmited.current = false;
    ref.current = fn();
  }

  return ref;
}

function useForceUpdate(): () => void {
  const updateState = useState(() => 0)[1];

  return useRef(() => updateState((n: number) => (n + 1) % 1000)).current;
}

export { useRefOnce, useForceUpdate };
