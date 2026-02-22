import { useState } from "react";
import {
  personalInfoSchema,
  familyInfoSchema,
  situationInfoSchema,
} from "../../types";
import { useTranslation } from "react-i18next";

import { User, House, HandCoins } from "lucide-react";

export const steps = [
  { id: "personal", name: "PersonalInfoText", icon: User },
  { id: "financial", name: "FinancialInfo", icon: House },
  { id: "situational", name: "SituationDescriptions", icon: HandCoins },
];

export function useMultiStepForm() {
  const { t } = useTranslation()
  const stepSchemas = [
    personalInfoSchema(t),
    familyInfoSchema(t),
    situationInfoSchema(t),
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const getCurrentStepSchema = () => stepSchemas[currentStep];
  const goToNextStep = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };
  const goToPreviousStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };
  const submitForm = (data) => {
    console.log("✅ Final submitted data:", data);
    setIsSubmitted(true);
  };
  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    submitForm,
    resetForm,
    getCurrentStepSchema,
  };
}
