import React from "react";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchWeather } from "@/api/weather_api";

const zones = [
  { value: "zone1", label: "zone1" },
  { value: "zone2", label: "zone2" },
  { value: "zone3", label: "zone3" },
  { value: "zone4", label: "zone4" },
  { value: "zone5", label: "zone5" },
];

const microclimates = [
  { value: "microclimate1", label: "microclimate1" },
  { value: "microclimate2", label: "microclimate2" },
  { value: "microclimate3", label: "microclimate3" },
  { value: "microclimate4", label: "microclimate4" },
  { value: "microclimate5", label: "microclimate5" },
];

export default function StepThree() {
  const [zone, setZone] = React.useState<string | null>(null);
  const [microclimate, setMicroclimate] = React.useState<string | null>(null);

  const [temperature, setTemperature] = React.useState<number | null>(null);
  const [humidity, setHumidity] = React.useState<number | null>(null);

  React.useEffect(() => {
    const shouldFetch = zone && microclimate;
    if (!shouldFetch) return;

    fetchWeather()
      .then((data) => {
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      })
      .catch((err) => {
        console.error("Failed to fetch weather:", err);
        setTemperature(null);
        setHumidity(null);
      });
  }, [zone, microclimate]);

  return (
    <div className="flex flex-col gap-6">
      <Combobox
        items={zones}
        selectedValue={zone}
        onValueChange={setZone}
        placeholder="Select zone"
      />
      <Combobox
        items={microclimates}
        selectedValue={microclimate}
        onValueChange={setMicroclimate}
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
            value={temperature ?? ""}
            onChange={(e) => setTemperature(Number(e.target.value))}
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
            value={humidity ?? ""}
            onChange={(e) => setHumidity(Number(e.target.value))}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            %
          </span>
        </div>
      </div>
    </div>
  );
}
