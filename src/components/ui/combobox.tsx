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
  allowCustomInput?: boolean;
  maxLength?: number;
}

export function Combobox({
  items,
  selectedValue,
  onValueChange,
  placeholder = "Select item...",
  className,
  allowCustomInput = false, // Define it true when calling combobox if you want to allow the user to input custom values
  maxLength,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const selectedItem = items.find((item) => item.value === selectedValue);

  const displayLabel = selectedItem
    ? selectedItem.label
    : selectedValue || placeholder;

  const trigger = (
    <Button variant="outline" className={cn("justify-start", className)}>
      {displayLabel}
      <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
    </Button>
  );

  const list = (
    <Command>
      <CommandInput
        placeholder="Search or enter custom..."
        onValueChange={(value) => setInputValue(value)}
        maxLength={maxLength}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Optional custom input item */}
        {allowCustomInput &&
          inputValue &&
          !items.some(
            (item) => item.label.toLowerCase() === inputValue.toLowerCase()
          ) && (
            <CommandItem
              value={`custom-${inputValue}`}
              onSelect={() => {
                onValueChange(inputValue);
                setOpen(false);
              }}
            >
              Create "{inputValue}"
            </CommandItem>
          )}

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
