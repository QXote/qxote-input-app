// Zoek planten op naam (returns array van Plant)
import type {Plant} from "@/models/plant.ts";

// Zoek planten op naam (returns array van Plant)
export async function searchPlants(term: string): Promise<Plant[]> {
    if (term.length < 2) return [];

    try {
        const response = await fetch(`https://api.gbif.org/v1/species/search?q=${term}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching GBIF data", error);
        return [];
    }
}

// Haal detail info van een plant op via key (inclusief classificatie)
export async function getPlantDetails(key: number): Promise<Plant | null> {
    try {
        const response = await fetch(`https://api.gbif.org/v1/species/${key}`);
        if (!response.ok) return null;
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching plant details", error);
        return null;
    }
}
