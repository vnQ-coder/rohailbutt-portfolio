export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Polyfill localStorage in SSR context where it may be broken
    const g = global as unknown as Record<string, unknown>;
    if (
      typeof g["localStorage"] === "undefined" ||
      typeof (g["localStorage"] as Storage)?.getItem !== "function"
    ) {
      g["localStorage"] = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      } as Storage;
    }
  }
}
