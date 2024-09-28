import http from "@/utils/api";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";
import { NewPasswordReq } from "@/schemaValidations/user.schema";

const authApiRequest = {
  sLogin: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/auth/login", body),

  login: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/api/auth/login", body, {
      baseUrl: "",
    }),

  sOutbound: (code: string) =>
    http.post<IBackendRes<LoginResType>>(
      `/auth/outbound/authentication?code=${code}`,
      null
    ),

  outbound: (code: string) =>
    http.post("/api/auth/outbound", code, {
      baseUrl: "",
    }),

  sVerifyRegister: (code: string) =>
    http.get<IBackendRes<LoginResType>>(`/auth/verifyRegister?code=${code}`),

  verifyRegister: (code: string) =>
    http.post<IBackendRes<LoginResType>>("/api/auth/verify/register", code, {
      baseUrl: "",
    }),

  sVerifyNewPassword: (body: NewPasswordReq) =>
    http.post<IBackendRes<LoginResType>>(`/auth/verifyForgotPassword`, body),

  verifyNewPassword: (body: NewPasswordReq) =>
    http.post<IBackendRes<LoginResType>>("/api/auth/verify/newPassword", body, {
      baseUrl: "",
    }),

  logout: (refresh_token: string) =>
    http.post<IBackendRes<any>>(
      "/auth/logout",
      {},
      {
        headers: { Cookie: `refresh_token=${refresh_token}` },
      }
    ),

  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    ),

  sRegister: (body: RegisterBodyType) =>
    http.post<IBackendRes<any>>("/auth/register", body),

  nextServerSetCookieForClient: (body: IBackendRes<LoginResType>) =>
    http.post<string>("/api/auth", body, {
      baseUrl: "",
    }),

  logoutClient: () =>
    http.post("/api/logout", null, {
      baseUrl: "",
    }),

  getRefreshToken: () =>
    http.post("/api/getRefreshToken", null, {
      baseUrl: "",
    }),
};

export default authApiRequest;
