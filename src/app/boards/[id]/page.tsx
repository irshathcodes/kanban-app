"use client";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function Board() {
  const { id } = useParams();
  const { data: boards } = api.board.getBoards.useQuery(undefined, {
    enabled: false,
  });
  let boardName = "";

  if (boards?.length) {
    boardName = boards.find((board) => board.board_id === Number(id))?.name!;
  }

  return (
    <div className="flex h-full flex-col">
      <header className="h-[60px] shrink-0 bg-card p-4 text-lg font-semibold tracking-tight">
        {boardName}
      </header>

      <div className="h-full flex-1"></div>
    </div>
  );
}
