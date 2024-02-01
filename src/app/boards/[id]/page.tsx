"use client";
import { BoardHeader } from "@/components/board/header";
import { CardList } from "@/components/card/card-list";
import { useParams } from "next/navigation";

export default function Board() {
  const { id } = useParams();
  const board_id = Number(id);

  return (
    <div className="flex h-screen flex-1 flex-col">
      <BoardHeader board_id={board_id} />
      <CardList board_id={board_id} />
    </div>
  );
}
