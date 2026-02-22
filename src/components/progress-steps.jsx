import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * @param currentStep - Current step index (0-based)
 * @param steps - Array of step metadata
 */
function ProgressSteps({
  currentStep,
  steps,
}) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const Icon = step.icon; // Extract icon component
        const isCompleted = index < currentStep; // Before current = completed
        const isCurrent = index === currentStep; // Currently active

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              {/* 
                Step Circle
                Dynamic styling based on step status:
                - Completed: primary background, show checkmark
                - Current: primary background, show icon
                - Future: gray background, show icon
              */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-[#0055A5] text-primary-foreground"
                    : isCurrent
                    ? "bg-[#0055A5] text-primary-foreground"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              {/* Step name below circle */}
              <span className="text-xs mt-2 font-medium">{t(step.name)}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition-colors ${
                  isCompleted ? "bg-[#0055A5]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressSteps;
