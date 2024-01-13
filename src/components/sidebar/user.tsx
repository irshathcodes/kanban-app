import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Laptop2, Moon, MoreHorizontal, Palette, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export function User() {
  const { data } = useSession();
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between gap-2 rounded-t-lg bg-muted px-4 py-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src={data?.user.image as string | undefined} />
          <AvatarFallback>MO</AvatarFallback>
        </Avatar>
        <div className="text-lg font-medium capitalize tracking-tight">
          {data?.user.name}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="secondary">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-2 h-4 w-4" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-36">
                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onClick={() => setTheme("system")}
                >
                  <Laptop2 className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
