import { useEffect } from "react";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchWeather } from "@/api/weather_api";
import type { PlantDTO } from "@/models/plantDTO.ts";

const zones = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const microclimates = [
  { value: "Full sun dry", label: "Full sun dry" },
  { value: "Sun with some shade dry", label: "Sun with some shade dry" },
  { value: "Shade dry", label: "Shade dry" },
  { value: "Sun wet", label: "Sun wet" },
  { value: "Shade wet", label: "Shade wet" },
];

interface StepThreeProps {
  data: PlantDTO;
  onChange: (e: { target: { name: string; value: any } }) => void;
}

export default function StepThree({ data, onChange }: StepThreeProps) {
  useEffect(() => {
    if (!data.zone || !data.cover) return;

    fetchWeather()
      .then((res) => {
        onChange({ target: { name: "temperature", value: res.temperature } });
        onChange({ target: { name: "humidity", value: res.humidity } });
      })
      .catch((err) => {
        console.error("Failed to fetch weather:", err);
      });
  }, [data.zone, data.cover]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Zone & Microclimate</h1>
        <label className="mb-2">Select both and the rest gets filled in</label>
      </div>
      <div className="flex flex-col gap-6 pb-5">
        <Combobox
          items={zones}
          selectedValue={data.zone}
          onValueChange={(val) =>
            onChange({ target: { name: "zone", value: val } })
          }
          placeholder="Select zone"
        />
        <Combobox
          items={microclimates}
          selectedValue={data.cover}
          onValueChange={(val) =>
            onChange({ target: { name: "cover", value: val } })
          }
          placeholder="Select microclimate"
        />
        <div className="grid items-center gap-2">
          <Label htmlFor="temperature">Temperature (°C)</Label>
          <div className="relative">
            <Input
              id="temperature"
              type="number"
              placeholder="..."
              className="pr-10"
              value={data.temperature}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "temperature",
                    value: Number(e.target.value),
                  },
                })
              }
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              °C
            </span>
          </div>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="humidity">Humidity (%)</Label>
          <div className="relative">
            <Input
              id="humidity"
              type="number"
              placeholder="..."
              className="pr-10"
              value={data.humidity}
              onChange={(e) =>
                onChange({
                  target: { name: "humidity", value: Number(e.target.value) },
                })
              }
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
