import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { boards, columns, tasks } from "@/server/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
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
  getColumnsWithTasks: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          column_id: columns.column_id,
          column_name: columns.name,
          column_order: columns.order,
          tasks: sql`JSON_ARRAYAGG(JSON_OBJECT('task_id', ${tasks.task_id}, 'name', ${tasks.name}, 'description', ${tasks.description}))`,
        })
        .from(tasks)
        .leftJoin(columns, eq(tasks.column_id, columns.column_id))
        .where(eq(columns.board_id, input))
        .groupBy(sql`${columns.column_id}`);
    }),
});
