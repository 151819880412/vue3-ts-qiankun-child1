import { UserInfo } from '#/store';

export interface LoginResultModel{
  userId: string | number;
  token: string;
  refreshToken: string;
  user: UserInfo;
  data: Object;
}