"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import authApiRequest from "@/apiRequests/auth";

export default function Authentication() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    const authCode = isMatch ? isMatch[1] : "";

    if (!isMatch) {
      router.push("/login");
    }

    async function outbound(code: string) {
      const res = await authApiRequest.outbound(code);

      if (res.status === 200) {
        setIsLogin(true);
      } else {
        // router.push("/login");
        router.push("/register");
      }
    }

    outbound(authCode);
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin, router]);
  return (
    <div className="w-full h-lvh flex flex-col justify-center items-center">
      <Loader2 className="h-[50px] w-[50px] text-blue-600 animate-spin" />
      <div className="mt-4">Authenticate ...</div>
    </div>
  );
}
