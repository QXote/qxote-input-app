import {Combobox} from "@/components/widgets/combobox.tsx";
import {Button} from "@/components/ui/button.tsx";

function SelectPlotPage() {
    return <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
        <div>
            <img src="/app_logo.jpg" className="logo" alt="app logo" />
        </div>
        <h1 className="text-2xl font-bold">Select Plot</h1>
        <Combobox />
        <Button>Next Step</Button>
    </div>
}
export default SelectPlotPage;