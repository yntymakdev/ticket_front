import { IUser } from "./user.types";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export namespace AUTH {
  // --- Запросы ---
  export type GetRequest = void;

  export type GetResponse = IUser;

  export interface PostLoginRequest {
    email: string;
    password: string;
  }

  export interface PostRegisterRequest {
    email: string;
    password: string;
  }

  export interface PatchRefreshTokenRequest {
    refreshToken: string;
  }

  // --- Ответы ---
  export interface PostLoginResponse extends ITokens {
    user: IUser;
  }

  export interface PostRegisterResponse extends ITokens {
    user: IUser;
  }

  export interface PatchRefreshTokenResponse extends ITokens {
    user: IUser;
  }
}
