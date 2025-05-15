import { useState } from "react";
import { searchPlants, getPlantDetails } from "@/api/gbif_api";
import type { Plant } from "@/models/plant.ts";
import type { PlantDTO } from "@/models/plantDTO.ts";
import { Input } from "@/components/ui/input";

interface StepTwoProps {
  data?: PlantDTO;
  onChange?: (e: { target: { name: string; value: any } }) => void;
}

export default function StepTwo({ data, onChange }: StepTwoProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Plant[]>([]);
  const [, setSelectedPlant] = useState<Plant | null>(null);
  const [, setPlantClass] = useState("");

  async function onSearch(term: string) {
    setSearchTerm(term);
    const results = await searchPlants(term);
    setSuggestions(results);
  }

  async function onSelectPlant(plant: Plant) {
    setSelectedPlant(plant);
    setSearchTerm(plant.scientificName);
    setSuggestions([]);

    onChange?.({
      target: {
        name: "species",
        value: plant.canonicalName || plant.scientificName,
      },
    });

    const details = await getPlantDetails(plant.key);
    const resolvedClass = details?.class ?? "Not registered";
    setPlantClass(resolvedClass);
    onChange?.({ target: { name: "plantClass", value: resolvedClass } });
  }

  return (
    <div className="font-sans mx-auto gap-2 flex flex-col pb-5">
      <h1 className="text-xl font-bold">Flora</h1>
      <label className="mb-2">
        Add by typing, or, search & select flora from dropdown.
      </label>

      <div className="flex flex-col items-center gap-3 w-full">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search..."
        />

        {searchTerm.trim() !== "" && suggestions.length > 0 && (
          <ul className="overflow-auto flex flex-col px-3 gap-1 pt-1 pb-3 max-h-72 rounded-md border border-input">
            {suggestions.map((item) => (
              <li
                key={item.key}
                onClick={() => onSelectPlant(item)}
                className="cursor-pointer border-b border-input"
              >
                <div>
                  <strong>{item.scientificName}</strong>
                </div>
                {item.class && (
                  <div>
                    Class: <em>{item.class}</em>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-1 w-full">
          <label>Latin Name:</label>
          <Input
            type="text"
            placeholder="..."
            value={data?.species ?? ""}
            onChange={(e) =>
              onChange?.({
                target: { name: "species", value: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
