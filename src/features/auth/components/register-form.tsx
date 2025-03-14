import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import { RegisterInput, registerInputSchema, useRegister } from "@/lib/auth";
import { Link } from "react-router";
import clsx from "clsx";
import { useState } from "react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerInputSchema),
  });
  const [serverError, setServerError] = useState("");

  const registration = useRegister({
    onError: (error) => {
      setServerError(error?.response?.data?.message);
    },
  });

  const onSubmit = (data: RegisterInput) => {
    registration.mutate(data);
  };

  return (
    <div className="flex flex-col gap-3 container max-w-sm p-4">
      <p className="text-5xl font-bold">Join our community!</p>
      {serverError && <p className="text-red-500 font-bold">* {serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <FormField
            type="text"
            label="Username"
            register={register("username", { required: true })}
            error={errors.username}
            isDisabled={registration.isPending}
          />
          <FormField
            type="password"
            label="Password"
            register={register("password", { required: true })}
            error={errors.password}
            isDisabled={registration.isPending}
          />
          <FormField
            type="password"
            label="Confirm Password"
            register={register("confirmPassword", { required: true })}
            error={errors.confirmPassword}
            isDisabled={registration.isPending}
          />
          <button
            className={`${registration.isPending && "btn-disabled"} btn btn-neutral`}
            type="submit"
          >
            {registration.isPending && (
              <span className="loading loading-spinner"></span>
            )}
            Register
          </button>
        </div>
      </form>
      <div>
        <p className={clsx(registration.isPending && "hidden")}>
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="link link-hover font-bold text-sky-600"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
