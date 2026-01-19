import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IUserStore, IUserInfo } from '@/types/users/index.types';

export const userStorageKey = 'userInfo';

export const initialUserInfo: IUserInfo = {
  nickName: '',
  point: 0,
};

export const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      ...initialUserInfo,
      setUserInfo: ({ nickName, point }: IUserInfo): void => {
        set({ nickName, point });
      },
      clearUserInfo: (): void => {
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: userStorageKey,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
