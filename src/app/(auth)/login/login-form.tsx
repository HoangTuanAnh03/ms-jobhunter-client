"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  LoginBodyType,
  LoginBody,
} from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { sendRequest } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const LoginForm = () => {
  const { toast } = useToast();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    mode: "all",
    defaultValues: {
      email: "user@gmail.com",
      password: "12345678",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    const res = await sendRequest<IBackendRes<ILoginResponse>>({
      url:  `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
      method: "POST",
      body: {
        email: values.email,
        password: values.password,
      },
    });
    console.log(res.code);

    if (res.code === 200) {
      // toast("Đăng nhập thành công");
      // form.reset();
      const resultFromNextServer = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(res),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      toast({
        variant:"destructive",
        title: "Nhập sai Email hoặc mật khẩu ",
        // description: "Friday, February 10, 2023 at 5:57 PM",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <abbr className="text-red-600">*</abbr>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mật khẩu <abbr className="text-red-600">*</abbr>
              </FormLabel>
              <FormControl>
                <Input placeholder="Mật khẩu" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="!mt-8 w-full"
        >
          Đăng nhập bằng Email
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
