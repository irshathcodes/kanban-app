import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { boardsTable, columnsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const boardRouter = createTRPCRouter({
  createBoard: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const user_id = ctx.session.user.id;
      const newBoard = await ctx.db
        .insert(boardsTable)
        .values({ user_id, name: input });

      const board_id = Number(newBoard.insertId);
      await ctx.db.insert(columnsTable).values([
        { board_id, name: "Todo", order: 0 },
        { board_id, name: "Doing", order: 1 },
        { board_id, name: "Done", order: 2 },
      ]);
    }),
  getBoards: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(boardsTable)
      .where(eq(boardsTable.user_id, ctx.session.user.id));
  }),
});
