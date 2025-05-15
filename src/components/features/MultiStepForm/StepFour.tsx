import { SummaryDataTable } from "@/components/widgets/summary_datatable.tsx";

export default function StepFour({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 pb-5">
      <h1 className="text-xl font-bold">Summary</h1>
      <label className="mb-2">Check all the data before submitting</label>
      <SummaryDataTable plant={data} />
    </div>
  );
}
