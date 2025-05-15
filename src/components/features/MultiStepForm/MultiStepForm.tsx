import {useState} from 'react';
import {Button} from "@/components/ui/button"
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import Step_indicator from "@/components/widgets/step_indicator.tsx";

function MultiStepForm() {
    const [currentStep, setStep] = useState(0);
    const [formData, setFormData] = useState({});

    const steps = [
        <StepOne data={formData} onChange={handleChange}/>,
        <StepTwo data={formData} onChange={handleChange}/>,
        <StepThree data={formData} onChange={handleChange}/>,
        <StepFour data={formData} onChange={handleChange}/>,
    ];

    function handleChange(e: any) {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    return (
        <>
            <Step_indicator
                steps={["Select Plot", "flora, klasse & dekking", "zone, microklimaat, temp & luchtvochtigheid", "Confirm"]}
                currentStep={currentStep}
            />
            <div className="h-full">
                {steps[currentStep]}
            </div>
            <div className="flex justify-center space-x-5">
                {currentStep > 0 && <Button size={"lg"} onClick={() => setStep(s => s - 1)}>Back</Button>}
                {currentStep < steps.length - 1 ? (<Button size={"lg"} onClick={() => setStep(s => s + 1)}>Next</Button>) : (
                    <Button variant={"secondary"} size={"lg"} onClick={() => console.log('Submit', formData)}>Submit</Button>)}
            </div>
        </>
    );
}

export default MultiStepForm;