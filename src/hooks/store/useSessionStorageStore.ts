import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ISessionStorageStore, ISessionStorageState } from '@/types/common/index.types';

export const sessionStorageKey = 'sessionStorage';

export const initialState: ISessionStorageState = {
  duplicatedHistoryCount: 0,
};

export const useSessionStorageStore = create(
  persist<ISessionStorageStore>(
    (set) => ({
      ...initialState,
      setDuplicatedHistoryCount: (duplicatedHistoryCount: number): void => {
        set({ duplicatedHistoryCount });
      },
      clearDuplicatedHistoryCount: (): void => {
        set({ duplicatedHistoryCount: 0 });
      },
    }),
    {
      name: sessionStorageKey,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
