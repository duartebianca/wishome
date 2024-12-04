import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(5, { message: "Digite seu nome e Sobrenome." }),
    email: z.string().email({ message: "E-mail inválido." }),
    phone: z
      .string()
      .min(11, { message: "Digite seu número de WhatsApp, sem espaços." }),
  });

export type RegisterFormInputs = z.infer<typeof RegisterSchema>;
