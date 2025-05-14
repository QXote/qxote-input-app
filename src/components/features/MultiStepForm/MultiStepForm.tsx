import {useState} from 'react';
import { Button } from "@/components/ui/button"
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFour';
import StepIndicator from "@/components/widgets/stepIndicator.tsx";


function MultiStepForm() {
    const [currentStep, setStep] = useState(0);
    const [formData, setFormData] = useState({});

    const steps = [
        <StepOne data={formData} onChange={handleChange}/>,
        <StepTwo data={formData} onChange={handleChange}/>,
        <StepThree data={formData} onChange={handleChange}/>,
        <StepFour data={formData} onChange={handleChange}/>,
        <StepFive data={formData} onChange={handleChange}/>
    ];

    function handleChange(e: any) {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    return (
        <>
            <div className="p-4">
                <StepIndicator
                    steps={["Select Plot", "Take Photo", "flora, klasse & dekking", "zone, microklimaat, temp & luchtvochtigheid", "Confirm"]}
                    currentStep={currentStep}
                />
                <div>
                    {currentStep > 0 && <Button onClick={() => setStep(s => s - 1)}>Back</Button>}
                    {currentStep < steps.length - 1 ? (<Button onClick={() => setStep(s => s + 1)}>Next</Button>) : (<Button onClick={() => console.log('Submit', formData)}>Submit</Button>)}
                </div>
                {steps[currentStep]}
            </div>
        </>
    );
}

export default MultiStepForm;