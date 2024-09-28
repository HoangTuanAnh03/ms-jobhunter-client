"use client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import authApiRequest from "@/apiRequests/auth";
import { toast } from "@/hooks/use-toast";

export default function Authentication() {
  const router = useRouter();

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
        toast({
          title: "Đăng nhập thành công bằng Google.",
        });
        router.push("/");
      } else {
        toast({
          
          variant: "destructive",
          title: "Có lỗi xẩy ra!",
        });
        router.push("/login");
      }
    }

    outbound(authCode);
  }, []);

  return (
    <div className="w-full h-lvh flex flex-col justify-center items-center">
      <Loader2 className="h-[50px] w-[50px] text-blue-600 animate-spin" />
      <div className="mt-4">Authenticate ...</div>
    </div>
  );
}
