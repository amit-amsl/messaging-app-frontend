import { FormFieldProps } from "@/types/form";

export default function FormField({
  type,
  label,
  register,
  error,
  isDisabled,
}: FormFieldProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-bold">{label}</span>
      </div>
      <input
        {...register}
        type={type}
        className={`${error && "input-error"} input input-bordered w-full `}
        disabled={isDisabled}
      />
      {error && (
        <div className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </div>
      )}
    </label>
  );
}
