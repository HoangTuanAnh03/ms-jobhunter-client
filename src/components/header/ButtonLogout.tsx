"use client";

import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { clientAccessToken } from "@/utils/api";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

export function ButtonLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutClient()
      router.push('/login')
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  console.log("🚀 ~ Header ~ clientAccessToken:", clientAccessToken)


  return (
    <div
      onClick={handleLogout}
    >
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </div>
  );
}
