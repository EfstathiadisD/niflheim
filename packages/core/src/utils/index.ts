function cache<TInput, TOutput = TInput>(fn: (input: TInput) => TOutput) {
  const cache = new Map<TInput, TOutput>();

  return function (input: TInput): TOutput | undefined {
    if (cache.has(input)) return cache.get(input);

    const result = fn(input);
    cache.set(input, result);

    return result;
  };
}

function log<TPayload>(detail: { action: string; payload: TPayload }): void {
  if (!window.DEBUG_STREAM) return;

  const event: CustomEvent = new CustomEvent("DISPATCH", {
    detail,
  });

  document.dispatchEvent(event);
}

function distinct<TShape>(prev: TShape, curr: TShape): boolean {
  if (Array.isArray(prev) && Array.isArray(curr)) {
    if (prev.length === curr.length) {
      return JSON.stringify({ ...prev }) === JSON.stringify({ ...curr });
    }
    return false;
  }

  if (typeof prev === "object" && typeof curr === "object") {
    return JSON.stringify({ ...prev }) === JSON.stringify({ ...curr });
  }

  return prev === curr;
}

function clone<TSource>(source: TSource): TSource {
  return JSON.parse(JSON.stringify(source));
}

export { cache, clone, distinct, log };
