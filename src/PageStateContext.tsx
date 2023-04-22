import { createContext, useContext } from 'react';

export const PageStateContext = createContext(undefined as any);
export function usePageStateContext() {
  return useContext(PageStateContext);
}
