import SubmitButton from './common/SubmitButton';
import BackButton from './common/BackButton';
import NextButton from './common/NextButton';
const StepperControl = ({ handleClick, steps, currentStep, handleSubmit, processing }) => {
    return (
        <div className="container flex justify-between p-4 mt-4 mb-8">
            {currentStep !== 3 && (
                <>
                    {/* Back Button */}
                    <BackButton
                        onClick={() => handleClick()}
                        disabled={currentStep === 1}
                    />

                    {/* Next Button (Hidden on step 3) */}
                    {currentStep !== 3 && (
                        <NextButton
                            onClick={() => handleClick("next")}
                            label={currentStep === steps.length - 1 ? "Confirm" : "Next"}
                        />
                    )}

                    {/* Submit Button (Only visible on step 3) */}
                    {currentStep === 2 && (
                        <SubmitButton
                            onClick={handleSubmit}
                            processing={processing}
                            disabled={processing}
                            label={' Create Account'}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default StepperControl;
