import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { searchPlants, getPlantDetails } from "@/api/gbif_api";
import type { Plant } from "@/models/plant.ts";
import { Input } from "@/components/ui/input";

export default function StepTwo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Plant[]>([]);
  // const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  // const [customMode, setCustomMode] = useState(false);
  const [customPlantName, setCustomPlantName] = useState("");

  const [latinName, setLatinName] = useState("");
  const [plantClass, setPlantClass] = useState("");

  async function onSearch(term: string) {
    setSearchTerm(term);
    const results = await searchPlants(term);
    setSuggestions(results);
  }

  async function onSelectPlant(plant: Plant) {
    setSelectedPlant(plant);
    setSearchTerm(plant.scientificName);
    setSuggestions([]);

    setLatinName(plant.canonicalName || plant.scientificName);

    const details = await getPlantDetails(plant.key);
    if (details && details.class) {
      setPlantClass(details.class || "Not registered");
    } else {
      setPlantClass("Not registered");
    }
    console.log(plant);
  }

  function addCustomPlant() {
    if (customPlantName.trim() === "") return;
    const plant = {
      key: -1,
      scientificName: customPlantName,
      canonicalName: customPlantName,
      classification: { class: "Custom" },
    };
    setSelectedPlant(plant);
    setSearchTerm(customPlantName);
    setSuggestions([]);
    setCustomPlantName("");
    setCustomMode(false);
    setLatinName(customPlantName);
    setPlantClass("Custom");
  }

  return (
    <div className="font-sans mx-auto gap-2 flex flex-col">
      <h2 className="text-xl font-bold">Flora Registration</h2>

      <label className="mb-2">
        Add by typing, or, search & select flora from dropdown.
      </label>

      <div className="flex flex-col items-center gap-3 mb-3">
        <div className="flex flex-row items-center gap-3">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search scientific name..."
          />
          {/* <Button
            className="p-5 size-1"
            onClick={() => setCustomMode(!customMode)}
          >
            {customMode ? "-" : "+"}
          </Button> */}
        </div>

        {searchTerm.trim() !== "" && suggestions.length > 0 && (
          <ul className=" overflow-auto flex flex-col px-3 gap-1 pt-1 pb-3 max-h-72 rounded-md border border-input">
            {suggestions.map((item) => (
              <li
                key={item.key}
                onClick={() => onSelectPlant(item)}
                className="cursor-pointer border-b border-input"
              >
                <div>
                  <strong>{item.scientificName}</strong>
                  {item.vernacularName && <span> ({item.vernacularName})</span>}
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

        {/* {customMode && (
          <div className="flex flex-row items-center gap-3">
            <Input
              type="text"
              value={customPlantName}
              onChange={(e) => setCustomPlantName(e.target.value)}
              placeholder="Enter a new plant name..."
            />
            <Button className="p-5 size-1" onClick={addCustomPlant}>
              Add
            </Button>
          </div>
        )} */}

        <div className="flex flex-col gap-1">
          <label>Latin Name:</label>
          <Input
            type="text"
            placeholder="..."
            value={latinName}
            onChange={(e) => setLatinName(String(e.target.value))}
          />

          <label>Class:</label>
          <Input
            type="text"
            placeholder="..."
            value={plantClass}
            onChange={(e) => setPlantClass(String(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
