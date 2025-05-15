import type { Plot } from "@/models/plot.ts";
import type { PlantDTO } from "@/models/plantDTO.ts";
import { Combobox } from "@/components/ui/combobox";

interface StepOneProps {
  data: PlantDTO;
  onChange: (e: { target: { name: string; value: any } }) => void;
}

const plots: Plot[] = [
  { id: "next.js", name: "Next.js", coordinate: "51.93, 4.48" },
  { id: "react", name: "React", coordinate: "40.71, -74.00" },
];

export default function StepOne({ data, onChange }: StepOneProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <img src="/app_logo.png" className="h-20" alt="app logo" />
      <h1>Plot kiezen</h1>
      <Combobox
        items={plots.map((p) => ({
          value: p.id,
          label: p.name,
          coordinate: p.coordinate,
        }))}
        className="w-full"
        selectedValue={data.plotNr}
        onValueChange={(val) => {
          const selected = plots.find((p) => p.id === val);
          if (selected) {
            onChange({ target: { name: "plotNr", value: selected.id } });
            onChange({
              target: { name: "coordinate", value: selected.coordinate },
            });
          }
        }}
        placeholder="Select plot"
      />
    </div>
  );
}
