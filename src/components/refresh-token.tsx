"use client";

import {
    checkAndRefreshToken
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const UNAUTHENTICATED_PATH = ["/login", "/register", "/refresh-token"];

export default function RefreshToken() {
  const pathName = usePathname();

  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathName)) return;
    let interval: any = null;
    
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
      },
    });

    interval = setInterval(checkAndRefreshToken, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [pathName]);
  return null;
}
