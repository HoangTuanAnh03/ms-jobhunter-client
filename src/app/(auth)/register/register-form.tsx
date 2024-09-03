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
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { sendRequest } from "@/utils/api";

const RegisterForm = () => {
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      // confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    // const result = await fetch(
    //   `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
    //   {
    //     body: JSON.stringify(values),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //   }
    // ).then((res) => res.json());
    // console.log(result);
    console.log("🚀 ~ onSubmit ~ values:", values)
    

    const res = await sendRequest<IBackendRes<any>>({
      url: "http://localhost:8080/auth/register",
      method: "POST",
      body: {
        email: values.email,
        name: values.name,
        password: values.password,
      },
    });
    console.log(res);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Họ và Tên <abbr className="text-red-600">*</abbr>
              </FormLabel>
              <FormControl>
                <Input placeholder="Họ và Tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" className="!mt-8 w-full">
          Đăng ký bằng Email
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
