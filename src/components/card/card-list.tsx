import { api } from "@/trpc/react";

export function CardList(props: { board_id: number }) {
  const { data } = api.task.getColumnsWithTasks.useQuery(props.board_id);

  return <div></div>;
}
