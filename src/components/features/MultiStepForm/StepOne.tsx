import {Combobox} from "@/components/widgets/combobox.tsx";
import {Button} from "@/components/ui/button.tsx";

function SelectPlotPage() {
    return <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
        <h1 className="font-bold text-3xl md:text-2xl">Plot kiezen </h1>
        <div>
            <img src="/app_logo.jpg" className="logo" alt="app logo" />
        </div>
        <p>selecteer het plot </p>
        <Combobox />
        <Button>Next Step</Button>
    </div>
}
export default SelectPlotPage;