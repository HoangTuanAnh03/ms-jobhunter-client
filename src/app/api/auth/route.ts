export async function POST(request: Request) {
    const res : IBackendRes<ILoginResponse> = await request.json()
    const refreshToken = await request.headers.get('refresh-token');
    // console.log("🚀 ~ POST ~ refreshToken:", refreshToken)
    
    const accessToken = res.data?.access_token
    if (!accessToken) {
      return Response.json(
        { message: 'Không nhận được access token' },
        {
          status: 400
        }
      )
    }
    return Response.json(res.data, {
      status: 200,
      headers: {
        'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; Secure`
      }
    })
  }