import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IUserStore, IUserInfo } from '@/types/users/index.types';

export const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      nickName: '',
      point: 0,
      setUserInfo: ({ nickName, point }: IUserInfo): void => {
        set({ nickName, point });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
