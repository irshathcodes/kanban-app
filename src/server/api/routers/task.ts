import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { columns, tasks } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(z.object({ name: z.string(), column_id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .insert(tasks)
        .values({ name: input.name, column_id: input.column_id });
    }),

  getColumnsWithTasks: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          column_id: columns.column_id,
          column_name: columns.name,
          column_order: columns.order,
          tasks: sql<
            Array<typeof tasks.$inferSelect>
          >`JSON_ARRAYAGG(JSON_OBJECT('task_id', ${tasks.task_id}, 'name', ${tasks.name}, 'description', ${tasks.description}))`,
        })
        .from(tasks)
        .rightJoin(columns, eq(tasks.column_id, columns.column_id))
        .where(eq(columns.board_id, input))
        .groupBy(sql`${columns.column_id}`);
    }),
});
