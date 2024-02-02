import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { columnsTable, tasksTable, boardsTable } from "@/server/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(z.object({ name: z.string(), column_id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .insert(tasksTable)
        .values({ name: input.name, column_id: input.column_id });
    }),

  getColumnsWithTasks: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const res = await ctx.db
        .select()
        .from(columnsTable)
        .leftJoin(tasksTable, eq(columnsTable.column_id, tasksTable.column_id))
        .where(eq(columnsTable.board_id, input))
        .groupBy(sql`${columnsTable.column_id}`);

      console.log("res", res);

      throw new Error("oops");
    }),
});
