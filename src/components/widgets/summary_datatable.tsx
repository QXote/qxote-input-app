import type { PlantDTO } from "@/models/plantDTO.ts";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const defaultPlant: PlantDTO = {
  plotNr: "P042",
  coordinate: "51.9244, 4.4777",
  species: "Lavendel",
  cover: "75%",
  temperature: "19°C",
  humidity: "45%",
  date: "2025-05-14",
  zone: "Z3",
};

interface SummaryDataTableProps {
  plant?: PlantDTO;
}

export function SummaryDataTable({
  plant = defaultPlant,
}: SummaryDataTableProps) {
  // If the plant.date is empty or null, set it to today's date
  const enrichedPlant = {
    ...plant,
    date: plant.date || new Date().toLocaleString("sv-SE").replace("T", " "),
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">PlotNr</TableCell>
          <TableCell>{enrichedPlant.plotNr}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Coordinate</TableCell>
          <TableCell>{enrichedPlant.coordinate}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Species</TableCell>
          <TableCell>{enrichedPlant.species}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Zone</TableCell>
          <TableCell>{enrichedPlant.zone}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Cover</TableCell>
          <TableCell>{enrichedPlant.cover}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Temperature</TableCell>
          <TableCell>{enrichedPlant.temperature}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Humidity</TableCell>
          <TableCell>{enrichedPlant.humidity}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Date</TableCell>
          <TableCell>{enrichedPlant.date}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
