import { CardItem } from "@/components/card/card-item";
import { api } from "@/trpc/react";

export function CardList(props: { board_id: number }) {
  const { data, isLoading, isError } = api.task.getColumnsWithTasks.useQuery(
    props.board_id,
  );

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="m-6">
      <ul className="flex gap-8">
        {data.map((item) => (
          <CardItem key={item.column_id} data={item} />
        ))}
      </ul>
    </div>
  );
}
