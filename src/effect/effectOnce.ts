import { useEffect, useRef } from "react";

export function useEffectOnce(effect: () => void) {
  return useEffect(effect, []);
}

export function UseMount(fn: () => void) {
  useEffectOnce(() => {
    fn();
  });
}

export function UseUnmount(fn: () => void) {
  const fnRef = useRef(() => {});
  fnRef.current = fn; // 始终保证是最新的函数
  useEffectOnce(() => () => fnRef.current());
}
