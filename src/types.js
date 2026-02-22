import { z } from "zod";

export const ID_CONFIG = {
  AE: { label: "Emirates ID", regex: /^784-(19|20)\d{2}-\d{7}-\d{1}$/, placeholder: "784-1999-1234567-1" },
  IN: { label: "Aadhaar Number", regex: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, placeholder: "12 Digits" },
  TH: { label: "Thai ID", regex: /^[0-9]{13}$/, placeholder: "13 Digits" },
  US: { label: "SSN", regex: /^\d{3}-\d{2}-\d{4}$/, placeholder: "000-00-0000" },
  GB: { label: "NIN", regex: /^[A-Z]{2}[0-9]{6}[A-Z]{1}$/, placeholder: "QQ123456C" },
  SG: { label: "NRIC/FIN", regex: /^[STFG]\d{7}[A-Z]$/, placeholder: "S1234567A" },
  MY: { label: "MyKad", regex: /^\d{12}$/, placeholder: "12 Digits" },
  VN: { label: "ID Card", regex: /^\d{9,12}$/, placeholder: "9 or 12 Digits" },
  PH: { label: "PhilSys", regex: /^\d{4}-\d{4}-\d{4}-\d{4}$/, placeholder: "0000-0000-0000-0000" },
  ID: { label: "NIK", regex: /^\d{16}$/, placeholder: "16 Digits" },
  PK: { label: "CNIC", regex: /^\d{5}-\d{7}-\d{1}$/, placeholder: "00000-0000000-0" },
  SA: { label: "National ID", regex: /^\d{10}$/, placeholder: "10 Digits" },
  QA: { label: "QID", regex: /^\d{11}$/, placeholder: "11 Digits" },
  FR: { label: "NIR", regex: /^\d{15}$/, placeholder: "15 Digits" },
  DE: { label: "ID", regex: /^[A-Z0-9]{9}$/, placeholder: "9 Chars" },
  IT: { label: "Codice Fiscale", regex: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/, placeholder: "16 Chars" },
  ES: { label: "DNI", regex: /^\d{8}[A-Z]$/, placeholder: "00000000A" },
  BR: { label: "CPF", regex: /^\d{11}$/, placeholder: "11 Digits" },
  AU: { label: "TFN", regex: /^\d{9}$/, placeholder: "9 Digits" },
  CA: { label: "SIN", regex: /^\d{3}-\d{3}-\d{3}$/, placeholder: "000-000-000" },
};

export const personalInfoSchema = (t) => z.object({
  firstName: z.string().min(1, t("validation.step1.firstName")),
  lastName: z.string().min(1, t("validation.step1.lastName")),
  email: z.string().email(t("validation.step1.email")),
  country: z.string().min(1, t("validation.step1.country")),
  state: z.string().min(1, t("validation.step1.state")),
  city: z.string().min(1, t("validation.step1.city")),
  idNumber: z.string().min(1, t("validation.step1.idNumber")),
  dob: z.string().min(1, t("validation.step1.dob")),
  phone: z.string().min(8, t("validation.step1.phone")),
}).refine((data) => {
  const rule = ID_CONFIG[data.country];
  return rule ? rule.regex.test(data.idNumber) : true;
}, {
  message: t("validation.step1.invalidIdNumber"),
  path: ["idNumber"],
});

export const familyInfoSchema = (t) => z.object({
  maritialstatus: z.string().min(1, t("validation.step2.maritalStatus")),
  employmentstatus: z.string().min(1, t("validation.step2.employmentStatus")),
  housingstatus: z.string().min(1, t("validation.step2.housingStatus")),
  monthlyincome: z.string().min(1, t("validation.step2.monthlyIncome")),
  dependants: z.string().min(1, t("validation.step2.dependents")),
});

export const situationInfoSchema  = (t) => z.object({
  financial: z.string().min(10, t("validation.step3.financial")),
  employment: z.string().min(10, t("validation.step3.employment")),
  reason: z.string().min(10, t("validation.step3.reason")),
});
