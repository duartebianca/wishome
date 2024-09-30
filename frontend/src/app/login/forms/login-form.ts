import { z } from "zod";

export const passwordValidation = z.string({
  message: "E-mail ou Senha Incorretos.",
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "E-mail ou Senha Incorretos." }),
  password: passwordValidation,
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
