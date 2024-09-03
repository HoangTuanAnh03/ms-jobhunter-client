import z from "zod";

export const RegisterBody = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: "Thông tin bắt buộc",
      })
      .max(256),
    email: z
      .string()
      .trim()
      .min(1, {
        message: "Thông tin bắt buộc",
      })
      .email()
      .max(256),
    password: z
      .string({})
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự",
      })
      .max(30)
      .nonempty({ message: "Thông tin bắt buộc" }),
    // confirmPassword: z.string().min(6).max(30),
  })
  .strict();
// .superRefine(({ confirmPassword, password }, ctx) => {
//   if (confirmPassword !== password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Mật khẩu không khớp",
//       path: ["confirmPassword"],
//     });
//   }
// });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z.object({
    email: z.string().trim().min(1, {
      message: "Thông tin bắt buộc",
    })
    .email()
    .max(256),
  password: z.string().min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự",
    })
    .max(30)
    .nonempty({ message: "Thông tin bắt buộc" }),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
