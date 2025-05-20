import type { Plot } from "@/models/plot.ts";
import type { PlantDTO } from "@/models/plantDTO.ts";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepOneProps {
  data: PlantDTO;
  onChange: (e: { target: { name: string; value: any } }) => void;
}

const plots: Plot[] = [
  //   { id: "next.js", name: "Next.js", coordinate: "51.93, 4.48" },
  //   { id: "react", name: "React", coordinate: "40.71, -74.00" },
];

export default function StepOne({ data, onChange }: StepOneProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4)),
          });

          // eventueel gelijk doorgeven aan het formulier:
          onChange({
            target: {
              name: "coordinate",
              value: `${pos.coords.latitude.toFixed(
                4
              )}, ${pos.coords.longitude.toFixed(4)}`,
            },
          });
        },
        (err) => {
          setError("Can't get your location: " + err.message);
          console.error(err);
        }
      );
    } else {
      setError("This browser does not support geolocation.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 pb-5">
      <h1 className="text-xl font-bold">Plot</h1>
      <label className="mb-2">Create a Plot</label>
      <div className="flex flex-col gap-6 w-full">
        <Combobox
          items={plots.map((p) => ({
            value: p.id,
            label: p.name,
            coordinate: p.coordinate,
          }))}
          className="w-full"
          allowCustomInput={true}
          maxLength={4} // Current database only accepts 4 chars
          selectedValue={data.plotNr}
          onValueChange={(val) => {
            const selected = plots.find((p) => p.id === val);
            if (selected) {
              onChange({ target: { name: "plotNr", value: selected.id } });
              onChange({
                target: { name: "coordinate", value: selected.coordinate },
              });
            } else {
              // Handle custom input
              onChange({ target: { name: "plotNr", value: val } });
              onChange({ target: { name: "coordinate", value: "" } }); // or let user input it
            }
          }}
          placeholder="Select plot"
        />
        <div className="flex flex-col items-start gap-2 w-full">
          <Label htmlFor="plotCoveragePct">plotCoveragePct (%)</Label>
          <div className="relative w-full">
            <Input
              id="plotCoveragePct"
              type="number"
              min={0}
              max={100}
              placeholder="..."
              value={data.plotCoveragePct}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 100) {
                  onChange({
                    target: {
                      name: "plotCoveragePct",
                      value,
                    },
                  });
                }
              }}
              onKeyDown={(e) => {
                const invalidChars = ["-", "+", "e"];
                if (invalidChars.includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <Button onClick={getLocation}>Get Location</Button>

        {location && (
          <p>
            Latitude：{location.lat} <br /> Longitude：{location.lng}
          </p>
        )}

        {error && <p className="text-red-500">⚠️ {error}</p>}
      </div>
    </div>
  );
}
