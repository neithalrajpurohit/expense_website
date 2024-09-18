import { router, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { uniqBy } from "lodash";
import { z } from "zod";

export const userRouter = router({
  myProfile: protectedProcedure.query(({ ctx, input }) => {
    if (ctx.session.user.email) {
      const user = ctx.db.user.findFirst({
        where: { email: ctx.session.user.email },
      });
      return user;
    } else {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error",
      });
    }
  }),

  createExpense: protectedProcedure
    .input(z.object({ title: z.string(), price: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { price, title } = input;
      await ctx.db.expanse.create({ data: { price, title } });
      return {
        success: true,
        message: "Expense added",
      };
    }),

  getAllExpanse: protectedProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ ctx, input }) => {
      const expanses = await ctx.db.expanse.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date(input.date).setHours(0, 0, 0)), // Start of the today
            lt: new Date(new Date(input.date

        
            ).setHours(23, 59, 59)), // end of the day
          },
        },
      });
      return expanses;
    }),

  getSearchSuggestions: protectedProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ ctx, input }) => {
      const { title } = input;
      try {
        const suggestions = await ctx.db.expanse.findMany({
          where: {
            title: {
              contains: title, // You can use other filtering options like 'startsWith', 'endsWith', 'contains', etc.
            },
          },
        });
        return uniqBy(
          suggestions.map((suggestion) => {
            return {
              ...suggestion,
              title: suggestion.title.trim(),
            };
          }),
          "title",
        );
      } catch (error) {
        throw new Error(`Error fetching search suggestions: ${error.message}`);
      }
    }),
});
