import http from "@/utils/api";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/auth/login", body),

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

  register: (body: RegisterBodyType) =>
    http.post<IBackendRes<any>>("/auth/register", body),

  auth: (body: IBackendRes<LoginResType>) =>
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

  verifyRegister: (code: string) =>
    http.get<IBackendRes<LoginResType>>(`/auth/verifyRegister?code=${code}`),

  outbound: (code: string) =>
    http.post<IBackendRes<LoginResType>>(
      `/auth/outbound/authentication?code=${code}`,
      null
    ),
};

export default authApiRequest;
