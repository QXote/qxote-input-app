import {useState} from 'react';
import { Button } from "@/components/ui/button";
import { searchPlants, getPlantDetails } from "@/api/gbif_api";
import type {Plant} from "@/models/plant.ts";

export default function StepTwo() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Plant[]>([]);
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
    const [customMode, setCustomMode] = useState(false);
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
        <div style={{ maxWidth: 500, margin: "0 auto", fontFamily: "sans-serif" }}>
            <h2 className="text-xl font-bold mb-2">Flora Registration</h2>

            <label>Add or select flora:</label>

            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search scientific name..."
                    style={{ flex: 1, padding: "8px", border: "1px solid black" }}
                />
                <Button variant="outline" onClick={() => setCustomMode(!customMode)}>
                    +
                </Button>
            </div>

            {searchTerm.trim() !== "" && suggestions.length > 0 && (
                <ul
                    style={{
                        border: "1px solid black",
                        listStyle: "none",
                        padding: 0,
                        maxHeight: 150,
                        overflowY: "auto",
                    }}
                >
                    {suggestions.map((item) => (
                        <li
                            key={item.key}
                            onClick={() => onSelectPlant(item)}
                            style={{ padding: "8px", cursor: "pointer" }}
                        >
                            <div>
                                <strong>{item.scientificName}</strong>
                                {item.vernacularName && <span> ({item.vernacularName})</span>}
                            </div>
                            {item.class && (
                                <div style={{ fontSize: "0.8rem", color: "#555" }}>
                                    Class: <em>{item.class}</em>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {customMode && (
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <input
                        type="text"
                        value={customPlantName}
                        onChange={(e) => setCustomPlantName(e.target.value)}
                        placeholder="Enter a new plant name..."
                        style={{ flex: 1, padding: "8px", border: "1px solid black" }}
                    />
                    <Button onClick={addCustomPlant}>Add</Button>
                </div>
            )}

            {selectedPlant && (
                <div style={{ marginTop: "20px" }}>
                    <label>Latin Name:</label>
                    <input
                        type="text"
                        value={latinName}
                        readOnly
                        style={{ width: "100%", padding: "8px", border: "1px solid black", marginBottom: "10px" }}
                    />

                    <label>Class:</label>
                    <input
                        type="text"
                        value={plantClass}
                        readOnly
                        style={{ width: "100%", padding: "8px", border: "1px solid black" }}
                    />
                </div>
            )}
        </div>
    );
}
