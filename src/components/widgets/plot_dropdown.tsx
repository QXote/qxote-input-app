"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import type { Plot } from "@/models/plot.ts";
import type { PlantDTO } from "@/models/plantDTO.ts";

interface PlotDropdownProps {
  data: PlantDTO;
  plots: Plot[];
  onChange: (e: { target: { name: string; value: any } }) => void;
}

export function Plot_dropdown({ data, plots, onChange }: PlotDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(data.plantNr ?? "");

  React.useEffect(() => {
    if (data.plantNr !== value) {
      setValue(data.plantNr ?? "");
    }
  }, [data.plantNr]);

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
          >
            {value ? plots.find((plot) => plot.name === value)?.name : "Select plot..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search plot..." />
            <CommandList>
              <CommandEmpty>No plot found.</CommandEmpty>
              <CommandGroup>
                {plots.map((plot) => (
                    <CommandItem
                        key={plot.name}
                        value={plot.name}
                        onSelect={(currentValue) => {
                          const selected = plots.find((p) => p.name === currentValue);
                          if (selected) {
                            onChange({ target: { name: "plantNr", value: selected.name } });
                            onChange({ target: { name: "coordinate", value: selected.coordinate } });
                            setValue(currentValue);
                            setOpen(false);
                          }
                        }}
                    >
                      {plot.name}
                      <Check
                          className={cn("ml-auto", value === plot.name ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  );
}
