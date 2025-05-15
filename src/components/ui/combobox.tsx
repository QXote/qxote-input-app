"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ComboboxItem = {
  value: string;
  label: string;
  [key: string]: any; // allows extra fields like coordinate
};

interface ComboboxProps {
  items: ComboboxItem[];
  selectedValue?: string | null | undefined;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  className?: string;
}

export function Combobox({
  items,
  selectedValue,
  onValueChange,
  placeholder = "Select item...",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const selectedItem = items.find((item) => item.value === selectedValue);

  const trigger = (
    <Button variant="outline" className={cn("justify-start", className)}>
      {selectedItem ? selectedItem.label : placeholder}
      <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
    </Button>
  );

  const list = (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={(value) => {
                const found = items.find((i) => i.value === value);
                onValueChange(found?.value ?? null);
                setOpen(false);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className={cn("p-0")} align="start">
          {list}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">{list}</div>
      </DrawerContent>
    </Drawer>
  );
}
