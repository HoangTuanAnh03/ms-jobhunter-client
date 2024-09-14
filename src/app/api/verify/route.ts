import authApiRequest from "@/apiRequests/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

type Params = {
  code: string;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  const code = request.nextUrl.searchParams.get("code");
  const res = await authApiRequest.verifyRegister(code!);

  if (res.payload.code === 200) {
    // success
    redirect("/verify_email?type=success");
  } else if (res.payload.code === 400) {
    // fail
    redirect("/verify_email?type=failed");
  } else if (res.payload.code === 1005) {
    // timeout
    redirect("/verify_email?type=timeout");
  }

  return Response.json("res.data", {
    status: 200,
  });
}
