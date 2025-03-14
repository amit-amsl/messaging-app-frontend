import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type FormFieldProps = {
  type: string;
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  isDisabled: boolean;
};
