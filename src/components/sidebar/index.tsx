"use client";
import { KanbanSquare, PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Boards } from "@/components/sidebar/boards";
import { User } from "@/components/sidebar/user";

export default function Sidebar() {
  return (
    <aside className="sticky flex h-screen flex-col border-r border-r-border bg-card text-card-foreground">
      <div className="mt-4 flex items-center justify-between">
        <Link
          href="/"
          className="ml-4 flex items-center gap-1 hover:opacity-80"
        >
          <KanbanSquare size={32} className="text-primary" />
          <h1 className="text-2xl font-bold">kanban</h1>
        </Link>

        <Button className="mr-2" size="icon" variant="secondary">
          <PanelRightOpen />
        </Button>
      </div>

      <div className="mt-12 min-h-0 flex-1">
        <Boards />
      </div>

      <div className="mt-8 shrink-0">
        <User />
      </div>
    </aside>
  );
}
