import type { plantDTO } from "@/models/plantDTO.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";


const defaultPlant: plantDTO = {
    plantNr: "P042",
    coordinate: "51.9244, 4.4777",
    species: "Lavendel",
    cover: "75%",
    temperature: "19°C",
    humidity: "45%",
    date: "2025-05-14",
    zone: "Z3"
};

interface SummaryDataTableProps {
    plant?: plantDTO; // plant is optioneel
}

export function SummaryDataTable({ plant = defaultPlant }: SummaryDataTableProps) {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">PlantNr</TableCell>
                    <TableCell>{plant.plantNr}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Coordinate</TableCell>
                    <TableCell>{plant.coordinate}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Species</TableCell>
                    <TableCell>{plant.species}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Cover</TableCell>
                    <TableCell>{plant.cover}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Temperature</TableCell>
                    <TableCell>{plant.temperature}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Humidity</TableCell>
                    <TableCell>{plant.humidity}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Date</TableCell>
                    <TableCell>{plant.date}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Zone</TableCell>
                    <TableCell>{plant.zone}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
