import { useEffect } from "react";

export function useAsyncEffect(effect: () => void, deps: any[]) {
  useEffect(() => {
    const e = effect();
    async function run() {
      await e;
    }
    run();
  }, deps);
}
