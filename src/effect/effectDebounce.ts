import { memo, useEffect, useMemo, useRef } from "react";

// 用来处理防抖函数的 Hook
function useDebounceFn(fn: () => void, options: { wait: number }) {
  const fnRef = useRef(fn);
  // 保证 debounce 中每次取到的 fn 都是最新的
  fnRef.current = fn;
  const wait = options?.wait ?? 1000;
 /*  const debounced = useMemo(
    () =>
      debounce(
        (...args: any) => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  ); */
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
}
