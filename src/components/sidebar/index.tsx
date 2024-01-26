"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  KanbanSquare,
} from "lucide-react";
import Link from "next/link";
import { Boards } from "@/components/sidebar/boards";
import { User } from "@/components/sidebar/user";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "[") {
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  return (
    <>
      <aside
        className={cn(
          "sticky flex h-screen shrink-0 flex-col overflow-hidden border-r border-r-border bg-card text-card-foreground transition-[width]",
          open ? "w-[270px]" : "w-0",
        )}
      >
        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/"
            className="ml-4 flex items-center gap-1 hover:opacity-80"
          >
            <KanbanSquare size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">kanban</h1>
          </Link>

          <SidebarTooltip open={open}>
            <Button
              onClick={() => setOpen(false)}
              className={cn("mr-2")}
              size="icon"
              variant="secondary"
            >
              <ArrowLeftFromLine size={20} />
            </Button>
          </SidebarTooltip>
        </div>

        <div className="mt-12 min-h-0 flex-1">
          <Boards />
        </div>

        <div className="mt-8 shrink-0">
          <User />
        </div>
      </aside>
      {!open && (
        <div className="flex h-[60px] items-center border-b bg-card">
          <SidebarTooltip open={open}>
            <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
              <ArrowRightFromLine size={20} />
            </Button>
          </SidebarTooltip>
        </div>
      )}
    </>
  );
}

function SidebarTooltip(props: React.PropsWithChildren<{ open: boolean }>) {
  const content = props.open ? "Collapse sidebar" : "Open sidebar";
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>
          {content} <span className="border bg-muted px-1.5 py-0.5">{`[`}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
