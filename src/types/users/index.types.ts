import type { IInputValidation } from '@/types/common/index.types';

export interface ILoginInputInfo {
  id: IInputValidation;
  password: IInputValidation;
}

export interface IUserInfo {
  nickName: string;
  point: number;
}

export interface IUserStore extends IUserInfo {
  setUserInfo: (userInfo: IUserInfo) => void;
  clearUserInfo: () => void;
}
