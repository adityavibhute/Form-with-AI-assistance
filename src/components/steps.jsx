import React, { useState } from "react";
import { fallbackSuggestions } from "../api/fallbackSuggestion";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { SelectOptions } from "./ui/select-options";
import { CardTitle } from "./ui/card";
import { personalInfoSchema as schema, ID_CONFIG } from '../types';
import { Country, State, City } from 'country-state-city';
import FormField from "./form-feild";
import { t } from "i18next";
import Snackbar from "./Snackbar";
import { Textarea } from "./ui/textarea";
import SuggestionModal from "./SuggestionModal";


function PersonalInfoStep({ watch, register, errors }) {
  const { t } = useTranslation();
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">{t("PersonalInfoText")}</CardTitle>

      {/* Two-column layout for first/last name */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label={t("labels.step1.firstName")}
          register={register}
          errors={errors}
        />
        <FormField
          id="lastName"
          label={t("labels.step1.lastName")}
          register={register}
          errors={errors}
        />
      </div>

      {/* Full-width fields */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="email"
          label={t("labels.step1.email")}
          register={register}
          errors={errors}
          type="email"
        />
        <FormField
          id="phone"
          label={t("labels.step1.phone")}
          register={register}
          errors={errors}
          type="tel"
        />
      </div>
      {/* Country State Cities options */}

      <SelectOptions {...register("country")} errors={errors.country} id="country" label={t("labels.step1.country")} defaultValue="">
        <option value="" disabled>
          Select Country
        </option>
        {Country.getAllCountries()
            .filter(c => ID_CONFIG[c.isoCode])
            .map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
      </SelectOptions>

      <SelectOptions disabled={!selectedCountry} {...register("state")} errors={errors.state} id="state" label={t("labels.step1.state")} defaultValue="">
        <option value="" disabled>
          Select State
        </option>
        {selectedCountry && State.getStatesOfCountry(selectedCountry).map(s => (
            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
          ))}
      </SelectOptions>

      <SelectOptions disabled={!selectedState} {...register("city")} errors={errors.city} id="city" label={t("labels.step1.city")} defaultValue="">
        <option value="" disabled>
          Select City
        </option>
        {selectedState && City.getCitiesOfState(selectedCountry, selectedState).map(c => (
            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
          ))}
      </SelectOptions>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="dob"
          label={t("labels.step1.dob")}
          register={register}
          errors={errors}
          type="date"
        />
        <FormField
          id="idNumber"
          label={t("labels.step1.nationalId")}
          register={register}
          errors={errors}
          type="text"
        />        
      </div>
    </div>
  );
}

function FamilyInfoStep({ register, errors }) {

  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">{t("FinancialInfo")}</CardTitle>
      <div className="grid grid-cols-2 gap-4">
        <SelectOptions {...register("maritialstatus")} errors={errors.maritialstatus} id="maritialstatus" label={t("labels.step2.maritalStatus")} defaultValue="">
          <option value="" disabled>
            {t("labels.step2.staticoptions.maritalStatus.placeholder")}
          </option>
          <option value="Single">{t("labels.step2.staticoptions.maritalStatus.single")}</option>
          <option value="Married">{t("labels.step2.staticoptions.maritalStatus.married")}</option>
          <option value="Divorced">{t("labels.step2.staticoptions.maritalStatus.divorced")}</option>
          <option value="Widowed">{t("labels.step2.staticoptions.maritalStatus.widowed")}</option>
        </SelectOptions>
        <SelectOptions {...register("employmentstatus")} errors={errors.employmentstatus} id="employmentstatus" label={t("labels.step2.employmentStatus")} defaultValue="">
          <option value="" disabled>
            {t("labels.step2.staticoptions.employmentStatus.placeholder")}
          </option>
          <option value="Employed">{t("labels.step2.staticoptions.employmentStatus.employed")}</option>
          <option value="Self-employed">{t("labels.step2.staticoptions.employmentStatus.self-employed")}</option>
          <option value="Unemployed">{t("labels.step2.staticoptions.employmentStatus.unemployed")}</option>
          <option value="Retired">{t("labels.step2.staticoptions.employmentStatus.retired")}</option>
        </SelectOptions>
      </div>
      <SelectOptions {...register("housingstatus")} errors={errors.housingstatus} id="housingstatus" label={t("labels.step2.housingStatus")} defaultValue="">
        <option value="" disabled>
          {t("labels.step2.staticoptions.housingStatus.placeholder")}
        </option>
        <option value="Owned">{t("labels.step2.staticoptions.housingStatus.own")}</option>
        <option value="Rented">{t("labels.step2.staticoptions.housingStatus.rent")}</option>
      </SelectOptions>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="monthlyincome"
          label={t("labels.step2.monthlyIncome")}
          register={register}
          errors={errors}
          type="number"
        />
        <FormField
          id="dependants"
          label={t("labels.step2.dependents")}
          register={register}
          errors={errors}
          type="number"
        />
      </div>
    </div>
  );
}

function SituationInfoStep({ register, errors, setValue }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prompts = {
    financial:
      "I am experiencing financial hardship. Help me describe my current financial situation clearly and honestly.",
    employment:
      "Help me describe my current employment circumstances clearly.",
    reason:
      "Help me explain clearly why I am applying."
  };

    const handleHelpClick = async (field) => {
      setActiveField(field);
      setModalOpen(true);
      setLoading(true);
      setError("");
      setSuggestion("");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await axios.post('http://localhost:5000/api/generate', {
        message: prompts[field]
      });

      clearTimeout(timeout)

      if (!response.ok) {
        throw new Error("Failed to generate suggestion")
      }

      const data = await response.json()
      setSuggestion(response.data.reply);
    } catch (err) {
      console.log("error", err.error || err.message)
      const randomIndex = Math.floor(Math.random() * 5);
      setSuggestion(fallbackSuggestions[field][randomIndex]);
      if (err.name === "AbortError") {
        setError(t("timeoutError"));
      } else {
        setError(t("serverError"));
      }
    } finally {
      setLoading(false)
    }
    };

    const handleAccept = () => {
      if (activeField) {
        setValue(activeField, suggestion, { shouldValidate: true })
      }
      setModalOpen(false)
    };

  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">{t("SituationDescriptions")}</CardTitle>

      <Textarea id="financial" label={t("labels.step3.financial")} errors={errors?.financial} {...register("financial")} />
      <button
          type="button"
          onClick={() => handleHelpClick("financial")}
          className="mt-2 text-blue-600 underline"
        >
          {t("labels.step3.helptext")}
      </button>
      <Textarea id="employment" label={t("labels.step3.employment")} errors={errors?.employment} {...register("employment")} />
      <button
          type="button"
          onClick={() => handleHelpClick("employment")}
          className="mt-2 text-blue-600 underline"
        >
          {t("labels.step3.helptext")}
      </button>
      <Textarea id="reason" label={t("labels.step3.reason")} errors={errors?.reason} {...register("reason")} />
      <button
          type="button"
          onClick={() => handleHelpClick("reason")}
          className="mt-2 text-blue-600 underline"
        >
          {t("labels.step3.helptext")}
      </button>
      <SuggestionModal
        open={modalOpen}
        loading={loading}
        error={error}
        suggestion={suggestion}
        onAccept={handleAccept}
        labelText={t("labels.step3.generating")}
        onDiscard={() => setModalOpen(false)}
        onChange={setSuggestion}
      />
      <Snackbar message={error} onClose={() => setError("")} />
    </div>
  );
}

export { PersonalInfoStep, FamilyInfoStep, SituationInfoStep };
