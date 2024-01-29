import { api } from "@/trpc/react";

export function BoardHeader(props: { board_id: number }) {
  const { data: boards } = api.board.getBoards.useQuery(undefined, {
    enabled: false,
  });
  let boardName = "";

  if (boards?.length) {
    boardName = boards.find(
      (board) => board.board_id === Number(props.board_id),
    )?.name!;
  }

  return (
    <header className="h-[60px] w-full shrink-0 border-b bg-card p-4 text-lg font-semibold tracking-tight">
      {boardName}
    </header>
  );
}
