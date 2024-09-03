'use client'
import LoginForm from "@/app/(auth)/login/login-form";
import { Button } from "@/components/ui/button";
import { websites } from "@/lib/data";
import { sendRequest } from "@/utils/api";

export default function LoginPage() {
  async function onSubmit() {
    const res = await sendRequest<any>({
      url: "http://localhost:8080/auth/refresh",
      method: "POST",
      body: {
        email: "your-email",
        password: "your-password",
      },
    });
    console.log(res.code);}

  return (
    <div>
      <h1 className='text-xl font-semibold text-center mt-10'>Đăng nhập</h1>
      <div className='flex justify-center'>
      <div
          className="!mt-8 w-full"
          onClick={onSubmit}
        >
          Đăng nhập bằng Email
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
