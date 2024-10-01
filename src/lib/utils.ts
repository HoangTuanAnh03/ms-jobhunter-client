import { toast } from "@/hooks/use-toast";
import { EntityError } from "@/utils/api";
import { type ClassValue, clsx } from "clsx";
import jwt from "jsonwebtoken";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

type PayloadJWT = {
  uid: string;
  sub: string;
  scope: string;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
};

export const decodeJWT = (token: string) => {
  return jwt.decode(token) as PayloadJWT;
};

const isClient = typeof window !== "undefined";

export const getAccessTokenFormLocalStorage = () => {
  return isClient ? localStorage.getItem("accessToken") : "";
};

export const getRefreshTokenFormLocalStorage = () => {
  return isClient ? localStorage.getItem("refreshToken") : "";
};
