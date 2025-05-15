import "./App.css";
import MultiStepForm from "./components/features/MultiStepForm/MultiStepForm.tsx";

function App() {
  return (
    <div className="antialiased  h-screen scroll-smooth">
      <div className="flex py-5 h-full flex-col container mx-auto text-center">
        <MultiStepForm></MultiStepForm>
      </div>
    </div>
  );
}

export default App;
