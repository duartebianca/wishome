import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
  .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "A senha deve conter pelo menos um caractere especial.",
  });

export const RegisterSchema = z
  .object({
    name: z.string().min(5, { message: "Digite seu nome e Sobrenome." }),
    email: z.string().email({ message: "E-mail inválido." }),
    phone: z
      .string()
      .min(11, { message: "Digite seu número de WhatsApp, sem espaços." }),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });

export type RegisterFormInputs = z.infer<typeof RegisterSchema>;
