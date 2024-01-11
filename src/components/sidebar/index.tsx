import {
  KanbanSquare,
  LayoutDashboard,
  PanelRightOpen,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();
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
  return (
    <aside className="sticky h-screen border-r border-r-border bg-card text-card-foreground">
      <div className="mt-4 flex items-center justify-between">
        <Link
          href="/"
          className="ml-4 flex items-center gap-1 hover:opacity-80"
        >
          <KanbanSquare size={32} className="text-primary" />
          <h1 className="text-2xl font-bold">kanban</h1>
        </Link>

        <Button className="mr-2" size="icon" variant="ghost">
          <PanelRightOpen />
        </Button>
      </div>

      <div className="mt-12">
        <h2 className="px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          all boards (8)
        </h2>

        <ul className="mt-5 space-y-2">
          {boards.map((board) => {
            const link = `/${board.name}`;
            return (
              <li key={board.board_id}>
                <Link
                  href={link}
                  className={cn(
                    "flex w-11/12 items-center gap-2.5 rounded-r-full px-4 py-2.5",
                    {
                      "bg-primary text-primary-foreground":
                        board.board_id === 1,
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

        <Button
          className="mt-3 gap-1 hover:no-underline hover:opacity-[0.85]"
          variant="link"
        >
          <Plus size={14} />
          Create New Board
        </Button>
      </div>
    </aside>
  );
}
