import { LoginResType } from "@/schemaValidations/auth.schema";

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
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `accessToken=${accessToken}; Path=/; HttpOnly; Secure`
  );
  headers.append(
    "Set-Cookie",
    `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure`
  );
  return Response.json(res.data, {
    status: 200,
    headers: headers,
  });
}
