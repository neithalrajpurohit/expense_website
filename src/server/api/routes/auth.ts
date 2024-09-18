import { router, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { hash } from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({ email: z.string(), name: z.string(), password: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, name, password } = input;
      if (!(email || name || password))
        throw new Error("Missing Input Fields!");

      let user = await ctx.db.user.findFirst({ where: { email } });
      if (user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email Already Exist!",
        });
      }
      const hashedPassword = await hash(password, 10);
      await ctx.db.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name,
        },
      });
      return {
        message: "Signup Successfull",
      };
    }),
});
