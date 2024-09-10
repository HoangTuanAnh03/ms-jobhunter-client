import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // const res: IBackendRes<LoginResType> = await request.json();
  // console.log("🚀 ~ POST ~ refreshToken:", refreshToken)

  // const accessToken = res.data?.access_token;
  // const refreshToken = res.data?.refresh_token;
  // if (!accessToken) {
  //   return Response.json(
  //     { message: "Không nhận được access token" },
  //     {
  //       status: 400,
  //     }
  //   );
  // }
  // const headers = new Headers();
  // headers.append(
  //   "Set-Cookie",
  //   `accessToken=${accessToken}; Path=/; HttpOnly; Secure`
  // );
  // headers.append(
  //   "Set-Cookie",
  //   `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure`
  // );
  redirect("/login")
  return Response.json("res.data", {
    status: 200,
    // headers: headers,
  });
}
