import { useState, useRef } from 'react';
import { StepperContext} from '../../components/contexts/StepperContext';
import Stepper from '../../components/Stepper';
import StepperControl from '../../components/StepperControl';
import PersonalDetails from '../../components/steps/PersonalDetails';
import EmploymentDetails from '../../components/steps/EmploymentDetails';
import Address from '../../components/steps/Address';
import Final from '../../components/steps/Final';
import VerifyEmail from '../../components/steps/VerifyEmail';
import axios from '../../lib/axios';
import { Link } from 'react-router-dom';

export default function Register() {
    const[currentStep, setCurrentStep] = useState(1)
    const formRef = useRef(null);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        gender:'',
        phone:'',
        email:'',
        password: '',
        passwordConfirm:'',
        reason:'',
        employmentStatus:'',
        taxResidence:'',
        taxNumber:'',
        firstAddress:'',
        secondAddress:'',
        townCity:'',
    });

    const [errors, setErrors] = useState({
        name:'',
        email:'',
        password:'',
        passwordConfirm:'',
    });

    const steps = [
        "Personal",
        // "Employment",
        "Address",
        "Verify Email",
        "Final"
    ]

    const stepFields = {
        1: ['name', 'gender', 'phone', 'email', 'password', 'passwordConfirm', 'reason'], // Step 1: Personal Details
        // 2: ['employmentStatus', 'taxResidence', 'taxNumber'], // Step 2: Employment Details
        3: ['country','firstAddress', 'secondAddress', 'townCity'] // Step 3: Address
    };



    const findStepWithError = (errors) => {
        for (const step in stepFields) {
            const fieldsInStep = stepFields[step];
            const hasErrorInStep = Object.keys(errors).some(field => fieldsInStep.includes(field));
            if (hasErrorInStep) {
                return parseInt(step); // Return the step number with error
            }
        }
        return 1; // Default to Step 1 if no error is found
    };

   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const response = await axios.post('api/v1/users/signup', formData);
            // If response is successful, handle success (e.g., redirect or show a message)
            if(response.data.status == 'success') setCurrentStep(3)
            setProcessing(false)
            console.log("User successfully registered");
            
        } catch (err) {
            // Extract errors from the backend response
            if (err.response && err.response.data.message && err.response.data.errors) {
                const newErrors = {};

                err.response.data.errors.forEach(el => {
                    for (let key in el) {
                        newErrors[key] = el[key];
                    }
                });
                setErrors(newErrors);
                // Automatically navigate to the step with the error
                const stepWithError = findStepWithError(newErrors);
                setCurrentStep(stepWithError);
            } else {
                setErrors(err);

                console.error('Unexpected Error:', err);
            }
        } finally {
            setProcessing(false);
        }
    };
    
    
   
    const displayStep = (step)=>{
        switch(step){
            case 1: 
              return  <PersonalDetails />
            // case 2:
            //     return <EmploymentDetails />
            case 2:
                return <Address />
            case 3:
                return <VerifyEmail />

            case 4:
                return <Final />
            default:
        }
    }

    const handleClick = direction=>{
        let newStep = currentStep;
        (direction == "next") ? newStep++ : newStep--;
        if(direction !== 'previous'){
            if (formRef.current.checkValidity()) {
                if (newStep > 0 && newStep <= steps.length) {
                    setCurrentStep(newStep)
                }
            } else {
                formRef.current.reportValidity();
            }
        }
    }
    return (
        <>
          
           
            <div className='bg-white dark:bg-slate-800 max-w-3xl mx-auto lg:p-5 p-3 rounded-lg shadow-md'>
                {/* Stepper  */}
                <div className='container horizontal '>
                    <div className='flex flex-col items-center mb-5'>
                        <h3 className='font-bold text-2xl'>Create Your Account</h3>
                        <p className='text-center lg:text-left'>Enter your details to create account and continue</p>
                    </div>
                    <Stepper
                        steps={steps}
                        currentStep={currentStep} 
                    />
                    {/* Display Components */}
                    <div className='my-10 p-4'>
                  
                        <StepperContext.Provider value={{
                           formData, 
                           setFormData,
                           errors,
                           setCurrentStep,
                           
                        }}>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                {displayStep(currentStep)}
                            </form>
                        </StepperContext.Provider>
                        
                    </div>
                </div>

               

                {/* Navigation Controls */}
                {currentStep !== steps.length &&
                    <StepperControl
                        handleClick={handleClick} 
                        currentStep={currentStep} 
                        steps={steps}
                        handleSubmit={handleSubmit}
                        processing={processing}
                    />
                }

                <div className='mt-5 text-center'>
                                
                    <p className='inline-block pl-4 text-sm'>
                        Already have Account?
                        <Link to="/users/login" className='inline-block ml-1 text-blue-600' >Click here to login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}
