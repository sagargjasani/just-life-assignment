import { z } from "zod";
import type { LoginResponse } from "~~/shared/types/auth";

const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(18),
});

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  const parsed = await readValidatedBody(event, LoginRequestSchema.safeParse);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid login payload",
    });
  }

  const emailOk = parsed.data.email === "sagar@justlife.com";
  const passwordOk = parsed.data.password === "12345678";

  if (!(emailOk && passwordOk)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid credentials",
    });
  }

  return { user: { name: "Sagar Jasani" } };
});
