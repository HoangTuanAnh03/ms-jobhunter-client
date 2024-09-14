import http from "@/utils/api";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/auth/login", body),

  register: (body: RegisterBodyType) =>
    http.post<IBackendRes<any>>("/auth/register", body),

  auth: (body: IBackendRes<LoginResType>) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  
  verifyRegister: (code: string) =>
    http.get<IBackendRes<LoginResType>>(
      `/auth/verifyRegister?code=${code}`,
    ),

  outbound: (code: string) =>
    http.post<IBackendRes<LoginResType>>(
      `/auth/outbound/authentication?code=${code}`,
      null
    ),
};

export default authApiRequest;
