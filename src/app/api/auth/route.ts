import { LoginResType } from "@/schemaValidations/auth.schema";
import { decodeJWT } from '@/lib/utils'
type PayloadJWT = {
  iat: number
  exp: number
  tokenType: string
  userId: number
}

export async function POST(request: Request) {
  const res: IBackendRes<LoginResType> = await request.json();
  const accessToken = res.data?.access_token;
  const refreshToken = res.data?.refresh_token;
  if (!accessToken) {
    return Response.json(
      { message: "Không nhận được access token" },
      {
        status: 400,
      }
    );
  }

  const payloadAccessToken = decodeJWT<PayloadJWT>(accessToken)
  const expiresDateAccessToken = new Date(payloadAccessToken.exp * 1000).toUTCString()
  const payloadRefreshToken = decodeJWT<PayloadJWT>(refreshToken!)
  const expiresDateRefreshToken = new Date(payloadRefreshToken.exp * 1000).toUTCString()

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `accessToken=${accessToken}; Path=/; HttpOnly; Expires=${expiresDateAccessToken}; SameSite=Lax; Secure`
  );
  headers.append(
    "Set-Cookie",
    `refreshToken=${refreshToken}; Path=/; HttpOnly; Expires=${expiresDateRefreshToken}; SameSite=Lax; Secure`
  );
  return Response.json(res.data, {
    status: 200,
    headers: headers,
  });
}
