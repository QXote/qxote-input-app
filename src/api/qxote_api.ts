import type {PlantDTO} from "@/models/plantDTO.ts";

const databaseUrl = "https://192.168.1.140:7031";

export async function postPlant(data: PlantDTO) {
    try {
        const response = await fetch(databaseUrl + "/api/plants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to submit plant:", error);
        throw error;
    }
}

type PlantResponse = { plotNr: string }[];

export async function getPlot(): Promise<string[] | null> {
    try {
        const response = await fetch(databaseUrl + "/api/plants");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PlantResponse = await response.json();
        const plotList = [...new Set(data.map((element) => element.plotNr))];

        return plotList;
    } catch (error: any) {
        console.error("Fetch error:", error.message);
        return null;
    }
}