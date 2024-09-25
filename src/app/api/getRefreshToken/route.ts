import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = cookies()
  const refresh_token = cookieStore.get('refreshToken')?.value ?? ""

  return Response.json(
      refresh_token
    , {
      status: 200,
    });

}
