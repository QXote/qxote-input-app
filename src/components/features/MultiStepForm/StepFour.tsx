import {SummaryDataTable} from "@/components/widgets/summary_datatable.tsx";

export default function StepFour() {
        return <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
        <div>
            <img src="/app_logo.jpg" className="logo" alt="app logo"/>
        </div>
        <h1 className="text-2xl font-bold">Summary</h1>
        <SummaryDataTable/>
    </div>
}