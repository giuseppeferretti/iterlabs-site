"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export interface ThemeToggleLabels {
  toggle: string;
  light: string;
  dark: string;
  system: string;
}

const defaultLabels: ThemeToggleLabels = {
  toggle: "Toggle theme",
  light: "Light",
  dark: "Dark",
  system: "System"
};

export function ThemeToggle({ labels = defaultLabels }: { labels?: ThemeToggleLabels }) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={labels.toggle}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{labels.toggle}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>{labels.light}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>{labels.dark}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>{labels.system}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
