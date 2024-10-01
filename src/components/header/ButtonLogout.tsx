"use client";

import authApiRequest from "@/apiRequests/auth";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { handleErrorApi } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter } from "next/navigation";

export function ButtonLogout() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation()

  const handleLogout = async () => {
    if (logoutMutation.isPending) return

    try {
      await authApiRequest.logout()
      router.push('/login')
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  return (
    <div
      onClick={handleLogout}
    >
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </div>
  );
}
