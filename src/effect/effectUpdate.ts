// 用于记录当前渲染是否是首次渲染

import { useEffect, useRef } from "react";

// Language: typescript
function useFirstMountState() {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
}
// 会忽略 useEffect 首次执行，只在依赖更新时执行
export function useUpdateEffect(effect: () => void, deps: any[]) {
  const isFirstMount = useFirstMountState(); // 是否首次渲染
  useEffect(() => {
    if (!isFirstMount) {
      return effect(); // 如果不是首次，则执行 effect 函数
    }
    effect();
  }, deps);
}
