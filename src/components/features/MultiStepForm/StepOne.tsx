import { Plot_dropdown } from "@/components/widgets/plot_dropdown.tsx";
import type { Plot } from "@/models/plot.ts";
import type { PlantDTO } from "@/models/plantDTO.ts";

const plots: Plot[] = [
    { id: "next.js", name: "Next.js", coordinate: "51.93, 4.48" },
    { id: "react", name: "React", coordinate: "40.71, -74.00" },
];

interface StepOneProps {
    data: PlantDTO;
    onChange: (e: { target: { name: string; value: any } }) => void;
}

export default function StepOne({ data, onChange }: StepOneProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <img src="/app_logo.png" className="h-20" alt="app logo" />
            <h1>Plot kiezen</h1>
            <Plot_dropdown data={data} plots={plots} onChange={onChange} />
        </div>
    );
}
