import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { columnsTable, tasksTable } from "@/server/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(z.object({ name: z.string(), column_id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .insert(tasksTable)
        .values({ name: input.name, column_id: input.column_id });
    }),

  getColumnsAndTasks: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const columns = await ctx.db
        .select()
        .from(columnsTable)
        .where(eq(columnsTable.board_id, input));

      const tasks = await ctx.db
        .select()
        .from(tasksTable)
        .where(
          inArray(
            tasksTable.column_id,
            columns.map((col) => col.column_id),
          ),
        );
      return { tasks, columns };
    }),
});
