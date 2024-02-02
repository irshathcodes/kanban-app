import { CardItem } from "@/components/card/card-item";
import { api } from "@/trpc/react";

export function CardList(props: { board_id: number }) {
  const { data, isLoading, isError } = api.task.getColumnsAndTasks.useQuery(
    props.board_id,
  );

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <ul className="flex h-full flex-1 gap-8 overflow-auto p-4">
      {data.columns.map((column) => (
        <CardItem key={column.column_id} column={column} tasks={data.tasks} />
      ))}
    </ul>
  );
}
