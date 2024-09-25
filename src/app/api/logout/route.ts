import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/utils/api";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;

  const removeHeaders = new Headers();
  removeHeaders.append(
    "Set-Cookie",
    `accessToken=; Path=/; HttpOnly; Secure; Max-Age=0`
  );
  removeHeaders.append(
    "Set-Cookie",
    `refreshToken=; Path=/; HttpOnly; Secure; Max-Age=0`
  );

  if (force) {
    return Response.json(
      {
        message: "Buộc đăng xuất thành công",
      },
      {
        status: 200,
        headers: removeHeaders,
      }
    );
  }
  const cookieStore = cookies();
  const refresh_token = cookieStore.get("refreshToken");
  if (!refresh_token) {
    return Response.json(
      { message: "Không nhận được refresh token" },
      {
        status: 401,
      }
    );
  }
  try {
    const res = await authApiRequest.logout(refresh_token.value);
    return Response.json(res.payload, {
      status: 200,
      headers: removeHeaders,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
