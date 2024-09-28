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
import { LoginBodyType, LoginBody } from "@/schemaValidations/auth.schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Description } from "@radix-ui/react-toast";
import Link from "next/link";
import { useLoginMutation } from "@/queries/useAuth";

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const loginMutation = useLoginMutation();

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
    if (loginMutation.isPending) return;

    const res = await loginMutation.mutateAsync(values);
    console.log("🚀 ~ onSubmit ~ res:", res);

    if (res.payload.code === 200) {
      // toast({ description: "Đăng nhập thành công" });
      form.reset();
      router.push("/");
    } else {
      toast({
        variant: "destructive",
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
        className="space-y-4 flex-shrink-0 w-full"
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
                <Input
                  className="h-11"
                  placeholder="Email"
                  type="email"
                  {...field}
                />
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
              <div className="flex justify-between items-center">
                <FormLabel>
                  Mật khẩu <abbr className="text-red-600">*</abbr>
                </FormLabel>
                <Description className="text-[#192fb5] font-normal">
                  <Link href={"#"}>Quên mật khẩu?</Link>
                </Description>
              </div>
              <FormControl>
                <Input
                  className="h-11"
                  placeholder="Mật khẩu"
                  type="password"
                  {...field}
                />
                {/* <PasswordInput/> */}
                {/* <PasswordInput
                  id="password_confirmation"
                  // value={passwordConfirmation}
                  // onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete="new-password"
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="!mt-8 w-full h-11 bg-[#c82222] text-[16px]"
        >
          Đăng nhập bằng Email
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
