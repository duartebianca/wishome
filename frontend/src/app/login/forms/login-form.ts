import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "E-mail Incorreto." }),
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
