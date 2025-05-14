import app_logo from "../../public/app_logo.jpg";
import {Combobox} from "@/components/combobox.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function SelectPlotPage() {
    return <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
        <div>
            <img src={app_logo} className="logo" alt="app logo" />
        </div>
        <h1 className="text-2xl font-bold">Select Plot</h1>
        <Combobox />
        <Button>Next Step</Button>
    </div>
}