import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { boards, columns } from "@/server/db/schema";
import { z } from "zod";

export const boardRouter = createTRPCRouter({
  createBoard: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const user_id = ctx.session.user.id;
      const newBoard = await ctx.db
        .insert(boards)
        .values({ user_id, name: input });

      const board_id = Number(newBoard.insertId);
      await ctx.db.insert(columns).values([
        { board_id, name: "todo", order: 0 },
        { board_id, name: "doing", order: 1 },
        { board_id, name: "done", order: 2 },
      ]);
    }),
  getBoards: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(boards);
  }),
});
