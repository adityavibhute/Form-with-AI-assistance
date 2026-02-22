import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { useMultiStepForm } from "./hooks/use-multi-step-form";
import ProgressSteps from "../components/progress-steps";
import {
  SituationInfoStep,
  PersonalInfoStep,
  FamilyInfoStep,
} from "../components/steps";


export default function MultiStepForm() {
  const { t } = useTranslation();
  const {
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
  } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  React.useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  /**
   * HANDLER: onNext
   * Handles both "Next" button and "Submit" button clicks.
   *
   * @param data - Form data from current step (validated)
   */
  const onNext = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;
    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);
    if (isLastStep) {
      try {
        submitForm(updatedData);
      } catch (error) {
        console.error("Submission failed:", error);
      }
    } else {
      goToNextStep();
    }
  };

  const onPrevious = () => goToPreviousStep();

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-semibold mb-2">{t("successtext")}</h2>
            <p className="text-gray-600 mb-6">{t("successMessage")}</p>

            <Button onClick={resetForm} className="w-full">
              {t("submitAnother")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <PersonalInfoStep watch={watch} setValue={setValue} register={register} errors={errors} />
          )}
          {currentStep === 1 && (
            <FamilyInfoStep
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          {currentStep === 2 && (
            <SituationInfoStep setValue={setValue} register={register} errors={errors} />
          )}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t("back")}
            </Button>

            <Button type="button" onClick={handleSubmit(onNext)}>
              {isLastStep ? t("submit") : t("next")}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
