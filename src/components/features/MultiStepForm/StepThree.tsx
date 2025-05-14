import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function StepThree() {
  const [query, setQuery] = useState("");
  const [suggesties, setSuggesties] = useState<any[]>([]);
  const [geselecteerd, setGeselecteerd] = useState<any>(null);
  const [customMode, setCustomMode] = useState(false);
  const [customName, setCustomName] = useState("");

  const zoekPlanten = async (term: string) => {
    if (term.length < 2) {
      setSuggesties([]);
      return;
    }

    setQuery(term);

    try {
      const response = await fetch(`https://api.gbif.org/v1/species/search?q=${term}`);
      const data = await response.json();
      setSuggesties(data.results || []);
    } catch (error) {
      console.error("Fout bij ophalen van GBIF-data:", error);
    }
  };

  const kiesPlant = (plant: any) => {
    setGeselecteerd(plant);
    setSuggesties([]);
    setQuery(plant.scientificName);
  };

  const voegEigenPlantToe = () => {
    if (customName.trim() === "") return;
    const eigenPlant = { scientificName: customName };
    setGeselecteerd(eigenPlant);
    setQuery(customName);
    setSuggesties([]);
    setCustomName("");
    setCustomMode(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2 className="text-xl font-bold mb-2">Flora Registratie</h2>

      <label>flora toevoegen of kiezen:</label>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            zoekPlanten(e.target.value);
          }}
          placeholder="Zoek wetenschappelijke naam..."
          style={{ flex: 1, padding: "8px", border: "1px solid black" }}
        />
        <Button variant="outline" onClick={() => setCustomMode(!customMode)}>+</Button>
      </div>

      {query.trim() !== "" && suggesties.length > 0 && (
        <ul style={{ border: "1px solid black", listStyle: "none", padding: 0, maxHeight: 150, overflowY: "auto" }}>
          {suggesties.map((item) => (
            <li
              key={item.key}
              onClick={() => kiesPlant(item)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {item.scientificName} {item.canonicalName ? `(${item.canonicalName})` : ""}
            </li>
          ))}
        </ul>
      )}

      {customMode && (
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Typ een nieuwe plantnaam..."
            style={{ flex: 1, padding: "8px", border: "1px solid black" }}
          />
          <Button onClick={voegEigenPlantToe}>Toevoegen</Button>
        </div>
      )}

      {geselecteerd && (
        <p className="mt-4">
          Geselecteerde plant: <strong>{geselecteerd.scientificName}</strong>
        </p>
      )}
    </div>
  );
}
