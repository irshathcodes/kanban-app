import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { boards } from "@/server/db/schema";
import { z } from "zod";

export const boardRouter = createTRPCRouter({
  createBoard: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const user_id = ctx.session.user.id;
      await ctx.db.insert(boards).values({ user_id, name: input });
    }),
  getBoards: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(boards);
  }),
});
