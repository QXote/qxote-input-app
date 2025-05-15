import {useState} from "react";
import {Button} from "@/components/ui/button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import Step_indicator from "@/components/widgets/step_indicator";
import {postPlant} from "@/api/qxote_api";
import type {PlantDTO} from "@/models/plantDTO";

function MultiStepForm() {
    const [currentStep, setStep] = useState(0);
    const [formData, setFormData] = useState<PlantDTO>({
        plotNr: "",
        coordinate: "",
        species: "",
        cover: "",
        temperature: "",
        humidity: "",
        date: "",
        zone: "",
    });

    async function handleSubmit() {
        try {
            const result = await postPlant(formData);
            console.log("Plant succesvol opgeslagen:", result);

            // Optioneel: reset formulier of navigeer ergens heen
            // setFormData({});
            // setStep(0);
        } catch (error) {
            console.error("Fout bij verzenden:", error);
            // Toon een foutmelding aan de gebruiker indien nodig
        }
    }

    const steps = [
        <StepOne data={formData} onChange={handleChange as any} />,
        <StepTwo data={formData} onChange={handleChange as any} />,
        <StepThree data={formData} onChange={handleChange as any} />,
        <StepFour data={formData}/>,
    ];

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <>
            <div className="flex flex-col items-center gap-2 pb-2">
                <Step_indicator
                    steps={[
                        "Select Plot",
                        "flora, klasse & dekking",
                        "zone, microklimaat, temp & luchtvochtigheid",
                        "Confirm",
                    ]}
                    currentStep={currentStep}
                />
                <img src="/app_logo.png" className="h-auto w-24" alt="app logo" />
            </div>
            <div className="h-full">{steps[currentStep]}</div>
            <div className="flex justify-center space-x-5">
                {currentStep > 0 && (
                    <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
                )}
                {currentStep < steps.length - 1 ? (
                    <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
                ) : (
                    <Button
                        variant={"secondary"}
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </div>
        </>
    );
}

export default MultiStepForm;
