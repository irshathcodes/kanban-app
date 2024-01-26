"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { flushSync } from "react-dom";
import { api } from "@/trpc/react";

export function Boards() {
  const pathname = usePathname();
  const { data: boards } = api.board.getBoards.useQuery();

  return (
    <div className="flex h-full flex-col">
      <h2 className="px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        all boards ({boards?.length ?? 0})
      </h2>

      <ul className="mt-5 h-fit flex-1 space-y-2 overflow-auto">
        {(boards ?? []).map((board) => {
          const link = `/boards/${board.board_id}`;
          return (
            <li key={board.board_id}>
              <Link
                href={link}
                className={cn(
                  "flex w-11/12 items-center gap-2.5 rounded-r-full px-4 py-2.5",
                  {
                    "bg-primary text-primary-foreground": pathname === link,
                    "text-muted-foreground hover:bg-muted": pathname !== link,
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

      <div className="mt-3">
        <CreateBoard />
      </div>
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
        async onSuccess() {
          await utils.board.getBoards.invalidate();
          inputRef.current!.value = "";
          setShowCreateInput(false);
        },
      });
    }
  };

  return (
    <div className="shrink-0">
      {showCreateInput ? (
        <div className={cn("animate-in fade-in zoom-in")}>
          <form onSubmit={handleSubmit} className={cn("px-4 pt-2")}>
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
              <Button type="submit" disabled={isLoading} size="sm">
                Create
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          className="gap-1 text-primary animate-in fade-in zoom-in hover:text-primary hover:no-underline hover:opacity-[0.85]"
          variant="ghost"
          size="sm"
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
      )}
    </div>
  );
}
