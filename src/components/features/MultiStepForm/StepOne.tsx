import { Plot_dropdown } from "@/components/widgets/plot_dropdown.tsx";

function StepOne() {
  return (
    <div className="flex flex-col items-center justify-center  space-y-2">
      <img src="/app_logo.jpg" className="h-20" alt="app logo" />
      <h1 className="">Plot kiezen </h1>
      <p>selecteer het plot</p>
      <Plot_dropdown />
    </div>
  );
}
export default StepOne;
