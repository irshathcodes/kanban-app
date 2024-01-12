"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { flushSync } from "react-dom";
import { api } from "@/trpc/react";

const boards = [
  {
    board_id: 1,
    name: "Platform launch",
  },
  {
    board_id: 2,
    name: "Marketing Plan",
  },
  {
    board_id: 3,
    name: "Roadmap",
  },
];
export function Boards() {
  const pathname = usePathname();
  const { data: boards, isLoading } = api.board.getBoards.useQuery();

  return (
    <div className="animate-out fade-out">
      <h2 className="px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        all boards (8)
      </h2>

      <ul className="mt-5 space-y-2">
        {(boards || []).map((board) => {
          const link = `/${board.name}`;
          return (
            <li key={board.board_id}>
              <Link
                href={link}
                className={cn(
                  "flex w-11/12 items-center gap-2.5 rounded-r-full px-4 py-2.5",
                  {
                    "bg-primary text-primary-foreground": board.board_id === 1,
                    "text-muted-foreground hover:bg-muted":
                      board.board_id !== 1,
                  },
                )}
              >
                <LayoutDashboard size={20} />
                {board.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <CreateBoard />
    </div>
  );
}

function CreateBoard() {
  const [showCreateInput, setShowCreateInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const utils = api.useUtils();
  const { mutate, isLoading } = api.board.createBoard.useMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      mutate(inputRef.current.value, {
        onSuccess() {
          inputRef.current!.value = "";
          utils.board.getBoards.invalidate();
          setShowCreateInput(false);
        },
      });
    }
  };

  const handleCreate = () => {};
  return (
    <div className="mt-3">
      <div
        className={cn(
          "grid transition-all duration-100",
          showCreateInput
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <form
          onSubmit={handleSubmit}
          className={cn("overflow-hidden px-4 pt-2")}
        >
          <Input
            required
            ref={inputRef}
            type="text"
            id="board_name"
            name="board_name"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowCreateInput(false);
              }
            }}
            disabled={isLoading}
          />
          <div className="ml-auto mt-4 w-fit space-x-2">
            <Button
              size="sm"
              onClick={() => setShowCreateInput(false)}
              variant="ghost"
              type="button"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleCreate} size="sm">
              Create
            </Button>
          </div>
        </form>
      </div>
      <Button
        className={cn(
          "gap-1 transition-all hover:no-underline hover:opacity-[0.85]",
          {
            "scale-100 opacity-100": !showCreateInput,
            "scale-0 opacity-0": showCreateInput,
          },
        )}
        variant="link"
        onClick={() => {
          flushSync(() => {
            setShowCreateInput(true);
          });
          inputRef.current?.focus();
        }}
      >
        <Plus size={14} />
        Create New Board
      </Button>
    </div>
  );
}
