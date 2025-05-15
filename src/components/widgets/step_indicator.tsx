interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export default function Step_indicator({steps, currentStep}: StepIndicatorProps) {
    return (
        <div className="flex justify-center items-center space-x-4">
            {steps.map((_step, index) => {
                const isActive = index === currentStep;
                return (
                    <div key={index} className="flex flex-col items-center">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${isActive ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'} transition-all`}>
                            {index + 1}
                        </div>
                        <span className="mt-2 text-sm">{}</span>
                    </div>
                );
            })}
        </div>
    );
}
