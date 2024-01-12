import { KanbanSquare, PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Boards } from "@/components/sidebar/boards";

export default function Sidebar() {
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
        <Boards />
      </div>
    </aside>
  );
}
