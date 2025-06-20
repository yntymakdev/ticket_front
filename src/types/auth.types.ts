import { IUser } from "./user.types";

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export interface ITokens {
  refreshToken: string;
  accessToken: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}
