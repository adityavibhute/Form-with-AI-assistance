import { Input } from "./ui/input";
import { Label } from "./ui/label";

/**
 * @param id - Field name (must match schema keys)
 * @param label - Display label for the field
 * @param register - React Hook Form register function
 * @param errors - Validation errors object
 * @param type - HTML input type (text, email, tel, etc.)
 * @param maxLength - Maximum character length
 */
function FormField({
  id,
  label,
  register,
  errors,
  type = "text",
  maxLength,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} maxLength={maxLength} {...register(id)} />
      {errors[id] && (
        <p className="text-sm text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
}

export default FormField;
